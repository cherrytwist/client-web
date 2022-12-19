import BatchPredictionOutlinedIcon from '@mui/icons-material/BatchPredictionOutlined';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  journeyCardTagsGetter,
  journeyCardValueGetter,
} from '../../../../common/components/core/card-filter/value-getters/journey-card-value-getter';
import { buildOpportunityUrl } from '../../../../common/utils/urlBuilders';
import { getVisualBanner } from '../../../common/visual/utils/visuals.utils';
import { JourneyCreationDialog } from '../../../shared/components/JorneyCreationDialog';
import { JourneyFormValues } from '../../../shared/components/JorneyCreationDialog/JourneyCreationForm';
import { EntityPageSection } from '../../../shared/layout/EntityPageSection';
import { useJourneyCreation } from '../../../shared/utils/useJourneyCreation/useJourneyCreation';
import JourneySubentitiesView from '../../common/tabs/Subentities/JourneySubentitiesView';
import { CreateOpportunityForm } from '../../opportunity/forms/CreateOpportunityForm';
import { OpportunityIcon } from '../../opportunity/icon/OpportunityIcon';
import OpportunityCard from '../../opportunity/OpportunityCard/OpportunityCard';
import ChallengePageContainer from '../containers/ChallengePageContainer';
import { useChallenge } from '../hooks/useChallenge';
import ChallengePageLayout from '../layout/ChallengePageLayout';

export interface ChallengeOpportunityPageProps {}

const ChallengeOpportunityPage: FC<ChallengeOpportunityPageProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hubNameId, challengeId, challengeNameId, permissions } = useChallenge();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { createOpportunity } = useJourneyCreation();

  const handleCreate = useCallback(
    async (value: JourneyFormValues) => {
      const result = await createOpportunity({
        challengeID: challengeId,
        displayName: value.displayName,
        tagline: value.tagline,
        vision: value.vision,
        tags: value.tags,
      });

      if (!result) {
        return;
      }

      // delay the navigation so all other processes related to updating the cache
      // and closing all subscriptions are completed
      setTimeout(() => navigate(buildOpportunityUrl(hubNameId, challengeNameId, result.nameID)), 100);
    },
    [navigate, createOpportunity, hubNameId, challengeId, challengeNameId]
  );

  return (
    <ChallengePageLayout currentSection={EntityPageSection.Opportunities}>
      <ChallengePageContainer>
        {(entities, state) => (
          <JourneySubentitiesView
            hubNameId={hubNameId}
            childEntities={entities.challenge?.opportunities}
            childEntitiesIcon={<OpportunityIcon />}
            childEntityReadAccess
            getChildEntityUrl={entity => buildOpportunityUrl(hubNameId, challengeNameId, entity.nameID)}
            childEntityValueGetter={journeyCardValueGetter}
            childEntityTagsGetter={journeyCardTagsGetter}
            journeyTypeName="challenge"
            state={{ loading: state.loading, error: state.error }}
            renderChildEntityCard={opportunity => (
              <OpportunityCard
                displayName={opportunity.displayName}
                tagline={opportunity.context?.tagline!}
                tags={opportunity.tagset?.tags!}
                bannerUri={getVisualBanner(opportunity.context?.visuals)!}
                journeyUri={buildOpportunityUrl(entities.hubNameId, entities.challenge!.nameID, opportunity.nameID)}
              />
            )}
            childEntityCreateAccess={permissions.canCreateOpportunity}
            childEntityOnCreate={() => setCreateDialogOpen(true)}
            createSubentityDialog={
              <JourneyCreationDialog
                open={createDialogOpen}
                icon={<BatchPredictionOutlinedIcon />}
                journeyName={t('common.opportunity')}
                onClose={() => setCreateDialogOpen(false)}
                OnCreate={handleCreate}
                formComponent={CreateOpportunityForm}
              />
            }
          />
        )}
      </ChallengePageContainer>
    </ChallengePageLayout>
  );
};

export default ChallengeOpportunityPage;
