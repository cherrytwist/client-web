export const AVAILABLE_USERS_PAGE_SIZE = 10;
export const AVAILABLE_CONTRIBUTORS_PAGE_SIZE = 100;

type AvailableContributorsResponse = {
  hasMore: boolean;
  fetchMore: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
  loading: boolean;
};

export type AvailableUsersResponse = {
  users: {
    id: string;
    profile: {
      displayName: string;
    };
    email?: string;
  }[];
} & AvailableContributorsResponse;

export type AvailableOrganizationsResponse = {
  organizations: {
    id: string;
    profile: {
      displayName: string;
    };
  }[];
} & AvailableContributorsResponse;

export type AvailableVirtualContributorsResponse = {
  virtualContributors: {
    id: string;
    profile: {
      displayName: string;
      url: string;
    };
  }[];
} & AvailableContributorsResponse;
