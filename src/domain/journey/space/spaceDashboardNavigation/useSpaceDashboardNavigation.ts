import { useSpaceDashboardNavigationSubspacesQuery } from '@/core/apollo/generated/apollo-hooks';
import {
  Authorization,
  AuthorizationPrivilege,
  CommunityMembershipStatus,
  MyMembershipsRoleSetFragment,
} from '@/core/apollo/generated/graphql-schema';
import { SpaceAboutLightModel } from '@/domain/space/about/model/SpaceAboutLight.model';
import { useCallback, useMemo } from 'react';

interface UseSpaceDashboardNavigationProps {
  spaceId: string | undefined;
  skip?: boolean;
}

interface UseSpaceDashboardNavigationProvided {
  dashboardNavigation: DashboardNavigationItem | undefined;
  loading: boolean;
  refetch: () => void;
}

export interface DashboardNavigationItem {
  id: string;
  displayName: string;
  url: string;
  avatar?: {
    uri: string;
    alternativeText?: string;
  };
  innovationFlowState?: string | undefined;
  private?: boolean;
  member: boolean;
  canCreateSubspace?: boolean;
  children?: DashboardNavigationItem[];
}

const getDashboardNavigationItemProps = (
  space: {
    id: string;
    about: SpaceAboutLightModel;
    roleSet?: MyMembershipsRoleSetFragment;
    authorization?: {
      myPrivileges?: AuthorizationPrivilege[];
    };
  },
  disabled?: boolean
): DashboardNavigationItem => {
  return {
    id: space.id,
    url: space.about.profile.url,
    displayName: space.about.profile.displayName,
    avatar: space.about.profile.avatar,
    private: disabled,
    member: space.roleSet?.myMembershipStatus === CommunityMembershipStatus.Member,
    canCreateSubspace: space.authorization?.myPrivileges?.includes(AuthorizationPrivilege.CreateSubspace),
  };
};

const isReadable = ({ authorization }: { authorization?: Partial<Authorization> }) =>
  authorization?.myPrivileges?.includes(AuthorizationPrivilege.Read);

const useSpaceDashboardNavigation = ({
  spaceId,
  skip,
}: UseSpaceDashboardNavigationProps): UseSpaceDashboardNavigationProvided => {
  const {
    data: challengesQueryData,
    loading: challengesQueryLoading,
    refetch: refetchChallenges,
  } = useSpaceDashboardNavigationSubspacesQuery({
    variables: { spaceId: spaceId! },
    skip: skip || !spaceId,
  });

  const space = challengesQueryData?.lookup.space;

  const loading = challengesQueryLoading;

  const dashboardNavigation = useMemo<DashboardNavigationItem | undefined>(() => {
    if (!space) {
      return undefined;
    }
    return {
      ...getDashboardNavigationItemProps(space),
      children: space.subspaces.map(subspace => {
        return {
          ...getDashboardNavigationItemProps(subspace, !isReadable(subspace)),
        };
      }),
    };
  }, [challengesQueryData]);

  const refetch = useCallback(() => {
    refetchChallenges();
  }, [refetchChallenges]);

  return {
    dashboardNavigation,
    loading,
    refetch,
  };
};

export default useSpaceDashboardNavigation;
