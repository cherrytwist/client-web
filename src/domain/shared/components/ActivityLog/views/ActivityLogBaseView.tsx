import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { formatTimeElapsed } from '../../../utils/formatTimeElapsed';
import AuthorAvatar from '../../AuthorAvatar/AuthorAvatar';
import { Author } from '../../AuthorAvatar/models/author';
import { ClampedTypography } from '../../ClampedTypography';
import { adjustServerDateForTimezone } from '../../../utils/adjustServerDateForTimezone';

export interface ActivityLogBaseViewProps {
  author: Author | undefined;
  createdDate: Date | string;
  action: string;
  description: string;
  loading?: boolean;
}

export const ActivityLogBaseView: FC<ActivityLogBaseViewProps> = ({
  author,
  createdDate,
  action,
  description,
  loading,
}) => {
  const { t } = useTranslation();
  const formattedTime = useMemo(() => formatTimeElapsed(adjustServerDateForTimezone(createdDate)), [createdDate]);

  const title = useMemo(
    () => `${formattedTime} ${author?.displayName ?? t('common.user')} ${action}`,
    [formattedTime, author?.displayName, action]
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {loading ? (
        <Skeleton>
          <AuthorAvatar author={undefined} />
        </Skeleton>
      ) : (
        <AuthorAvatar author={author} />
      )}
      <Box sx={theme => ({ marginLeft: theme.spacing(2), flexGrow: 1 })}>
        <Typography variant="caption">{loading ? <Skeleton width="60%" /> : title}</Typography>
        <ClampedTypography clamp={2}>{loading ? <Skeleton /> : description}</ClampedTypography>
      </Box>
    </Box>
  );
};
