import React, { forwardRef, Ref, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalloutLayout, { CalloutLayoutProps } from '../../CalloutBlock/CalloutLayout';
import ScrollableCardsLayout from '../../../../core/ui/card/cardsLayout/ScrollableCardsLayout';
import PostCreationDialog from '../../post/PostCreationDialog/PostCreationDialog';
import { CalloutState, CreatePostInput } from '../../../../core/apollo/generated/graphql-schema';
import CreateCalloutItemButton from '../CreateCalloutItemButton';
import { buildPostUrl } from '../../../../main/routing/urlBuilders';
import PostCard, { PostCardPost } from './PostCard';
import { BaseCalloutViewProps } from '../CalloutViewTypes';
import { gutters } from '../../../../core/ui/grid/utils';
import CalloutBlockFooter from '../../CalloutBlock/CalloutBlockFooter';
import useCurrentBreakpoint from '../../../../core/ui/utils/useCurrentBreakpoint';
import PageContentBlock from '../../../../core/ui/content/PageContentBlock';

interface PostCalloutProps extends BaseCalloutViewProps {
  callout: CalloutLayoutProps['callout'];
  posts: PostCardPost[] | undefined;
  loading: boolean;
  creatingPost: boolean;
  onCreatePost: (post: CreatePostInput) => Promise<{ nameID: string } | undefined>;
}

const PostCallout = forwardRef<Element, PostCalloutProps>(
  (
    {
      callout,
      posts,
      loading,
      creatingPost,
      onCreatePost,
      canCreate = false,
      spaceNameId,
      challengeNameId,
      opportunityNameId,
      contributionsCount,
      blockProps,
      ...calloutLayoutProps
    },
    ref
  ) => {
    // Dialog handling
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const openCreateDialog = () => setPostDialogOpen(true);
    const closeCreateDialog = () => setPostDialogOpen(false);
    const navigate = useNavigate();

    const postNames = useMemo(() => posts?.map(x => x.profile.displayName) ?? [], [posts]);

    const createButton = canCreate && callout.contributionPolicy.state !== CalloutState.Closed && (
      <CreateCalloutItemButton onClick={openCreateDialog} />
    );

    const navigateToPost = (post: PostCardPost) => {
      navigate(
        buildPostUrl(callout.nameID, post.nameID, {
          spaceNameId: spaceNameId!,
          challengeNameId,
          opportunityNameId,
        })
      );
    };

    const breakpoint = useCurrentBreakpoint();

    const isMobile = breakpoint === 'xs';

    return (
      <>
        <PageContentBlock ref={ref as Ref<HTMLDivElement>} disablePadding disableGap {...blockProps}>
          <CalloutLayout callout={callout} contributionsCount={contributionsCount} {...calloutLayoutProps}>
            <ScrollableCardsLayout
              items={loading ? [undefined, undefined] : posts ?? []}
              deps={[spaceNameId, challengeNameId, opportunityNameId]}
              createButton={!isMobile && createButton}
              maxHeight={gutters(22)}
            >
              {post => <PostCard post={post} onClick={navigateToPost} />}
            </ScrollableCardsLayout>
            {isMobile && canCreate && callout.contributionPolicy.state !== CalloutState.Closed && (
              <CalloutBlockFooter contributionsCount={contributionsCount} onCreate={openCreateDialog} />
            )}
          </CalloutLayout>
        </PageContentBlock>
        <PostCreationDialog
          open={postDialogOpen}
          onClose={closeCreateDialog}
          onCreate={onCreatePost}
          postNames={postNames}
          calloutDisplayName={callout.framing.profile.displayName}
          spaceNameId={spaceNameId!}
          challengeNameId={challengeNameId}
          opportunityNameId={opportunityNameId}
          calloutId={callout.id}
          defaultDescription={callout.contributionDefaults.postDescription}
          creating={creatingPost}
        />
      </>
    );
  }
);

export default PostCallout;
