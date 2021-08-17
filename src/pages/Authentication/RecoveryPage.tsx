import { RecoveryFlow } from '@ory/kratos-client';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { Box, Container } from '@material-ui/core';
import KratosUI from '../../components/Authentication/KratosUI';
import Loading from '../../components/core/Loading/Loading';
import Typography from '../../components/core/Typography';
import { useKratosClient } from '../../hooks';
import { logger } from '../../services/logging/winston/logger';
interface RegisterPageProps {
  flow: string;
}

export const RecoveryPage: FC<RegisterPageProps> = ({ flow }) => {
  const [recoveryFlow, setRecoveryFlow] = useState<RecoveryFlow>();
  const kratos = useKratosClient();

  const { t } = useTranslation();

  useEffect(() => {
    if (flow && kratos) {
      kratos
        .getSelfServiceRecoveryFlow(flow)
        .then(({ status, data: flow, ..._response }) => {
          if (status !== 200) {
            logger.error(flow);
          }
          setRecoveryFlow(flow);
        })
        .catch(err => {
          const response = err && err.response;
          if (response) {
            if (response.status === 410) {
              window.location.replace(response.data.error.details.redirect_to);
            }
          }
        });
    }
  }, [flow]);

  if (!recoveryFlow) return <Loading text={'Loading flow'} />;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item sm={4}>
          <Box marginY={3} textAlign={'center'}>
            <Typography variant={'h3'}>{t('pages.recovery.header')}</Typography>
          </Box>
          <KratosUI flow={recoveryFlow} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default RecoveryPage;
