import { useEffect, useMemo, useState, PropsWithChildren, useCallback } from 'react';
import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useNavigate from '@/core/routing/useNavigate';
import {
  useSearchQuery,
  useSearchScopeDetailsSpaceQuery,
  useSpaceUrlResolverQuery,
} from '@/core/apollo/generated/apollo-hooks';
import {
  SearchCategory,
  // SearchQuery,
  SearchResultCalloutFragment,
  SearchResultType,
} from '@/core/apollo/generated/graphql-schema';
import PageContentColumn from '@/core/ui/content/PageContentColumn';
import { useUserContext } from '@/domain/community/user';
import { calloutFilterConfig, contributionFilterConfig, contributorFilterConfig, FilterDefinition } from './Filter';
import MultipleSelect from '@/core/ui/search/MultipleSelect';
import SearchResultSection from './SearchResultSection';
import { useQueryParams } from '@/core/routing/useQueryParams';
import { buildLoginUrl } from '../routing/urlBuilders';
import { SEARCH_SPACE_URL_PARAM, SEARCH_TERMS_URL_PARAM } from './constants';
import PageContentBlockSeamless from '@/core/ui/content/PageContentBlockSeamless';
import SearchResultsScope from '@/core/ui/search/SearchResultsScope';
import SearchResultsScopeCard from '@/core/ui/search/SearchResultsScopeCard';
import AlkemioLogo from '../ui/logo/logoSmall.svg?react';
import { SpaceIcon } from '@/domain/journey/space/icon/SpaceIcon';
import { findKey, groupBy, identity } from 'lodash';
import Gutters from '@/core/ui/grid/Gutters';
import { gutters } from '@/core/ui/grid/utils';
import SearchResultPostChooser from './searchResults/SearchResultPostChooser';
import SearchResultsCalloutCard from './searchResults/searchResultsCallout/SearchResultsCalloutCard';
import { Caption } from '@/core/ui/typography';
import { HubOutlined, DrawOutlined, GroupOutlined, LibraryBooksOutlined } from '@mui/icons-material';
import { SearchViewProps, SearchFilterInput, SearchViewSections, SearchResultMetaType } from './search.model';

export const MAX_TERMS_SEARCH = 5;

const searchResultsCount = 5;
const tagsetNames = ['skills', 'keywords'];

const searchResultSectionTypes: Record<keyof SearchViewSections, SearchResultType[]> = {
  spaceResults: [SearchResultType.Space, SearchResultType.Subspace],
  calloutResults: [SearchResultType.Callout],
  contributionResults: [SearchResultType.Post],
  contributorResults: [SearchResultType.User, SearchResultType.Organization],
};

const Logo = () => <AlkemioLogo />;

