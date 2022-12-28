import React, { FC } from 'react';
import { Tooltip } from '@mui/material';
import { Reference } from '../../../common/profile/Profile';
import { BlockSectionTitle, CardText } from '../../../../core/ui/typography';
import RoundedIcon, { RoundedIconProps } from '../../../../core/ui/icon/RoundedIcon';
import ItemView from '../../../../core/ui/list/ItemView';
import { ReferenceIcon } from './icons/ReferenceIcon';
import { isExternalLink } from '../../../../core/utils/checkIfExternalLink';
import RouterLink from '../../../../core/ui/link/RouterLink';

export interface ReferenceViewProps {
  reference: Reference;
  icon?: RoundedIconProps['component'];
}

const REFERENCE_DESCRIPTION_MAX_LENGTH = 80; // characters

interface ReferenceDescriptionProps {
  children: string | undefined;
}

const ReferenceDescription: FC<ReferenceDescriptionProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  const isCut = children.length > REFERENCE_DESCRIPTION_MAX_LENGTH;

  const descriptionText = isCut ? `${children.slice(0, REFERENCE_DESCRIPTION_MAX_LENGTH)}…` : children;

  const formattedDescription = <CardText>{descriptionText}</CardText>;

  if (isCut) {
    return (
      <Tooltip title={children} placement="top-start" disableInteractive>
        {formattedDescription}
      </Tooltip>
    );
  }

  return formattedDescription;
};

const ReferenceView: FC<ReferenceViewProps> = ({ reference, icon = ReferenceIcon }) => {
  return (
    <ItemView visual={<RoundedIcon size="medium" component={icon} />}>
      <Tooltip title={reference.uri} placement="top-start" disableInteractive>
        <BlockSectionTitle component={RouterLink} to={reference.uri} external={isExternalLink(reference.uri)}>
          {reference.name}
        </BlockSectionTitle>
      </Tooltip>
      <ReferenceDescription>{reference.description}</ReferenceDescription>
    </ItemView>
  );
};

export default ReferenceView;
