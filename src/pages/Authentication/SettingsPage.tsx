import { SettingsFlow } from '@ory/kratos-client';
import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import KratosUI from '../../components/Authentication/KratosUI';
import Typography from '../../components/core/Typography';
import { useKratosClient } from '../../hooks/useKratosClient';

interface RegisterPageProps {
  flow: string;
}

export const SettingsPage: FC<RegisterPageProps> = ({ flow }) => {
  const [settingsFlow, setSettingsFlow] = useState<SettingsFlow>();
  const kratos = useKratosClient();

  const { t } = useTranslation();

  useEffect(() => {
    if (flow && kratos) {
      kratos.getSelfServiceSettingsFlow(flow).then(({ status, data: flow, ..._response }) => {
        if (status !== 200) {
          console.error(flow);
        }
        setSettingsFlow(flow);
      });
    }
  }, [flow]);

  return (
    <Container fluid={'sm'}>
      <Row className={'d-flex justify-content-center'}>
        <Col sm={4}>
          <Typography variant={'h3'} className={'mt-4 mb-4'}></Typography>
          {t('pages.settings.header')}
          <KratosUI flow={settingsFlow} />
        </Col>
      </Row>
    </Container>
  );
};
export default SettingsPage;
