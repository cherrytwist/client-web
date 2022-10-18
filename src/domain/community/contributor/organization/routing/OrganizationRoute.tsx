import React, { FC, useMemo } from 'react';
import { Route, Routes } from 'react-router';
import { useResolvedPath } from 'react-router-dom';
import { Loading } from '../../../../../common/components/core';
import { EntityPageLayoutHolder } from '../../../../shared/layout/PageLayout';
import { useOrganization } from '../../../../../hooks';
import { Error404, PageProps } from '../../../../../pages';
import OrganizationPage from '../pages/OrganizationPage';

const rootPaths = [{ value: '/', name: 'organization', real: false }];

const OrganizationRoute: FC<PageProps> = () => {
  const { pathname: url } = useResolvedPath('.');
  const { organization, displayName, loading } = useOrganization();

  const currentPaths = useMemo(
    () => (organization ? [...rootPaths, { value: url, name: displayName, real: true }] : rootPaths),
    [organization, displayName, url]
  );

  if (loading) return <Loading />;

  if (!organization) {
    return <Error404 />;
  }

  return (
    <Routes>
      <Route path={'/'} element={<EntityPageLayoutHolder />}>
        <Route index element={<OrganizationPage paths={currentPaths} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default OrganizationRoute;
