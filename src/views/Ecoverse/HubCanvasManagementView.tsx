import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import CanvasActionsContainer from '../../containers/canvas/CanvasActionsContainer';
import { CanvasProvider } from '../../containers/canvas/CanvasProvider';
import { EcoversePageFragment } from '../../models/graphql-schema';
import { ViewProps } from '../../models/view';
import CanvasManagementView from '../Canvas/CanvasManagementView';

export interface HubContextViewEntities {
  hub: EcoversePageFragment;
}

export interface HubContextViewState {
  loading: boolean;
  error?: ApolloError;
}

export interface HubCanvasManagementViewProps
  extends ViewProps<HubContextViewEntities, undefined, HubContextViewState, undefined> {}

const HubCanvasManagementView: FC<HubCanvasManagementViewProps> = ({ entities, state }) => {
  const { hub } = entities;
  const contextID = hub.context?.id || '';

  return (
    <CanvasProvider>
      {(canvasEntities, canvasState) => (
        <CanvasActionsContainer>
          {(_, __, actions) => (
            <CanvasManagementView
              entities={{
                ...canvasEntities,
                contextID,
                contextSource: 'hub',
              }}
              actions={actions}
              state={{
                ...canvasState,
                loadingCanvases: state.loading,
              }}
              options={{
                isEditable: true,
              }}
            />
          )}
        </CanvasActionsContainer>
      )}
    </CanvasProvider>
  );
};

export default HubCanvasManagementView;
