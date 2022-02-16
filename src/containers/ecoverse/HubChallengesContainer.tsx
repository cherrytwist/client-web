import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import { useChallengeCardsQuery } from '../../hooks/generated/graphql';
import { ContainerProps } from '../../models/container';
import { Challenge } from '../../models/graphql-schema';

export interface EcoverseChallengesContainerEntities {
  challenges: Challenge[];
}

export interface EcoverseChallengesContainerActions {}

export interface EcoverseChallengesContainerState {
  loading: boolean;
  error?: ApolloError;
}

export interface EcoverseChallengesContainerProps
  extends ContainerProps<
    EcoverseChallengesContainerEntities,
    EcoverseChallengesContainerActions,
    EcoverseChallengesContainerState
  > {
  entities: {
    hubNameId: string;
  };
}

export const EcoverseChallengesContainer: FC<EcoverseChallengesContainerProps> = ({ entities, children }) => {
  const {
    data: _challenges,
    error: challengesError,
    loading: loadingChallenges,
  } = useChallengeCardsQuery({
    variables: { hubId: entities.hubNameId },
    skip: !entities.hubNameId,
  });

  return (
    <>
      {children(
        {
          challenges: (_challenges?.hub?.challenges || []) as Challenge[],
        },
        {
          loading: loadingChallenges,
          error: challengesError,
        },
        {}
      )}
    </>
  );
};
export default EcoverseChallengesContainer;
