import { useTranslation } from 'react-i18next';
import InnovationFlowTemplateForm, {
  InnovationTemplateFormSubmittedValues,
  InnovationTemplateFormValues,
} from '../../_new/components/Forms/InnovationFlowTemplateForm';
import React from 'react';
import { InnovationFlowTemplateFragment } from '../../../../core/apollo/generated/graphql-schema';
import { DialogHeaderProps } from '../../../../core/ui/dialog/DialogHeader';
import CreateEditTemplateDialogBase from '../../_new/components/Dialogs/CreateEditTemplateDialog/CreateEditTemplateDialogBase';

interface EditInnovationTemplateDialogProps {
  open: boolean;
  onClose: DialogHeaderProps['onClose'];
  onSubmit: (values: InnovationTemplateFormSubmittedValues & { tagsetId: string | undefined; tags?: string[] }) => void;
  onDelete: () => void;
  template: InnovationFlowTemplateFragment | undefined;
}

const EditInnovationTemplateDialog = ({
  template,
  open,
  onClose,
  onSubmit,
  onDelete,
}: EditInnovationTemplateDialogProps) => {
  const { t } = useTranslation();

  if (!template) {
    return null;
  }

  const values: Partial<InnovationTemplateFormValues> = {
    states: template.innovationFlowStates,
    displayName: template.profile.displayName,
    description: template.profile.description,
    tags: template.profile.tagset?.tags,
  };

  const handleSubmit = (values: InnovationTemplateFormSubmittedValues) => {
    return onSubmit({
      ...values,
      tagsetId: template.profile.tagset?.id,
    });
  };

  return (
    <CreateEditTemplateDialogBase
      open={open}
      onClose={onClose}
      templateTypeName={t('templateLibrary.innovationFlowTemplates.name')}
      onDelete={onDelete}
      editMode
    >
      {({ actions }) => <InnovationFlowTemplateForm initialValues={values} onSubmit={handleSubmit} actions={actions} />}
    </CreateEditTemplateDialogBase>
  );
};

export default EditInnovationTemplateDialog;
