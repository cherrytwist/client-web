import React, { FC, useMemo } from 'react';
import HubSettingsLayout from './HubSettingsLayout';
import { SettingsSection } from '../layout/EntitySettingsLayout/constants';
import { SettingsPageProps } from '../layout/EntitySettingsLayout/types';
import {
  refetchAdminHubTemplatesQuery,
  useAdminHubTemplatesQuery,
  useInnovationPacksLazyQuery,
} from '../../../../core/apollo/generated/apollo-hooks';
import { useParams } from 'react-router-dom';
import useBackToParentPage from '../../../shared/utils/useBackToParentPage';
import AdminPostTemplatesSection from '../templates/PostTemplates/AdminPostTemplatesSection';
import Gutters from '../../../../core/ui/grid/Gutters';
import AdminInnovationTemplatesSection from '../templates/InnovationTemplates/AdminInnovationTemplatesSection';
import { AuthorizationPrivilege } from '../../../../core/apollo/generated/graphql-schema';
import AdminWhiteboardTemplatesSection from '../templates/WhiteboardTemplates/AdminWhiteboardTemplatesSection';

interface HubTemplatesAdminPageProps extends SettingsPageProps {
  hubId: string;
  routePrefix: string;
  aspectTemplatesRoutePath: string;
  whiteboardTemplatesRoutePath: string;
  innovationTemplatesRoutePath: string;
  edit?: boolean;
}

const HubTemplatesAdminPage: FC<HubTemplatesAdminPageProps> = ({
  hubId,
  routePrefix,
  aspectTemplatesRoutePath,
  whiteboardTemplatesRoutePath,
  innovationTemplatesRoutePath,
  edit = false,
}) => {
  const { aspectTemplateId, whiteboardTemplateId, innovationTemplateId } = useParams();

  const [backFromTemplateDialog, buildLink] = useBackToParentPage(routePrefix);

  const { data: hubTemplatesData } = useAdminHubTemplatesQuery({
    variables: { hubId },
    skip: !hubId, // hub id can be an empty string due to some `|| ''` happening above in the tree
  });

  const [loadInnovationPacks, { data: innovationPacks, loading: loadingInnovationPacks }] =
    useInnovationPacksLazyQuery();

  const {
    postTemplates,
    whiteboardTemplates,
    innovationFlowTemplates,
    id: templatesSetID,
    authorization: templateSetAuth,
  } = hubTemplatesData?.hub.templates ?? {};
  const canImportTemplates = templateSetAuth?.myPrivileges?.includes(AuthorizationPrivilege.Create) ?? false;

  const aspectInnovationPacks = useMemo(() => {
    if (!innovationPacks) return [];
    return innovationPacks?.platform.library.innovationPacks
      .filter(pack => pack.templates && pack.templates?.postTemplates.length > 0)
      .map(pack => ({
        ...pack,
        templates: pack.templates?.postTemplates || [],
      }));
  }, [innovationPacks]);

  const canvasInnovationPacks = useMemo(() => {
    if (!innovationPacks) return [];
    return innovationPacks?.platform.library.innovationPacks
      .filter(pack => pack.templates && pack.templates?.whiteboardTemplates.length > 0)
      .map(pack => ({
        ...pack,
        templates: pack.templates?.whiteboardTemplates || [],
      }));
  }, [innovationPacks]);

  const lifecycleInnovationPacks = useMemo(() => {
    if (!innovationPacks) return [];
    return innovationPacks?.platform.library.innovationPacks
      .filter(pack => pack.templates && pack.templates?.innovationFlowTemplates.length > 0)
      .map(pack => ({
        ...pack,
        templates: pack.templates?.innovationFlowTemplates || [],
      }));
  }, [innovationPacks]);

  return (
    <HubSettingsLayout currentTab={SettingsSection.Templates} tabRoutePrefix={`${routePrefix}/../`}>
      <Gutters>
        <AdminPostTemplatesSection
          templateId={aspectTemplateId}
          templatesSetId={templatesSetID}
          templates={postTemplates}
          onCloseTemplateDialog={backFromTemplateDialog}
          refetchQueries={[refetchAdminHubTemplatesQuery({ hubId })]}
          buildTemplateLink={({ id }) => buildLink(`${routePrefix}/${aspectTemplatesRoutePath}/${id}`)}
          edit={edit}
          loadInnovationPacks={loadInnovationPacks}
          loadingInnovationPacks={loadingInnovationPacks}
          innovationPacks={aspectInnovationPacks}
          canImportTemplates={canImportTemplates}
        />
        <AdminWhiteboardTemplatesSection
          templateId={whiteboardTemplateId}
          templatesSetId={templatesSetID}
          templates={whiteboardTemplates}
          onCloseTemplateDialog={backFromTemplateDialog}
          refetchQueries={[refetchAdminHubTemplatesQuery({ hubId })]}
          buildTemplateLink={({ id }) => buildLink(`${routePrefix}/${whiteboardTemplatesRoutePath}/${id}`)}
          edit={edit}
          whiteboardTemplatesLocation="hub"
          loadInnovationPacks={loadInnovationPacks}
          loadingInnovationPacks={loadingInnovationPacks}
          innovationPacks={canvasInnovationPacks}
          canImportTemplates={canImportTemplates}
        />
        <AdminInnovationTemplatesSection
          templateId={innovationTemplateId}
          templatesSetId={templatesSetID}
          templates={innovationFlowTemplates}
          onCloseTemplateDialog={backFromTemplateDialog}
          refetchQueries={[refetchAdminHubTemplatesQuery({ hubId })]}
          buildTemplateLink={({ id }) => buildLink(`${routePrefix}/${innovationTemplatesRoutePath}/${id}`)}
          edit={edit}
          loadInnovationPacks={loadInnovationPacks}
          loadingInnovationPacks={loadingInnovationPacks}
          innovationPacks={lifecycleInnovationPacks}
          canImportTemplates={canImportTemplates}
        />
      </Gutters>
    </HubSettingsLayout>
  );
};

export default HubTemplatesAdminPage;
