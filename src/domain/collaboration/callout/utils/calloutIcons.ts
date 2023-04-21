import { ComponentType } from 'react';
import { SvgIconProps } from '@mui/material';
import { CalloutType } from '../../../../core/apollo/generated/graphql-schema';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import NotesIcon from '@mui/icons-material/Notes';

const calloutIcons: Record<CalloutType, ComponentType<SvgIconProps>> = {
  [CalloutType.Card]: LibraryBooksIcon,
  [CalloutType.Canvas]: FilterNoneIcon,
  [CalloutType.Comments]: NotesIcon,
};

export default calloutIcons;
