import { Box } from '@mui/material';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CardFilter from '../../../../../common/components/core/card-filter/CardFilter';
import { buildChallengeUrl } from '../../../../../common/utils/urlBuilders';
import { useUserContext } from '../../../../../hooks';
import { RoleType } from '../../../../community/contributor/user/constants/RoleType';
import DashboardGenericSection from '../../../../shared/components/DashboardSections/DashboardGenericSection';
import CheckboxesFilter from '../../../../shared/components/CheckboxesFilter/CheckboxesFilter';
import { SearchChallengeCard } from '../../../../shared/components/search-cards';
import CardsLayout from '../../../../shared/layout/CardsLayout/CardsLayout';
import CardsLayoutScroller from '../../../../shared/layout/CardsLayout/CardsLayoutScroller';
import {
  SimpleChallenge,
  simpleChallengeValueGetter,
  simpleChallengeTagsValueGetter,
  simpleChallengeHubDataGetter,
} from '../../containers/ChallengeExplorerContainer';

export interface ChallengesListProps {
  headerText: string;
  headerCounter?: number;
  subHeaderText: string;
  challenges: SimpleChallenge[];
  enableFilterByHub?: boolean;
}

const ChallengesList: FC<ChallengesListProps> = ({
  headerText,
  headerCounter,
  subHeaderText,
  challenges,
  enableFilterByHub = false,
}) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const getCardLabel = useCallback(
    (roles: string[]) => {
      return roles.find(r => r === RoleType.Lead) || roles.find(r => r === RoleType.Member);
    },
    [user]
  );

  return (
    <DashboardGenericSection
      headerText={headerText}
      headerCounter={headerCounter}
      subHeaderText={subHeaderText}
      options={{ overflowVisible: true }}
    >
      <CheckboxesFilter
        enable={enableFilterByHub}
        items={challenges}
        filterableDataGetter={simpleChallengeHubDataGetter}
        sx={{ top: theme => theme.spacing(-10) }}
      >
        {filteredByHubChallenges => (
          <CardFilter
            data={filteredByHubChallenges}
            valueGetter={simpleChallengeValueGetter}
            tagsValueGetter={simpleChallengeTagsValueGetter}
          >
            {filteredChallenges => (
              <CardsLayoutScroller maxHeight={43} sx={{ marginRight: 0 }}>
                <CardsLayout items={filteredChallenges}>
                  {challenge =>
                    challenge && (
                      <SearchChallengeCard
                        name={challenge.displayName}
                        tagline={challenge.tagline}
                        image={challenge.imageUrl}
                        matchedTerms={challenge.matchedTerms ?? []}
                        label={getCardLabel(challenge.roles)}
                        url={buildChallengeUrl(challenge.hubNameId, challenge.nameID)}
                        parentName={challenge.hubDisplayName}
                      />
                    )
                  }
                </CardsLayout>
                {filteredChallenges.length === 0 && <Box>{t('pages.challenge-explorer.search.no-results')}</Box>}
              </CardsLayoutScroller>
            )}
          </CardFilter>
        )}
      </CheckboxesFilter>
    </DashboardGenericSection>
  );
};

export default ChallengesList;
