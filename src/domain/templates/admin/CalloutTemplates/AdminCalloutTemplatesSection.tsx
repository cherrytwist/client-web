import { InternalRefetchQueriesInclude } from '@apollo/client/core/types';
import { useTranslation } from 'react-i18next';
import CalloutImportTemplateCard from './CalloutImportTemplateCard';
import CreateCalloutTemplateDialog from './CreateCalloutTemplateDialog';
import { CalloutTemplateFormSubmittedValues } from './CalloutTemplateForm';
import produce from 'immer';
import EditCalloutTemplateDialog from './EditCalloutTemplateDialog';
import {
  CalloutState,
  CalloutTemplateFragment,
  CalloutType,
  CreateTemplateMutationVariables,
  TemplateType,
  UpdateTemplateInput,
} from '../../../../core/apollo/generated/graphql-schema';
import { LinkWithState } from '../../../shared/types/LinkWithState';
import { InnovationPack } from '../../../platform/admin/InnovationPacks/InnovationPack';
import {
  useCalloutTemplateContentLazyQuery,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import AdminTemplatesSection from '../../../platform/admin/InnovationPacks/OldAdminTemplatesSection';
import { Identifiable } from '../../../../core/utils/Identifiable';
import { Box } from '@mui/material';
import { CARLOS_BORDER_RED } from '../../_new/borders';

interface AdminCalloutTemplatesSectionProps {
  templateId: string | undefined;
  templatesSetId: string | undefined;
  templates: CalloutTemplateFragment[] | undefined;
  onCloseTemplateDialog: () => void;
  refetchQueries: InternalRefetchQueriesInclude;
  buildTemplateLink: (callout: CalloutTemplateFragment) => LinkWithState;
  edit?: boolean;
  loadInnovationPacks: () => void;
  loadingInnovationPacks?: boolean;
  innovationPacks: InnovationPack<CalloutTemplateFragment>[];
  canImportTemplates: boolean;
}

const AdminCalloutTemplatesSection = ({ refetchQueries, ...props }: AdminCalloutTemplatesSectionProps) => {
  const { t } = useTranslation();

  const [createTemplate] = useCreateTemplateMutation();
  const [updateTemplate] = useUpdateTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();
  const [fetchTemplateData] = useCalloutTemplateContentLazyQuery();

  return (
    <Box sx={{ border: CARLOS_BORDER_RED }}>
      <AdminTemplatesSection
        {...props}
        headerText={t('common.enums.templateTypes.Callout')}
        importDialogHeaderText={t('pages.admin.generic.sections.templates.import.title', {
          templateType: t('common.callouts'),
        })}
        templateCardComponent={CalloutImportTemplateCard}
        templateImportCardComponent={CalloutImportTemplateCard}
        createTemplateDialogComponent={CreateCalloutTemplateDialog}
        editTemplateDialogComponent={EditCalloutTemplateDialog}
        onCreateTemplate={(calloutTemplate: CalloutTemplateFormSubmittedValues & { templatesSetId: string }) => {
          const {
            callout: { framing, contributionDefaults },
          } = produce(calloutTemplate, draft => {
            if (draft.callout.type !== CalloutType.Whiteboard) {
              delete draft.callout.framing.whiteboard;
            } else {
              draft.callout.framing.whiteboard = {
                ...draft.callout.framing.whiteboard,
                profileData: {
                  ...draft.callout.framing.whiteboard?.profileData,
                  displayName: calloutTemplate.callout.framing.profile.displayName,
                },
              };
            }
            if (draft.callout.type !== CalloutType.PostCollection && draft.callout.contributionDefaults) {
              delete draft.callout.contributionDefaults.postDescription;
            }
            if (draft.callout.type !== CalloutType.WhiteboardCollection && draft.callout.contributionDefaults) {
              delete draft.callout.contributionDefaults.whiteboardContent;
            }
          });

          const variables: CreateTemplateMutationVariables = {
            templatesSetId: calloutTemplate.templatesSetId,
            profile: calloutTemplate.profile,
            type: TemplateType.Callout,
            tags: calloutTemplate.tags,
            callout: {
              framing,
              contributionPolicy: {
                state: CalloutState.Open,
              },
              contributionDefaults,
              type: calloutTemplate.callout.type,
            },
          };

          return createTemplate({ variables, refetchQueries });
        }}
        onUpdateTemplate={async ({
          templateId,
          ...template
        }: UpdateTemplateInput & { templateId: string; type: CalloutType }) => {
          const { type, ...updatedValues } = produce(template, draft => {
            if (draft.type !== CalloutType.Whiteboard && draft.callout?.framing) {
              delete draft.callout?.framing?.whiteboard?.content;
            }
            if (draft.type !== CalloutType.PostCollection && draft.callout?.contributionDefaults) {
              delete draft.callout?.contributionDefaults.postDescription;
            }
            if (draft.type !== CalloutType.WhiteboardCollection && draft.callout?.contributionDefaults) {
              delete draft.callout?.contributionDefaults.whiteboardContent;
            }
          });

          await updateTemplate({
            variables: {
              templateId: templateId,
              callout: updatedValues.callout,
              profile: updatedValues.profile ?? {},
            },
            refetchQueries,
          });
        }}
        onDeleteTemplate={async variables => {
          await deleteTemplate({ variables, refetchQueries });
        }}
        templateType={TemplateType.Callout}
        onTemplateImport={async (template: Identifiable) => {
          const { data } = await fetchTemplateData({ variables: { calloutTemplateId: template.id } });
          const templateData = data?.lookup.template;
          const templateCallout = templateData?.callout;

          if (!templateData || !templateCallout) {
            throw new TypeError('Template not found!');
          }
          return {
            profile: {
              displayName: templateData.profile.displayName,
              description: templateData.profile.description,
              tagset: templateData.profile.tagset,
              visual: templateData.profile.visual,
            },
            framing: {
              profile: {
                displayName: templateCallout.framing.profile.displayName,
                description: templateCallout.framing.profile.description,
                tagsets:
                  templateCallout.framing.profile.tagsets?.map(tagset => ({
                    name: tagset.name,
                    tags: tagset.tags,
                    type: tagset.type,
                  })) ?? [],
                referencesData:
                  templateCallout.framing.profile.references?.map(reference => ({
                    name: reference.name,
                    uri: reference.uri,
                    description: reference.description,
                  })) ?? [],
              },
              whiteboard: templateCallout?.framing.whiteboard
                ? { content: templateCallout.framing.whiteboard.content }
                : undefined,
            },
            contributionPolicy: {
              state: templateCallout.contributionPolicy.state,
            },
            contributionDefaults: {
              postDescription: templateCallout.contributionDefaults.postDescription,
              whiteboardContent: templateCallout.contributionDefaults.whiteboardContent,
            },
          };
        }}
      />
    </Box>
  );
};

export default AdminCalloutTemplatesSection;
