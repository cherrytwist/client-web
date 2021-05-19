import React, { FC, useMemo } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { ListPage } from '../../components/Admin/ListPage';
import { managementData } from '../../components/Admin/managementData';
import ManagementPageTemplate from '../../components/Admin/ManagementPageTemplate';
import OppChallPage, { ProfileSubmitMode } from '../../components/Admin/OppChallPage';
import { SearchableListItem } from '../../components/Admin/SearchableList';
import {
  ChildChallengesDocument,
  useChallengeCommunityQuery,
  useChallengesWithCommunityQuery,
  useChildChallengesQuery,
  useDeleteChallengeMutation,
  useEcoverseCommunityQuery,
} from '../../generated/graphql';
import { useApolloErrorHandler } from '../../hooks/useApolloErrorHandler';
import { useUpdateNavigation } from '../../hooks/useNavigation';
import { FourOuFour, PageProps } from '../../pages';
import { AdminParameters } from './admin';
import { CommunityRoute } from './community';
import { OpportunitiesRoutes } from './opportunity';

export const ChallengesRoute: FC<PageProps> = ({ paths }) => {
  const { path, url } = useRouteMatch();
  const { data: challengesListQuery } = useChallengesWithCommunityQuery();

  const challengesList = challengesListQuery?.ecoverse?.challenges?.map(c => ({
    id: c.id,
    value: c.name,
    url: `${url}/${c.id}`,
    communityId: c.community?.id,
  }));

  const currentPaths = useMemo(() => [...paths, { value: url, name: 'challenges', real: true }], [
    paths,
    challengesListQuery?.ecoverse?.challenges,
  ]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ListPage paths={currentPaths} data={challengesList || []} newLink={`${url}/new`} />
      </Route>
      <Route path={`${path}/new`}>
        <OppChallPage mode={ProfileSubmitMode.createChallenge} paths={currentPaths} title="New challenge" />
      </Route>
      <Route exact path={`${path}/:challengeId/edit`}>
        <OppChallPage mode={ProfileSubmitMode.updateChallenge} paths={currentPaths} title="Edit challenge" />
      </Route>
      <Route path={`${path}/:challengeId`}>
        <ChallengeRoutes paths={currentPaths} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};

const ChallengeRoutes: FC<PageProps> = ({ paths }) => {
  const { path, url } = useRouteMatch();
  const { challengeId } = useParams<AdminParameters>();

  const { data } = useChallengeCommunityQuery({ variables: { id: challengeId } });
  const { data: ecoverseCommunity } = useEcoverseCommunityQuery();

  const currentPaths = useMemo(
    () => [...paths, { value: url, name: data?.ecoverse?.challenge?.name || '', real: true }],
    [paths, data?.ecoverse?.challenge?.name]
  );

  const community = data?.ecoverse?.challenge?.community;
  const parentMembers = ecoverseCommunity?.ecoverse?.community?.members || [];

  useUpdateNavigation({ currentPaths });

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ManagementPageTemplate data={managementData.challengeLvl} paths={currentPaths} />
      </Route>
      <Route path={`${path}/community`}>
        <CommunityRoute paths={currentPaths} community={community} parentMembers={parentMembers} />
      </Route>
      <Route path={`${path}/opportunities`}>
        <OpportunitiesRoutes paths={currentPaths} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};
export const ChallengeOpportunities: FC<PageProps> = ({ paths }) => {
  const { url } = useRouteMatch();
  const handleError = useApolloErrorHandler();

  const { challengeId } = useParams<AdminParameters>();
  const { data } = useChildChallengesQuery({ variables: { id: challengeId } });

  const opportunities = data?.ecoverse?.challenge?.challenges?.map(o => ({
    id: o.id,
    value: o.name,
    url: `${url}/${o.id}`,
  }));

  const [deleteChalllenge] = useDeleteChallengeMutation({
    refetchQueries: [{ query: ChildChallengesDocument }],
    awaitRefetchQueries: true,

    onError: handleError,
  });

  const handleDelete = (item: SearchableListItem) => {
    deleteChalllenge({
      variables: {
        input: {
          ID: Number(item.id),
        },
      },
    });
  };

  return <ListPage paths={paths} data={opportunities || []} newLink={`${url}/new`} onDelete={handleDelete} />;
};
