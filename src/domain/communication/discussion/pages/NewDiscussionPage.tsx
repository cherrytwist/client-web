import React, { FC, useMemo } from 'react';
import DiscussionsLayout from '../../../../common/components/composite/layout/Discussions/DiscussionsLayout';
import { useCommunityContext } from '../../../community/community/CommunityContext';
import { useDiscussionsContext } from '../providers/DiscussionsProvider';
import NewDiscussionView from '../views/NewDiscussionView';
import { PageProps } from '../../../shared/types/PageProps';
import { useUpdateNavigation } from '../../../../core/routing/useNavigation';

export interface NewDiscussionPageProps extends PageProps {}

const NewDiscussionPage: FC<NewDiscussionPageProps> = ({ paths }) => {
  const { handleCreateDiscussion } = useDiscussionsContext();
  const { communityName } = useCommunityContext();

  const title = `${communityName} - Initiate Discussion`;

  const currentPaths = useMemo(() => [...paths, { value: '/new', name: 'new', real: false }], [paths]);
  useUpdateNavigation({ currentPaths });

  return (
    <DiscussionsLayout title={title}>
      <NewDiscussionView onPost={values => handleCreateDiscussion(values.title, values.category, values.description)} />
    </DiscussionsLayout>
  );
};

export default NewDiscussionPage;
