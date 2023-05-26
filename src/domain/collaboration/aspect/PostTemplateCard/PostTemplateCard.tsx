import { Skeleton } from '@mui/material';
import React, { FC } from 'react';
import CardHeader from '../../../../core/ui/card/CardHeader';
import CardHeaderCaption from '../../../../core/ui/card/CardHeaderCaption';
import CardSegmentCaption from '../../../../core/ui/card/CardSegmentCaption';
import ContributeCard, { ContributeCardContainerProps } from '../../../../core/ui/card/ContributeCard';
import { Caption } from '../../../../core/ui/typography/components';
import InnovationPackIcon from '../../InnovationPack/InnovationPackIcon';
import { AspectIcon } from '../icon/AspectIcon';
import CardDescription from '../../../../core/ui/card/CardDescription';
import CardTags from '../../../../core/ui/card/CardTags';
import CardDetails from '../../../../core/ui/card/CardDetails';

interface PostTemplate {
  displayName: string;
  description: string | undefined;
  // visualUri: string | undefined;
  tags: string[] | undefined;
  provider: {
    displayName: string | undefined;
    avatarUri: string | undefined;
  };
  innovationPack: {
    displayName: string | undefined;
  };
}

interface PostTemplateCardProps extends ContributeCardContainerProps {
  template: PostTemplate | undefined;
  loading?: boolean;
}

const PostTemplateCard: FC<PostTemplateCardProps> = ({ template, loading, onClick }) => {
  return (
    <ContributeCard onClick={onClick}>
      <CardHeader title={template?.displayName} iconComponent={AspectIcon}>
        {loading && <Skeleton />}
        <CardHeaderCaption noWrap logoUrl={template?.provider?.avatarUri}>
          {template?.provider?.displayName}
        </CardHeaderCaption>
      </CardHeader>
      <CardDetails>
        <CardDescription>{template?.description ?? ''}</CardDescription>
        <CardTags tags={template?.tags ?? []} paddingX={1.5} marginY={1} />
      </CardDetails>
      {template?.innovationPack.displayName && (
        <CardSegmentCaption icon={<InnovationPackIcon />}>
          <Caption noWrap>{template?.innovationPack.displayName}</Caption>
        </CardSegmentCaption>
      )}
      {loading && <Skeleton />}
    </ContributeCard>
  );
};

export default PostTemplateCard;
