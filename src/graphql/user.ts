import { gql } from '@apollo/client';

export const USER_DETAILS_FRAGMENT = gql`
  fragment UserDetails on User {
    id
    name
    firstName
    lastName
    email
    gender
    country
    city
    phone
    accountUpn
    profile {
      avatar
      references {
        name
        uri
      }
      tagsets {
        name
        tags
      }
    }
  }
`;

export const QUERY_ECOVERSE_USER_IDS = gql`
  query ecoverseUserIds {
    users {
      id
    }
  }
`;

export const QUERY_CHALLENGE_USER_IDS = gql`
  query challengeUserIds($id: Float!) {
    challenge(ID: $id) {
      contributors {
        id
      }
    }
  }
`;

export const QUERY_OPPORTUNITY_USER_IDS = gql`
  query opportunityUserIds($id: Float!) {
    opportunity(ID: $id) {
      groups {
        members {
          id
        }
      }
    }
  }
`;

export const QUERY_USER_AVATARS = gql`
  query userAvatars($ids: [String!]!) {
    usersById(IDs: $ids) {
      profile {
        avatar
      }
    }
  }
`;

export const QUERY_USER_PROFILE = gql`
  # Write your query or mutation here
  query userProfile {
    me {
      ...UserDetails
      memberof {
        groups {
          name
        }
        challenges {
          id
          name
        }
      }
    }
  }
  ${USER_DETAILS_FRAGMENT}
`;
