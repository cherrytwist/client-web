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
      leadOrganisations: {
        merge: false,
      },
    },
  },
  MembershipUserResultEntryEcoverse: {
    keyFields: ['id', 'parentID'],
  },
  Metadata: {
    merge: true,
  },
};
