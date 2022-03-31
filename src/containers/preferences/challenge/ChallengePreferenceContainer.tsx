import React, { FC, useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import { ContainerProps } from '../../../models/container';
import { useApolloErrorHandler } from '../../../hooks';
import { useChallengePreferencesQuery, useUpdatePreferenceOnChallengeMutation } from '../../../hooks/generated/graphql';
import { ChallengePreferenceType, Preference } from '../../../models/graphql-schema';

export interface ChallengePreferenceContainerEntities {
  preferences: Preference[];
}

export interface ChallengePreferenceContainerActions {
  onUpdate: (id: string, type: ChallengePreferenceType, value: boolean) => void;
}

export interface ChallengePreferenceContainerState {
  loading: boolean;
  error?: ApolloError;
}

export interface ChallengePreferenceContainerProps
  extends ContainerProps<
    ChallengePreferenceContainerEntities,
    ChallengePreferenceContainerActions,
    ChallengePreferenceContainerState
  > {
  hubId: string;
  challengeId: string;
}

const ChallengePreferenceContainer: FC<ChallengePreferenceContainerProps> = ({ children, hubId, challengeId }) => {
  const handleError = useApolloErrorHandler();
  const { data, loading, error } = useChallengePreferencesQuery({
    variables: { hubId, challengeId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const [updatePreference] = useUpdatePreferenceOnChallengeMutation({
    onError: handleError,
  });

  const preferences = data?.hub?.challenge?.preferences ?? [];

  const onUpdate = useCallback(
    (id: string, type: ChallengePreferenceType, checked: boolean) => {
      updatePreference({
        variables: {
          preferenceData: {
            challengeID: challengeId,
            type,
            value: checked ? 'true' : 'false',
          },
        },
        optimisticResponse: {
          updatePreferenceOnChallenge: {
            __typename: 'Preference',
            id,
            value: checked ? 'true' : 'false',
          },
        },
      });
    },
    [challengeId]
  );

  return <>{children({ preferences }, { loading, error }, { onUpdate })}</>;
};
export default ChallengePreferenceContainer;
