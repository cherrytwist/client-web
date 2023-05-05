import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApolloError, FetchResult } from '@apollo/client';
import { alpha, Avatar, Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import DashboardGenericSection from '../../../shared/components/DashboardSections/DashboardGenericSection';
import { Reference } from '../../../../core/apollo/generated/graphql-schema';
import { SectionSpacer } from '../../../shared/components/Section/Section';
import TagsComponent from '../../../shared/components/TagsComponent/TagsComponent';
import MessageView from '../../../shared/components/Comments/MessageView';
import { Message } from '../../../shared/components/Comments/models/message';
import PostMessageToCommentsForm from '../../../shared/components/Comments/PostMessageToCommentsForm';
import WrapperMarkdown from '../../../../core/ui/markdown/WrapperMarkdown';
import References from '../../../shared/components/References/References';
import TagLabel from '../../../../common/components/composite/common/TagLabel/TagLabel';
import DashboardColumn from '../../../../common/components/composite/sections/DashboardSection/DashboardColumn';
import { mapWithSeparator } from '../../../shared/utils/joinNodes';
import { animateScroll as scroller } from 'react-scroll';
import { useResizeDetector } from 'react-resize-detector';
import { MID_TEXT_LENGTH } from '../../../../core/ui/forms/field-length.constants';
import { ShareComponent } from '../../../shared/components/ShareDialog/ShareDialog';
import ConfirmationDialog from '../../../../core/ui/dialogs/ConfirmationDialog';

const COMMENTS_CONTAINER_HEIGHT = 400;
const SCROLL_BOTTOM_MISTAKE_TOLERANCE = 10;

export interface AspectDashboardViewProps {
  mode: 'messages' | 'share';
  canReadComments: boolean;
  canPostComments: boolean;
  canDeleteComment: (messageId: string) => boolean;
  banner?: string;
  displayName?: string;
  description?: string;
  type?: string;
  messages?: Message[];
  commentId?: string;
  tags?: string[];
  references?: Pick<Reference, 'id' | 'name' | 'uri' | 'description'>[];
  bannerOverlayOverride?: ReactNode;
  creatorAvatar?: string;
  creatorName?: string;
  createdDate?: string;
  handlePostComment: (commentId: string, message: string) => Promise<FetchResult<unknown>> | void;
  handleDeleteComment: (commentId: string, messageId: string) => void;
  aspectUrl: string;
  loading: boolean;
  error?: ApolloError;
}

interface ScrollState {
  scrollTop: number;
  scrollHeight: number;
}

const isScrolledToBottom = ({
  scrollTop,
  scrollHeight,
  containerHeight,
}: ScrollState & { containerHeight: number }) => {
  // Due to a bug with the zoom in Chromium based browsers we can not check if scrollTop === (scrollHeight - containerHeight)
  // This will return true if scrollTop is approximately equal to (scrollHeight - containerHeight), if the comments are scrolled very close to the end
  return Math.abs(scrollHeight - containerHeight - scrollTop) < SCROLL_BOTTOM_MISTAKE_TOLERANCE;
};

const AspectDashboardView: FC<AspectDashboardViewProps> = props => {
  const { t } = useTranslation();
  const { loading, mode } = props;

  const commentsContainerRef = useRef<HTMLElement>(null);
  const prevScrollTopRef = useRef<ScrollState>({ scrollTop: 0, scrollHeight: 0 });
  const wasScrolledToBottomRef = useRef(true);
  const [commentToBeDeleted, setCommentToBeDeleted] = useState<string | undefined>(undefined);

  const { banner, description, displayName, type, messages = [], commentId, tags = [], references } = props;
  const { creatorName, creatorAvatar, createdDate } = props;
  const { canReadComments, canDeleteComment, canPostComments } = props;
  const { handlePostComment, handleDeleteComment } = props;

  const onPostComment = (message: string) => (commentId ? handlePostComment(commentId, message) : undefined);
  const deleteComment = (id: string) => (commentId ? handleDeleteComment(commentId, id) : undefined);
  const onDeleteComment = (id: string) => setCommentToBeDeleted(id);

  const { height: containerHeight = 0 } = useResizeDetector({
    targetRef: commentsContainerRef,
  });

  useEffect(() => {
    if (commentsContainerRef.current) {
      wasScrolledToBottomRef.current = isScrolledToBottom({ ...prevScrollTopRef.current, containerHeight });

      prevScrollTopRef.current = {
        scrollTop: commentsContainerRef.current.scrollTop,
        scrollHeight: commentsContainerRef.current.scrollHeight,
      };
    }
  }, [messages, containerHeight]);

  useEffect(() => {
    if (wasScrolledToBottomRef.current && commentsContainerRef.current) {
      scroller.scrollToBottom({ container: commentsContainerRef.current });
    }
  }, [messages]);

  const handleCommentsScroll = () => {
    prevScrollTopRef.current.scrollTop = commentsContainerRef.current!.scrollTop;
  };

  const bannerOverlay = props.bannerOverlayOverride ?? (
    <AuthorComponent avatarSrc={creatorAvatar} name={creatorName} createdDate={createdDate} loading={loading} />
  );

  return (
    <Grid container spacing={2}>
      <DashboardColumn>
        <DashboardGenericSection
          bannerUrl={banner}
          alwaysShowBanner
          bannerOverlay={bannerOverlay}
          headerText={displayName}
          primaryAction={loading ? <Skeleton width={'30%'} /> : <TagLabel>{type}</TagLabel>}
        >
          {loading ? (
            <>
              <Skeleton width={'80%'} />
              <Skeleton width={'70%'} />
              <Skeleton width={'60%'} />
            </>
          ) : (
            <>
              <Typography component={WrapperMarkdown}>{description}</Typography>
              <SectionSpacer double />
              <TagsComponent tags={tags} loading={loading} />
            </>
          )}
        </DashboardGenericSection>
        {!!references && references.length > 0 && (
          <DashboardGenericSection headerText={t('common.references')}>
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <References references={references} noItemsView={<Typography>{t('common.no-references')}</Typography>} />
            )}
          </DashboardGenericSection>
        )}
      </DashboardColumn>
      {mode === 'messages' && canReadComments && (
        <DashboardColumn>
          <DashboardGenericSection headerText={`${t('common.comments')} (${messages.length})`}>
            <Box
              sx={{ maxHeight: COMMENTS_CONTAINER_HEIGHT, overflowY: 'auto' }}
              ref={commentsContainerRef}
              onScroll={handleCommentsScroll}
            >
              {mapWithSeparator(messages, SectionSpacer, message => (
                <MessageView
                  key={message.id}
                  message={message}
                  canDelete={canDeleteComment(message.id)}
                  onDelete={onDeleteComment}
                />
              ))}
            </Box>
            <SectionSpacer double />
            <Box>
              {canPostComments && (
                <PostMessageToCommentsForm
                  placeholder={t('pages.aspect.dashboard.comment.placeholder')}
                  onPostComment={onPostComment}
                  maxLength={MID_TEXT_LENGTH}
                />
              )}
              {!canPostComments && (
                <Box paddingY={4} display="flex" justifyContent="center">
                  <Typography variant="h4">{t('components.discussion.cant-post')}</Typography>
                </Box>
              )}
            </Box>
            <SectionSpacer />
          </DashboardGenericSection>
          <ConfirmationDialog
            actions={{
              onCancel: () => setCommentToBeDeleted(undefined),
              onConfirm: async () => {
                if (commentToBeDeleted) {
                  await deleteComment(commentToBeDeleted);
                }
                setCommentToBeDeleted(undefined);
              },
            }}
            entities={{
              confirmButtonTextId: 'buttons.delete',
              contentId: 'components.confirmation-dialog.delete-comment.confirmation-text',
              titleId: 'components.confirmation-dialog.delete-comment.confirmation-title',
            }}
            options={{
              show: Boolean(commentToBeDeleted),
            }}
          />
        </DashboardColumn>
      )}
      {mode === 'share' && (
        <DashboardColumn>
          <DashboardGenericSection>
            <ShareComponent url={props.aspectUrl} entityTypeName="card" />
          </DashboardGenericSection>
        </DashboardColumn>
      )}
    </Grid>
  );
};

export default AspectDashboardView;

interface AuthorComponentProps {
  avatarSrc: string | undefined;
  name: string | undefined;
  createdDate: string | undefined;
  loading?: boolean;
}

const AuthorComponent: FC<AuthorComponentProps> = ({ avatarSrc, name, createdDate, loading }) => {
  const localeCreatedDate = createdDate && new Date(createdDate)?.toLocaleDateString();
  return (
    <Box
      sx={{
        width: '150px',
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme => theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: theme => alpha(theme.palette.neutralLight.main, 0.3),
      }}
    >
      {loading ? (
        <Skeleton variant="rectangular">
          <Avatar />
        </Skeleton>
      ) : (
        <Avatar src={avatarSrc} />
      )}
      <Typography noWrap sx={{ maxWidth: '100%' }}>
        {loading ? <Skeleton width="100%" /> : name}
      </Typography>
      <Typography noWrap>{loading ? <Skeleton width="100%" /> : localeCreatedDate}</Typography>
    </Box>
  );
};
