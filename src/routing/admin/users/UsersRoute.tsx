import React, { FC, useMemo } from 'react';
import { Route, Routes, useResolvedPath } from 'react-router-dom';
import { EditMode } from '../../../models/editMode';
import { Error404, PageProps } from '../../../pages';
import { UserListPage } from '../../../pages/Admin/User/UserListPage';
import { UserPage } from '../../../pages/Admin/User/UserPage';
import { nameOfUrl } from '../../url-params';

export const UsersRoute: FC<PageProps> = ({ paths }) => {
  const { pathname: url } = useResolvedPath('.');

  const currentPaths = useMemo(() => [...paths, { value: url, name: 'users', real: true }], [paths]);

  return (
    <Routes>
      <Route path={'/'}>
        <Route index element={<UserListPage paths={currentPaths} />}></Route>
        {/* creating users is disabled */}
        {/* <Route path={`new`}>
        <UserPage mode={EditMode.new} paths={currentPaths} title="New user" />
      </Route> */}
        <Route
          path={`:${nameOfUrl.userId}/edit`}
          element={<UserPage paths={currentPaths} mode={EditMode.edit} />}
        ></Route>
        <Route
          path={`:${nameOfUrl.userId}`}
          element={<UserPage paths={currentPaths} mode={EditMode.readOnly} />}
        ></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Route>
    </Routes>
  );
};
