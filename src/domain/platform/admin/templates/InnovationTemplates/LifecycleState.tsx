import InfoIcon from '@mui/icons-material/Info';
import { Button, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lifecycle } from '../../../../../core/apollo/generated/graphql-schema';
import { LifecycleModal } from '../../../../../common/components/composite/common/MetricsPanel/StateMetricCardItem';

export interface LifecycleProps {
  lifecycle?: Pick<Lifecycle, 'machineDef' | 'state'>;
}

const LifecycleState: FC<LifecycleProps> = ({ lifecycle }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const state = lifecycle?.state || '';
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t('pages.activity.lifecycle-info') || ''} arrow placement="top" id="lifecycle-graph">
        <Button onClick={() => setModalVisible(true)} variant={'outlined'} startIcon={<InfoIcon />}>
          {`State: ${state}`}
        </Button>
      </Tooltip>
      {lifecycle && (
        <LifecycleModal
          lifecycle={lifecycle}
          show={modalVisible}
          onHide={() => {
            setModalVisible(false);
          }}
        />
      )}
    </>
  );
};

export default LifecycleState;
