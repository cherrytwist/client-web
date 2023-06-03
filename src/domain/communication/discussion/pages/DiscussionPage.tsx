import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiscussionsLayout from '../layout/DiscussionsLayout';
import RemoveModal from '../../../../common/components/core/RemoveModal';
import { useUserContext } from '../../../community/contributor/user';
import DiscussionView from '../views/DiscussionView';
import {
  MessageDetailsFragmentDoc,
  RoomMessageReceivedDocument,
  refetchPlatformDiscussionQuery,
  refetchPlatformDiscussionsQuery,
  useDeleteDiscussionMutation,
  usePlatformDiscussionQuery,
  useRemoveMessageOnRoomMutation,
  useSendMessageToRoomMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import { Discussion } from '../models/Discussion';
import { compact } from 'lodash';
import { useAuthorsDetails } from '../../communication/useAuthorsDetails';
import { Message } from '../../messages/models/message';
import { Skeleton } from '@mui/material';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import TopLevelDesktopLayout from '../../../platform/ui/PageLayout/TopLevelDesktopLayout';
import RouterLink from '../../../../core/ui/link/RouterLink';
import BackButton from '../../../../core/ui/actions/BackButton';
import { FEATURE_SUBSCRIPTIONS } from '../../../platform/config/features.constants';
import { useConfig } from '../../../platform/config/useConfig';
import { useNavigate } from 'react-router-dom';
import UseSubscriptionToSubEntity from '../../../shared/subscriptions/useSubscriptionToSubEntity';
import {
  DiscussionDetailsFragment,
  MessageDetailsFragment,
  RoomMessageReceivedSubscription,
  RoomMessageReceivedSubscriptionVariables,
} from '../../../../core/apollo/generated/graphql-schema';

const useDiscussionMessagesSubscription = UseSubscriptionToSubEntity<
  DiscussionDetailsFragment & {
    messages?: MessageDetailsFragment[];
  },
  RoomMessageReceivedSubscription,
  RoomMessageReceivedSubscriptionVariables
>({
  subscriptionDocument: RoomMessageReceivedDocument,
  getSubscriptionVariables: discussion => ({ roomID: discussion.comments.id }),
  updateSubEntity: (discussion, subscriptionData) => {
    discussion?.messages?.push(subscriptionData.roomMessageReceived.message);
  },
});

interface DiscussionPageProps {}

export const DiscussionPage: FC<DiscussionPageProps> = () => {
  const { discussionNameId } = useUrlParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { isFeatureEnabled } = useConfig();

  const {
    data,
    loading: loadingDiscussion,
    subscribeToMore,
  } = usePlatformDiscussionQuery({
    variables: {
      discussionId: discussionNameId!,
    },
    skip: !discussionNameId,
  });
  useDiscussionMessagesSubscription(data, data => data?.platform.communication.discussion, subscribeToMore);

  const rawDiscussion = data?.platform.communication.discussion;
  const authors = useAuthorsDetails(
    compact([rawDiscussion?.createdBy, ...compact(rawDiscussion?.comments.messages?.map(c => c.sender?.id))])
  );

  const discussion = useMemo<Discussion | undefined>(
    () =>
      rawDiscussion
        ? {
            id: rawDiscussion.id,
            nameID: rawDiscussion.nameID,
            title: rawDiscussion.profile.displayName,
            description: rawDiscussion.profile.description,
            category: rawDiscussion.category,
            myPrivileges: rawDiscussion.authorization?.myPrivileges,
            author: rawDiscussion.createdBy ? authors.getAuthor(rawDiscussion.createdBy) : undefined,
            authors: authors.authors ?? [],
            createdAt: rawDiscussion.timestamp ? new Date(rawDiscussion.timestamp) : undefined,
            comments: {
              id: rawDiscussion.comments.id,
              messages:
                rawDiscussion.comments.messages?.map<Message>(m => ({
                  id: m.id,
                  body: m.message,
                  sender: m.sender ? authors.getAuthor(m.sender?.id) : undefined,
                  createdAt: new Date(m.timestamp),
                })) ?? [],
              messagesCount: rawDiscussion.comments.messagesCount,
            },
          }
        : undefined,
    [rawDiscussion, authors]
  );

  const [postComment] = useSendMessageToRoomMutation();

  const handlePostComment = (post: string) => {
    if (!discussion) {
      return;
    }

    return postComment({
      update: (cache, { data }) => {
        if (isFeatureEnabled(FEATURE_SUBSCRIPTIONS)) {
          return;
        }
        cache.modify({
          id: cache.identify({
            id: discussionNameId,
            __typename: 'Discussion',
          }),
          fields: {
            messages(existingMessages = []) {
              if (data) {
                const newMessage = cache.writeFragment({
                  data: data?.sendMessageToRoom,
                  fragment: MessageDetailsFragmentDoc,
                });
                return [...existingMessages, newMessage];
              }
              return existingMessages;
            },
          },
        });
      },
      variables: {
        messageData: {
          roomID: discussion.comments.id,
          message: post,
        },
      },
    });
  };

  const [deleteDiscussionId, setDeleteDiscussionId] = useState<string>();
  const [deleteCommentId, setDeleteCommentId] = useState<string>();

  const [deleteDiscussion] = useDeleteDiscussionMutation({
    refetchQueries: [refetchPlatformDiscussionsQuery()],
  });

  const handleDeleteDiscussion = async () => {
    if (!deleteDiscussionId) {
      return;
    }
    await deleteDiscussion({
      variables: {
        deleteData: {
          ID: deleteDiscussionId,
        },
      },
    });
    setDeleteDiscussionId(undefined);
    navigate('/forum');
  };

  const [deleteComment] = useRemoveMessageOnRoomMutation({
    refetchQueries: [
      refetchPlatformDiscussionQuery({
        discussionId: discussionNameId!,
      }),
    ],
  });

  const handleDeleteComment = async () => {
    if (!deleteCommentId || !discussion) {
      return;
    }
    await deleteComment({
      variables: {
        messageData: {
          roomID: discussion.comments.id,
          messageID: deleteCommentId,
        },
      },
    });
    setDeleteCommentId(undefined);
  };

  const onCancelDeleteModal = () => {
    setDeleteCommentId(undefined);
    setDeleteDiscussionId(undefined);
  };

  return (
    <TopLevelDesktopLayout>
      <DiscussionsLayout
        backButton={
          <BackButton component={RouterLink} to="/forum">
            {t('pages.forum.back')}
          </BackButton>
        }
      >
        {loadingDiscussion || !discussion ? (
          <Skeleton />
        ) : (
          <DiscussionView
            currentUserId={user?.user.id}
            discussion={discussion}
            onPostComment={handlePostComment}
            onDeleteDiscussion={() => setDeleteDiscussionId(discussion.id)}
            onDeleteComment={(id: string) => setDeleteCommentId(id)}
          />
        )}
      </DiscussionsLayout>
      <RemoveModal
        show={Boolean(deleteDiscussionId)}
        onCancel={onCancelDeleteModal}
        onConfirm={handleDeleteDiscussion}
        text={t('components.discussion.delete-discussion')}
      />
      <RemoveModal
        show={Boolean(deleteCommentId)}
        onCancel={onCancelDeleteModal}
        onConfirm={handleDeleteComment}
        text={t('components.discussion.delete-comment')}
      />
    </TopLevelDesktopLayout>
  );
};

export default DiscussionPage;
