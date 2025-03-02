import CalloutPage from '@/domain/collaboration/CalloutPage/CalloutPage';
import SpaceDashboardPage from '../SpaceDashboard/SpaceDashboardPage';
import SpaceSubspacesPage from '../pages/SpaceSubspacesPage';
import KnowledgeBasePage from '@/domain/collaboration/KnowledgeBase/KnowledgeBasePage';
import { EntityPageSection } from '@/domain/shared/layout/EntityPageSection';
import { JourneyCalloutDialogProps } from '@/domain/journey/common/JourneyCalloutDialog/JourneyCalloutDialog';
import SpaceCommunityPage from '../SpaceCommunityPage/SpaceCommunityPage';
import { useSpace } from '../SpaceContext/useSpace';

const getPageSection = (calloutGroup: string | undefined): EntityPageSection => {
  switch (calloutGroup) {
    case CalloutGroupName.Home:
      return EntityPageSection.Dashboard;
    case CalloutGroupName.Community:
      return EntityPageSection.Community;
    case CalloutGroupName.Subspaces:
      return EntityPageSection.Subspaces;
    // case CalloutGroupName.Contribute: // In the past there was a tab called contribute ! remove?!
    case CalloutGroupName.Custom:
      return EntityPageSection.Custom;
    default:
      return EntityPageSection.KnowledgeBase;
  }
};

const renderPage = (calloutGroup: string | undefined) => {
  switch (calloutGroup) {
    case CalloutGroupName.Home:
      return <SpaceDashboardPage />;
    case CalloutGroupName.Subspaces:
      return <SpaceSubspacesPage />;
    case CalloutGroupName.Community:
      return <SpaceCommunityPage />;
    case CalloutGroupName.Custom: // There was a tab called contribute
      return <KnowledgeBasePage calloutsFlowState={EntityPageSection.Custom} />;
    default:
      return <KnowledgeBasePage calloutsFlowState={EntityPageSection.KnowledgeBase} />;
  }
};

const SpaceCalloutPage = (props: JourneyCalloutDialogProps) => {
  const { about } = useSpace();

  const getPageRoute = (calloutGroup: string | undefined) => {
    return `${about.profile.url}/${getPageSection(calloutGroup)}`;
  };

  return <CalloutPage parentRoute={getPageRoute} renderPage={renderPage} {...props} />;
};

export default SpaceCalloutPage;
