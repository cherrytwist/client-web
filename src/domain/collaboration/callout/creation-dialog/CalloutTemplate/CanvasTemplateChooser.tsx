import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { CanvasTemplateFragment } from '../../../../../core/apollo/generated/graphql-schema';
import {
  useHubTemplatesCanvasTemplateWithValueQuery,
  useInnovationPackCanvasTemplateWithValueQuery,
} from '../../../../../core/apollo/generated/apollo-hooks';
import { useUrlParams } from '../../../../../core/routing/useUrlParams';
import CanvasTemplatesList from './CanvasTemplatesList';
import { CardText, Text } from '../../../../../core/ui/typography/components';

const FORM_TEXT_COLOR = '#00000099';
interface CanvasTemplatesChooserProps {
  name: string;
  templates: CanvasTemplateListItem[];
  editMode?: boolean;
  updateLibraryTemplates: (template: LibraryCanvasTemplate) => void;
}

export type TemplateOrigin = 'Hub' | 'Library';
export type LibraryCanvasTemplate = {
  id: string;
  info: {
    title: string;
  };
  innovationPackId: string;
};
export type CanvasTemplateWithOrigin = CanvasTemplateFragment & {
  origin: TemplateOrigin;
  innovationPackId?: string;
};

export type CanvasTemplateListItem = {
  id: string;
  info: {
    title: string;
  };
  origin: TemplateOrigin;
  innovationPackId?: string;
};

export const CanvasTemplatesChooser: FC<CanvasTemplatesChooserProps> = ({
  name,
  templates,
  editMode = false,
  updateLibraryTemplates,
}) => {
  const [field, , helpers] = useField(name);
  const { hubNameId } = useUrlParams();

  const selectedTemplate = templates.find(template => template.info.title === field.value);

  const { data: canvasValueData, loading: isCanvasValueLoading } = useHubTemplatesCanvasTemplateWithValueQuery({
    fetchPolicy: 'cache-and-network',
    variables: { hubId: hubNameId!, canvasTemplateId: selectedTemplate?.id! },
    skip: !hubNameId || !selectedTemplate?.id || selectedTemplate?.origin === 'Library',
  });

  const { data: libraryCanvasValueData, loading: isLibraryCanvasValueLoading } =
    useInnovationPackCanvasTemplateWithValueQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        innovationPackId: selectedTemplate?.innovationPackId!,
        canvasTemplateId: selectedTemplate?.id!,
      },
      skip: !selectedTemplate?.innovationPackId || !selectedTemplate?.id || selectedTemplate?.origin === 'Hub',
    });

  const canvasValue =
    canvasValueData?.hub.templates?.canvasTemplate?.value ??
    libraryCanvasValueData?.platform.library.innovationPack?.templates?.canvasTemplate?.value ??
    '';
  const selectedTemplateWithValue = useMemo(
    () => (selectedTemplate ? { ...selectedTemplate, value: canvasValue } : undefined),
    [selectedTemplate, canvasValue]
  );

  const { t } = useTranslation();

  return (
    <>
      {/* TODO: Add this color to pallete to match Formik labels */}
      <Text sx={{ color: FORM_TEXT_COLOR }}>
        {t('components.callout-creation.template-step.canvas-template-label')}
      </Text>
      {editMode && (
        <CardText sx={{ color: FORM_TEXT_COLOR }}>
          {t('components.callout-edit.canvas-template-edit-help-text')}
        </CardText>
      )}
      <CanvasTemplatesList
        entities={{ templates, selectedTemplate: selectedTemplateWithValue }}
        actions={{
          onSelect: helpers.setValue,
          updateLibraryTemplates,
        }}
        state={{
          canvasLoading: isCanvasValueLoading || isLibraryCanvasValueLoading,
        }}
      />
    </>
  );
};

export default CanvasTemplatesChooser;
