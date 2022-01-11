import React, { FC } from 'react';
import { Route, Routes, useRouteMatch } from 'react-router-dom';
import { Error404 } from '../../pages';
import { Path } from '../../context/NavigationProvider';
import ApplicationPage from '../../components/Admin/Community/ApplicationPage';
import { ApplicationInfoFragment } from '../../models/graphql-schema';
import ApplicationDetailsPage from '../../components/Admin/Community/ApplicationDetailsPage';
import { nameOfUrl } from '../url-params';

interface Props {
  paths: Path[];
  applications: ApplicationInfoFragment[];
}

export const ApplicationRoute: FC<Props> = ({ paths, applications }) => {
  const { path } = useRouteMatch();

  return (
    <Routes>
      <Route exact path={`${path}/:${nameOfUrl.applicationId}`}>
        <ApplicationDetailsPage />
      </Route>
      <Route path={path}>
        <ApplicationPage paths={paths} applications={applications} />
      </Route>
      <Route path="*">
        <Error404 />
      </Route>
    </Routes>
  );
};
