import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTransactionScope } from '../../../../../core/analytics/useSentry';
import { useSpace } from '../../../../challenge/space/SpaceContext/useSpace';
import { Error404 } from '../../../../../core/pages/Errors/Error404';
import SpaceCommunicationsPage from '../../../../challenge/space/pages/SpaceCommunication/SpaceCommunicationsPage';
import SpaceProfilePage from '../../../../challenge/space/pages/SpaceProfile/SpaceProfilePage';
import SpaceSettingsPage from '../../../../challenge/space/pages/SpaceSettings/SpaceSettingsPage';
import { ChallengesRoute } from '../../challenge/routing/ChallengesRoute';
import { ApplicationsAdminRoutes } from '../../community/routes/ApplicationsAdminRoutes';
import SpaceTemplatesAdminRoutes from '../SpaceTemplatesAdminRoutes';
import CommunityGroupsRoute from '../../community/routes/CommunityGroupsAdminRoutes';
import SpaceContextPage from '../../../../challenge/space/pages/SpaceContext/SpaceContextPage';
import SpaceStorageAdminPage from '../storage/SpaceStorageAdminPage';
import { StorageConfigContextProvider } from '../../../storage/StorageBucket/StorageConfigContext';
import SpaceCommunityPage from '../../../../challenge/space/pages/SpaceCommunity/SpaceCommunityPage';

export const SpaceRoute: FC = () => {
  useTransactionScope({ type: 'admin' });
  const { spaceId, communityId } = useSpace();

  return (
    <StorageConfigContextProvider locationType="journey" journeyTypeName="space" spaceNameId={spaceId}>
      <Routes>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<SpaceProfilePage />} />
        <Route path="settings" element={<SpaceSettingsPage />} />
        <Route path="context" element={<SpaceContextPage />} />
        <Route path="community" element={<SpaceCommunityPage />} />
        <Route path="communications" element={<SpaceCommunicationsPage communityId={communityId} />} />
        <Route path="templates/*" element={<SpaceTemplatesAdminRoutes spaceId={spaceId} />} />
        <Route path="storage" element={<SpaceStorageAdminPage spaceId={spaceId} />} />
        <Route path="community/groups/*" element={<CommunityGroupsRoute communityId={communityId} />} />
        <Route path="community/applications/*" element={<ApplicationsAdminRoutes />} />
        <Route path="challenges/*" element={<ChallengesRoute />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </StorageConfigContextProvider>
  );
};
