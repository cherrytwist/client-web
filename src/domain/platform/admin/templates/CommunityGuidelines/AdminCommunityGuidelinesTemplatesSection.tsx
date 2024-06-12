import { InternalRefetchQueriesInclude } from '@apollo/client/core/types';
import { useTranslation } from 'react-i18next';
import { AdminCommunityGuidelinesTemplateFragment } from '../../../../../core/apollo/generated/graphql-schema';
import {
  useCreateCommunityGuidelinesTemplateMutation,
  useDeleteCommunityGuidelinesTemplateMutation,
  useUpdateCommunityGuidelinesTemplateMutation,
} from '../../../../../core/apollo/generated/apollo-hooks';
import { TemplateType } from '../../../../collaboration/InnovationPack/InnovationPackProfilePage/InnovationPackProfilePage';
import { LinkWithState } from '../../../../shared/types/LinkWithState';
import AdminTemplatesSection from '../AdminTemplatesSection';
import { InnovationPack } from '../InnovationPacks/InnovationPack';
import CommunityGuidelinesImportTemplateCard from './CommunityGuidelinesImportTemplateCard';
import CreateCommunityGuidelinesTemplateDialog from './CreateCommunityGuidelinesTemplateDialog';

interface AdminCommunityGuidelinesTemplatesSectionProps {
  templateId: string | undefined;
  templatesSetId: string | undefined;
  templates: AdminCommunityGuidelinesTemplateFragment[] | undefined;
  onCloseTemplateDialog: () => void;
  refetchQueries: InternalRefetchQueriesInclude;
  buildTemplateLink: (guidelines: AdminCommunityGuidelinesTemplateFragment) => LinkWithState;
  edit?: boolean;
  loadInnovationPacks: () => void;
  loadingInnovationPacks?: boolean;
  innovationPacks: InnovationPack<AdminCommunityGuidelinesTemplateFragment>[];
  canImportTemplates: boolean;
}

const AdminCommunityGuidelinesTemplatesSection = ({
  refetchQueries,
  ...props
}: AdminCommunityGuidelinesTemplatesSectionProps) => {
  const { t } = useTranslation();

  const [createCommunityGuidelinesTemplate] = useCreateCommunityGuidelinesTemplateMutation();
  const [updateCommunityGuidelinesTemplate] = useUpdateCommunityGuidelinesTemplateMutation();
  const [deleteCommunityGuidelinesTemplate] = useDeleteCommunityGuidelinesTemplateMutation();

  return (
    <AdminTemplatesSection
      {...props}
      headerText={t('common.enums.templateTypes.CommunityGuidelinesTemplate')}
      importDialogHeaderText={t('pages.admin.generic.sections.templates.import.title', {
        templateType: t('community.communityGuidelines.title'),
      })}
      templateCardComponent={CommunityGuidelinesImportTemplateCard}
      templateImportCardComponent={CommunityGuidelinesImportTemplateCard}
      createTemplateDialogComponent={CreateCommunityGuidelinesTemplateDialog}
      editTemplateDialogComponent={undefined}
      onCreateTemplate={variables => {
        const updatedGuidelines = {
          profile: {
            displayName: variables.guidelines.profile.displayName,
            description: variables.guidelines.profile.description,
            referencesData: variables.guidelines.profile.references?.map(reference => ({
              ID: reference.id,
              name: reference.name,
              uri: reference.uri,
            })),
          },
        };
        const { guidelines, ...rest } = variables;
        const updatedVariables = { guidelines: updatedGuidelines, ...rest };
        return createCommunityGuidelinesTemplate({ variables: updatedVariables, refetchQueries });
      }}
      onUpdateTemplate={variables => updateCommunityGuidelinesTemplate({ variables, refetchQueries })}
      onDeleteTemplate={async variables => {
        await deleteCommunityGuidelinesTemplate({ variables, refetchQueries });
      }}
      templateType={TemplateType.CommunityGuidelinesTemplate}
    />
  );
};

export default AdminCommunityGuidelinesTemplatesSection;
