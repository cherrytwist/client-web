import React, { FC, useCallback, useState } from 'react';
import { Link, useTheme } from '@mui/material';
import UpdatesContainer from './Components/UpdatesContainer';
import CloseButton from './Components/CloseButton';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../config/useConfig';
import { Caption } from '../../../../core/ui/typography';
import { ellipsis } from '../../../../core/ui/typography/constants';

interface ReleaseNotificationData {
  prevClientVersion: string;
}

const PlatformUpdates: FC = () => {
  const clientVersion = process.env.REACT_APP_VERSION || '';
  const theme = useTheme();
  const { platform } = useConfig();
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const { t } = useTranslation();

  const handleCloseNotification = useCallback(() => {
    const updatedReleaseNotificationData: ReleaseNotificationData = {
      prevClientVersion: clientVersion,
    };

    setIsNotificationVisible(false);
    localStorage.setItem('releaseNotification', JSON.stringify(updatedReleaseNotificationData));
  }, [setIsNotificationVisible, clientVersion]);

  return (
    <>
      {isNotificationVisible && (
        <UpdatesContainer>
          <Caption flexGrow={1} textAlign="center">
            {t('notifications.release-updates.text')}{' '}
            <Link
              href={platform?.releases ?? ''}
              underline="always"
              target="_blank"
              rel="noopener noreferrer"
              color={theme.palette.background.default}
            >
              {t('notifications.release-updates.link')}
            </Link>
            {ellipsis}
          </Caption>
          <CloseButton
            sx={{
              color: theme.palette.background.default,
            }}
            onClick={handleCloseNotification}
          />
        </UpdatesContainer>
      )}
    </>
  );
};

export default PlatformUpdates;
