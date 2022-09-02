import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import OpportunityCard from '../../../common/components/composite/common/cards/OpportunityCard/OpportunityCard';
import { Loading } from '../../../common/components/core';
import CardFilter from '../../../common/components/core/card-filter/CardFilter';
import {
  entityTagsValueGetter,
  entityValueGetter,
} from '../../../common/components/core/card-filter/value-getters/entity-value-getter';
import ErrorBlock from '../../../common/components/core/ErrorBlock';
import {
  ChallengeContainerEntities,
  ChallengeContainerState,
} from '../../../containers/challenge/ChallengePageContainer';
import { Opportunity } from '../../../models/graphql-schema';
import CardsLayout from '../../shared/layout/CardsLayout/CardsLayout';
import { useChallenge } from '../hooks/useChallenge';

interface ChallengeOpportunitiesViewProps {
  entities: ChallengeContainerEntities;
  state: ChallengeContainerState;
}

export const ChallengeOpportunitiesView: FC<ChallengeOpportunitiesViewProps> = ({ entities, state }) => {
  const { t } = useTranslation();
  const opportunities = (entities.challenge?.opportunities ?? []) as Opportunity[];

  const { hubNameId, challengeNameId, loading: loadingChallengeContext } = useChallenge();

  if (loadingChallengeContext || state.loading) return <Loading />;

  if (state.error) {
    return (
      <Box display="flex" justifyContent="center">
        <ErrorBlock blockName={t('common.opportunities')} />
      </Box>
    );
  }

  if (opportunities.length <= 0) {
    return (
      <Box paddingBottom={2} display="flex" justifyContent="center">
        <Typography>{t('pages.challenge.sections.opportunities.body-missing')}</Typography>
      </Box>
    );
  }

  return (
    <CardFilter data={opportunities} tagsValueGetter={entityTagsValueGetter} valueGetter={entityValueGetter}>
      {filteredData => (
        <CardsLayout items={filteredData} deps={[hubNameId, challengeNameId]}>
          {opp => <OpportunityCard opportunity={opp} hubNameId={hubNameId} challengeNameId={challengeNameId} />}
        </CardsLayout>
      )}
    </CardFilter>
  );
};
