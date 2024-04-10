import { useMemo } from 'react';
import { Form, Formik } from 'formik';
import Gutters from '../../../../core/ui/grid/Gutters';
import { useTranslation } from 'react-i18next';
import FormikInputField from '../../../../core/ui/forms/FormikInputField/FormikInputField';
import useLoadingState from '../../../shared/utils/useLoadingState';
import {
  useCreateVirtualContributorMutation,
  useVirtualPersonasQuery,
} from '../../../../core/apollo/generated/apollo-hooks';
import { Actions } from '../../../../core/ui/actions/Actions';
import { Button, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { useNotification } from '../../../../core/ui/notifications/useNotification';
import AdminLayout from '../layout/toplevel/AdminLayout';
import { AdminSection } from '../layout/toplevel/constants';
import FormikSelect from '../../../../core/ui/forms/FormikSelect';
import { useBackToStaticPath } from '../../../../core/routing/useBackToPath';

interface NewVirtualContributorFormValues {
  displayName: string;
  virtualPersonaID: string;
}

interface NewVirtualContributorFormProps {
  parentPagePath: string;
}

const NewVirtualContributorForm = ({ parentPagePath }: NewVirtualContributorFormProps) => {
  const { t } = useTranslation();
  const navigateBack = useBackToStaticPath(parentPagePath);
  const notify = useNotification();
  const initialValues = { displayName: '', virtualPersonaID: '' };
  const { data: virtualPersonas } = useVirtualPersonasQuery();
  const [createVirtualContributor, { loading }] = useCreateVirtualContributorMutation({
    onCompleted: () => {
      notify('Virtual Contributor Created Successfully!', 'success');
      navigateBack();
    },
  });

  const onCancel = () => {
    navigateBack();
  };

  const [handleSubmit] = useLoadingState(async (values: NewVirtualContributorFormValues) => {
    const { displayName, virtualPersonaID } = values;

    await createVirtualContributor({
      variables: {
        virtualContributorData: {
          virtualPersonaID,
          nameID: `${'V'}-${'P'}-${uuidv4()}`.slice(0, 25).toLocaleLowerCase(),
          profileData: {
            displayName,
          },
        },
      },
    });
  });

  const personas = useMemo(
    () =>
      virtualPersonas?.virtualPersonas.map(persona => ({
        id: persona.id,
        name: persona.prompt,
        label: persona.prompt,
      })),
    [virtualPersonas]
  );

  return (
    <AdminLayout currentTab={AdminSection.VirtualContributors}>
      <Container maxWidth="xl">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Gutters>
              <FormikInputField title={t('common.title')} name="displayName" />
              <FormikSelect title="Select Virtual Persona" name="virtualPersonaID" values={personas ?? []} />
              <Actions>
                <Button variant="text" onClick={onCancel}>
                  {t('buttons.cancel')}
                </Button>
                <LoadingButton loading={loading} type="submit" variant="contained">
                  {t('buttons.save')}
                </LoadingButton>
              </Actions>
            </Gutters>
          </Form>
        </Formik>
      </Container>
    </AdminLayout>
  );
};

export default NewVirtualContributorForm;
