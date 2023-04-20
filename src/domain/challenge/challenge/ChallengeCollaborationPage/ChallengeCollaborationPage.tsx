import React from 'react';
import CalloutPage from '../../../collaboration/CalloutPage/CalloutPage';
import ContributePage from '../../../collaboration/contribute/ContributePage';
import { EntityPageSection } from '../../../shared/layout/EntityPageSection';

const getPageRoute = (calloutGroup: string | undefined): EntityPageSection => {
  switch (calloutGroup) {
    default:
      return EntityPageSection.Contribute;
  }
};

const ChallengeCollaborationPage = () => {
  return (
    <CalloutPage journeyTypeName="challenge" parentRoute={getPageRoute}>
      {calloutGroup => {
        switch (calloutGroup) {
          // Add handling for groups here
          default:
            return <ContributePage journeyTypeName="hub" />;
        }
      }}
    </CalloutPage>
  );
};

export default ChallengeCollaborationPage;
