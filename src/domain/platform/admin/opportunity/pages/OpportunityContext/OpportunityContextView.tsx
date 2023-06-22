import { Grid } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { updateContextInput } from '../../../../../../common/utils/buildContext';
import { ContextForm, ContextFormValues } from '../../../../../context/ContextForm';
import { useNotification } from '../../../../../../core/ui/notifications/useNotification';
import { useUrlParams } from '../../../../../../core/routing/useUrlParams';
import {
  useUpdateOpportunityMutation,
  refetchOpportunityProfileInfoQuery,
  useOpportunityProfileInfoQuery,
} from '../../../../../../core/apollo/generated/apollo-hooks';
import { OpportunityContextSegment } from '../../OpportunityContextSegment';
import SaveButton from '../../../../../../core/ui/actions/SaveButton';

const OpportunityContextView: FC = () => {
  const notify = useNotification();
  const onSuccess = (message: string) => notify(message, 'success');

  const { spaceNameId = '', opportunityNameId = '' } = useUrlParams();

  const [updateOpportunity, { loading: isUpdating }] = useUpdateOpportunityMutation({
    onCompleted: () => onSuccess('Successfully updated'),
    refetchQueries: [refetchOpportunityProfileInfoQuery({ spaceId: spaceNameId, opportunityId: opportunityNameId })],
    awaitRefetchQueries: true,
  });

  const { data: opportunityProfile, loading } = useOpportunityProfileInfoQuery({
    variables: { spaceId: spaceNameId, opportunityId: opportunityNameId },
    skip: false,
  });

  const opportunity = opportunityProfile?.space?.opportunity;
  const opportunityId = useMemo(() => opportunity?.id, [opportunity]);

  const onSubmit = async (values: ContextFormValues) => {
    if (!opportunityId) {
      throw new TypeError('Missing Opportunity ID');
    }
    await updateOpportunity({
      variables: {
        input: {
          context: updateContextInput(values),
          profileData: {
            description: values.background,
          },
          ID: opportunityId,
        },
      },
    });
  };

  let submitWired;
  return (
    <Grid container spacing={2}>
      <ContextForm
        contextSegment={OpportunityContextSegment}
        context={opportunity?.context}
        profile={opportunity?.profile}
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

export default OpportunityContextView;
