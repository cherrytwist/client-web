import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog/Dialog';
import { CalloutType } from '../../../models/graphql-schema';
import Steps from '../../shared/components/Steps/Steps';
import Step from '../../shared/components/Steps/step/Step';
import { StepLayoutHolder } from './step-layout/StepLayout';
import CalloutInfoStep from './steps/CalloutInfoStep/CalloutInfoStep';
// import CalloutTemplateStep from './steps/CalloutTemplateStep/CalloutTemplateStep';
import CalloutSummaryStep from './steps/CalloutSummaryStep/CalloutSummaryStep';
import { CalloutCreationType } from './useCalloutCreation/useCalloutCreation';

export type CalloutDialogCreationType = {
  description?: string;
  displayName?: string;
  templateId?: string;
  type?: CalloutType;
};

export interface CalloutCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSaveAsDraft: (callout: CalloutCreationType) => Promise<void>;
  isCreating: boolean;
}

const CalloutCreationDialog: FC<CalloutCreationDialogProps> = ({ open, onClose, onSaveAsDraft, isCreating }) => {
  const { t } = useTranslation();

  const [callout, setCallout] = useState<CalloutDialogCreationType>({});
  const [isInfoStepValid, setIsInfoStepValid] = useState(false);
  // const [isTemplateStepValid, setIsTemplateStepValid] = useState(false);

  const handleInfoStepValueChange = useCallback(
    infoStepCallout => {
      setCallout({ ...callout, ...infoStepCallout });
    },
    [callout]
  );
  const handleInfoStepStatusChange = useCallback((isValid: boolean) => setIsInfoStepValid(isValid), []);
  /* use when template usage is defined
  const handleTemplateStepValueChange = useCallback(
    (templateId: string) => {
      setCallout({ ...callout, templateId });
      setIsTemplateStepValid(true);
    },
    [callout]
  );*/
  const handleSummarySaveAsDraft = useCallback(async () => {
    const newCallout = {
      displayName: callout.displayName!,
      description: callout.description!,
      templateId: callout.templateId!,
      type: callout.type!,
    };

    const result = await onSaveAsDraft(newCallout);

    setCallout({});

    return result;
  }, [callout, onSaveAsDraft]);
  const handleClose = useCallback(() => {
    onClose?.();
    setCallout({});
  }, [onClose]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth aria-labelledby="callout-creation-title">
      <StepLayoutHolder>
        <Steps>
          <Step
            component={CalloutInfoStep}
            title={t('components.callout-creation.info-step.title')}
            callout={callout}
            onClose={handleClose}
            isValid={isInfoStepValid}
            onChange={handleInfoStepValueChange}
            onStatusChanged={handleInfoStepStatusChange}
          />
          {/*
          this needs to be added after templates are introduced to the callouts on the server
          <Step
            component={CalloutTemplateStep}
            title={t('components.callout-creation.template-step.title')}
            callout={callout}
            onClose={handleClose}
            isValid={isTemplateStepValid}
            onChange={handleTemplateStepValueChange}
          />*/}
          <Step
            component={CalloutSummaryStep}
            title={t('components.callout-creation.create-step.title')}
            callout={callout}
            onClose={handleClose}
            onSaveAsDraft={handleSummarySaveAsDraft}
            isCreating={isCreating}
          />
        </Steps>
      </StepLayoutHolder>
    </Dialog>
  );
};

export default CalloutCreationDialog;
