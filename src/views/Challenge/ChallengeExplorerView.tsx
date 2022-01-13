import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '../../components/composite/common/Accordion/Accordion';
import SearchComponent from '../../components/composite/common/SearchComponent/SearchComponent';
import DashboardGenericSection from '../../components/composite/common/sections/DashboardGenericSection';
import { ChallengeCardContainer } from '../../containers/challenge/ChallengeCardContainer';
import EcoverseChallengesContainer from '../../containers/ecoverse/EcoverseChallengesContainer';
import ChallengeExplorerSearchView, {
  ChallengeExplorerGroupByType,
} from './ChallengeExplorer/ChallengeExplorerSearchView';
import ChallengeCard from '../../components/composite/common/cards/ChallengeCard/ChallengeCard';
import { CardWrapper, CardWrapperItem } from '../../components/core/CardWrapper/CardWrapper';

// const groupByOptions = [
//   {
//     label: 'Hub',
//     value: 'hub',
//   },
// ];

export interface HubOverview {
  ecoverseID: string;
  nameID: string;
  displayName: string;
}

interface ChallengeOverview {
  id: string;
  ecoverseId: string;
}

export interface ChallengeExplorerViewProps {
  myChallenges?: ChallengeOverview[];
  hubs?: HubOverview[];
}

export const ChallengeExplorerView: FC<ChallengeExplorerViewProps> = ({ myChallenges, hubs }) => {
  const { t } = useTranslation();
  const [groupBy] = useState<ChallengeExplorerGroupByType>('hub');
  const [searchTerms, setSearchTerms] = useState<string[]>([]);

  const onSearchHandler = (terms: string[]) => setSearchTerms(terms);

  return (
    <Box paddingY={2}>
      <Grid container rowSpacing={4}>
        {myChallenges && (
          <Grid item xs={12}>
            <Accordion
              title={t('pages.challenge-explorer.my.title', { count: myChallenges.length })}
              subtitle={t('pages.challenge-explorer.my.subtitle')}
              helpText={t('pages.challenge-explorer.my.help-text')}
              ariaKey="my-challenges"
            >
              <CardWrapper>
                {myChallenges.map(({ ecoverseId, id: challengeId }, i) => (
                  <ChallengeCardContainer key={i} ecoverseNameId={ecoverseId} challengeNameId={challengeId}>
                    {({ challenge }) =>
                      challenge && (
                        <CardWrapperItem>
                          <ChallengeCard challenge={challenge} ecoverseNameId={ecoverseId} />
                        </CardWrapperItem>
                      )
                    }
                  </ChallengeCardContainer>
                ))}
              </CardWrapper>
            </Accordion>
          </Grid>
        )}
        <Grid item xs={12}>
          <DashboardGenericSection
            headerText={t('pages.challenge-explorer.search.title')}
            subHeaderText={t('pages.challenge-explorer.search.subtitle')}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SearchComponent
                  placeholder={t('pages.challenge-explorer.search.placeholder')}
                  onChange={onSearchHandler}
                />
              </Grid>
              {/* <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Group by</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={groupBy}
                    label="Group by"
                    onChange={e => setGroupBy(e.target.value as ChallengeExplorerGroupByType)}
                  >
                    {groupByOptions.map(({ label, value }, i) => (
                      <MenuItem key={i} value={value} disabled={true}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
          </DashboardGenericSection>
        </Grid>
        <Grid item xs={12}>
          <Box paddingTop={2}>
            <ChallengeExplorerSearchView terms={searchTerms} groupBy={groupBy} />
          </Box>
        </Grid>
        {hubs &&
          hubs.map(({ displayName: hubName, nameID: hubNameId }, i) => (
            <EcoverseChallengesContainer
              key={i}
              entities={{
                ecoverseNameId: hubNameId,
              }}
            >
              {cEntities => (
                <Grid item xs={12}>
                  <Accordion
                    title={t('pages.challenge-explorer.hubs.title', {
                      count: cEntities.challenges.length,
                      name: hubName,
                    })}
                    subtitle={t('pages.challenge-explorer.hubs.subtitle', { name: hubName })}
                    helpText={t('pages.challenge-explorer.hubs.help-text')}
                    ariaKey={hubName}
                  >
                    <CardWrapper>
                      {cEntities.challenges.map((challenge, i) => (
                        <CardWrapperItem key={i}>
                          <ChallengeCard challenge={challenge} ecoverseNameId={hubNameId} />
                        </CardWrapperItem>
                      ))}
                    </CardWrapper>
                  </Accordion>
                </Grid>
              )}
            </EcoverseChallengesContainer>
          ))}
      </Grid>
    </Box>
  );
};
