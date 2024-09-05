import React from 'react';
import { TemplateImportCardComponentProps } from '../../_new/components/Dialogs/ImportTemplateDialog/ImportTemplatesDialogGallery';
import CalloutTemplateCard, { CalloutTemplate } from '../../_new/components/cards/CalloutTemplateCard';

interface CalloutImportTemplateCardProps extends TemplateImportCardComponentProps<CalloutTemplate> {}

const CalloutImportTemplateCard = ({ template, ...props }: CalloutImportTemplateCardProps) => {
  return <CalloutTemplateCard template={template} innovationPack={template.innovationPack} {...props} />;
};

export default CalloutImportTemplateCard;
