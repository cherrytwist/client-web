import { Container } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useUpdateNavigation } from '../../../hooks';
import { PageProps } from '../../../pages';
import EditCommunityMembers, { CommunityCredentials } from '../Authorization/EditCommunityMembers';
import { WithCommunity } from './CommunityTypes';

interface CommunityPageProps extends PageProps, WithCommunity {
  credential: CommunityCredentials;
  resourceId: string;
}

export const CommunityPage: FC<CommunityPageProps> = ({
  paths,
  communityId,
  parentCommunityId,
  credential,
  resourceId,
}) => {
  const { url } = useRouteMatch();
  const currentPaths = useMemo(() => [...paths, { value: url, name: 'members', real: false }], [paths]);
  useUpdateNavigation({ currentPaths });

  return (
    <Container maxWidth="xl">
      <EditCommunityMembers
        credential={credential}
        resourceId={resourceId}
        communityId={communityId || ''}
        parentCommunityId={parentCommunityId}
      />
    </Container>
  );
};

export default CommunityPage;