const SearchView = ({ searchRoute, journeyFilterConfig, journeyFilterTitle }: SearchViewProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useUserContext();

  const queryParams = useQueryParams();

  const spaceNameId = queryParams.get(SEARCH_SPACE_URL_PARAM) ?? undefined;

  const termsFromUrl = useMemo(() => {
    const terms = queryParams.getAll(SEARCH_TERMS_URL_PARAM).filter(identity);
    if (terms.length > MAX_TERMS_SEARCH) {
      // All terms above 4th are joined into a single 5th term
      // That is mainly coming from UX issues when having more than 5 tags in the Search input
      // Please note that server also puts certain limits on the maximum number of terms (currently 10)
      return [...terms.slice(0, MAX_TERMS_SEARCH - 1), terms.slice(MAX_TERMS_SEARCH - 1).join(' ')];
    }
    return terms;
  }, [queryParams]);

  const searchTerms = termsFromUrl;

  const [journeyFilter, setJourneyFilter] = useState<FilterDefinition>(journeyFilterConfig.all);
  const [calloutFilter, setCalloutFilter] = useState<FilterDefinition>(calloutFilterConfig.all);
  const [contributionFilter, setContributionFilter] = useState<FilterDefinition>(contributionFilterConfig.all);
  const [contributorFilter, setContributorFilter] = useState<FilterDefinition>(contributorFilterConfig.all);

  const handleTermsChange = (newValue: string[]) => {
    const params = new URLSearchParams(queryParams);
    params.delete(SEARCH_TERMS_URL_PARAM);
    for (const term of newValue) {
      params.append(SEARCH_TERMS_URL_PARAM, term);
    }
    if (newValue.length === 0) {
      // Keeping the dialog open when there are no search terms
      params.append(SEARCH_TERMS_URL_PARAM, '');
    }
    navigate(`${searchRoute}?${params}`);
  };

  const handleSearchInPlatform = () => {
    const params = new URLSearchParams(queryParams);
    params.delete(SEARCH_SPACE_URL_PARAM);
    navigate(`${searchRoute}?${params}`);
  };

  // @@@ WIP ~ #7605
  const filters: SearchFilterInput[] = useMemo(
    () => [
      {
        category: SearchCategory.Spaces,
        size: searchResultsCount,
        types:
          journeyFilter.value[0] === SearchResultType.Space ? [SearchResultType.Space] : [SearchResultType.Subspace],
        cursor: data?.search?.spaceResults?.cursor,
      },
      {
        category: SearchCategory.CollaborationTools,
        size: searchResultsCount,
        cursor: data?.search?.calloutResults?.cursor,
      },
      {
        category: SearchCategory.Responses,
        size: searchResultsCount,
        types:
          contributionFilter.value[0] === SearchResultType.Post
            ? [SearchResultType.Post]
            : [SearchResultType.Whiteboard],
        cursor: data?.search?.contributionResults?.cursor,
      },
      {
        category: SearchCategory.Contributors,
        size: searchResultsCount,
        types:
          contributorFilter.value[0] === SearchResultType.User
            ? [SearchResultType.User]
            : [SearchResultType.Organization],
        cursor: data?.search?.contributorResults?.cursor,
      },
    ],
    []
  );

  const { data: spaceIdData, loading: resolvingSpace } = useSpaceUrlResolverQuery({
    variables: { spaceNameId: spaceNameId! },
    skip: !spaceNameId,
  });

  const spaceId = spaceIdData?.lookupByName.space?.id;

  const { data, loading: isSearching } = useSearchQuery({
    variables: {
      searchData: {
        filters,
        terms: termsFromUrl,
        tagsetNames,
        searchInSpaceFilter: spaceId,
      },
    },
    fetchPolicy: 'no-cache',
    skip: termsFromUrl.length === 0 || resolvingSpace,
  });

  console.log('@@@ SearchQuery DATA >>>', data?.search);

  const toResultType = useCallback((): SearchResultMetaType[] => {
    if (!data) {
      return [];
    }

    const spaceResults = (data.search.spaceResults?.results || [])
      .map(({ score, terms, ...rest }): SearchResultMetaType => ({ ...rest, score: score || 0, terms: terms || [] }))
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    const contributionResults = (data.search.contributionResults?.results || [])
      .map(({ score, terms, ...rest }): SearchResultMetaType => ({ ...rest, score: score || 0, terms: terms || [] }))
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    const contributorResults = (data.search.contributorResults?.results || [])
      .map(({ score, terms, ...rest }): SearchResultMetaType => ({ ...rest, score: score || 0, terms: terms || [] }))
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    return [...spaceResults, ...contributionResults, ...contributorResults];
  }, [data]);

  const results = termsFromUrl.length === 0 ? undefined : toResultType();

  const {
    // journeyResultsCount,
    //  calloutResultsCount,
    //  contributorResultsCount,
    //  contributionResultsCount,

    spaceResults: speisRez,
    calloutResults: kolRez,
    contributorResults: contRez,
    contributionResults: resRez,

    // spaceResults,
    // calloutResults,
    // contributorResults,
    // contributionResults,
  } = data?.search ?? {};

  console.log('speisRez', speisRez);
  console.log('kolRez', kolRez);
  console.log('contRez', contRez);
  console.log('resRez', resRez);

  const { spaceResults, calloutResults, contributionResults, contributorResults }: SearchViewSections = useMemo(
    () => groupBy(results, ({ type }) => findKey(searchResultSectionTypes, types => types.includes(type))),
    [results]
  );
  console.log('contributorResults', contributorResults);
  console.log('contributionResults', contributionResults);
  console.log('calloutResults', calloutResults);
  console.log('spaceResults', spaceResults);

  const { data: spaceDetails, loading } = useSearchScopeDetailsSpaceQuery({
    variables: { spaceId: spaceId! },
    skip: !spaceId,
  });

  useEffect(() => {
    if (termsFromUrl.length === 0) {
      setJourneyFilter(journeyFilterConfig.all);
      setContributionFilter(contributionFilterConfig.all);
      setContributorFilter(contributorFilterConfig.all);
    }
  }, [termsFromUrl.length]);

  return (
    <>
      <PageContentColumn columns={12}>
        <PageContentBlockSeamless disablePadding>
          <MultipleSelect size="small" onChange={handleTermsChange} value={searchTerms} minLength={2} autoFocus />
        </PageContentBlockSeamless>

        {spaceId && (
          <SearchResultsScope
            currentScope={
              <SearchResultsScopeCard
                avatar={spaceDetails?.lookup.space?.about.profile.avatar}
                iconComponent={SpaceIcon}
                loading={loading}
                onDelete={handleSearchInPlatform}
              >
                {spaceDetails?.lookup.space?.about.profile.displayName}
              </SearchResultsScopeCard>
            }
            alternativeScope={
              <SearchResultsScopeCard iconComponent={Logo} onClick={handleSearchInPlatform}>
                {t('components.searchScope.platform')}
              </SearchResultsScopeCard>
            }
          />
        )}

        {!isAuthenticated && (
          <Box display="flex" justifyContent="center" paddingBottom={2}>
            <Link href={buildLoginUrl()}>{t('pages.search.user-not-logged')}</Link>
          </Box>
        )}

        <Gutters disablePadding sx={{ width: '100%', flexDirection: 'row' }}>
          <FiltersDescriptionBlock />

          <Gutters disablePadding sx={{ width: '100%', flexDirection: 'column' }}>
            <SectionWrapper>
              <SearchResultSection
                title={journeyFilterTitle}
                filterTitle={t('pages.search.filter.type.journey')}
                count={0}
                // count={spaceResults?.total}
                filterConfig={journeyFilterConfig}
                results={spaceResults}
                // results={[]}
                currentFilter={journeyFilter}
                onFilterChange={setJourneyFilter}
                loading={isSearching}
                cardComponent={SearchResultPostChooser}
              />
            </SectionWrapper>

            <SectionWrapper>
              <SearchResultSection
                title={t('common.collaborationTools')}
                filterTitle={t('common.type')}
                count={0}
                // count={calloutResults?.total}
                filterConfig={undefined /* TODO: Callout filtering disabled for now calloutFilterConfig */}
                results={calloutResults as SearchResultCalloutFragment[]}
                // results={[]}
                currentFilter={calloutFilter}
                onFilterChange={setCalloutFilter}
                loading={isSearching}
                cardComponent={SearchResultsCalloutCard}
              />
            </SectionWrapper>

            <SectionWrapper>
              <SearchResultSection
                title={t('common.contributions')}
                filterTitle={t('pages.search.filter.type.contribution')}
                count={0}
                // count={contributionResults?.total}
                filterConfig={contributionFilterConfig}
                results={contributionResults}
                // results={[]}
                currentFilter={contributionFilter}
                onFilterChange={setContributionFilter}
                loading={isSearching}
                cardComponent={SearchResultPostChooser}
              />
            </SectionWrapper>

            <SectionWrapper>
              <SearchResultSection
                title={t('common.contributors')}
                filterTitle={t('pages.search.filter.type.contributor')}
                count={0}
                // count={contributorResults?.total}
                filterConfig={contributorFilterConfig}
                results={contributorResults}
                // results={[]}
                currentFilter={contributorFilter}
                onFilterChange={setContributorFilter}
                loading={isSearching}
                cardComponent={SearchResultPostChooser}
              />
            </SectionWrapper>
          </Gutters>
        </Gutters>
      </PageContentColumn>
    </>
  );
};

