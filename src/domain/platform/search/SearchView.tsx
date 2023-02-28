import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { RouterLink } from '../../../common/components/core/RouterLink';
import { useSearchQuery } from '../../../core/apollo/generated/apollo-hooks';
import {
  SearchQuery,
  SearchResult,
  SearchResultCardFragment,
  SearchResultChallengeFragment,
  SearchResultHubFragment,
  SearchResultOpportunityFragment,
  SearchResultOrganizationFragment,
  SearchResultType,
  SearchResultUserFragment,
} from '../../../core/apollo/generated/graphql-schema';
import { AUTH_LOGIN_PATH } from '../../../core/auth/authentication/constants/authentication.constants';
import PageContentColumn from '../../../core/ui/content/PageContentColumn';
import { useUserContext } from '../../community/contributor/user';
import { SEARCH_TERMS_PARAM } from '../routes/constants';
import {
  contributionFilterConfig,
  contributorFilterConfig,
  FilterConfig,
  FilterDefinition,
} from '../pages/Search/Filter';
import MultipleSelect from '../pages/Search/MultipleSelect';
import SearchResultSection from '../pages/Search/SearchResultSection';
import { useQueryParams } from '../../../core/routing/useQueryParams';
import GridItem from '../../../core/ui/grid/GridItem';

export const MAX_TERMS_SEARCH = 5;

const tagsetNames = ['skills', 'keywords'];

export type SearchResultT<T> = T & SearchResult;

export type SearchResultMetaType = SearchResultT<
  | SearchResultUserFragment
  | SearchResultOrganizationFragment
  | SearchResultCardFragment
  | SearchResultHubFragment
  | SearchResultChallengeFragment
  | SearchResultOpportunityFragment
>;

interface SearchViewProps {
  searchRoute: string;
  hubId?: string;
  journeyFilterConfig: FilterConfig;
  journeyFilterTitle: ReactNode;
}

const SearchView = ({ searchRoute, journeyFilterConfig, journeyFilterTitle, hubId }: SearchViewProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useUserContext();

  const queryParams = useQueryParams();

  const termsFromUrl = useMemo(() => {
    const terms = queryParams.getAll('terms'); // TODO escape if needed
    if (terms.length > MAX_TERMS_SEARCH) {
      // If too many terms come in the url, return an array with the first 4 elements + the 5th element containing the rest of the terms all together
      // TODO figure out why
      return [...terms.slice(0, MAX_TERMS_SEARCH - 1), terms.slice(MAX_TERMS_SEARCH - 1).join(' ')];
    }
    return terms;
  }, [queryParams]);

  const searchTerms = termsFromUrl;

  const [journeyFilter, setJourneyFilter] = useState<FilterDefinition>(journeyFilterConfig.all);
  const [contributionFilter, setContributionFilter] = useState<FilterDefinition>(contributionFilterConfig.all);
  const [contributorFilter, setContributorFilter] = useState<FilterDefinition>(contributorFilterConfig.all);

  const resetFilters = () => {
    setJourneyFilter(journeyFilterConfig.all);
    setContributionFilter(contributionFilterConfig.all);
    setContributorFilter(contributorFilterConfig.all);
  };

  useEffect(() => {
    if (termsFromUrl.length === 0) {
      resetFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termsFromUrl.length]);

  const handleTermsChange = (newValue: string[]) => {
    const params = new URLSearchParams();
    for (const term of newValue) {
      params.append(SEARCH_TERMS_PARAM, term);
    }
    navigate(`${searchRoute}?${params}`);
  };

  const filters = useMemo(
    () => [...journeyFilter.value, ...contributionFilter.value, ...contributorFilter.value],
    [journeyFilter, contributionFilter, contributorFilter]
  );

  const { data, loading: isSearching } = useSearchQuery({
    variables: {
      searchData: {
        terms: termsFromUrl,
        tagsetNames,
        typesFilter: filters,
        searchInHubFilter: hubId,
      },
    },
    fetchPolicy: 'no-cache',
    skip: termsFromUrl.length === 0,
  });

  const results = termsFromUrl.length === 0 ? undefined : toResultType(data);

  const [journeyResults, contributionResults, contributorResults] = useMemo(
    () => [
      results?.filter(
        ({ type }) =>
          type === SearchResultType.Hub || type === SearchResultType.Challenge || type === SearchResultType.Opportunity
      ),
      results?.filter(
        ({ type }) =>
          type ===
          SearchResultType.Card /*|| type === SearchResultType.Whiteboard || type === SearchResultType.Callout*/
      ),
      results?.filter(({ type }) => type === SearchResultType.User || type === SearchResultType.Organization),
    ],
    [results]
  );

  const suggestions = t('pages.search.suggestions-array', { returnObjects: true });

  return (
    <>
      <GridItem columns={6}>
        <Box marginX="auto">
          <MultipleSelect
            onChange={handleTermsChange}
            selectedTerms={searchTerms}
            suggestions={suggestions}
            minLength={2}
            disabled={isSearching}
          />
        </Box>
      </GridItem>
      <PageContentColumn columns={12}>
        {!isAuthenticated && (
          <Box display="flex" justifyContent="center" paddingBottom={2}>
            <Link component={RouterLink} to={AUTH_LOGIN_PATH}>
              {t('pages.search.user-not-logged')}
            </Link>
          </Box>
        )}
        <SearchResultSection
          title={journeyFilterTitle}
          filterTitle={t('pages.search.filter.type.journey')}
          filterConfig={journeyFilterConfig}
          results={journeyResults}
          currentFilter={journeyFilter}
          onFilterChange={setJourneyFilter}
          loading={isSearching}
        />
        <SearchResultSection
          title={t('common.contributions')}
          filterTitle={t('pages.search.filter.type.contribution')}
          filterConfig={contributionFilterConfig}
          results={contributionResults}
          currentFilter={contributionFilter}
          onFilterChange={setContributionFilter}
          loading={isSearching}
        />
        <SearchResultSection
          title={t('common.contributors')}
          filterTitle={t('pages.search.filter.type.contributor')}
          filterConfig={contributorFilterConfig}
          results={contributorResults}
          currentFilter={contributorFilter}
          onFilterChange={setContributorFilter}
          loading={isSearching}
        />
      </PageContentColumn>
    </>
  );
};

export default SearchView;

const toResultType = (query?: SearchQuery): SearchResultMetaType[] => {
  if (!query) {
    return [];
  }

  const journeyResults = (query.search.journeyResults || [])
    .map<SearchResultMetaType>(
      ({ score, terms, ...rest }) => ({ ...rest, score: score || 0, terms: terms || [] } as SearchResultMetaType),
      []
    )
    .sort((a, b) => (b?.score || 0) - (a?.score || 0));

  const contributionResults = (query.search.contributionResults || [])
    .map<SearchResultMetaType>(
      ({ score, terms, ...rest }) => ({ ...rest, score: score || 0, terms: terms || [] } as SearchResultMetaType),
      []
    )
    .sort((a, b) => (b?.score || 0) - (a?.score || 0));

  const contributorResults = (query.search.contributorResults || [])
    .map<SearchResultMetaType>(
      ({ score, terms, ...rest }) => ({ ...rest, score: score || 0, terms: terms || [] } as SearchResultMetaType),
      []
    )
    .sort((a, b) => (b?.score || 0) - (a?.score || 0));

  return contributorResults.concat(journeyResults).concat(contributionResults);
};
