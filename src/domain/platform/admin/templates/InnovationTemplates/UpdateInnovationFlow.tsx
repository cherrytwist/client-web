import React, { FC, useCallback, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AuthorizationPrivilege, InnovationFlow } from '../../../../../core/apollo/generated/graphql-schema';
import SelectInnovationFlowDialog, {
  InnovationFlowTemplate,
  SelectInnovationFlowFormValuesType,
} from './SelectInnovationFlowDialog';
import InnovationFlowUpdateConfirmDialog from './InnovationFlowUpdateConfirmDialog';
import { useInnovationFlowAuthorizationQuery } from '../../../../../core/apollo/generated/apollo-hooks';

interface UpdateInnovationFlowProps {
  innovationFlow: InnovationFlow | undefined; // TODO: fix type to be a model, not from graphql
  entityId: string;
  innovationFlowTemplates: InnovationFlowTemplate[] | undefined;
  onSubmit: (formData: SelectInnovationFlowFormValuesType) => void;
}

const UpdateInnovationFlow: FC<UpdateInnovationFlowProps> = ({
  innovationFlow,
  entityId,
  innovationFlowTemplates,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [isSelectInnovationFlowDialogOpen, setSelectInnovationFlowDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const openSelectInnovationFlowDialog = useCallback(() => setSelectInnovationFlowDialogOpen(true), []);
  const closeSelectInnovationFlowDialog = useCallback(() => setSelectInnovationFlowDialogOpen(false), []);
  const openConfirmationDialog = useCallback(() => setConfirmationDialogOpen(true), []);
  const closeConfirmationDialog = useCallback(() => setConfirmationDialogOpen(false), []);

  // TODO: not sure what this logic was doing before.
  const innovationFlowTemplate = innovationFlowTemplates?.find(
    template => innovationFlow && template.profile.displayName
  );
  const { data } = useInnovationFlowAuthorizationQuery({
    variables: { innovationFlowId: entityId! },
    skip: !entityId,
  });
  const myPrivileges = data?.lookup.innovationFlow?.authorization?.myPrivileges;

  const privileges = {
    canUpdate: (myPrivileges ?? []).includes(AuthorizationPrivilege.UpdateInnovationFlow),
  };

  let wiredSubmit;

  const handleConfirmDialogSubmit = () => {
    wiredSubmit?.();
    closeConfirmationDialog();
    closeSelectInnovationFlowDialog();
  };

  const handleSelectInnovationFlowFormSubmit = useCallback(
    (values: SelectInnovationFlowFormValuesType) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  const handleSelectInnovationFlowDialogSubmit = useCallback(() => {
    openConfirmationDialog();
  }, [openConfirmationDialog]);

  return (
    <>
      {innovationFlowTemplate?.profile.displayName && (
        <Typography variant="h5" color="black" fontWeight={600}>
          {`${t('components.update-innovation-flow.template-label.title')}: ${
            innovationFlowTemplate?.profile.displayName
          }`}
        </Typography>
      )}
      {privileges.canUpdate && (
        <>
          <Grid container>
            <Grid item xs>
              <Button
                variant="outlined"
                onClick={openSelectInnovationFlowDialog}
                sx={{ alignSelf: 'start', marginX: 1 }}
              >
                {t('buttons.change-template')}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <SelectInnovationFlowDialog
        isOpen={isSelectInnovationFlowDialogOpen}
        onClose={closeSelectInnovationFlowDialog}
        onSubmitForm={handleSelectInnovationFlowFormSubmit}
        wireSubmit={submit => (wiredSubmit = submit)}
        onSubmitDialog={handleSelectInnovationFlowDialogSubmit}
        innovationFlowTemplateID={innovationFlowTemplate?.id}
        innovationFlowTemplates={innovationFlowTemplates}
      />
      <InnovationFlowUpdateConfirmDialog
        isOpen={isConfirmationDialogOpen}
        onClose={closeConfirmationDialog}
        onSubmit={handleConfirmDialogSubmit}
      />
    </>
  );
};

export default UpdateInnovationFlow;
