import { Grid } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../context/NavigationProvider';
import { useApolloErrorHandler, useNotification, useUpdateNavigation, useUrlParams } from '../../../hooks';
import {
  refetchChallengeProfileInfoQuery,
  refetchChallengesWithCommunityQuery,
  useChallengeProfileInfoQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
} from '../../../hooks/generated/graphql';
import { useNavigateToEdit } from '../../../hooks/useNavigateToEdit';
import { createContextInput, updateContextInput } from '../../../utils/buildContext';
import Button from '../../../components/core/Button';
import Typography from '../../../components/core/Typography';
import ProfileForm, { ProfileFormValuesType } from '../../../components/composite/forms/ProfileForm';
import FormMode from '../../../components/Admin/FormMode';

interface Props {
  mode: FormMode;
  paths: Path[];
  title: string;
}

const EditChallengePage: FC<Props> = ({ paths, mode, title }) => {
  const { t } = useTranslation();
  const navigateToEdit = useNavigateToEdit();
  const notify = useNotification();
  const handleError = useApolloErrorHandler();
  const onSuccess = (message: string) => notify(message, 'success');

  const { challengeNameId = '', ecoverseNameId = '' } = useUrlParams();

  const [createChallenge, { loading: isCreating }] = useCreateChallengeMutation({
    onCompleted: data => {
      onSuccess('Successfully created');
      navigateToEdit(data.createChallenge.nameID);
    },
    onError: handleError,
    refetchQueries: [refetchChallengesWithCommunityQuery({ ecoverseId: ecoverseNameId })],
    awaitRefetchQueries: true,
  });

  const [updateChallenge, { loading: isUpdating }] = useUpdateChallengeMutation({
    onCompleted: () => onSuccess('Successfully updated'),
    onError: handleError,
    refetchQueries: [refetchChallengeProfileInfoQuery({ ecoverseId: ecoverseNameId, challengeId: challengeNameId })],
    awaitRefetchQueries: true,
  });

  const { data: challengeProfile } = useChallengeProfileInfoQuery({
    variables: { ecoverseId: ecoverseNameId, challengeId: challengeNameId },
    skip: mode === FormMode.create,
  });
  const challenge = challengeProfile?.ecoverse?.challenge;
  const challengeId = useMemo(() => challenge?.id || '', [challenge]);

  const isLoading = isCreating || isUpdating;

  const currentPaths = useMemo(
    () => [...paths, { name: challengeId ? 'edit' : 'new', real: false }],
    [paths, challenge]
  );
  useUpdateNavigation({ currentPaths });

  const onSubmit = async (values: ProfileFormValuesType) => {
    const { name, nameID, tagsets } = values;

    switch (mode) {
      case FormMode.create:
        createChallenge({
          variables: {
            input: {
              nameID: nameID,
              displayName: name,
              ecoverseID: ecoverseNameId,
              context: createContextInput(values),
              tags: tagsets.flatMap(x => x.tags),
            },
          },
        });
        break;
      case FormMode.update:
        updateChallenge({
          variables: {
            input: {
              ID: challengeId,
              nameID: nameID,
              displayName: name,
              context: updateContextInput(values),
              tags: tagsets.flatMap(x => x.tags),
            },
          },
        });
        break;
      default:
        throw new Error(`Submit mode expected: (${mode}) found`);
    }
  };

  let submitWired;
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant={'h2'}>{title}</Typography>
      </Grid>
      <ProfileForm
        isEdit={mode === FormMode.update}
        name={challenge?.displayName}
        nameID={challenge?.nameID}
        tagset={challenge?.tagset}
        context={challenge?.context}
        onSubmit={onSubmit}
        wireSubmit={submit => (submitWired = submit)}
      />
      <Grid container item justifyContent={'flex-end'}>
        <Button
          disabled={isLoading}
          variant="primary"
          onClick={() => submitWired()}
          text={t(`buttons.${isLoading ? 'processing' : 'save'}` as const)}
        />
      </Grid>
    </Grid>
  );
};
export default EditChallengePage;
