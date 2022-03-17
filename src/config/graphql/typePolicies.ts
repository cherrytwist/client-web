import { relayStylePagination } from '@apollo/client/utilities';
import { TypedTypePolicies } from '../../models/apollo-helpers';

export const typePolicies: TypedTypePolicies = {
  UserGroup: {
    fields: {
      members: {
        merge: false,
      },
    },
  },
  Config: {
    merge: true,
    fields: {
      template: {
        merge: true,
      },
    },
  },
  Challenge: {
    fields: {
      leadOrganizations: {
        merge: false,
      },
    },
  },
  Metadata: {
    merge: true,
  },
  Community: {
    fields: {
      members: {
        merge: false,
      },
    },
  },
  Aspect: {
    fields: {
      references: {
        merge: false,
      },
    },
  },
  Query: {
    fields: {
      usersPaginated: relayStylePagination(),
    },
  },
};
