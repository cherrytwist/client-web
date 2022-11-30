import React, { FC, useMemo } from 'react';
import { useChallenge, useHub, useUpdateNavigation } from '../../../../hooks';
import ContextTabContainer from '../../../../containers/context/ContextTabContainer';
import ChallengePageLayout from '../layout/ChallengePageLayout';
import { EntityPageSection } from '../../../shared/layout/EntityPageSection';
import { ChallengeContextView } from '../views/ChallengeContextView';
import { PageProps } from '../../../shared/types/PageProps';

export interface ChallengeContextPageProps extends PageProps {}

const ChallengeContextPage: FC<ChallengeContextPageProps> = ({ paths }) => {
  const currentPaths = useMemo(() => [...paths, { value: '/context', name: 'context', real: false }], [paths]);
  useUpdateNavigation({ currentPaths });

  const { displayName: hubDisplayName } = useHub();
  const { hubId, hubNameId, displayName: challengeDisplayName, challengeId, challengeNameId } = useChallenge();

  return (
    <ChallengePageLayout currentSection={EntityPageSection.About}>
      <ContextTabContainer hubNameId={hubNameId} challengeNameId={challengeNameId}>
        {(entities, state) => (
          <ChallengeContextView
            entities={{
              hubId: hubId,
              hubNameId: hubNameId,
              hubDisplayName: hubDisplayName,
              challengeId,
              challengeNameId,
              challengeDisplayName,
              challengeTagset: entities.tagset,
              challengeLifecycle: entities.lifecycle,
              context: entities.context,
            }}
            state={{
              loading: state.loading,
              error: state.error,
            }}
            options={{
              canCreateCommunityContextReview: entities.permissions.canCreateCommunityContextReview,
            }}
            actions={{}}
            activity={entities.metrics}
          />
        )}
      </ContextTabContainer>
    </ChallengePageLayout>
  );
};
export default ChallengeContextPage;
