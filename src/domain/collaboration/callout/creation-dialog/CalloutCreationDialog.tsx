import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog/Dialog';
import { CalloutState, CalloutType } from '../../../../models/graphql-schema';
import { CalloutCreationType } from './useCalloutCreation/useCalloutCreation';
import { Box, Button } from '@mui/material';
import { DialogActions, DialogContent, DialogTitle } from '../../../../common/components/core/dialog';
import { LoadingButton } from '@mui/lab';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CalloutForm, { CalloutFormOutput } from '../CalloutForm';
import { useHub } from '../../../../hooks';
import { createCardTemplateFromTemplateSet } from '../utils/getCardTemplateFromTemplateSet';

export type CalloutCreationDialogFields = {
  description?: string;
  displayName?: string;
  templateId?: string;
  type?: CalloutType;
  state?: CalloutState;
  cardTemplateType?: string;
};

export interface CalloutCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSaveAsDraft: (callout: CalloutCreationType) => Promise<void>;
  isCreating: boolean;
}

export interface CalloutCardTemplateInfo {
  description: string;
  title: string;
  tags?: string[];
}
export interface CalloutCardTemplate {
  defaultDescription: string;
  type: string;
  info: CalloutCardTemplateInfo;
}

const CalloutCreationDialog: FC<CalloutCreationDialogProps> = ({ open, onClose, onSaveAsDraft, isCreating }) => {
  const { t } = useTranslation();
  const { templates } = useHub();

  const [callout, setCallout] = useState<CalloutCreationDialogFields>({});
  const [isValid, setIsValid] = useState(false);

  const handleValueChange = useCallback(
    (calloutValues: CalloutFormOutput) => {
      setCallout({ ...callout, ...calloutValues });
    },
    [callout]
  );
  const handleStatusChange = useCallback((isValid: boolean) => setIsValid(isValid), []);

  const handleSaveAsDraft = useCallback(async () => {
    const calloutCardTemplate = createCardTemplateFromTemplateSet(callout, templates.aspectTemplates);
    const newCallout: CalloutCreationType = {
      displayName: callout.displayName!,
      description: callout.description!,
      templateId: callout.templateId!,
      type: callout.type!,
      state: callout.state!,
      cardTemplate: calloutCardTemplate,
    };

    const result = await onSaveAsDraft(newCallout);

    setCallout({});

    return result;
  }, [callout, onSaveAsDraft, templates.aspectTemplates]);

  const handleClose = useCallback(() => {
    onClose?.();
    setCallout({});
  }, [onClose]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth aria-labelledby="callout-creation-title">
      <DialogTitle id="callout-creation-title" onClose={handleClose}>
        <Box display="flex">
          <CampaignOutlinedIcon sx={{ marginRight: 1 }} />
          {t('components.callout-creation.title')}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box paddingY={theme => theme.spacing(2)}>
          <CalloutForm callout={callout} onChange={handleValueChange} onStatusChanged={handleStatusChange} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'end' }}>
        {onClose && <Button onClick={onClose}>{t('buttons.cancel')}</Button>}

        <LoadingButton
          loading={isCreating}
          loadingIndicator={`${t('buttons.save-draft')}...`}
          onClick={handleSaveAsDraft}
          variant="contained"
          disabled={!isValid}
        >
          {t('buttons.save-draft')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CalloutCreationDialog;
