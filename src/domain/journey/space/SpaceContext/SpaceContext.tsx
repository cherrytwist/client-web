import { ApolloError } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import { useConfig } from '../../../platform/config/useConfig';
import { useSpaceProviderQuery } from '../../../../core/apollo/generated/apollo-hooks';
import {
  AuthorizationPrivilege,
  CommunityMembershipStatus,
  SpaceInfoFragment,
  SpacePrivacyMode,
  SpaceVisibility,
} from '../../../../core/apollo/generated/graphql-schema';

export interface SpacePermissions {
  canRead: boolean;
  viewerCanUpdate: boolean;
  canReadPosts: boolean;
  canReadSubspaces: boolean;
  canCreateSubspaces: boolean;
  canCreate: boolean;
  communityReadAccess: boolean;
  contextPrivileges: AuthorizationPrivilege[];
}

interface SpaceContextProps {
  spaceId: string;
  spaceNameId: string;
  communityId: string;
  roleSetId: string;
  isPrivate?: boolean;
  loading: boolean;
  permissions: SpacePermissions;
  error?: ApolloError;
  refetchSpace: () => void;
  // TODO Some components just randomly access SpaceContext instead of just querying the data the usual way.
  // TODO This Context should provide as little data as possible or just be removed.
  context?: SpaceInfoFragment['context'];
  profile: SpaceInfoFragment['profile'];
  visibility: SpaceVisibility;
  myMembershipStatus: CommunityMembershipStatus | undefined;
}

const SpaceContext = React.createContext<SpaceContextProps>({
  loading: false,
  isPrivate: undefined,
  spaceId: '',
  spaceNameId: '',
  communityId: '',
  roleSetId: '',
  permissions: {
    canRead: false,
    viewerCanUpdate: false,
    canCreate: false,
    canCreateSubspaces: false,
    canReadPosts: false,
    canReadSubspaces: false,
    communityReadAccess: false,
    contextPrivileges: [],
  },
  profile: {
    id: '',
    displayName: '',
    visuals: [],
    tagline: '',
    url: '',
  },
  visibility: SpaceVisibility.Active,
  refetchSpace: () => {},
  myMembershipStatus: undefined,
});

interface SpaceProviderProps {}

const NO_PRIVILEGES = [];

const SpaceContextProvider: FC<SpaceProviderProps> = ({ children }) => {
  const { spaceNameId = '' } = useUrlParams();
  // todo: still needed?
  const { error: configError } = useConfig();

  const {
    error: spaceError,
    data,
    loading,
    refetch: refetchSpace,
  } = useSpaceProviderQuery({
    variables: { spaceNameId },
    errorPolicy: 'all',
    skip: !spaceNameId,
  });

  const space = data?.space;
  const spaceId = space?.id || '';
  const visibility = space?.visibility || SpaceVisibility.Active;

  const communityId = space?.community?.id ?? '';
  const roleSetId = space?.community?.roleSet?.id ?? '';
  const isPrivate = space && space.settings.privacy?.mode === SpacePrivacyMode.Private;
  const error = configError || spaceError;

  const contextPrivileges = space?.context?.authorization?.myPrivileges ?? NO_PRIVILEGES;
  const spacePrivileges = space?.authorization?.myPrivileges ?? NO_PRIVILEGES;

  const canReadSubspaces = spacePrivileges.includes(AuthorizationPrivilege.Read);
  const canCreateSubspaces = spacePrivileges.includes(AuthorizationPrivilege.CreateSubspace);
  const canCreate = spacePrivileges.includes(AuthorizationPrivilege.Create);

  const communityPrivileges = space?.community?.authorization?.myPrivileges ?? NO_PRIVILEGES;

  const permissions = useMemo<SpacePermissions>(() => {
    return {
      canRead: spacePrivileges.includes(AuthorizationPrivilege.Read),
      viewerCanUpdate: spacePrivileges.includes(AuthorizationPrivilege.Update),
      canReadSubspaces,
      canCreateSubspaces: canCreateSubspaces,
      canCreate,
      communityReadAccess: communityPrivileges.includes(AuthorizationPrivilege.Read),
      canReadPosts: contextPrivileges.includes(AuthorizationPrivilege.Read),
      contextPrivileges,
    };
  }, [spacePrivileges, contextPrivileges, canReadSubspaces, communityPrivileges, canCreate, canCreateSubspaces]);

  const profile = useMemo(() => {
    return {
      id: space?.profile.id ?? '',
      displayName: space?.profile.displayName || '',
      description: space?.profile.description,
      tagset: space?.profile.tagset,
      visuals: space?.profile.visuals ?? [],
      tagline: space?.profile.tagline || '',
      references: space?.profile.references ?? [],
      location: space?.profile.location,
      url: space?.profile.url ?? '',
      visibility,
    };
  }, [space?.profile]);

  return (
    <SpaceContext.Provider
      value={{
        spaceId,
        spaceNameId,
        communityId,
        roleSetId,
        permissions,
        isPrivate,
        loading,
        error,
        refetchSpace,
        profile,
        context: space?.context,
        visibility,
        myMembershipStatus: space?.community?.roleSet?.myMembershipStatus,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

export { SpaceContextProvider, SpaceContext };
