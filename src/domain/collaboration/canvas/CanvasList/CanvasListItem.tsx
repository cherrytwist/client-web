import { Delete } from '@mui/icons-material';
import {
  alpha,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';
import { AuthorizationPrivilege, CanvasDetailsFragment } from '../../../../core/apollo/generated/graphql-schema';
import { Identifiable } from '../../../shared/types/Identifiable';
import CircleIcon from '@mui/icons-material/Circle';

const useStyles = makeStyles(theme => ({
  active: {
    background: alpha(theme.palette.primary.light, 0.5),
  },
}));

export interface CanvasListItemCanvas extends Identifiable {
  displayName: string;
  authorization?: CanvasDetailsFragment['authorization'];
  checkout?: CanvasDetailsFragment['checkout'];
}

interface CanvasListItemProps extends ListItemButtonProps {
  canvas: CanvasListItemCanvas;
  onDelete?: (canvas: CanvasListItemCanvas) => void;
  canDelete?: boolean;
  isSelected?: boolean;
}

export const CanvasListItemSkeleton: FC<ListItemProps> = props => {
  return (
    <ListItem {...props}>
      <ListItemAvatar sx={{ display: 'flex' }}>
        <Skeleton variant="circular" sx={{ width: '1.2em' }} />
      </ListItemAvatar>
      <ListItemText primary={<Skeleton variant="text" />} />
    </ListItem>
  );
};

export const CanvasListItem: FC<CanvasListItemProps> = ({ canvas, canDelete, isSelected, onDelete, ...rest }) => {
  const hasDeletePermissions = canvas.authorization?.myPrivileges?.some(x => x === AuthorizationPrivilege.Delete);

  const styles = useStyles();

  return (
    <ListItemButton {...rest} className={clsx(isSelected && styles.active)}>
      <ListItemAvatar sx={{ display: 'flex' }}>
        <CircleIcon color="disabled" />
      </ListItemAvatar>
      <ListItemText primary={canvas.displayName} />
      <ListItemSecondaryAction>
        {canDelete && hasDeletePermissions && onDelete && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              onDelete(canvas);
            }}
          >
            <Delete />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

export default CanvasListItem;
