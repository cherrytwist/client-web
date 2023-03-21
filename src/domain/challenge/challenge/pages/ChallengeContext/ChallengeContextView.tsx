import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useNotification } from '../../../../../core/ui/notifications/useNotification';
import { useUrlParams } from '../../../../../core/routing/useUrlParams';
import {
  refetchChallengeProfileInfoQuery,
  useChallengeProfileInfoQuery,
  useUpdateChallengeMutation,
} from '../../../../../core/apollo/generated/apollo-hooks';
import { updateContextInput } from '../../../../../common/utils/buildContext';
import SaveButton from '../../../../../core/ui/actions/SaveButton';
import { ContextForm, ContextFormValues } from '../../../../context/ContextForm';
import { ChallengeContextSegment } from '../../../../platform/admin/challenge/ChallengeContextSegment';

const ChallengeContextView: FC = () => {
  const notify = useNotification();
  const onSuccess = (message: string) => notify(message, 'success');

  const { challengeNameId = '', hubNameId = '' } = useUrlParams();

  const [updateChallenge, { loading: isUpdating }] = useUpdateChallengeMutation({
    onCompleted: () => onSuccess('Successfully updated'),
    refetchQueries: [refetchChallengeProfileInfoQuery({ hubId: hubNameId, challengeId: challengeNameId })],
    awaitRefetchQueries: true,
  });

  const { data: challengeProfile, loading } = useChallengeProfileInfoQuery({
    variables: { hubId: hubNameId, challengeId: challengeNameId },
    skip: false,
  });
  const challenge = challengeProfile?.hub?.challenge;
  const challengeId = challenge?.id || '';

  const onSubmit = async (values: ContextFormValues) => {
    updateChallenge({
      variables: {
        input: {
          ID: challengeId,
          context: updateContextInput(values),
          profileData: {
            description: values.background,
          },
        },
      },
    });
  };

  let submitWired;
  return (
    <Grid container spacing={2}>
      <ContextForm
        contextSegment={ChallengeContextSegment}
        context={challenge?.context}
        profile={challenge?.profile}
        loading={loading || isUpdating}
        onSubmit={onSubmit}
        wireSubmit={submit => (submitWired = submit)}
      />
      <Grid container item justifyContent={'flex-end'}>
        <SaveButton loading={isUpdating} onClick={() => submitWired()} />
      </Grid>
    </Grid>
  );
};

export default ChallengeContextView;
