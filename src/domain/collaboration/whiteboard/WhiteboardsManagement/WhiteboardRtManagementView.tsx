import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import { IWhiteboardRtActions } from '../containers/WhiteboardRtActionsContainer';
import WhiteboardRtDialog from '../WhiteboardDialog/WhiteboardRtDialog';
import WhiteboardRtValueContainer from '../containers/WhiteboardRtValueContainer';
import {
  WhiteboardRtDetailsFragment,
  WhiteboardRtContentFragment,
  CreateWhiteboardWhiteboardTemplateFragment,
} from '../../../../core/apollo/generated/graphql-schema';
import { ViewProps } from '../../../../core/container/view';
import ShareButton from '../../../shared/components/ShareDialog/ShareButton';
import { JourneyTypeName } from '../../../journey/JourneyTypeName';
import { BlockTitle } from '../../../../core/ui/typography/components';

export interface ActiveWhiteboardIdHolder {
  whiteboardNameId?: string;
}

export interface WhiteboardManagementViewEntities extends ActiveWhiteboardIdHolder {
  calloutId: string;
  contextSource: JourneyTypeName;
  whiteboard: WhiteboardRtDetailsFragment | undefined;
  templates: CreateWhiteboardWhiteboardTemplateFragment[];
  templateListHeader?: string;
  templateListSubheader?: string;
}

export interface WhiteboardManagementViewActions extends IWhiteboardRtActions {}

export interface ContextViewState {
  loadingWhiteboards?: boolean;
  creatingWhiteboard?: boolean;
  changingWhiteboardLockState?: boolean;
  updatingWhiteboard?: boolean;
  error?: ApolloError;
}

export interface WhiteboardManagementViewOptions {
  canUpdate?: boolean;
  canUpdateDisplayName?: boolean;
  canCreate?: boolean;
  shareUrl?: string;
}

export interface WhiteboardNavigationMethods {
  backToWhiteboards: () => void;
}

export interface WhiteboardManagementViewProps
  extends ViewProps<
      WhiteboardManagementViewEntities,
      WhiteboardManagementViewActions,
      ContextViewState,
      WhiteboardManagementViewOptions
    >,
    WhiteboardNavigationMethods {}

const WhiteboardRtManagementView: FC<WhiteboardManagementViewProps> = ({
  entities,
  actions,
  state,
  options,
  backToWhiteboards,
}) => {
  const { whiteboardNameId, whiteboard } = entities;

  const handleCancel = (whiteboard: WhiteboardRtDetailsFragment) => {
    backToWhiteboards();
    //!! Save whiteboard
  };

  return (
    <>
      <WhiteboardRtValueContainer whiteboardId={whiteboard?.id}>
        {entities => {
          return (
            <WhiteboardRtDialog
              entities={{
                whiteboard: entities.whiteboard as WhiteboardRtContentFragment & WhiteboardRtDetailsFragment,
              }}
              actions={{
                onCancel: handleCancel,
                onUpdate: actions.onUpdate,
              }}
              options={{
                show: Boolean(whiteboardNameId),
                fixedDialogTitle: options.canUpdateDisplayName ? undefined : (
                  <BlockTitle display="flex" alignItems="center">
                    {whiteboard?.profile.displayName}
                  </BlockTitle>
                ),
                headerActions: (
                  <ShareButton url={options.shareUrl} entityTypeName="whiteboard" disabled={!options.shareUrl} />
                ),
              }}
              state={state}
            />
          );
        }}
      </WhiteboardRtValueContainer>
    </>
  );
};

export default WhiteboardRtManagementView;
