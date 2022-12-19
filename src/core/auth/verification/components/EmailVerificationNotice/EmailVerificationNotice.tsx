import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlockTitle } from '../../../../ui/typography';
import translateWithElements from '../../../../../domain/shared/i18n/TranslateWithElements/TranslateWithElements';
import { AUTH_VERIFY_PATH } from '../../../authentication/constants/authentication.constants';
import { Button } from '@mui/material';

const EmailVerificationNotice = () => {
  const { t } = useTranslation();
  const tLink = translateWithElements(<Link to="" />);

  return (
    <>
      <BlockTitle sx={{ textAlign: 'center', marginBottom: theme => theme.spacing(4) }}>
        {tLink('pages.verification-required.message', {
          again: { to: AUTH_VERIFY_PATH },
        })}
      </BlockTitle>
      <Button component={Link} to={'/'} variant="contained">
        {t('pages.verification-required.return-to-platform')}
      </Button>
    </>
  );
};

export default EmailVerificationNotice;
