import { FC } from 'react';
import { ApolloError } from '@apollo/client';
import { ContainerProps } from '../../models/container';
import { SimpleEcoverseResultEntryFragment } from '../../models/graphql-schema';
import { useChallengesOverviewPageQuery } from '../../hooks/generated/graphql';
import { useApolloErrorHandler, useUserContext } from '../../hooks';

export type SimpleChallenge = {
  id: string;
  hubId: string;
  hubNameId: string;
};

export interface ChallengesOverviewContainerEntities {
  userChallenges?: SimpleChallenge[];
  userHubs?: SimpleEcoverseResultEntryFragment[];
}

export interface ChallengesOverviewContainerActions {}

export interface ChallengesOverviewContainerState {
  loading: boolean;
  error?: ApolloError;
}

export interface ChallengePageContainerProps
  extends ContainerProps<
    ChallengesOverviewContainerEntities,
    ChallengesOverviewContainerActions,
    ChallengesOverviewContainerState
  > {}

export const ChallengeExplorerContainer: FC<ChallengePageContainerProps> = ({ children }) => {
  const handleError = useApolloErrorHandler();
  const { user: userMetadata } = useUserContext();
  const user = userMetadata?.user;

  const { data, loading, error } = useChallengesOverviewPageQuery({
    onError: handleError,
    variables: {
      membershipData: {
        userID: user?.id || '',
      },
    },
    skip: !user,
  });
  const hubs = data?.membershipUser.hubs;
  const userChallenges: SimpleChallenge[] | undefined =
    hubs &&
    hubs.flatMap(x =>
      x?.challenges.map(y => ({
        id: y.id,
        hubNameId: x.nameID,
        hubId: x.hubID,
      }))
    );

  const userHubs: SimpleEcoverseResultEntryFragment[] | undefined =
    hubs &&
    hubs.map(({ hubID, displayName, nameID }) => ({
      hubID,
      displayName,
      nameID,
    }));

  return <>{children({ userChallenges, userHubs }, { loading, error }, {})}</>;
};
