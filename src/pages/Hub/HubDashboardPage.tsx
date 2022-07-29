import React, { FC, useMemo } from 'react';
import HubPageContainer from '../../containers/hub/HubPageContainer';
import { useUpdateNavigation } from '../../hooks';
import HubDashboardView from '../../views/Hub/HubDashboardView';
import { PageProps } from '../common';
import { getVisualBanner } from '../../utils/visuals.utils';
import { DiscussionsProvider } from '../../context/Discussions/DiscussionsProvider';
import PageLayout from '../../domain/shared/layout/PageLayout';
import { EntityPageSection } from '../../domain/shared/layout/EntityPageSection';
import CommunityUpdatesDialog from '../../domain/community/CommunityUpdatesDialog/CommunityUpdatesDialog';
import useBackToParentPage from '../../domain/shared/utils/useBackToParentPage';
import { useLastPathUrl } from '../../hooks/usePathUtils';

export interface HubDashboardPageProps extends PageProps {
  dialog?: 'updates'; // | ... Pending, add more dialogs here.
}

const HubDashboardPage: FC<HubDashboardPageProps> = ({ paths, dialog }) => {
  const hubUrl = useLastPathUrl(paths);
  const currentPaths = useMemo(() => [...paths, { value: '', name: 'dashboard', real: false }], [paths]);
  useUpdateNavigation({ currentPaths });

  const [backToDashboard] = useBackToParentPage(`${hubUrl + '/dashboard'}`);

  return (
    <DiscussionsProvider>
      <PageLayout currentSection={EntityPageSection.Dashboard} entityTypeName="hub">
        <HubPageContainer>
          {(entities, state) => (
            <>
              <HubDashboardView
                title={entities.hub?.displayName}
                bannerUrl={getVisualBanner(entities.hub?.context?.visuals)}
                tagline={entities.hub?.context?.tagline}
                vision={entities.hub?.context?.vision}
                hubId={entities.hub?.id}
                hubNameId={entities.hub?.nameID}
                communityId={entities.hub?.community?.id}
                organizationNameId={entities.hub?.host?.nameID}
                activity={entities.activity}
                challenges={entities.challenges}
                discussions={entities.discussionList}
                aspects={entities.aspects}
                aspectsCount={entities.aspectsCount}
                canvases={entities.canvases}
                canvasesCount={entities.canvasesCount}
                loading={state.loading}
                isMember={entities.isMember}
                communityReadAccess={entities.permissions.communityReadAccess}
                challengesReadAccess={entities.permissions.challengesReadAccess}
                memberUsers={entities.memberUsers}
                memberUsersCount={entities.memberUsersCount}
                memberOrganizations={entities.memberOrganizations}
                memberOrganizationsCount={entities.memberOrganizationsCount}
                leadUsers={entities.hub?.community?.leadUsers}
                hostOrganization={entities.hub?.host}
              />
              <CommunityUpdatesDialog
                open={dialog === 'updates'}
                onClose={backToDashboard}
                hubId={entities.hub?.id}
                communityId={entities.hub?.community?.id}
              />
            </>
          )}
        </HubPageContainer>
      </PageLayout>
    </DiscussionsProvider>
  );
};
export default HubDashboardPage;
