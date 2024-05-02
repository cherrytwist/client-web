import { gutters } from '../../../../core/ui/grid/utils';
import { Box } from '@mui/material';
import React, { useRef } from 'react';
import BackButton from '../../../../core/ui/actions/BackButton';
import ApplicationButton from '../../../community/application/applicationButton/ApplicationButton';
import ApplicationButtonContainer, {
  ApplicationButtonContainerProps,
} from '../../../community/application/containers/ApplicationButtonContainer';
import PageContentRibbon from '../../../../core/ui/content/PageContentRibbon';
import { LockOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useNavigate from '../../../../core/routing/useNavigate';
import JourneyAboutDialog, { JourneyAboutDialogProps } from '../JourneyAboutDialog/JourneyAboutDialog';
import useCanGoBack from '../../../../core/routing/useCanGoBack';
import { useRouteResolver } from '../../../../main/routing/resolvers/RouteResolver';

interface JourneyUnauthorizedDialogProps
  extends Omit<JourneyAboutDialogProps, 'open' | 'startButton' | 'endButton'>,
    Omit<ApplicationButtonContainerProps, 'children'> {
  authorized: boolean | undefined;
  disabled?: boolean;
  loading?: boolean;
}

const JourneyUnauthorizedDialog = ({
  authorized,
  loading = false,
  disabled = false,
  subspaceId: challengeId,
  subspaceName: challengeName,
  journeyLevel,
  ...aboutDialogProps
}: JourneyUnauthorizedDialogProps) => {
  const { t } = useTranslation();

  const { journeyId } = useRouteResolver();

  const navigate = useNavigate();

  const canGoBack = useCanGoBack();

  const applicationButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // applicationButtonRef.current.disabled needs to be defined and false
  // or just an anchor
  const showRibbon = () =>
    applicationButtonRef.current != null &&
    (applicationButtonRef.current instanceof HTMLAnchorElement ||
      (applicationButtonRef.current instanceof HTMLButtonElement && !applicationButtonRef.current.disabled));

  return (
    <JourneyAboutDialog
      open={!disabled && !loading && !authorized}
      startButton={canGoBack && <BackButton onClick={() => navigate(-1)} />}
      endButton={
        <ApplicationButtonContainer {...{ subspaceId: challengeId, subspaceName: challengeName }}>
          {(e, s) => (
            <ApplicationButton
              ref={applicationButtonRef}
              {...e?.applicationButtonProps}
              loading={s.loading}
              journeyId={journeyId}
              journeyLevel={journeyLevel}
            />
          )}
        </ApplicationButtonContainer>
      }
      ribbon={
        showRibbon() && (
          <PageContentRibbon onClick={() => applicationButtonRef.current?.click()} sx={{ cursor: 'pointer' }}>
            <Box display="flex" gap={gutters(0.5)} alignItems="center" justifyContent="center">
              <LockOutlined fontSize="small" />
              {t('components.journeyUnauthorizedDialog.message')}
            </Box>
          </PageContentRibbon>
        )
      }
      journeyLevel={journeyLevel}
      {...aboutDialogProps}
    />
  );
};

export default JourneyUnauthorizedDialog;
