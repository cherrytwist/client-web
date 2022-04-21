import { useMemo } from 'react';
import { useUserContext } from '../../index';
import { useContributingUsersQuery, useOrganizationsListQuery } from '../../generated/graphql';
import useServerMetadata from '../../useServerMetadata';
import { COUNTRIES_BY_CODE } from '../../../models/constants';
import getActivityCount from '../../../utils/get-activity-count';
import { buildOrganizationUrl, buildUserProfileUrl } from '../../../utils/urlBuilders';
import { getVisualAvatar } from '../../../utils/visuals.utils';
import { ContributorCardProps } from '../../../components/composite/common/cards/ContributorCard/ContributorCard';
import { WithId } from '../../../types/WithId';

const MAX_USERS_TO_SHOW = 12;
const MAX_ORGANIZATIONS_TO_SHOW = 12;

const useContributors = () => {
  const { user, isAuthenticated } = useUserContext();

  const { data: usersData, loading } = useContributingUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: MAX_USERS_TO_SHOW,
      shuffle: true,
    },
    skip: !isAuthenticated,
  });

  const { data: organizationsData, loading: loadingOrganizations } = useOrganizationsListQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: MAX_ORGANIZATIONS_TO_SHOW,
      shuffle: true,
    },
  });

  const users = useMemo(() => usersData?.users || [], [usersData]);
  const organizations = useMemo(() => organizationsData?.organizations || [], [organizationsData]);

  const contributors: WithId<ContributorCardProps>[] = useMemo(
    () =>
      users.map(user => ({
        id: user.id,
        avatar: user.profile?.avatar?.uri || '',
        displayName: user.displayName,
        url: buildUserProfileUrl(user.nameID),
        tooltip: {
          tags: user.profile?.tagsets?.flatMap(x => x.tags.map(t => t)) || [],
          city: user.city,
          country: COUNTRIES_BY_CODE[user.country],
        },
      })),
    [users]
  );

  const contributingOrganizations: WithId<ContributorCardProps>[] = useMemo(
    () =>
      organizations.map(org => ({
        id: org.id,
        avatar: getVisualAvatar(org?.profile?.avatar) || '',
        displayName: org.displayName,
        url: buildOrganizationUrl(org.nameID),
      })),
    [organizations]
  );

  const { activity } = useServerMetadata();
  const [usersCount, organizationsCount] = [
    getActivityCount(activity, 'users') || 0,
    getActivityCount(activity, 'organizations') || 0,
  ];

  return {
    entities: {
      usersCount,
      users: contributors,
      user,
      organizationsCount,
      organizations: contributingOrganizations,
    },
    loading: { users: loading, organizations: loadingOrganizations },
  };
};

export default useContributors;
