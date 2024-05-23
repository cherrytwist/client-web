import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CardContent, Skeleton } from '@mui/material';
import CardHeader from '../../../../core/ui/card/CardHeader';
import CardHeaderCaption from '../../../../core/ui/card/CardHeaderCaption';
import CardSegmentCaption from '../../../../core/ui/card/CardSegmentCaption';
import ContributeCard from '../../../../core/ui/card/ContributeCard';
import { Caption } from '../../../../core/ui/typography/components';
import CardDetails from '../../../../core/ui/card/CardDetails';
import CardTags from '../../../../core/ui/card/CardTags';
import RoundedIcon from '../../../../core/ui/icon/RoundedIcon';
import { gutters } from '../../../../core/ui/grid/utils';
import CardDescription, { DEFAULT_CARDDESCRIPTION_HEIGHT_GUTTERS } from '../../../../core/ui/card/CardDescription';
import {
  InnovationPackTemplate,
  TemplateCardBaseProps,
} from '../../templates/CollaborationTemplatesLibrary/TemplateBase';
import InnovationPackIcon from '../../InnovationPack/InnovationPackIcon';
import { CalloutIcon } from '../icon/CalloutIcon';
import calloutIcons from '../utils/calloutIcons';

export interface CalloutTemplate extends InnovationPackTemplate {
  type?: string;
}

interface CalloutTemplateCardProps extends TemplateCardBaseProps<CalloutTemplate> {}

const CalloutTemplateCard: FC<CalloutTemplateCardProps> = ({ template, innovationPack, loading, onClick }) => {
  const { t } = useTranslation();

  const hasTags = (template?.profile.tagset?.tags ?? []).length > 0;
  const descriptionHeightGutters = hasTags
    ? DEFAULT_CARDDESCRIPTION_HEIGHT_GUTTERS - 3
    : DEFAULT_CARDDESCRIPTION_HEIGHT_GUTTERS;

  const Icon = template?.type && calloutIcons[template?.type];

  return (
    <ContributeCard onClick={onClick}>
      <CardHeader title={template?.profile.displayName} iconComponent={CalloutIcon}>
        {loading && <Skeleton />}
        <CardHeaderCaption logoUrl={innovationPack?.provider?.profile.avatar?.uri}>
          {innovationPack?.provider?.profile.displayName}
        </CardHeaderCaption>
      </CardHeader>
      <CardDetails>
        <CardDescription heightGutters={descriptionHeightGutters}>{template?.profile.description}</CardDescription>
      </CardDetails>
      <CardDetails>
        <CardContent>
          <Box display="flex" alignItems="center" marginLeft={-0.5} gap={gutters(0.5)}>
            <RoundedIcon marginLeft={0.5} size="xsmall" component={Icon} />
            <Caption>{t(`components.calloutTypeSelect.label.${template?.type}`)}</Caption>
          </Box>
        </CardContent>
      </CardDetails>
      <CardDetails>
        <CardTags tags={template?.profile.tagset?.tags ?? []} marginY={1} hideIfEmpty />
      </CardDetails>
      {innovationPack?.profile.displayName && (
        <CardSegmentCaption icon={<InnovationPackIcon />}>
          <Caption noWrap>{innovationPack?.profile.displayName}</Caption>
        </CardSegmentCaption>
      )}
      {loading && <Skeleton />}
    </ContributeCard>
  );
};

export default CalloutTemplateCard;
