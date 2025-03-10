import { ReactNode } from 'react';

import { FilterConfig } from './Filter';
import {
  SearchResult,
  SearchResultType,
  SearchResultPostFragment,
  SearchResultUserFragment,
  SearchResultSpaceFragment,
  SearchResultCalloutFragment,
  SearchResultOrganizationFragment,
} from '@/core/apollo/generated/graphql-schema';

export type TypedSearchResult<Type extends SearchResultType, ResultFragment extends {}> = SearchResult &
  ResultFragment & { type: Type };

export type SearchResultMetaType =
  | TypedSearchResult<SearchResultType.User, SearchResultUserFragment>
  | TypedSearchResult<SearchResultType.Organization, SearchResultOrganizationFragment>
  | TypedSearchResult<SearchResultType.Post, SearchResultPostFragment>
  | TypedSearchResult<SearchResultType.Space, SearchResultSpaceFragment>
  | TypedSearchResult<SearchResultType.Subspace, SearchResultSpaceFragment>
  | TypedSearchResult<SearchResultType.Callout, SearchResultCalloutFragment>;

export interface SearchViewProps {
  searchRoute: string;
  journeyFilterConfig: FilterConfig;
  journeyFilterTitle: ReactNode;
}

export interface SearchViewSections {
  spaceResults?: SearchResultMetaType[];
  calloutResults?: SearchResultMetaType[];
  contributionResults?: SearchResultMetaType[];
  contributorResults?: SearchResultMetaType[];
}

export enum SearchCategory {
  SPACES = 'spaces',
  COLLABORATION_TOOLS = 'collaboration-tools',
  RESPONSES = 'responses',
  CONTRIBUTORS = 'contributors',
}

export type SearchFilterInput = {
  category: SearchCategory;
  size: number;
  cursor?: string;
  types?: SearchResultType[];
};
