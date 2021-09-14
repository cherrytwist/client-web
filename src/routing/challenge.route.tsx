import { Challenge as ChallengePage, FourOuFour, PageProps } from '../pages';
import { AuthorizationCredential, Challenge as ChallengeType, ChallengesQuery } from '../models/graphql-schema';
import React, { FC, useMemo } from 'react';
import { useEcoverse, useUserContext } from '../hooks';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { useChallengeProfileQuery } from '../hooks/generated/graphql';
import Loading from '../components/core/Loading/Loading';
import CommunityRoute from './community';
import ChallengeApplyRoute from './application/ChallengeApplyRoute';
import { RouteParameters } from './ecoverse';
import OpportunityRoute from './opportunity.route';

interface ChallengeRootProps extends PageProps {
  challenges: ChallengesQuery | undefined;
}

const ChallengeRoute: FC<ChallengeRootProps> = ({ paths, challenges }) => {
  const { ecoverseId, toEcoverseId } = useEcoverse();
  const { path, url } = useRouteMatch();
  const { challengeId: id } = useParams<RouteParameters>();
  const challengeId = challenges?.ecoverse.challenges?.find(x => x.nameID === id)?.id || '';

  const { user } = useUserContext();

  // todo: you don't need opportunities selected here
  const { data: query, loading: challengeLoading } = useChallengeProfileQuery({
    variables: {
      ecoverseId,
      challengeId,
    },
    errorPolicy: 'all',
  });

  const challenge = query?.ecoverse.challenge;

  const currentPaths = useMemo(
    () => (challenge ? [...paths, { value: url, name: challenge.displayName, real: true }] : paths),
    [paths, id, challenge]
  );

  const isAdmin = useMemo(
    () =>
      user?.hasCredentials(AuthorizationCredential.GlobalAdmin) ||
      user?.isEcoverseAdmin(toEcoverseId(ecoverseId)) ||
      user?.isChallengeAdmin(challenge?.id || '') ||
      false,
    [user, ecoverseId, challenge]
  );

  const loading = challengeLoading;

  if (loading) {
    return <Loading text={'Loading challenge'} />;
  }

  if (!challenge) {
    return <FourOuFour />;
  }

  return (
    <Switch>
      <Route path={`${path}/opportunities/:opportunityId`}>
        <OpportunityRoute opportunities={challenge.opportunities} paths={currentPaths} challengeUUID={challenge.id} />
      </Route>
      <Route exact path={path}>
        <ChallengePage challenge={challenge as ChallengeType} paths={currentPaths} permissions={{ edit: isAdmin }} />
      </Route>
      <Route path={`${path}/community`}>
        <CommunityRoute paths={currentPaths} />
      </Route>
      <Route path={path}>
        <ChallengeApplyRoute paths={currentPaths} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};
export default ChallengeRoute;
