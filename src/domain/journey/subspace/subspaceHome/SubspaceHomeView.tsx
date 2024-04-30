import { useTranslation } from 'react-i18next';
import { Button, Theme, useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { JourneyTypeName } from '../../JourneyTypeName';
import { CalloutGroupName } from '../../../../core/apollo/generated/graphql-schema';
import InnovationFlowStates from '../../../collaboration/InnovationFlow/InnovationFlowStates/InnovationFlowStates';
import CalloutsGroupView from '../../../collaboration/callout/CalloutsInContext/CalloutsGroupView';
import { OrderUpdate, TypedCallout } from '../../../collaboration/callout/useCallouts/useCallouts';
import { InnovationFlowState } from '../../../collaboration/InnovationFlow/InnovationFlow';
import React, { useEffect, useMemo, useRef } from 'react';
import { SubspaceInnovationFlow, useConsumeAction } from '../layout/SubspacePageLayout';
import { useCalloutCreationWithPreviewImages } from '../../../collaboration/callout/creationDialog/useCalloutCreation/useCalloutCreationWithPreviewImages';
import CalloutCreationDialog from '../../../collaboration/callout/creationDialog/CalloutCreationDialog';
import { SubspaceDialog } from '../layout/SubspaceDialog';
import InnovationFlowVisualizerMobile from '../../../collaboration/InnovationFlow/InnovationFlowVisualizers/InnovationFlowVisualizerMobile';
import InnovationFlowChips from '../../../collaboration/InnovationFlow/InnovationFlowVisualizers/InnovationFlowChips';
import useStateWithAsyncDefault from '../../../../core/utils/useStateWithAsyncDefault';
import InnovationFlowSettingsButton from '../../../collaboration/InnovationFlow/InnovationFlowDialogs/InnovationFlowSettingsButton';
import { CalloutGroupNameValuesMap } from '../../../collaboration/callout/CalloutsInContext/CalloutsGroup';

interface SubspaceHomeViewProps {
  journeyId: string | undefined;
  collaborationId: string | undefined;
  innovationFlowStates: InnovationFlowState[] | undefined;
  currentInnovationFlowState: string | undefined;
  callouts: TypedCallout[] | undefined;
  canCreateCallout: boolean;
  canCreateCalloutFromTemplate: boolean;
  calloutNames: string[];
  loading: boolean;
  refetchCallout: (calloutId: string) => void;
  onCalloutsSortOrderUpdate: (movedCalloutId: string) => (update: OrderUpdate) => Promise<unknown>;
  journeyTypeName: JourneyTypeName;
}

const SubspaceHomeView = ({
  journeyId,
  collaborationId,
  innovationFlowStates,
  currentInnovationFlowState,
  callouts,
  canCreateCallout,
  canCreateCalloutFromTemplate,
  calloutNames,
  loading,
  onCalloutsSortOrderUpdate,
  refetchCallout,
  journeyTypeName,
}: SubspaceHomeViewProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { isCalloutCreationDialogOpen, handleCreateCalloutOpened, handleCreateCalloutClosed, handleCreateCallout } =
    useCalloutCreationWithPreviewImages({ journeyId });

  const createButton = (
    <Button
      variant="outlined"
      startIcon={<AddCircleOutlineIcon />}
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        textWrap: 'nowrap',
      }}
      onClick={handleCreateCalloutOpened}
    >
      {t('common.collaborationTool')}
    </Button>
  );

  const journeyIdRef = useRef(journeyId);

  const [selectedInnovationFlowState, setSelectedInnovationFlowState] =
    useStateWithAsyncDefault(currentInnovationFlowState);

  useEffect(() => {
    if (journeyId && journeyId !== journeyIdRef.current) {
      setSelectedInnovationFlowState(currentInnovationFlowState);
    }
    journeyIdRef.current = journeyId;
  }, [journeyId]);

  const selectedFlowStateCallouts = useMemo(() => {
    const filterCallouts = (callouts: TypedCallout[] | undefined) => {
      return callouts?.filter(callout => {
        if (!selectedInnovationFlowState) {
          return true;
        }
        return callout.flowStates?.includes(selectedInnovationFlowState);
      });
    };

    return filterCallouts(callouts);
  }, [callouts, selectedInnovationFlowState]);

  // If it's mobile the ManageFlow action will be consumed somewhere else,
  // if there is no definition for it, button should not be shown
  const manageFlowActionDef = useConsumeAction(!isMobile ? SubspaceDialog.ManageFlow : undefined);

  return (
    <>
      <SubspaceInnovationFlow>
        {innovationFlowStates && currentInnovationFlowState && selectedInnovationFlowState && collaborationId && (
          <InnovationFlowStates
            states={innovationFlowStates}
            currentState={currentInnovationFlowState}
            selectedState={selectedInnovationFlowState}
            onSelectState={state => setSelectedInnovationFlowState(state.displayName)}
            visualizer={isMobile ? InnovationFlowVisualizerMobile : InnovationFlowChips}
            createButton={canCreateCallout && createButton}
            settingsButton={
              manageFlowActionDef && (
                <InnovationFlowSettingsButton
                  collaborationId={collaborationId}
                  filterCalloutGroups={[CalloutGroupNameValuesMap.Home]}
                  tooltip={manageFlowActionDef.label}
                  icon={manageFlowActionDef.icon}
                />
              )
            }
          />
        )}
      </SubspaceInnovationFlow>
      <CalloutsGroupView
        journeyId={journeyId}
        callouts={selectedFlowStateCallouts}
        canCreateCallout={canCreateCallout && isMobile}
        canCreateCalloutFromTemplate={canCreateCalloutFromTemplate}
        loading={loading}
        journeyTypeName={journeyTypeName}
        calloutNames={calloutNames}
        onSortOrderUpdate={onCalloutsSortOrderUpdate}
        onCalloutUpdate={refetchCallout}
        groupName={CalloutGroupName.Home}
        createButtonPlace="top"
        flowState={selectedInnovationFlowState}
      />
      <CalloutCreationDialog
        open={isCalloutCreationDialogOpen}
        onClose={handleCreateCalloutClosed}
        onCreateCallout={handleCreateCallout}
        loading={loading}
        calloutNames={calloutNames}
        groupName={CalloutGroupName.Home}
        journeyTypeName={journeyTypeName}
        canCreateCalloutFromTemplate={canCreateCalloutFromTemplate}
        flowState={selectedInnovationFlowState}
      />
    </>
  );
};

export default SubspaceHomeView;
