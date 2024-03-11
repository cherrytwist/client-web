import { DialogContent } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import DialogHeader from '../../../../core/ui/dialog/DialogHeader';
import DialogWithGrid from '../../../../core/ui/dialog/DialogWithGrid';
import { InnovationFlowIcon } from '../InnovationFlowIcon/InnovationFlowIcon';
import InnovationFlowProfileBlock from './InnovationFlowProfileBlock';
import useInnovationFlowSettings from './useInnovationFlowSettings';
import InnovationFlowStateSelector from '../InnovationFlowStateSelector/InnovationFlowStateSelector';
import InnovationFlowCollaborationToolsBlock from './InnovationFlowCollaborationToolsBlock';
import Gutters from '../../../../core/ui/grid/Gutters';

interface InnovationFlowSettingsDialogProps {
  open?: boolean;
  onClose: () => void;
  collaborationId: string | undefined;
}

const InnovationFlowSettingsDialog: FC<InnovationFlowSettingsDialogProps> = ({ open = false, onClose, collaborationId }) => {
  const { t } = useTranslation();

  const { data, actions, state } = useInnovationFlowSettings({
    collaborationId,
  });

  const { innovationFlow, callouts, flowStateAllowedValues } = data;

  return (
    <DialogWithGrid open={open} columns={12} onClose={onClose}>
      <DialogHeader icon={<InnovationFlowIcon />} title={t('common.innovation-flow')} onClose={onClose} />
      <DialogContent sx={{ paddingTop: 0 }}>
        <Gutters disablePadding>
          <InnovationFlowProfileBlock
            innovationFlow={innovationFlow}
            loading={state.loading}
            onUpdate={actions.updateInnovationFlowProfile}
            editable
          >
            <InnovationFlowStateSelector
              currentState={innovationFlow?.currentState.displayName}
              states={innovationFlow?.states}
              onStateChange={actions.updateInnovationFlowState}
            />
          </InnovationFlowProfileBlock>
          <InnovationFlowCollaborationToolsBlock
            flowStateAllowedValues={flowStateAllowedValues}
            callouts={callouts}
            onUpdateCalloutFlowState={actions.updateCalloutFlowState}
          />
        </Gutters>
      </DialogContent>
    </DialogWithGrid>
  );
};

export default InnovationFlowSettingsDialog;
