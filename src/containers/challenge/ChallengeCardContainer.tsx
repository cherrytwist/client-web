import { FC } from 'react';
import { ApolloError } from '@apollo/client';
import { ContainerProps } from '../../models/container';
import { useChallengeCardQuery } from '../../hooks/generated/graphql';
import { ChallengeCardProps } from '../../components/composite/common/cards/ChallengeCard/ChallengeCard';

export interface ChallengeCardContainerEntities {
  challenge?: ChallengeCardProps['challenge'];
}

export interface ChallengeCardContainerActions {}

export interface ChallengeCardContainerState {
  loading: boolean;
  error?: ApolloError;
}

export interface ChallengeCardContainerProps
  extends ContainerProps<ChallengeCardContainerEntities, ChallengeCardContainerActions, ChallengeCardContainerState> {
  hubNameId: string;
  challengeNameId: string;
}

export const ChallengeCardContainer: FC<ChallengeCardContainerProps> = ({ children, hubNameId, challengeNameId }) => {
  const { data, loading, error } = useChallengeCardQuery({
    variables: {
      hubId: hubNameId,
      challengeId: challengeNameId,
    },
    skip: !hubNameId || !challengeNameId,
  });
  const challenge = data?.hub.challenge as ChallengeCardProps['challenge'];

  return <>{children({ challenge }, { loading, error }, {})}</>;
};
