import React from 'react';
import CalloutPage from '../../../collaboration/CalloutPage/CalloutPage';
import ContributePage from '../../../collaboration/contribute/ContributePage';
import { EntityPageSection } from '../../../shared/layout/EntityPageSection';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import { buildOpportunityUrl } from '../../../../common/utils/urlBuilders';
import { CollaborationPageProps } from '../../common/CollaborationPage/CollaborationPage';
import OpportunityDashboardPage from '../pages/OpportunityDashboardPage';
import { CalloutDisplayLocation } from '../../../../core/apollo/generated/graphql-schema';

const renderPage = (calloutGroup: string | undefined) => {
  switch (calloutGroup) {
    case CalloutDisplayLocation.CommonHomeTop:
      return <OpportunityDashboardPage />;
    default:
      return <ContributePage journeyTypeName="opportunity" />;
  }
};

const OpportunityCollaborationPage = (props: CollaborationPageProps) => {
  const { spaceNameId, challengeNameId, opportunityNameId } = useUrlParams();

  if (!spaceNameId || !challengeNameId || !opportunityNameId) {
    throw new Error('Must be within an Opportunity');
  }

  const getPageRoute = (calloutGroup: string | undefined) => {
    switch (calloutGroup) {
      default:
        return `${buildOpportunityUrl(spaceNameId, challengeNameId, opportunityNameId)}/${
          EntityPageSection.Contribute
        }`;
    }
  };

  return <CalloutPage journeyTypeName="opportunity" parentRoute={getPageRoute} renderPage={renderPage} {...props} />;
};

export default OpportunityCollaborationPage;
