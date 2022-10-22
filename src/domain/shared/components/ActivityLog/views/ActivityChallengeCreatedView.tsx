import React, { FC } from 'react';
import { ActivityBaseView } from './ActivityBaseView';
import { ActivityViewProps } from './ActivityViewProps';
import { useTranslation } from 'react-i18next';
import { buildChallengeUrl } from '../../../../../common/utils/urlBuilders';

export interface ActivityChallengeCreatedViewProps extends ActivityViewProps {}

export const ActivityChallengeCreatedView: FC<ActivityChallengeCreatedViewProps> = props => {
  const { t } = useTranslation();
  const action = t('components.activity-log-view.actions.challenge-created');
  const url = buildChallengeUrl(challenge.hubNameId, challenge.nameID);

  return <ActivityBaseView action={action} url={url} {...props} />;
};
