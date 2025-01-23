import { useMemo, useState } from 'react';
import DialogHeader from '@/core/ui/dialog/DialogHeader';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { Caption } from '@/core/ui/typography';
import { useTranslation } from 'react-i18next';
import Gutters from '@/core/ui/grid/Gutters';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikAutocomplete from '@/core/ui/forms/FormikAutocomplete';
import { SelectableSpace } from './useVirtualContributorWizard';
import Loading from '@/core/ui/loading/Loading';

export interface SelectableKnowledgeSpace {
  id: string;
  name: string;
  url: string | undefined;
  roleSetId?: string;
  parentRoleSetIds?: string[];
}

interface ExistingSpaceProps {
  onClose: () => void;
  onBack: () => void;
  onSubmit: (subspace: SelectableKnowledgeSpace) => Promise<void>;
  loading: boolean;
  spaces: SelectableSpace[];
}

const ExistingSpace = ({ onClose, onBack, onSubmit, spaces, loading }: ExistingSpaceProps) => {
  const { t } = useTranslation();
  const [submitLoading, setSubmitLoading] = useState(false);

  const initialValues = {
    subspaceId: '',
  };

  const listItems = useMemo(() => {
    const result: SelectableKnowledgeSpace[] = [];
    const addSelectableSpace = (space: SelectableSpace, parentSpaces: SelectableSpace[] = []) => {
      result.push({
        id: space.id,
        name: `${space.profile.displayName}${parentSpaces.length > 0 ? '' : ` (${t('common.space')})`}`,
        url: parentSpaces.length > 0 ? parentSpaces[parentSpaces.length - 1].profile.url : space.profile.url, // If available, go to the parent space
        roleSetId: space.community.roleSet.id,
        parentRoleSetIds: parentSpaces.map(space => space?.community.roleSet.id),
      });
    };

    // Hierarchy loop
    spaces.forEach((space: SelectableSpace) => {
      addSelectableSpace(space);
      space.subspaces?.forEach(subspace => {
        addSelectableSpace(subspace, [space]);
        subspace.subspaces?.forEach(subsubspace => {
          addSelectableSpace(subsubspace, [space, subspace]);
        });
      });
    });

    return result;
  }, [spaces]);

  const validationSchema = yup.object().shape({
    subspaceId: yup.string().required(),
  });

  const onCreate = async (values: { subspaceId: string }) => {
    setSubmitLoading(true);

    const bok = listItems.filter(s => s.id === values.subspaceId)[0];
    if (bok) {
      await onSubmit(bok);
    }
    setSubmitLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnMount
      onSubmit={onCreate}
    >
      {({ values, isValid }) => (
        <>
          <DialogHeader onClose={onClose} title={t('createVirtualContributorWizard.existingSpace.title')} />
          <DialogContent>
            {loading && spaces.length === 0 && <Loading />}
            {!loading && spaces.length === 0 && (
              <Caption>{t('createVirtualContributorWizard.existingSpace.noSpaces')}</Caption>
            )}
            {spaces.length > 0 && (
              <Gutters disablePadding>
                <Caption>{t('createVirtualContributorWizard.existingSpace.description')}</Caption>
                <FormikAutocomplete
                  name="subspaceId"
                  title={t('createVirtualContributorWizard.existingSpace.label')}
                  values={listItems}
                  required
                  disablePortal={false}
                />
              </Gutters>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={onBack}>
              {t('buttons.back')}
            </Button>
            {spaces.length > 0 && (
              <LoadingButton
                variant="contained"
                disabled={!isValid || loading || submitLoading}
                loading={submitLoading}
                onClick={() => onCreate(values)}
              >
                {t('buttons.create')}
              </LoadingButton>
            )}
          </DialogActions>
        </>
      )}
    </Formik>
  );
};

export default ExistingSpace;
