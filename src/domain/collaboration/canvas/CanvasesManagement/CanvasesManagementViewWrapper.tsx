import React, { FC } from 'react';
import CanvasActionsContainer from '../../../../containers/canvas/CanvasActionsContainer';
import { useConfig } from '../../../platform/config/useConfig';
import { FEATURE_COLLABORATION_CANVASES } from '../../../platform/config/features.constants';
import {
  AuthorizationPrivilege,
  CollaborationWithCanvasDetailsFragment,
  CreateCanvasCanvasTemplateFragment,
} from '../../../../core/apollo/generated/graphql-schema';
import { Error404 } from '../../../../core/pages/Errors/Error404';
import CanvasManagementView, {
  ActiveCanvasIdHolder,
  CanvasManagementViewEntities,
  CanvasNavigationMethods,
} from './CanvasManagementView';
import { EntityTypeName } from '../../../shared/layout/PageLayout/SimplePageLayout';
import Loading from '../../../../common/components/core/Loading/Loading';
import { CanvasFragmentWithCallout } from '../../callout/useCallouts';

export interface CanvasesManagementViewWrapperProps extends ActiveCanvasIdHolder, CanvasNavigationMethods {
  entityTypeName: EntityTypeName;
  canvases: CanvasFragmentWithCallout[];
  templates: CreateCanvasCanvasTemplateFragment[];
  calloutId: string | undefined;
  authorization: NonNullable<CollaborationWithCanvasDetailsFragment['callouts']>[0]['authorization'];
  loadingCanvases: boolean;
  loadingTemplates: boolean;
}

const CanvasesManagementViewWrapper: FC<CanvasesManagementViewWrapperProps> = ({
  canvasNameId,
  calloutId,
  canvases,
  templates,
  authorization,
  entityTypeName,
  backToCanvases,
  buildLinkToCanvas,
  ...canvasesState
}) => {
  const { isFeatureEnabled } = useConfig();

  if (!calloutId) {
    return <Loading />;
  }

  const hasReadPrivileges =
    authorization?.anonymousReadAccess || authorization?.myPrivileges?.some(p => p === AuthorizationPrivilege.Read);

  if (!isFeatureEnabled(FEATURE_COLLABORATION_CANVASES) || !hasReadPrivileges) return <Error404 />;

  const hasCreatePrivileges = authorization?.myPrivileges?.some(p => p === AuthorizationPrivilege.CreateCanvas);
  const hasDeletePrivileges = authorization?.myPrivileges?.some(p => p === AuthorizationPrivilege.Delete);
  // Todo: need to decide who can edit what canvases, for now tie to CreateCanvas. May need to extend the information on a Canvas
  // to include who created it etc.
  const hasUpdatePrivileges = authorization?.myPrivileges?.some(p => p === AuthorizationPrivilege.CreateCanvas);

  return (
    <CanvasActionsContainer>
      {(_, actionsState, actions) => (
        <CanvasManagementView
          entities={{
            canvases,
            templates,
            calloutId,
            canvasNameId,
            contextSource: entityTypeName as CanvasManagementViewEntities['contextSource'],
          }}
          actions={actions}
          state={{
            ...canvasesState,
            ...actionsState,
          }}
          options={{
            canUpdate: hasUpdatePrivileges,
            canCreate: hasCreatePrivileges,
            canDelete: hasDeletePrivileges,
          }}
          backToCanvases={backToCanvases}
          buildLinkToCanvas={buildLinkToCanvas}
        />
      )}
    </CanvasActionsContainer>
  );
};

export default CanvasesManagementViewWrapper;
