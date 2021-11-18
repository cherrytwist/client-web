import React, { FC, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import DiscussionsLayout from '../../components/composite/layout/Discussions/DiscussionsLayout';
import { useDiscussionsContext } from '../../context/Discussions/DiscussionsProvider';
import { ThemeProviderV2 } from '../../context/ThemeProvider';
import { useUpdateNavigation } from '../../hooks';
import NewDiscussionView from '../../views/Discussions/NewDiscussionView';
import { PageProps } from '../common';
import { useCommunityContext } from '../../context/CommunityProvider';

export interface NewDiscussionPageProps extends PageProps {}

const NewDiscussionPage: FC<NewDiscussionPageProps> = ({ paths }) => {
  const { url } = useRouteMatch();
  const { handleCreateDiscussion } = useDiscussionsContext();
  const { communityName } = useCommunityContext();
  const currentPaths = useMemo(() => [...paths, { value: url, name: 'new', real: false }], [paths]);

  useUpdateNavigation({ currentPaths });

  // TODO [ATS]:  this will be constructed depending on the community.
  const title = `${communityName} - Initiate Discussion`;

  return (
    <ThemeProviderV2>
      <DiscussionsLayout title={title}>
        <NewDiscussionView
          onPost={values => handleCreateDiscussion(values.title, values.category, values.description)}
        />
      </DiscussionsLayout>
    </ThemeProviderV2>
  );
};
export default NewDiscussionPage;
