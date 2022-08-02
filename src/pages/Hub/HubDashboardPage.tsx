import React, { FC } from 'react';
import HubPageContainer from '../../containers/hub/HubPageContainer';
import HubDashboardView from '../../views/Hub/HubDashboardView';
import { DiscussionsProvider } from '../../context/Discussions/DiscussionsProvider';
import { EntityPageSection } from '../../domain/shared/layout/EntityPageSection';
import HubPageLayout from '../../domain/hub/layout/HubPageLayout';

export interface HubDashboardPageProps {}

const HubDashboardPage: FC<HubDashboardPageProps> = () => {
  return (
    <DiscussionsProvider>
      <HubPageLayout currentSection={EntityPageSection.Dashboard} entityTypeName="hub">
        <HubPageContainer>
          {(entities, state) => (
            <HubDashboardView
              vision={entities.hub?.context?.vision}
              hubId={entities.hub?.id}
              hubNameId={entities.hub?.nameID}
              communityId={entities.hub?.community?.id}
              organizationNameId={entities.hub?.host?.nameID}
              activity={entities.activity}
              challenges={entities.challenges}
              aspects={entities.aspects}
              aspectsCount={entities.aspectsCount}
              canvases={entities.canvases}
              canvasesCount={entities.canvasesCount}
              loading={state.loading}
              communityReadAccess={entities.permissions.communityReadAccess}
              challengesReadAccess={entities.permissions.challengesReadAccess}
              memberUsers={entities.memberUsers}
              memberUsersCount={entities.memberUsersCount}
              memberOrganizations={entities.memberOrganizations}
              memberOrganizationsCount={entities.memberOrganizationsCount}
            />
          )}
        </HubPageContainer>
      </HubPageLayout>
    </DiscussionsProvider>
  );
};
export default HubDashboardPage;
