import React, { FC, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { managementData } from '../../../components/Admin/managementData';
import { useEcoverse, useTransactionScope } from '../../../hooks';
import { AuthorizationCredential } from '../../../models/graphql-schema';
import { Error404, PageProps } from '../../../pages';
import EditEcoverse from '../../../pages/Admin/Ecoverse/EditEcoverse';
import ManagementPageTemplatePage from '../../../pages/Admin/ManagementPageTemplatePage';
import { buildEcoverseUrl } from '../../../utils/urlBuilders';
import { ChallengesRoute } from '../challenge/ChallengesRoute';
import { CommunityRoute } from '../community';
import EcoverseAuthorizationRoute from './EcoverseAuthorizationRoute';

interface EcoverseAdminRouteProps extends PageProps {}

export const EcoverseRoute: FC<EcoverseAdminRouteProps> = ({ paths }) => {
  useTransactionScope({ type: 'admin' });
  const { ecoverseId, ecoverseNameId, ecoverse, loading: loadingEcoverse } = useEcoverse();
  const { path, url } = useRouteMatch();

  const currentPaths = useMemo(
    () => [...paths, { value: url, name: ecoverse?.displayName || '', real: true }],
    [paths, ecoverse]
  );

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ManagementPageTemplatePage
          data={managementData.ecoverseLvl}
          paths={currentPaths}
          title={ecoverse?.displayName}
          entityUrl={buildEcoverseUrl(ecoverseNameId)}
          loading={loadingEcoverse}
        />
      </Route>
      <Route path={`${path}/edit`}>
        <EditEcoverse paths={currentPaths} />
      </Route>
      <Route path={`${path}/community`}>
        <CommunityRoute
          paths={currentPaths}
          communityId={ecoverse?.community?.id}
          credential={AuthorizationCredential.EcoverseMember}
          resourceId={ecoverseId}
          accessedFrom="ecoverse"
        />
      </Route>
      <Route path={`${path}/challenges`}>
        <ChallengesRoute paths={currentPaths} />
      </Route>
      <Route path={`${path}/authorization`}>
        <EcoverseAuthorizationRoute paths={currentPaths} resourceId={ecoverseId} />
      </Route>
      <Route path="*">
        <Error404 />
      </Route>
    </Switch>
  );
};
