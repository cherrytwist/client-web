import React, { FC } from 'react';
import { WithCommunity } from '../../components/Community/CommunityTypes';
import { useUrlParams } from '../../../../../core/routing/useUrlParams';
import { useSpaceGroupQuery } from '../../../../../core/apollo/generated/apollo-hooks';
import { GroupRoute } from '../../routing/GroupRoute';

interface GroupRouteProps extends WithCommunity {}

export const SpaceGroupRoute: FC<GroupRouteProps> = ({ parentCommunityId }) => {
  const { groupId = '', spaceNameId = '' } = useUrlParams();

  const { data, loading } = useSpaceGroupQuery({
    variables: { spaceNameId, groupId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !spaceNameId || !groupId,
  });

  return <GroupRoute loading={loading} group={data?.space?.community?.group} parentCommunityId={parentCommunityId} />;
};