export default SearchView;

function SectionWrapper({ children }: PropsWithChildren) {
  return <Box sx={{ display: 'flex', flexDirection: 'row', gap: gutters(1) }}>{children}</Box>;
}

function FiltersDescriptionBlock() {
  const { t } = useTranslation();

  return (
    <Gutters
      disableGap
      disablePadding
      sx={theme => ({
        minWidth: 250,
        borderRadius: 1,
        height: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <FiltersDescriptionBlockItem>
        <HubOutlined />
        <Caption>{t('components.searchDialog.spacesAndSubspaces')}</Caption>
      </FiltersDescriptionBlockItem>

      <FiltersDescriptionBlockItem>
        <DrawOutlined />
        <Caption>{t('components.searchDialog.collaborationTools')}</Caption>
      </FiltersDescriptionBlockItem>

      <FiltersDescriptionBlockItem>
        <LibraryBooksOutlined />
        <Caption>{t('components.searchDialog.responses')}</Caption>
      </FiltersDescriptionBlockItem>

      <FiltersDescriptionBlockItem>
        <GroupOutlined />
        <Caption>{t('components.searchDialog.contributors')}</Caption>
      </FiltersDescriptionBlockItem>
    </Gutters>
  );
}

function FiltersDescriptionBlockItem({ children }: PropsWithChildren) {
  return <Gutters sx={{ flexDirection: 'row', padding: gutters(0.5) }}>{children}</Gutters>;
}
