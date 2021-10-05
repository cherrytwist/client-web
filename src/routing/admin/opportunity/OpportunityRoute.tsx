import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EditOpportunity from '../../../components/Admin/EditOpportunity';
import FormMode from '../../../components/Admin/FormMode';
import { managementData } from '../../../components/Admin/managementData';
import { useChallenge, useOpportunity } from '../../../hooks';
import { AuthorizationCredential } from '../../../models/graphql-schema';
import { FourOuFour, PageProps } from '../../../pages';
import ManagementPageTemplatePage from '../../../pages/Admin/ManagementPageTemplatePage';
import { buildOpportunityUrl } from '../../../utils/urlBuilders';
import { CommunityRoute } from '../community';
import OpportunityAuthorizationRoute from './OpportunityAuthorizationRoute';
import OpportunityLifecycleRoute from './OpportunityLifecycleRoute';

interface Props extends PageProps {}

export const OpportunityRoute: FC<Props> = ({ paths }) => {
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();
  const { challenge, loading: loadingChallenge } = useChallenge();
  const {
    opportunity,
    opportunityId,
    opportunityNameId,
    ecoverseNameId,
    challengeNameId,
    displayName,
    loading: loadingOpportunity,
  } = useOpportunity();

  const currentPaths = useMemo(
    () => [...paths, { value: url, name: displayName || '', real: true }],
    [paths, displayName, url]
  );

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ManagementPageTemplatePage
          data={managementData.opportunityLvl}
          paths={currentPaths}
          title={displayName}
          entityUrl={buildOpportunityUrl(ecoverseNameId, challengeNameId, opportunityNameId)}
          loading={loadingOpportunity || loadingChallenge}
        />
      </Route>
      <Route exact path={`${path}/edit`}>
        <EditOpportunity title={t('navigation.admin.opportunity.edit')} mode={FormMode.update} paths={currentPaths} />
      </Route>
      <Route path={`${path}/community`}>
        <CommunityRoute
          paths={currentPaths}
          communityId={opportunity?.community?.id}
          parentCommunityId={challenge?.community?.id}
          credential={AuthorizationCredential.OpportunityMember}
          resourceId={opportunityId}
          accessedFrom="opportunity"
        />
      </Route>
      <Route path={`${path}/lifecycle`}>
        <OpportunityLifecycleRoute paths={currentPaths} />
      </Route>
      <Route path={`${path}/authorization`}>
        <OpportunityAuthorizationRoute paths={currentPaths} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};
