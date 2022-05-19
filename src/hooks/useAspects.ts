// export {};
import { useMemo } from 'react';
import { useApolloErrorHandler, useHub } from './index';
import {
  usePrivilegesOnHubContextQuery,
  useHubAspectsQuery,
  usePrivilegesOnChallengeContextQuery,
  useChallengeAspectsQuery,
  usePrivilegesOnOpportunityContextQuery,
  useOpportunityAspectsQuery,
} from './generated/graphql';
import { AuthorizationPrivilege } from '../models/graphql-schema';
import { AspectWithPermissions, EntityIds } from '../containers/ContributeTabContainer/ContributeTabContainer';
import useContextAspectCreatedSubscription from '../domain/context/useContextAspectCreatedSubscription';
import { ApolloError } from '@apollo/client';

export interface AspectsData {
  aspects: AspectWithPermissions[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  canReadAspects: boolean;
  canCreateAspects: boolean;
  contextId: string | undefined;
}
export const useAspects = ({ hubNameId, challengeNameId = '', opportunityNameId = '' }: EntityIds): AspectsData => {
  const handleError = useApolloErrorHandler();
  const { loading: hubLoading } = useHub();

  const {
    data: hubContextData,
    loading: hubContextLoading,
    error: hubContextError,
    subscribeToMore: subscribeToHub,
  } = usePrivilegesOnHubContextQuery({
    variables: { hubNameId },
    skip: !!(challengeNameId || opportunityNameId),
    onError: handleError,
  });
  const hubContext = hubContextData?.hub?.context;
  const hubContextPrivileges = hubContext?.authorization?.myPrivileges;
  const canReadHubContext = hubContextPrivileges?.includes(AuthorizationPrivilege.Read);
  const canCreateAspectOnHub = hubContextPrivileges?.includes(AuthorizationPrivilege.CreateAspect);
  const {
    data: hubAspectData,
    loading: hubAspectLoading,
    error: hubAspectError,
  } = useHubAspectsQuery({
    variables: { hubNameId },
    skip: !canReadHubContext || !!(challengeNameId || opportunityNameId),
    onError: handleError,
  });
  const hubAspects = hubAspectData?.hub?.context?.aspects;

  const {
    data: challengeContextData,
    loading: challengeContextLoading,
    error: challengeContextError,
  } = usePrivilegesOnChallengeContextQuery({
    variables: { hubNameId, challengeNameId },
    skip: !challengeNameId || !!opportunityNameId,
    onError: handleError,
  });
  const challengeContext = challengeContextData?.hub?.challenge?.context;
  const challengeContextPrivileges = challengeContext?.authorization?.myPrivileges;
  const canReadChallengeContext = challengeContextPrivileges?.includes(AuthorizationPrivilege.Read);
  const canCreateAspectOnChallenge = challengeContextPrivileges?.includes(AuthorizationPrivilege.CreateAspect);

  const {
    data: challengeAspectData,
    loading: challengeAspectLoading,
    error: challengeAspectError,
    subscribeToMore: subscribeToChallenges,
  } = useChallengeAspectsQuery({
    variables: { hubNameId, challengeNameId },
    skip: !canReadChallengeContext || !challengeNameId || !!opportunityNameId,
    onError: handleError,
  });
  const challengeAspects = challengeAspectData?.hub?.challenge?.context?.aspects;

  const {
    data: opportunityContextData,
    loading: opportunityContextLoading,
    error: opportunityContextError,
  } = usePrivilegesOnOpportunityContextQuery({
    variables: { hubNameId, opportunityNameId },
    skip: !opportunityNameId,
    onError: handleError,
  });
  const opportunityContext = opportunityContextData?.hub?.opportunity?.context;
  const opportunityContextPrivileges = opportunityContext?.authorization?.myPrivileges;
  const canReadOpportunityContext = opportunityContextPrivileges?.includes(AuthorizationPrivilege.Read);
  const canCreateAspectOnOpportunity = opportunityContextPrivileges?.includes(AuthorizationPrivilege.CreateAspect);

  const {
    data: opportunityAspectData,
    loading: opportunityAspectLoading,
    error: opportunityAspectError,
    subscribeToMore: subscribeToOpportunity,
  } = useOpportunityAspectsQuery({
    variables: { hubNameId, opportunityNameId },
    skip: !canReadOpportunityContext || !opportunityNameId,
    onError: handleError,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
  const opportunityAspects = opportunityAspectData?.hub?.opportunity?.context?.aspects;

  useContextAspectCreatedSubscription(hubAspectData, hubData => hubData?.hub?.context, subscribeToHub);
  useContextAspectCreatedSubscription(
    challengeAspectData,
    challengeData => challengeData?.hub?.challenge?.context,
    subscribeToChallenges
  );
  useContextAspectCreatedSubscription(
    opportunityAspectData,
    opportunityData => opportunityData?.hub?.opportunity?.context,
    subscribeToOpportunity
  );

  const aspects: AspectWithPermissions[] | undefined = useMemo(
    () =>
      (hubAspects ?? challengeAspects ?? opportunityAspects)?.map(x => ({
        ...x,
        canDelete: x?.authorization?.myPrivileges?.includes(AuthorizationPrivilege.Delete),
      })),
    [hubAspects, challengeAspects, opportunityAspects]
  );

  const loading =
    hubContextLoading ||
    challengeContextLoading ||
    opportunityContextLoading ||
    hubAspectLoading ||
    challengeAspectLoading ||
    opportunityAspectLoading ||
    hubLoading;

  const error =
    hubContextError ??
    challengeContextError ??
    opportunityContextError ??
    hubAspectError ??
    challengeAspectError ??
    opportunityAspectError;

  const canReadAspects = canReadHubContext ?? canReadChallengeContext ?? canReadOpportunityContext ?? true;
  const canCreateAspects = canCreateAspectOnHub ?? canCreateAspectOnChallenge ?? canCreateAspectOnOpportunity ?? false;

  const contextId = hubContext?.id ?? challengeContext?.id ?? opportunityContext?.id;

  return { aspects, loading, error, canReadAspects, canCreateAspects, contextId };
};
