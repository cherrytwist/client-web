import { ApolloError } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import { useConfig } from '../../../platform/config/useConfig';
import { useSpaceProviderQuery } from '../../../../core/apollo/generated/apollo-hooks';
import {
  AuthorizationPrivilege,
  SpaceInfoFragment,
  SpaceVisibility,
} from '../../../../core/apollo/generated/graphql-schema';

export interface SpacePermissions {
  viewerCanUpdate: boolean;
  canReadPosts: boolean;
  canReadChallenges: boolean;
  canCreateChallenges: boolean;
  canCreate: boolean;
  communityReadAccess: boolean;
  contextPrivileges: AuthorizationPrivilege[];
}

interface SpaceContextProps {
  spaceId: string;
  spaceNameId: string;
  communityId: string;
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
}

const SpaceContext = React.createContext<SpaceContextProps>({
  loading: false,
  isPrivate: undefined,
  spaceId: '',
  spaceNameId: '',
  communityId: '',
  permissions: {
    viewerCanUpdate: false,
    canCreate: false,
    canCreateChallenges: false,
    canReadPosts: false,
    canReadChallenges: false,
    communityReadAccess: false,
    contextPrivileges: [],
  },
  profile: {
    id: '',
    displayName: '',
    visuals: [],
    tagline: '',
  },
  visibility: SpaceVisibility.Active,
  refetchSpace: () => {},
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
    variables: { spaceId: spaceNameId },
    errorPolicy: 'all',
    skip: !spaceNameId,
  });

  const space = data?.space;
  const spaceId = space?.id || '';
  const visibility = space?.visibility || SpaceVisibility.Active;
  const communityId = space?.community?.id ?? '';
  const isPrivate = space && !space.authorization?.anonymousReadAccess;
  const error = configError || spaceError;

  const contextPrivileges = space?.context?.authorization?.myPrivileges ?? NO_PRIVILEGES;
  const spacePrivileges = space?.authorization?.myPrivileges ?? NO_PRIVILEGES;

  const canReadChallenges = spacePrivileges.includes(AuthorizationPrivilege.Read);
  const canCreateChallenges = spacePrivileges.includes(AuthorizationPrivilege.CreateChallenge);
  const canCreate = spacePrivileges.includes(AuthorizationPrivilege.Create);

  const communityPrivileges = space?.community?.authorization?.myPrivileges ?? NO_PRIVILEGES;

  const permissions = useMemo<SpacePermissions>(() => {
    return {
      viewerCanUpdate: spacePrivileges.includes(AuthorizationPrivilege.Update),
      canReadChallenges,
      canCreateChallenges,
      canCreate,
      communityReadAccess: communityPrivileges.includes(AuthorizationPrivilege.Read),
      canReadPosts: contextPrivileges.includes(AuthorizationPrivilege.Read),
      contextPrivileges,
    };
  }, [spacePrivileges, contextPrivileges, canReadChallenges, communityPrivileges, canCreate, canCreateChallenges]);

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
    };
  }, [space?.profile]);

  return (
    <SpaceContext.Provider
      value={{
        spaceId,
        spaceNameId,
        communityId,
        permissions,
        isPrivate,
        loading,
        error,
        refetchSpace,
        profile,
        context: space?.context,
        visibility,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

export { SpaceContextProvider, SpaceContext };
