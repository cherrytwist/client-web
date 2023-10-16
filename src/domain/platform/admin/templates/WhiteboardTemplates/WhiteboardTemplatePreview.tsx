import { Box, styled, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TagsComponent from '../../../../shared/components/TagsComponent/TagsComponent';
import { SectionSpacer } from '../../../../shared/components/Section/Section';
import WrapperMarkdown from '../../../../../core/ui/markdown/WrapperMarkdown';
import ExcalidrawWrapper from '../../../../common/whiteboard/excalidraw/ExcalidrawWrapper';
import { AdminWhiteboardTemplateFragment } from '../../../../../core/apollo/generated/graphql-schema';
import useWhiteboardFilesManager from '../../../../common/whiteboard/excalidraw/useWhiteboardFilesManager';
import { ExcalidrawAPIRefValue } from '@alkemio/excalidraw/types/types';

const TypographyTitle = styled(props => <Typography variant="h6" {...props} />)(() => ({
  fontWeight: 'bold',
}));

interface WhiteboardTemplateViewProps {
  template: AdminWhiteboardTemplateFragment;
  getTemplateContent?: (template: AdminWhiteboardTemplateFragment) => void;
  templateContent?: { content: string | undefined } | undefined;
}

const WhiteboardTemplatePreview = ({
  template,
  getTemplateContent = () => {},
  templateContent,
}: WhiteboardTemplateViewProps) => {
  const { t } = useTranslation();
  const excalidrawApiRef = useRef<ExcalidrawAPIRefValue>(null);
  const filesManager = useWhiteboardFilesManager({ excalidrawApi: excalidrawApiRef.current });

  const {
    profile: { tagset: { tags } = {}, description = '' },
  } = template;

  useEffect(() => {
    getTemplateContent(template);
  }, [getTemplateContent, template]);

  const whiteboardFromTemplate = useMemo(() => {
    return {
      id: '__template',
      content: templateContent?.content ?? '',
    };
  }, [templateContent]);

  return (
    <>
      <Box>
        <TypographyTitle>{t('common.description')}</TypographyTitle>
        <Typography variant="body2" component="div">
          <WrapperMarkdown>{description}</WrapperMarkdown>
        </Typography>
      </Box>
      <Box>
        <TypographyTitle>{t('common.tags')}</TypographyTitle>
        <SectionSpacer half />
        <TagsComponent tags={tags || []} />
      </Box>
      <Box height={theme => theme.spacing(40)}>
        {templateContent?.content && (
          <ExcalidrawWrapper
            ref={excalidrawApiRef}
            entities={{
              whiteboard: whiteboardFromTemplate,
              filesManager,
            }}
            actions={{}}
            options={{
              viewModeEnabled: true,
              UIOptions: {
                canvasActions: {
                  export: false,
                },
              },
            }}
          />
        )}
      </Box>
    </>
  );
};

export default WhiteboardTemplatePreview;
