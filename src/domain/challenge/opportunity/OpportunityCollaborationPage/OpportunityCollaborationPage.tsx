import React from 'react';
import CalloutPage from '../../../collaboration/CalloutPage/CalloutPage';
import ContributePage from '../../../collaboration/contribute/ContributePage';
import { EntityPageSection } from '../../../shared/layout/EntityPageSection';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import { buildOpportunityUrl } from '../../../../common/utils/urlBuilders';
import { CollaborationPageProps } from '../../common/CollaborationPage/CollaborationPage';
import { CalloutsGroup } from '../../../collaboration/callout/CalloutsInContext/CalloutsGroup';
import OpportunityDashboardPage from '../pages/OpportunityDashboardPage';

const renderPage = (calloutGroup: string | undefined) => {
  switch (calloutGroup) {
    case CalloutsGroup.HomeLeft:
    case CalloutsGroup.HomeRight:
      return <OpportunityDashboardPage />;
    default:
      return <ContributePage journeyTypeName="opportunity" />;
  }
};

const OpportunityCollaborationPage = (props: CollaborationPageProps) => {
  const { hubNameId, challengeNameId, opportunityNameId } = useUrlParams();

  if (!hubNameId || !challengeNameId || !opportunityNameId) {
    throw new Error('Must be within an Opportunity');
  }

  const getPageRoute = (calloutGroup: string | undefined) => {
    switch (calloutGroup) {
      default:
        return `${buildOpportunityUrl(hubNameId, challengeNameId, opportunityNameId)}/${EntityPageSection.Contribute}`;
    }
  };

  return <CalloutPage journeyTypeName="opportunity" parentRoute={getPageRoute} renderPage={renderPage} {...props} />;
};

export default OpportunityCollaborationPage;
