import React from 'react';
import { useTranslation } from 'react-i18next';
import { BlockTitle } from '../../../../ui/typography';
import translateWithElements from '../../../../../domain/shared/i18n/TranslateWithElements/TranslateWithElements';
import { AUTH_VERIFY_PATH } from '../../../authentication/constants/authentication.constants';
import { Button, Link } from '@mui/material';

interface EmailVerificationNoticeProps {
  returnUrl: string;
}

const EmailVerificationNotice = ({ returnUrl }: EmailVerificationNoticeProps) => {
  const { t } = useTranslation();
  const tLink = translateWithElements(<Link />);

  return (
    <>
      <BlockTitle sx={{ textAlign: 'center', marginBottom: theme => theme.spacing(4) }}>
        {tLink('pages.verification-required.message', {
          again: { href: AUTH_VERIFY_PATH },
        })}
      </BlockTitle>
      <Button component={Link} href={returnUrl} variant="contained">
        {t('kratos.messages.verification-flow-continue')}
      </Button>
    </>
  );
};

export default EmailVerificationNotice;
