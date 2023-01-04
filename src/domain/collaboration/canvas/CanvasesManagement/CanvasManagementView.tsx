import { ApolloError } from '@apollo/client';
import React, { FC, useState } from 'react';
import { Trans } from 'react-i18next';
import CanvasCreateDialog from '../CanvasDialog/CanvasCreateDialog';
import CanvasDialog from '../CanvasDialog/CanvasDialog';
import ConfirmationDialog from '../../../../common/components/composite/dialogs/ConfirmationDialog';
import { ICanvasActions } from '../containers/CanvasActionsContainer';
import CanvasValueContainer from '../containers/CanvasValueContainer';
import { useUserContext } from '../../../community/contributor/user';
import {
  CanvasCheckoutStateEnum,
  CanvasDetailsFragment,
  CreateCanvasCanvasTemplateFragment,
} from '../../../../core/apollo/generated/graphql-schema';
import { ViewProps } from '../../../../core/container/view';
import { LinkWithState } from '../../../shared/types/LinkWithState';

export interface ActiveCanvasIdHolder {
  canvasNameId?: string;
}

export interface CanvasManagementViewEntities extends ActiveCanvasIdHolder {
  calloutId: string;
  contextSource: 'hub' | 'challenge' | 'opportunity';
  canvas: CanvasDetailsFragment | undefined;
  templates: CreateCanvasCanvasTemplateFragment[];
  templateListHeader?: string;
  templateListSubheader?: string;
}

export interface CanvasManagementViewActions extends ICanvasActions {}

export interface ContextViewState {
  loadingCanvases?: boolean;
  creatingCanvas?: boolean;
  deletingCanvas?: boolean;
  changingCanvasLockState?: boolean;
  updatingCanvas?: boolean;
  loadingCanvasValue?: boolean;
  error?: ApolloError;
}

export interface CanvasManagementViewOptions {
  canUpdate?: boolean;
  canCreate?: boolean;
  canDelete?: boolean;
}

export interface CanvasNavigationMethods {
  backToCanvases: () => void;
  buildLinkToCanvas: (canvasNameId: string, calloutNameId: string) => LinkWithState;
}

interface CanvasBeingDeleted {
  displayName: string;
  canvasId: string;
  calloutId: string;
}

export interface CanvasManagementViewProps
  extends ViewProps<
      CanvasManagementViewEntities,
      CanvasManagementViewActions,
      ContextViewState,
      CanvasManagementViewOptions
    >,
    CanvasNavigationMethods {}

const CanvasManagementView: FC<CanvasManagementViewProps> = ({ entities, actions, state, options, backToCanvases }) => {
  const { canvasNameId, calloutId, canvas } = entities;
  const [canvasBeingDeleted, setCanvasBeingDeleted] = useState<CanvasBeingDeleted | undefined>(undefined);

  const [showCreateCanvasDialog, setShowCreateCanvasDialog] = useState<boolean>(false);
  const { user } = useUserContext();

  const isCanvasCheckedoutByMe =
    canvas?.checkout?.status === CanvasCheckoutStateEnum.CheckedOut && canvas.checkout.lockedBy === user?.user.id;
  const isCanvasAvailable = canvas?.checkout?.status === CanvasCheckoutStateEnum.Available;

  return (
    <>
      <CanvasValueContainer canvasId={canvas?.id} calloutId={calloutId}>
        {entities => (
          <CanvasDialog
            entities={{ canvas: entities.canvas }}
            actions={{
              onCancel: backToCanvases,
              onCheckin: actions.onCheckin,
              onCheckout: actions.onCheckout,
              onUpdate: actions.onUpdate,
              onDelete: c => setCanvasBeingDeleted({ canvasId: c.id, displayName: c.displayName, calloutId }),
            }}
            options={{
              show: Boolean(canvasNameId),
              canCheckout: isCanvasAvailable && options.canUpdate,
              canEdit: isCanvasCheckedoutByMe && options.canUpdate,
              canDelete: isCanvasAvailable && options.canDelete,
            }}
            state={state}
          />
        )}
      </CanvasValueContainer>
      <CanvasCreateDialog
        entities={{
          calloutId,
          templates: entities.templates,
        }}
        actions={{
          onCancel: () => setShowCreateCanvasDialog(false),
          onConfirm: input => {
            actions.onCreate(input);
            setShowCreateCanvasDialog(false);
          },
        }}
        options={{
          show: showCreateCanvasDialog,
        }}
        state={{
          canvasLoading: state.loadingCanvasValue,
          templatesLoading: state.loadingCanvases,
        }}
      />
      <ConfirmationDialog
        actions={{
          onCancel: () => setCanvasBeingDeleted(undefined),
          onConfirm: async () => {
            if (canvasBeingDeleted) {
              await actions.onDelete({
                ID: canvasBeingDeleted.canvasId,
              });
              setCanvasBeingDeleted(undefined);
              backToCanvases();
            }
          },
        }}
        entities={{
          confirmButtonTextId: 'buttons.delete',
          contentId: 'pages.canvas.delete.confirmation-text',
          title: (
            <Trans
              i18nKey="pages.canvas.delete.confirmation-title"
              values={{ blockName: canvasBeingDeleted?.displayName }}
              components={{ b: <strong /> }}
            />
          ),
        }}
        options={{
          show: Boolean(canvasBeingDeleted),
        }}
        state={{
          isLoading: Boolean(state.deletingCanvas),
        }}
      />
    </>
  );
};

export default CanvasManagementView;
