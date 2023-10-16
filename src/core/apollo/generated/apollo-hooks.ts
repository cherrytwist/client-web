import * as SchemaTypes from './graphql-schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const MyPrivilegesFragmentDoc = gql`
  fragment MyPrivileges on Authorization {
    myPrivileges
  }
`;
export const UserAgentSsiFragmentDoc = gql`
  fragment UserAgentSsi on User {
    id
    nameID
    agent {
      id
      did
      credentials {
        id
        resourceID
        type
      }
      verifiedCredentials {
        claims {
          name
          value
        }
        context
        issued
        expires
        issuer
        name
        type
      }
    }
  }
`;
export const TagsetDetailsFragmentDoc = gql`
  fragment TagsetDetails on Tagset {
    id
    name
    tags
    allowedValues
    type
  }
`;
export const VisualFullFragmentDoc = gql`
  fragment VisualFull on Visual {
    id
    uri
    name
    allowedTypes
    aspectRatio
    maxHeight
    maxWidth
    minHeight
    minWidth
    alternativeText
  }
`;
export const LifecycleProfileFragmentDoc = gql`
  fragment LifecycleProfile on Profile {
    id
    displayName
    description
    tagsets {
      ...TagsetDetails
    }
    references {
      id
      name
      description
      uri
    }
    bannerNarrow: visual(type: CARD) {
      ...VisualFull
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
`;
export const LifecycleDetailsFragmentDoc = gql`
  fragment LifecycleDetails on Lifecycle {
    id
    state
    nextEvents
    stateIsFinal
  }
`;
export const InnovationFlowCollaborationFragmentDoc = gql`
  fragment InnovationFlowCollaboration on Collaboration {
    id
    authorization {
      myPrivileges
    }
    callouts(displayLocations: [CONTRIBUTE_LEFT, CONTRIBUTE_RIGHT]) {
      id
      nameID
      type
      activity
      sortOrder
      profile {
        id
        displayName
        flowState: tagset(tagsetName: FLOW_STATE) {
          ...TagsetDetails
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const JourneyInnovationFlowStatesAllowedValuesFragmentDoc = gql`
  fragment JourneyInnovationFlowStatesAllowedValues on InnovationFlow {
    id
    lifecycle {
      id
      state
    }
    authorization {
      id
      myPrivileges
    }
    profile {
      id
      tagsets {
        id
        name
        allowedValues
      }
    }
  }
`;
export const ActivityLogMemberJoinedFragmentDoc = gql`
  fragment ActivityLogMemberJoined on ActivityLogEntryMemberJoined {
    communityType
    user {
      id
      nameID
      firstName
      lastName
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
          uri
        }
        tagsets {
          ...TagsetDetails
        }
        location {
          id
          city
          country
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const ActivityLogCalloutPublishedFragmentDoc = gql`
  fragment ActivityLogCalloutPublished on ActivityLogEntryCalloutPublished {
    callout {
      id
      nameID
      type
      profile {
        id
        displayName
      }
    }
  }
`;
export const ActivityLogCalloutPostCreatedFragmentDoc = gql`
  fragment ActivityLogCalloutPostCreated on ActivityLogEntryCalloutPostCreated {
    callout {
      id
      nameID
      profile {
        id
        displayName
      }
    }
    post {
      id
      nameID
      type
      profile {
        id
        displayName
        description
      }
    }
  }
`;
export const ActivityLogCalloutLinkCreatedFragmentDoc = gql`
  fragment ActivityLogCalloutLinkCreated on ActivityLogEntryCalloutLinkCreated {
    callout {
      id
      nameID
      profile {
        id
        displayName
      }
    }
    reference {
      id
      name
      description
      uri
    }
  }
`;
export const ActivityLogCalloutPostCommentFragmentDoc = gql`
  fragment ActivityLogCalloutPostComment on ActivityLogEntryCalloutPostComment {
    callout {
      id
      nameID
      profile {
        id
        displayName
      }
    }
    post {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export const ActivityLogCalloutWhiteboardCreatedFragmentDoc = gql`
  fragment ActivityLogCalloutWhiteboardCreated on ActivityLogEntryCalloutWhiteboardCreated {
    callout {
      id
      nameID
      profile {
        id
        displayName
      }
    }
    whiteboard {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export const ActivityLogCalloutDiscussionCommentFragmentDoc = gql`
  fragment ActivityLogCalloutDiscussionComment on ActivityLogEntryCalloutDiscussionComment {
    callout {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export const ActivityLogChallengeCreatedFragmentDoc = gql`
  fragment ActivityLogChallengeCreated on ActivityLogEntryChallengeCreated {
    challenge {
      id
      nameID
      profile {
        id
        displayName
        tagline
      }
    }
  }
`;
export const ActivityLogOpportunityCreatedFragmentDoc = gql`
  fragment ActivityLogOpportunityCreated on ActivityLogEntryOpportunityCreated {
    opportunity {
      id
      nameID
      profile {
        id
        displayName
        tagline
      }
    }
  }
`;
export const ActivityLogUpdateSentFragmentDoc = gql`
  fragment ActivityLogUpdateSent on ActivityLogEntryUpdateSent {
    message
  }
`;
export const ActivityLogCalendarEventCreatedFragmentDoc = gql`
  fragment ActivityLogCalendarEventCreated on ActivityLogEntryCalendarEventCreated {
    calendar {
      id
    }
    calendarEvent {
      id
      nameID
      profile {
        id
        displayName
        description
      }
    }
  }
`;
export const ActivityLogOnCollaborationFragmentDoc = gql`
  fragment ActivityLogOnCollaboration on ActivityLogEntry {
    id
    collaborationID
    createdDate
    description
    type
    child
    parentNameID
    journeyDisplayName: parentDisplayName
    __typename
    triggeredBy {
      id
      nameID
      firstName
      lastName
      profile {
        id
        displayName
        avatar: visual(type: AVATAR) {
          id
          uri
        }
        tagsets {
          ...TagsetDetails
        }
        location {
          id
          city
          country
        }
      }
    }
    ... on ActivityLogEntryMemberJoined {
      ...ActivityLogMemberJoined
    }
    ... on ActivityLogEntryCalloutPublished {
      ...ActivityLogCalloutPublished
    }
    ... on ActivityLogEntryCalloutPostCreated {
      ...ActivityLogCalloutPostCreated
    }
    ... on ActivityLogEntryCalloutLinkCreated {
      ...ActivityLogCalloutLinkCreated
    }
    ... on ActivityLogEntryCalloutPostComment {
      ...ActivityLogCalloutPostComment
    }
    ... on ActivityLogEntryCalloutWhiteboardCreated {
      ...ActivityLogCalloutWhiteboardCreated
    }
    ... on ActivityLogEntryCalloutDiscussionComment {
      ...ActivityLogCalloutDiscussionComment
    }
    ... on ActivityLogEntryChallengeCreated {
      ...ActivityLogChallengeCreated
    }
    ... on ActivityLogEntryOpportunityCreated {
      ...ActivityLogOpportunityCreated
    }
    ... on ActivityLogEntryUpdateSent {
      ...ActivityLogUpdateSent
    }
    ... on ActivityLogEntryCalendarEventCreated {
      ...ActivityLogCalendarEventCreated
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${ActivityLogMemberJoinedFragmentDoc}
  ${ActivityLogCalloutPublishedFragmentDoc}
  ${ActivityLogCalloutPostCreatedFragmentDoc}
  ${ActivityLogCalloutLinkCreatedFragmentDoc}
  ${ActivityLogCalloutPostCommentFragmentDoc}
  ${ActivityLogCalloutWhiteboardCreatedFragmentDoc}
  ${ActivityLogCalloutDiscussionCommentFragmentDoc}
  ${ActivityLogChallengeCreatedFragmentDoc}
  ${ActivityLogOpportunityCreatedFragmentDoc}
  ${ActivityLogUpdateSentFragmentDoc}
  ${ActivityLogCalendarEventCreatedFragmentDoc}
`;
export const ProfileDisplayNameFragmentDoc = gql`
  fragment ProfileDisplayName on Profile {
    id
    displayName
  }
`;
export const ReferenceDetailsFragmentDoc = gql`
  fragment ReferenceDetails on Reference {
    id
    name
    uri
    description
  }
`;
export const WhiteboardProfileFragmentDoc = gql`
  fragment WhiteboardProfile on Profile {
    id
    displayName
    description
    visual(type: CARD) {
      ...VisualFull
    }
    preview: visual(type: BANNER) {
      ...VisualFull
    }
    tagset {
      ...TagsetDetails
    }
    storageBucket {
      id
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const CheckoutDetailsFragmentDoc = gql`
  fragment CheckoutDetails on WhiteboardCheckout {
    id
    lockedBy
    status
    lifecycle {
      id
      nextEvents
    }
    authorization {
      id
      myPrivileges
    }
  }
`;
export const WhiteboardDetailsFragmentDoc = gql`
  fragment WhiteboardDetails on Whiteboard {
    id
    nameID
    createdDate
    profile {
      ...WhiteboardProfile
    }
    authorization {
      id
      myPrivileges
      anonymousReadAccess
    }
    checkout {
      ...CheckoutDetails
    }
    createdBy {
      id
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
          uri
        }
      }
    }
  }
  ${WhiteboardProfileFragmentDoc}
  ${CheckoutDetailsFragmentDoc}
`;
export const WhiteboardRtDetailsFragmentDoc = gql`
  fragment WhiteboardRtDetails on WhiteboardRt {
    id
    nameID
    createdDate
    profile {
      ...WhiteboardProfile
    }
    authorization {
      id
      myPrivileges
      anonymousReadAccess
    }
    createdBy {
      id
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
          uri
        }
      }
    }
  }
  ${WhiteboardProfileFragmentDoc}
`;
export const ReactionDetailsFragmentDoc = gql`
  fragment ReactionDetails on Reaction {
    id
    emoji
    sender {
      id
      firstName
      lastName
    }
  }
`;
export const MessageDetailsFragmentDoc = gql`
  fragment MessageDetails on Message {
    id
    message
    timestamp
    reactions {
      ...ReactionDetails
    }
    threadID
    sender {
      id
      nameID
      firstName
      lastName
      profile {
        id
        displayName
        avatar: visual(type: AVATAR) {
          id
          uri
        }
        tagsets {
          ...TagsetDetails
        }
        location {
          id
          city
          country
        }
      }
    }
  }
  ${ReactionDetailsFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const CommentsWithMessagesFragmentDoc = gql`
  fragment CommentsWithMessages on Room {
    id
    messagesCount
    authorization {
      id
      myPrivileges
      anonymousReadAccess
    }
    messages {
      ...MessageDetails
    }
  }
  ${MessageDetailsFragmentDoc}
`;
export const CalloutPostTemplateFragmentDoc = gql`
  fragment CalloutPostTemplate on Callout {
    postTemplate {
      id
      type
      defaultDescription
      profile {
        tagset {
          ...TagsetDetails
        }
        visual(type: CARD) {
          id
          uri
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const CalloutWhiteboardTemplateFragmentDoc = gql`
  fragment CalloutWhiteboardTemplate on Callout {
    whiteboardTemplate {
      id
      content
      profile {
        id
        displayName
        description
        tagset {
          ...TagsetDetails
        }
        visual(type: CARD) {
          id
          uri
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const CalloutFragmentDoc = gql`
  fragment Callout on Callout {
    id
    nameID
    type
    profile {
      id
      displayName
      description
      tagset {
        ...TagsetDetails
      }
      tagsets {
        ...TagsetDetails
      }
      references {
        ...ReferenceDetails
      }
      displayLocationTagset: tagset(tagsetName: CALLOUT_DISPLAY_LOCATION) {
        ...TagsetDetails
      }
      storageBucket {
        id
      }
    }
    state
    sortOrder
    activity
    whiteboards {
      ...WhiteboardDetails
    }
    whiteboardRt {
      ...WhiteboardRtDetails
    }
    comments {
      ...CommentsWithMessages
    }
    authorization {
      id
      myPrivileges
    }
    visibility
    ...CalloutPostTemplate
    ...CalloutWhiteboardTemplate
  }
  ${TagsetDetailsFragmentDoc}
  ${ReferenceDetailsFragmentDoc}
  ${WhiteboardDetailsFragmentDoc}
  ${WhiteboardRtDetailsFragmentDoc}
  ${CommentsWithMessagesFragmentDoc}
  ${CalloutPostTemplateFragmentDoc}
  ${CalloutWhiteboardTemplateFragmentDoc}
`;
export const CollaborationWithCalloutsFragmentDoc = gql`
  fragment CollaborationWithCallouts on Collaboration {
    id
    authorization {
      id
      myPrivileges
    }
    callouts(displayLocations: $displayLocations, IDs: $calloutIds) {
      ...Callout
    }
  }
  ${CalloutFragmentDoc}
`;
export const VisualUriFragmentDoc = gql`
  fragment VisualUri on Visual {
    id
    uri
    name
  }
`;
export const PostDashboardFragmentDoc = gql`
  fragment PostDashboard on Post {
    id
    nameID
    type
    createdBy {
      id
      profile {
        id
        displayName
        avatar: visual(type: AVATAR) {
          id
          uri
        }
        tagsets {
          ...TagsetDetails
        }
      }
    }
    createdDate
    profile {
      id
      displayName
      description
      tagset {
        ...TagsetDetails
      }
      references {
        id
        name
        uri
        description
      }
      visual(type: BANNER) {
        ...VisualUri
      }
    }
    comments {
      id
      authorization {
        id
        myPrivileges
      }
      messages {
        ...MessageDetails
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
  ${MessageDetailsFragmentDoc}
`;
export const PostDashboardDataFragmentDoc = gql`
  fragment PostDashboardData on Collaboration {
    id
    authorization {
      id
      myPrivileges
    }
    callouts(IDs: [$calloutNameId]) {
      id
      type
      posts(IDs: [$postNameId]) {
        ...PostDashboard
      }
    }
  }
  ${PostDashboardFragmentDoc}
`;
export const PostSettingsFragmentDoc = gql`
  fragment PostSettings on Post {
    id
    nameID
    type
    authorization {
      id
      myPrivileges
    }
    profile {
      id
      displayName
      description
      tagset {
        ...TagsetDetails
      }
      references {
        id
        name
        uri
        description
      }
      visuals {
        ...VisualFull
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
`;
export const PostSettingsCalloutFragmentDoc = gql`
  fragment PostSettingsCallout on Callout {
    id
    type
    posts(IDs: [$postNameId]) {
      ...PostSettings
    }
    postNames: posts {
      id
      profile {
        id
        displayName
      }
    }
  }
  ${PostSettingsFragmentDoc}
`;
export const PostProvidedFragmentDoc = gql`
  fragment PostProvided on Post {
    id
    nameID
    profile {
      id
      displayName
    }
    authorization {
      id
      myPrivileges
    }
    comments {
      id
      messagesCount
    }
  }
`;
export const PostProviderDataFragmentDoc = gql`
  fragment PostProviderData on Collaboration {
    id
    callouts(IDs: [$calloutNameId]) {
      id
      type
      posts(IDs: [$postNameId]) {
        ...PostProvided
      }
    }
  }
  ${PostProvidedFragmentDoc}
`;
export const CalloutPostInfoFragmentDoc = gql`
  fragment CalloutPostInfo on Collaboration {
    id
    callouts {
      id
      nameID
      type
      posts {
        id
        nameID
      }
    }
  }
`;
export const PostCardFragmentDoc = gql`
  fragment PostCard on Post {
    id
    nameID
    type
    createdBy {
      id
      profile {
        id
        displayName
      }
    }
    createdDate
    comments {
      id
      messagesCount
    }
    profile {
      id
      displayName
      description
      visuals {
        ...VisualFull
      }
      tagset {
        ...TagsetDetails
      }
      references {
        id
        name
        uri
        description
      }
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const ContributeTabPostFragmentDoc = gql`
  fragment ContributeTabPost on Post {
    ...PostCard
    authorization {
      id
      myPrivileges
    }
  }
  ${PostCardFragmentDoc}
`;
export const TemplateProviderProfileFragmentDoc = gql`
  fragment TemplateProviderProfile on Profile {
    id
    displayName
    visual(type: AVATAR) {
      ...VisualUri
    }
  }
  ${VisualUriFragmentDoc}
`;
export const InnovationPackWithProviderFragmentDoc = gql`
  fragment InnovationPackWithProvider on InnovationPack {
    id
    nameID
    profile {
      id
      displayName
    }
    provider {
      id
      profile {
        ...TemplateProviderProfile
      }
    }
  }
  ${TemplateProviderProfileFragmentDoc}
`;
export const TemplateCardProfileInfoFragmentDoc = gql`
  fragment TemplateCardProfileInfo on Profile {
    id
    displayName
    description
    tagset {
      ...TagsetDetails
    }
    visual(type: CARD) {
      id
      uri
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const InnovationFlowTemplateCardFragmentDoc = gql`
  fragment InnovationFlowTemplateCard on InnovationFlowTemplate {
    id
    definition
    type
    profile {
      ...TemplateCardProfileInfo
    }
  }
  ${TemplateCardProfileInfoFragmentDoc}
`;
export const LockedByDetailsFragmentDoc = gql`
  fragment LockedByDetails on User {
    id
    profile {
      id
      displayName
      visual(type: AVATAR) {
        ...VisualUri
      }
    }
  }
  ${VisualUriFragmentDoc}
`;
export const WhiteboardSummaryFragmentDoc = gql`
  fragment WhiteboardSummary on Whiteboard {
    id
    nameID
    createdDate
    profile {
      id
      displayName
    }
  }
`;
export const WhiteboardContentFragmentDoc = gql`
  fragment WhiteboardContent on Whiteboard {
    id
    content
  }
`;
export const WhiteboardRtContentFragmentDoc = gql`
  fragment WhiteboardRtContent on WhiteboardRt {
    id
    content
  }
`;
export const CreateWhiteboardWhiteboardTemplateFragmentDoc = gql`
  fragment CreateWhiteboardWhiteboardTemplate on WhiteboardTemplate {
    id
    profile {
      id
      displayName
      description
    }
    content
  }
`;
export const CalloutWithWhiteboardFragmentDoc = gql`
  fragment CalloutWithWhiteboard on Callout {
    id
    nameID
    type
    authorization {
      id
      anonymousReadAccess
      myPrivileges
    }
    whiteboards(IDs: [$whiteboardId]) {
      ...WhiteboardDetails
    }
  }
  ${WhiteboardDetailsFragmentDoc}
`;
export const CalloutWithWhiteboardRtFragmentDoc = gql`
  fragment CalloutWithWhiteboardRt on Callout {
    id
    nameID
    type
    authorization {
      id
      anonymousReadAccess
      myPrivileges
    }
    whiteboardRt {
      ...WhiteboardRtDetails
    }
  }
  ${WhiteboardRtDetailsFragmentDoc}
`;
export const CollaborationWithWhiteboardDetailsFragmentDoc = gql`
  fragment CollaborationWithWhiteboardDetails on Collaboration {
    id
    callouts {
      id
      nameID
      type
      authorization {
        id
        anonymousReadAccess
        myPrivileges
      }
      whiteboards {
        ...WhiteboardDetails
      }
      whiteboardRt {
        ...WhiteboardRtDetails
      }
    }
  }
  ${WhiteboardDetailsFragmentDoc}
  ${WhiteboardRtDetailsFragmentDoc}
`;
export const DiscussionDetailsFragmentDoc = gql`
  fragment DiscussionDetails on Discussion {
    id
    nameID
    profile {
      id
      displayName
      description
    }
    createdBy
    timestamp
    category
    comments {
      id
      messagesCount
      authorization {
        myPrivileges
      }
      messages {
        ...MessageDetails
      }
    }
    authorization {
      myPrivileges
    }
  }
  ${MessageDetailsFragmentDoc}
`;
export const AdminCommunityCandidateMemberFragmentDoc = gql`
  fragment AdminCommunityCandidateMember on User {
    id
    nameID
    email
    profile {
      id
      displayName
      avatar: visual(type: AVATAR) {
        ...VisualUri
      }
      location {
        id
        city
        country
      }
    }
  }
  ${VisualUriFragmentDoc}
`;
export const AdminCommunityApplicationFragmentDoc = gql`
  fragment AdminCommunityApplication on Application {
    id
    createdDate
    updatedDate
    lifecycle {
      id
      state
      nextEvents
    }
    user {
      ...AdminCommunityCandidateMember
    }
    questions {
      id
      name
      value
    }
  }
  ${AdminCommunityCandidateMemberFragmentDoc}
`;
export const AdminCommunityInvitationFragmentDoc = gql`
  fragment AdminCommunityInvitation on Invitation {
    id
    createdDate
    updatedDate
    lifecycle {
      id
      state
      nextEvents
    }
    user {
      ...AdminCommunityCandidateMember
    }
  }
  ${AdminCommunityCandidateMemberFragmentDoc}
`;
export const AdminCommunityInvitationExternalFragmentDoc = gql`
  fragment AdminCommunityInvitationExternal on InvitationExternal {
    id
    createdDate
    email
  }
`;
export const ApplicationFormFragmentDoc = gql`
  fragment ApplicationForm on Form {
    id
    description
    questions {
      question
      explanation
      maxLength
      required
      sortOrder
    }
  }
`;
export const CommunityDetailsFragmentDoc = gql`
  fragment CommunityDetails on Community {
    id
    myMembershipStatus
    communication {
      id
      authorization {
        id
        myPrivileges
      }
    }
  }
`;
export const UserCardFragmentDoc = gql`
  fragment UserCard on User {
    id
    nameID
    isContactable
    profile {
      id
      displayName
      location {
        country
        city
      }
      visual(type: AVATAR) {
        ...VisualUri
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const OrganizationCardFragmentDoc = gql`
  fragment OrganizationCard on Organization {
    id
    nameID
    metrics {
      id
      name
      value
    }
    profile {
      id
      displayName
      visual(type: AVATAR) {
        ...VisualUri
      }
      location {
        id
        city
        country
      }
      description
    }
    verification {
      id
      status
    }
  }
  ${VisualUriFragmentDoc}
`;
export const CommunityMembersFragmentDoc = gql`
  fragment CommunityMembers on Community {
    leadUsers: usersInRole(role: LEAD) {
      ...UserCard
    }
    memberUsers {
      ...UserCard
    }
    leadOrganizations: organizationsInRole(role: LEAD) {
      ...OrganizationCard
    }
    memberOrganizations: organizationsInRole(role: MEMBER) {
      ...OrganizationCard
    }
  }
  ${UserCardFragmentDoc}
  ${OrganizationCardFragmentDoc}
`;
export const CommunityPageMembersFragmentDoc = gql`
  fragment CommunityPageMembers on User {
    id
    nameID
    email
    agent {
      id
      credentials {
        id
        type
        resourceID
      }
    }
    profile {
      id
      displayName
      location {
        country
        city
      }
      visual(type: AVATAR) {
        ...VisualUri
      }
      description
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const BasicOrganizationDetailsFragmentDoc = gql`
  fragment BasicOrganizationDetails on Organization {
    id
    nameID
    profile {
      id
      displayName
      visual(type: AVATAR) {
        ...VisualUri
      }
    }
  }
  ${VisualUriFragmentDoc}
`;
export const CommunityMemberUserFragmentDoc = gql`
  fragment CommunityMemberUser on User {
    id
    nameID
    profile {
      id
      displayName
      avatar: visual(type: AVATAR) {
        ...VisualUri
      }
      location {
        id
        city
        country
      }
    }
    email
    firstName
    lastName
  }
  ${VisualUriFragmentDoc}
`;
export const OrganizationDetailsFragmentDoc = gql`
  fragment OrganizationDetails on Organization {
    id
    nameID
    profile {
      id
      displayName
      avatar: visual(type: AVATAR) {
        ...VisualUri
      }
      description
      tagsets {
        ...TagsetDetails
      }
      location {
        country
        city
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const CommunityPolicyFragmentDoc = gql`
  fragment CommunityPolicy on CommunityPolicy {
    id
    lead {
      maxOrg
      maxUser
      minOrg
      minUser
    }
    member {
      maxOrg
      maxUser
      minOrg
      minUser
    }
  }
`;
export const CommunityMembersDetailsFragmentDoc = gql`
  fragment CommunityMembersDetails on Community {
    id
    memberUsers {
      ...CommunityMemberUser
    }
    leadUsers: usersInRole(role: LEAD) {
      ...CommunityMemberUser
    }
    memberOrganizations: organizationsInRole(role: MEMBER) {
      ...OrganizationDetails
    }
    leadOrganizations: organizationsInRole(role: LEAD) {
      ...OrganizationDetails
    }
    policy {
      ...CommunityPolicy
    }
    authorization {
      id
      myPrivileges
    }
  }
  ${CommunityMemberUserFragmentDoc}
  ${OrganizationDetailsFragmentDoc}
  ${CommunityPolicyFragmentDoc}
`;
export const AvailableUserFragmentDoc = gql`
  fragment AvailableUser on User {
    id
    profile {
      id
      displayName
    }
    email
  }
`;
export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    startCursor
    endCursor
    hasNextPage
  }
`;
export const CommunityAvailableLeadUsersFragmentDoc = gql`
  fragment CommunityAvailableLeadUsers on Community {
    id
    availableLeadUsers(first: $first, after: $after, filter: $filter) {
      users {
        ...AvailableUser
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${AvailableUserFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const CommunityAvailableMemberUsersFragmentDoc = gql`
  fragment CommunityAvailableMemberUsers on Community {
    id
    availableMemberUsers(first: $first, after: $after, filter: $filter) {
      users {
        ...AvailableUser
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${AvailableUserFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const OrganizationContributorFragmentDoc = gql`
  fragment OrganizationContributor on Organization {
    id
    nameID
    metrics {
      id
      name
      value
    }
    orgProfile: profile {
      id
      displayName
      visual(type: AVATAR) {
        ...VisualUri
      }
      description
    }
    verification {
      id
      status
    }
  }
  ${VisualUriFragmentDoc}
`;
export const OrganizationContributorPaginatedFragmentDoc = gql`
  fragment OrganizationContributorPaginated on PaginatedOrganization {
    organization {
      ...OrganizationContributor
    }
    pageInfo {
      ...PageInfo
    }
  }
  ${OrganizationContributorFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const UserContributorFragmentDoc = gql`
  fragment UserContributor on User {
    id
    nameID
    isContactable
    agent {
      id
      credentials {
        id
        type
        resourceID
      }
    }
    userProfile: profile {
      id
      displayName
      location {
        city
        country
      }
      visual(type: AVATAR) {
        ...VisualUri
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const UserContributorPaginatedFragmentDoc = gql`
  fragment UserContributorPaginated on PaginatedUsers {
    users {
      ...UserContributor
    }
    pageInfo {
      ...PageInfo
    }
  }
  ${UserContributorFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const FullLocationFragmentDoc = gql`
  fragment fullLocation on Location {
    id
    country
    city
    addressLine1
    addressLine2
    stateOrProvince
    postalCode
  }
`;
export const OrganizationInfoFragmentDoc = gql`
  fragment OrganizationInfo on Organization {
    id
    nameID
    contactEmail
    domain
    authorization {
      id
      myPrivileges
    }
    verification {
      id
      status
    }
    website
    profile {
      id
      displayName
      description
      tagline
      visual(type: AVATAR) {
        ...VisualUri
        alternativeText
      }
      tagsets {
        ...TagsetDetails
      }
      references {
        id
        name
        uri
      }
      location {
        ...fullLocation
      }
    }
    metrics {
      id
      name
      value
    }
    associates @include(if: $includeAssociates) {
      id
      nameID
      isContactable
      profile {
        id
        displayName
        location {
          country
          city
        }
        visual(type: AVATAR) {
          ...VisualUri
          alternativeText
        }
        tagsets {
          ...TagsetDetails
        }
      }
    }
    admins @include(if: $includeAssociates) {
      id
    }
    owners @include(if: $includeAssociates) {
      id
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
  ${FullLocationFragmentDoc}
`;
export const OrganizationProfileInfoFragmentDoc = gql`
  fragment OrganizationProfileInfo on Organization {
    id
    nameID
    contactEmail
    domain
    legalEntityName
    website
    verification {
      id
      status
    }
    profile {
      id
      displayName
      visual(type: AVATAR) {
        ...VisualFull
      }
      description
      tagline
      location {
        country
        city
      }
      references {
        id
        name
        uri
        description
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const PendingMembershipsJourneyProfileFragmentDoc = gql`
  fragment PendingMembershipsJourneyProfile on Profile {
    id
    displayName
    ... on Profile @include(if: $fetchDetails) {
      tagline
      tagset {
        id
        tags
      }
      cardBanner: visual(type: CARD) {
        id
        uri
      }
    }
  }
`;
export const PendingMembershipInvitationFragmentDoc = gql`
  fragment PendingMembershipInvitation on Invitation {
    id
    welcomeMessage
    createdBy {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export const PendingMembershipsMembershipsFragmentDoc = gql`
  fragment PendingMembershipsMemberships on Community {
    id
    applications {
      id
    }
    invitations {
      ...PendingMembershipInvitation
    }
  }
  ${PendingMembershipInvitationFragmentDoc}
`;
export const UserSelectorUserInformationFragmentDoc = gql`
  fragment UserSelectorUserInformation on User {
    id
    profile {
      id
      displayName
      location {
        id
        city
        country
      }
      visual(type: AVATAR) {
        ...VisualUri
      }
    }
  }
  ${VisualUriFragmentDoc}
`;
export const GroupDetailsFragmentDoc = gql`
  fragment GroupDetails on UserGroup {
    id
    profile {
      id
      displayName
    }
  }
`;
export const GroupInfoFragmentDoc = gql`
  fragment GroupInfo on UserGroup {
    id
    name
    profile {
      id
      displayName
      visual(type: AVATAR) {
        ...VisualFull
      }
      description
      tagline
      references {
        id
        uri
        name
        description
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const GroupMembersFragmentDoc = gql`
  fragment GroupMembers on User {
    id
    profile {
      id
      displayName
    }
    firstName
    lastName
    email
  }
`;
export const UserAgentFragmentDoc = gql`
  fragment UserAgent on User {
    agent {
      id
      did
      credentials {
        id
        resourceID
        type
      }
    }
  }
`;
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    nameID
    firstName
    lastName
    email
    gender
    phone
    accountUpn
    agent {
      credentials {
        type
        resourceID
      }
    }
    profile {
      id
      displayName
      tagline
      location {
        country
        city
      }
      description
      visual(type: AVATAR) {
        ...VisualFull
      }
      references {
        id
        name
        uri
        description
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const UserDisplayNameFragmentDoc = gql`
  fragment UserDisplayName on User {
    id
    profile {
      id
      displayName
    }
  }
`;
export const UserRolesDetailsFragmentDoc = gql`
  fragment UserRolesDetails on ContributorRoles {
    spaces {
      id
      nameID
      spaceID
      displayName
      roles
      visibility
      challenges {
        id
        nameID
        displayName
        roles
      }
      opportunities {
        id
        nameID
        displayName
        roles
      }
      userGroups {
        id
        nameID
        displayName
      }
    }
    organizations {
      id
      nameID
      displayName
      userGroups {
        id
        nameID
        displayName
      }
      roles
    }
  }
`;
export const InnovationHubProfileFragmentDoc = gql`
  fragment InnovationHubProfile on Profile {
    id
    displayName
    description
    tagline
    tagset {
      ...TagsetDetails
    }
    visual(type: BANNER_WIDE) {
      ...VisualFull
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
`;
export const InnovationHubSpaceFragmentDoc = gql`
  fragment InnovationHubSpace on Space {
    id
    visibility
    profile {
      id
      displayName
    }
    host {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export const AdminInnovationHubFragmentDoc = gql`
  fragment AdminInnovationHub on InnovationHub {
    id
    nameID
    subdomain
    profile {
      ...InnovationHubProfile
    }
    spaceListFilter {
      ...InnovationHubSpace
    }
    spaceVisibilityFilter
  }
  ${InnovationHubProfileFragmentDoc}
  ${InnovationHubSpaceFragmentDoc}
`;
export const InnovationHubHomeInnovationHubFragmentDoc = gql`
  fragment InnovationHubHomeInnovationHub on InnovationHub {
    id
    nameID
    profile {
      id
      displayName
      tagline
      description
      banner: visual(type: BANNER_WIDE) {
        id
        uri
        alternativeText
      }
    }
  }
`;
export const DashboardTopCalloutFragmentDoc = gql`
  fragment DashboardTopCallout on Callout {
    id
    nameID
    profile {
      id
      displayName
      description
    }
    type
    visibility
    posts(limit: 2, shuffle: true) {
      ...PostCard
    }
    whiteboards(limit: 2, shuffle: true) {
      ...WhiteboardDetails
    }
    activity
  }
  ${PostCardFragmentDoc}
  ${WhiteboardDetailsFragmentDoc}
`;
export const DashboardTopCalloutsFragmentDoc = gql`
  fragment DashboardTopCallouts on Collaboration {
    callouts(sortByActivity: true) {
      ...DashboardTopCallout
    }
  }
  ${DashboardTopCalloutFragmentDoc}
`;
export const DashboardTimelineAuthorizationFragmentDoc = gql`
  fragment DashboardTimelineAuthorization on Collaboration {
    timeline {
      id
      authorization {
        id
        myPrivileges
      }
    }
  }
`;
export const DashboardLeadUserFragmentDoc = gql`
  fragment DashboardLeadUser on User {
    id
    nameID
    profile {
      id
      displayName
      avatar: visual(type: AVATAR) {
        ...VisualUri
      }
      location {
        id
        country
        city
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const DashboardContributingUserFragmentDoc = gql`
  fragment DashboardContributingUser on User {
    id
    isContactable
    nameID
    profile {
      id
      displayName
      location {
        id
        city
        country
      }
      visual(type: AVATAR) {
        id
        uri
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const AssociatedOrganizationDetailsFragmentDoc = gql`
  fragment AssociatedOrganizationDetails on Organization {
    id
    nameID
    profile {
      id
      tagline
      displayName
      description
      location {
        id
        city
        country
      }
      avatar: visual(type: AVATAR) {
        ...VisualUri
      }
      tagsets {
        id
        tags
      }
    }
    verification {
      id
      status
    }
    metrics {
      id
      name
      value
    }
  }
  ${VisualUriFragmentDoc}
`;
export const DashboardContributingOrganizationFragmentDoc = gql`
  fragment DashboardContributingOrganization on Organization {
    id
    nameID
    profile {
      id
      displayName
      visual(type: AVATAR) {
        id
        uri
        name
      }
      tagsets {
        ...TagsetDetails
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const EntityDashboardCommunityFragmentDoc = gql`
  fragment EntityDashboardCommunity on Community {
    id
    leadUsers: usersInRole(role: LEAD) {
      ...DashboardLeadUser
    }
    memberUsers(limit: 8) {
      ...DashboardContributingUser
    }
    leadOrganizations: organizationsInRole(role: LEAD) {
      ...AssociatedOrganizationDetails
    }
    memberOrganizations: organizationsInRole(role: MEMBER) {
      ...DashboardContributingOrganization
    }
    authorization {
      id
      myPrivileges
    }
  }
  ${DashboardLeadUserFragmentDoc}
  ${DashboardContributingUserFragmentDoc}
  ${AssociatedOrganizationDetailsFragmentDoc}
  ${DashboardContributingOrganizationFragmentDoc}
`;
export const ChallengeProfileFragmentDoc = gql`
  fragment ChallengeProfile on Challenge {
    id
    nameID
    metrics {
      id
      name
      value
    }
    profile {
      id
      tagline
      displayName
      visuals {
        ...VisualFull
      }
      tagset {
        ...TagsetDetails
      }
    }
    authorization {
      id
      myPrivileges
    }
    innovationFlow {
      id
      lifecycle {
        id
        machineDef
        state
        nextEvents
        stateIsFinal
      }
    }
    context {
      id
      vision
      authorization {
        id
        myPrivileges
        anonymousReadAccess
      }
    }
    collaboration {
      id
      ...DashboardTopCallouts
      ...DashboardTimelineAuthorization
    }
    community {
      id
      myMembershipStatus
      ...EntityDashboardCommunity
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
  ${DashboardTopCalloutsFragmentDoc}
  ${DashboardTimelineAuthorizationFragmentDoc}
  ${EntityDashboardCommunityFragmentDoc}
`;
export const ChallengeInfoFragmentDoc = gql`
  fragment ChallengeInfo on Challenge {
    id
    nameID
    profile {
      id
      displayName
      tagline
      description
      tagset {
        ...TagsetDetails
      }
      references {
        id
        name
        uri
      }
      visuals {
        ...VisualFull
      }
      location {
        ...fullLocation
      }
    }
    community {
      id
      authorization {
        id
        myPrivileges
      }
    }
    authorization {
      id
      myPrivileges
    }
    context {
      id
      authorization {
        id
        myPrivileges
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
  ${FullLocationFragmentDoc}
`;
export const NewChallengeFragmentDoc = gql`
  fragment NewChallenge on Challenge {
    id
    nameID
    profile {
      id
      displayName
    }
  }
`;
export const ContextDetailsFragmentDoc = gql`
  fragment ContextDetails on Context {
    id
    vision
    impact
    who
    authorization {
      id
      myPrivileges
      anonymousReadAccess
    }
  }
`;
export const OpportunityCardFragmentDoc = gql`
  fragment OpportunityCard on Opportunity {
    id
    nameID
    profile {
      id
      displayName
      tagline
      tagset {
        ...TagsetDetails
      }
      cardBanner: visual(type: CARD) {
        ...VisualFull
      }
    }
    metrics {
      id
      name
      value
    }
    innovationFlow {
      id
      lifecycle {
        id
        state
      }
    }
    context {
      ...ContextDetails
    }
    projects {
      id
      nameID
      profile {
        id
        displayName
        description
      }
      lifecycle {
        id
        state
      }
    }
    community {
      id
      myMembershipStatus
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
  ${ContextDetailsFragmentDoc}
`;
export const OpportunitiesOnChallengeFragmentDoc = gql`
  fragment OpportunitiesOnChallenge on Challenge {
    id
    opportunities {
      ...OpportunityCard
    }
  }
  ${OpportunityCardFragmentDoc}
`;
export const ContextTabFragmentDoc = gql`
  fragment ContextTab on Context {
    id
    authorization {
      id
      myPrivileges
    }
    vision
    impact
    who
  }
`;
export const LifecycleContextTabFragmentDoc = gql`
  fragment LifecycleContextTab on Lifecycle {
    id
    state
    machineDef
  }
`;
export const MetricsItemFragmentDoc = gql`
  fragment MetricsItem on NVP {
    id
    name
    value
  }
`;
export const ProfileJourneyDataFragmentDoc = gql`
  fragment ProfileJourneyData on Profile {
    id
    displayName
    tagline
    references {
      ...ReferenceDetails
    }
    description
  }
  ${ReferenceDetailsFragmentDoc}
`;
export const ContextJourneyDataFragmentDoc = gql`
  fragment ContextJourneyData on Context {
    id
    vision
    who
    impact
  }
`;
export const JourneyCommunityFragmentDoc = gql`
  fragment JourneyCommunity on Community {
    id
    leadUsers: usersInRole(role: LEAD) {
      ...DashboardLeadUser
    }
    leadOrganizations: organizationsInRole(role: LEAD) {
      ...AssociatedOrganizationDetails
    }
    authorization {
      id
      myPrivileges
    }
  }
  ${DashboardLeadUserFragmentDoc}
  ${AssociatedOrganizationDetailsFragmentDoc}
`;
export const OpportunityPageFragmentDoc = gql`
  fragment OpportunityPage on Opportunity {
    id
    nameID
    profile {
      id
      displayName
      tagset {
        ...TagsetDetails
      }
      references {
        id
        name
        description
        uri
      }
      visuals {
        ...VisualUri
      }
    }
    authorization {
      id
      anonymousReadAccess
      myPrivileges
    }
    metrics {
      id
      name
      value
    }
    innovationFlow {
      lifecycle {
        id
        machineDef
        state
        nextEvents
        stateIsFinal
      }
    }
    collaboration {
      id
      relations {
        id
        type
        actorRole
        actorName
        actorType
        description
      }
      ...DashboardTopCallouts
      ...DashboardTimelineAuthorization
    }
    context {
      id
      vision
      authorization {
        id
        anonymousReadAccess
        myPrivileges
      }
    }
    community {
      ...EntityDashboardCommunity
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
  ${DashboardTopCalloutsFragmentDoc}
  ${DashboardTimelineAuthorizationFragmentDoc}
  ${EntityDashboardCommunityFragmentDoc}
`;
export const OpportunityPageRelationsFragmentDoc = gql`
  fragment OpportunityPageRelations on Relation {
    id
    type
    actorRole
    actorName
    actorType
    description
  }
`;
export const OpportunityProviderFragmentDoc = gql`
  fragment OpportunityProvider on Opportunity {
    id
    nameID
    profile {
      id
      displayName
      description
      tagline
      visuals {
        ...VisualFull
      }
      tagset {
        ...TagsetDetails
      }
      location {
        id
        country
        city
      }
    }
    authorization {
      id
      myPrivileges
    }
    context {
      id
      authorization {
        id
        myPrivileges
        anonymousReadAccess
      }
    }
    community {
      id
      authorization {
        id
        myPrivileges
      }
    }
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const NewOpportunityFragmentDoc = gql`
  fragment NewOpportunity on Opportunity {
    id
    nameID
    profile {
      id
      displayName
    }
  }
`;
export const CommunityPageCommunityFragmentDoc = gql`
  fragment CommunityPageCommunity on Community {
    id
    leadUsers: usersInRole(role: LEAD) {
      ...DashboardLeadUser
    }
    memberUsers {
      ...DashboardContributingUser
    }
    leadOrganizations: organizationsInRole(role: LEAD) {
      ...AssociatedOrganizationDetails
    }
    memberOrganizations: organizationsInRole(role: MEMBER) {
      ...DashboardContributingOrganization
    }
  }
  ${DashboardLeadUserFragmentDoc}
  ${DashboardContributingUserFragmentDoc}
  ${AssociatedOrganizationDetailsFragmentDoc}
  ${DashboardContributingOrganizationFragmentDoc}
`;
export const SpaceDetailsFragmentDoc = gql`
  fragment SpaceDetails on Space {
    id
    nameID
    profile {
      id
      displayName
      description
      tagline
      tagset {
        ...TagsetDetails
      }
      references {
        id
        name
        description
        uri
      }
      visuals {
        ...VisualFull
      }
      location {
        ...fullLocation
      }
    }
    host {
      id
    }
    authorization {
      id
      anonymousReadAccess
    }
    context {
      ...ContextDetails
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
  ${FullLocationFragmentDoc}
  ${ContextDetailsFragmentDoc}
`;
export const SpaceInfoFragmentDoc = gql`
  fragment SpaceInfo on Space {
    ...SpaceDetails
    authorization {
      id
      myPrivileges
    }
    community {
      id
      authorization {
        id
        myPrivileges
      }
    }
    context {
      id
      authorization {
        id
        myPrivileges
      }
    }
    visibility
  }
  ${SpaceDetailsFragmentDoc}
`;
export const SpaceWelcomeBlockContributorProfileFragmentDoc = gql`
  fragment SpaceWelcomeBlockContributorProfile on Profile {
    id
    displayName
    location {
      id
      city
      country
    }
    tagsets {
      id
      tags
    }
  }
`;
export const SpacePageFragmentDoc = gql`
  fragment SpacePage on Space {
    id
    nameID
    visibility
    metrics {
      id
      name
      value
    }
    authorization {
      id
      anonymousReadAccess
      myPrivileges
    }
    host {
      ...AssociatedOrganizationDetails
      profile {
        ...SpaceWelcomeBlockContributorProfile
      }
    }
    profile {
      id
      displayName
      description
      tagline
      visuals {
        ...VisualUri
      }
      tagset {
        ...TagsetDetails
      }
    }
    context {
      id
      vision
      who
      impact
      authorization {
        id
        anonymousReadAccess
        myPrivileges
      }
    }
    collaboration {
      id
      ...DashboardTopCallouts
      ...DashboardTimelineAuthorization
    }
    community {
      id
      myMembershipStatus
      ...EntityDashboardCommunity
      leadUsers: usersInRole(role: LEAD) {
        profile {
          ...SpaceWelcomeBlockContributorProfile
        }
      }
    }
  }
  ${AssociatedOrganizationDetailsFragmentDoc}
  ${SpaceWelcomeBlockContributorProfileFragmentDoc}
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
  ${DashboardTopCalloutsFragmentDoc}
  ${DashboardTimelineAuthorizationFragmentDoc}
  ${EntityDashboardCommunityFragmentDoc}
`;
export const SpaceDashboardNavigationProfileFragmentDoc = gql`
  fragment SpaceDashboardNavigationProfile on Profile {
    id
    displayName
    tagline
    tagset {
      ...TagsetDetails
    }
    visual(type: CARD) {
      id
      uri
      alternativeText
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const SpaceDashboardNavigationContextFragmentDoc = gql`
  fragment SpaceDashboardNavigationContext on Context {
    id
    vision
  }
`;
export const SpaceDashboardNavigationLifecycleFragmentDoc = gql`
  fragment SpaceDashboardNavigationLifecycle on Lifecycle {
    id
    state
  }
`;
export const SpaceDashboardNavigationCommunityFragmentDoc = gql`
  fragment SpaceDashboardNavigationCommunity on Community {
    id
    myMembershipStatus
  }
`;
export const PostTemplateCardFragmentDoc = gql`
  fragment PostTemplateCard on PostTemplate {
    id
    defaultDescription
    type
    profile {
      ...TemplateCardProfileInfo
    }
  }
  ${TemplateCardProfileInfoFragmentDoc}
`;
export const WhiteboardTemplateCardFragmentDoc = gql`
  fragment WhiteboardTemplateCard on WhiteboardTemplate {
    id
    profile {
      ...TemplateCardProfileInfo
    }
  }
  ${TemplateCardProfileInfoFragmentDoc}
`;
export const InnovationFlowTemplateFragmentDoc = gql`
  fragment InnovationFlowTemplate on InnovationFlowTemplate {
    id
    definition
    type
    profile {
      ...TemplateCardProfileInfo
    }
  }
  ${TemplateCardProfileInfoFragmentDoc}
`;
export const SpaceTemplatesFragmentDoc = gql`
  fragment SpaceTemplates on Space {
    templates {
      id
      postTemplates {
        ...PostTemplateCard
      }
      whiteboardTemplates {
        ...WhiteboardTemplateCard
      }
      innovationFlowTemplates {
        ...InnovationFlowTemplate
      }
    }
  }
  ${PostTemplateCardFragmentDoc}
  ${WhiteboardTemplateCardFragmentDoc}
  ${InnovationFlowTemplateFragmentDoc}
`;
export const ChallengeCardFragmentDoc = gql`
  fragment ChallengeCard on Challenge {
    id
    nameID
    authorization {
      id
      anonymousReadAccess
    }
    metrics {
      id
      name
      value
    }
    profile {
      id
      tagline
      displayName
      description
      cardBanner: visual(type: CARD) {
        ...VisualUri
      }
      tagset {
        ...TagsetDetails
      }
    }
    context {
      id
      vision
    }
    innovationFlow {
      id
      lifecycle {
        id
        state
      }
    }
    community {
      id
      myMembershipStatus
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const ChallengesOnSpaceFragmentDoc = gql`
  fragment ChallengesOnSpace on Space {
    id
    challenges {
      ...ChallengeCard
    }
  }
  ${ChallengeCardFragmentDoc}
`;
export const ContextDetailsProviderFragmentDoc = gql`
  fragment ContextDetailsProvider on Context {
    id
    vision
    impact
    who
  }
`;
export const SpaceDetailsProviderFragmentDoc = gql`
  fragment SpaceDetailsProvider on Space {
    id
    nameID
    profile {
      id
      displayName
      tagline
      tagset {
        ...TagsetDetails
      }
      cardBanner: visual(type: CARD) {
        ...VisualUri
      }
    }
    authorization {
      id
      anonymousReadAccess
    }
    metrics {
      name
      value
    }
    community {
      id
      myMembershipStatus
    }
    context {
      ...ContextDetailsProvider
    }
    visibility
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
  ${ContextDetailsProviderFragmentDoc}
`;
export const SpaceNameFragmentDoc = gql`
  fragment SpaceName on Space {
    id
    nameID
    profile {
      id
      displayName
    }
  }
`;
export const AdminSpaceFragmentDoc = gql`
  fragment AdminSpace on Space {
    id
    nameID
    visibility
    profile {
      id
      displayName
    }
    authorization {
      id
      myPrivileges
    }
    host {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export const DocumentDataFragmentDoc = gql`
  fragment DocumentData on Document {
    id
    displayName
    size
    mimeType
    createdBy {
      id
      nameID
      profile {
        id
        displayName
      }
    }
    uploadedDate
    authorization {
      id
      myPrivileges
    }
  }
`;
export const InnovationPackProfileFragmentDoc = gql`
  fragment InnovationPackProfile on Profile {
    id
    displayName
    description
    tagline
    tagset {
      ...TagsetDetails
    }
    references {
      id
      name
      description
      uri
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const ProfileInfoWithVisualFragmentDoc = gql`
  fragment ProfileInfoWithVisual on Profile {
    id
    displayName
    description
    tagset {
      ...TagsetDetails
    }
    visual(type: CARD) {
      ...VisualFull
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
`;
export const AdminPostTemplateFragmentDoc = gql`
  fragment AdminPostTemplate on PostTemplate {
    id
    defaultDescription
    type
    profile {
      ...ProfileInfoWithVisual
    }
  }
  ${ProfileInfoWithVisualFragmentDoc}
`;
export const AdminInnovationFlowTemplateFragmentDoc = gql`
  fragment AdminInnovationFlowTemplate on InnovationFlowTemplate {
    id
    definition
    type
    profile {
      ...ProfileInfoWithVisual
    }
  }
  ${ProfileInfoWithVisualFragmentDoc}
`;
export const AdminWhiteboardTemplateFragmentDoc = gql`
  fragment AdminWhiteboardTemplate on WhiteboardTemplate {
    id
    profile {
      ...ProfileInfoWithVisual
    }
  }
  ${ProfileInfoWithVisualFragmentDoc}
`;
export const AdminInnovationPackTemplatesFragmentDoc = gql`
  fragment AdminInnovationPackTemplates on TemplatesSet {
    id
    postTemplates {
      ...AdminPostTemplate
    }
    innovationFlowTemplates {
      ...AdminInnovationFlowTemplate
    }
    whiteboardTemplates {
      ...AdminWhiteboardTemplate
    }
  }
  ${AdminPostTemplateFragmentDoc}
  ${AdminInnovationFlowTemplateFragmentDoc}
  ${AdminWhiteboardTemplateFragmentDoc}
`;
export const ConfigurationFragmentDoc = gql`
  fragment Configuration on Config {
    authentication {
      providers {
        name
        label
        icon
        enabled
        config {
          __typename
          ... on OryConfig {
            kratosPublicBaseURL
            issuer
          }
        }
      }
    }
    platform {
      environment
      domain
      about
      feedback
      privacy
      security
      support
      terms
      impact
      foundation
      opensource
      inspiration
      innovationLibrary
      releases
      help
      community
      newuser
      tips
      aup
      featureFlags {
        enabled
        name
      }
    }
    sentry {
      enabled
      endpoint
      submitPII
    }
    apm {
      rumEnabled
      endpoint
    }
    geo {
      endpoint
    }
  }
`;
export const SearchResultPostProfileFragmentDoc = gql`
  fragment SearchResultPostProfile on Profile {
    id
    description
    tagset {
      ...TagsetDetails
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const PostParentFragmentDoc = gql`
  fragment PostParent on SearchResultPost {
    space {
      id
      nameID
      profile {
        id
        displayName
      }
      authorization {
        id
        anonymousReadAccess
      }
    }
    challenge {
      id
      nameID
      profile {
        id
        displayName
      }
      authorization {
        id
        anonymousReadAccess
      }
    }
    opportunity {
      id
      nameID
      profile {
        id
        displayName
      }
      authorization {
        id
        anonymousReadAccess
      }
    }
    callout {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export const SearchResultPostFragmentDoc = gql`
  fragment SearchResultPost on SearchResultPost {
    post {
      id
      nameID
      profile {
        displayName
        visual(type: CARD) {
          ...VisualUri
        }
        ...SearchResultPostProfile
      }
      createdBy {
        id
        profile {
          id
          displayName
        }
      }
      createdDate
      comments {
        id
        messagesCount
      }
    }
    ...PostParent
  }
  ${VisualUriFragmentDoc}
  ${SearchResultPostProfileFragmentDoc}
  ${PostParentFragmentDoc}
`;
export const SearchResultProfileFragmentDoc = gql`
  fragment SearchResultProfile on Profile {
    id
    description
    location {
      id
      country
      city
    }
    tagsets {
      ...TagsetDetails
    }
    visual(type: AVATAR) {
      ...VisualUri
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;
export const SearchResultUserFragmentDoc = gql`
  fragment SearchResultUser on SearchResultUser {
    user {
      id
      nameID
      profile {
        displayName
        ...SearchResultProfile
      }
    }
  }
  ${SearchResultProfileFragmentDoc}
`;
export const SearchResultOrganizationFragmentDoc = gql`
  fragment SearchResultOrganization on SearchResultOrganization {
    organization {
      id
      nameID
      profile {
        displayName
        ...SearchResultProfile
      }
    }
  }
  ${SearchResultProfileFragmentDoc}
`;
export const SearchResultSpaceFragmentDoc = gql`
  fragment SearchResultSpace on SearchResultSpace {
    space {
      id
      nameID
      profile {
        id
        displayName
        tagset {
          ...TagsetDetails
        }
        tagline
        visuals {
          ...VisualUri
        }
      }
      context {
        id
        vision
      }
      authorization {
        id
        anonymousReadAccess
      }
      community {
        id
        myMembershipStatus
      }
      visibility
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;
export const SearchResultChallengeFragmentDoc = gql`
  fragment SearchResultChallenge on SearchResultChallenge {
    challenge {
      id
      nameID
      profile {
        id
        displayName
        tagset {
          ...TagsetDetails
        }
        tagline
        visuals {
          ...VisualUri
        }
      }
      spaceID
      context {
        id
        vision
      }
      authorization {
        id
        anonymousReadAccess
      }
      community {
        id
        myMembershipStatus
      }
    }
    space {
      id
      nameID
      profile {
        id
        displayName
        tagline
      }
      authorization {
        id
        anonymousReadAccess
      }
      visibility
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;
export const SearchResultOpportunityFragmentDoc = gql`
  fragment SearchResultOpportunity on SearchResultOpportunity {
    opportunity {
      id
      nameID
      profile {
        id
        displayName
        tagset {
          ...TagsetDetails
        }
        tagline
        visuals {
          ...VisualUri
        }
      }
      context {
        id
        vision
      }
      authorization {
        id
        anonymousReadAccess
      }
      community {
        id
        myMembershipStatus
      }
    }
    challenge {
      id
      nameID
      profile {
        id
        displayName
      }
      authorization {
        id
        anonymousReadAccess
      }
    }
    space {
      id
      nameID
      profile {
        id
        displayName
      }
      visibility
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;
export const ProfileStorageConfigFragmentDoc = gql`
  fragment ProfileStorageConfig on Profile {
    id
    storageBucket {
      id
      allowedMimeTypes
      maxFileSize
      authorization {
        id
        myPrivileges
      }
    }
  }
`;
export const CalloutOnCollaborationWithStorageConfigFragmentDoc = gql`
  fragment CalloutOnCollaborationWithStorageConfig on Collaboration {
    id
    callouts(IDs: [$calloutId]) {
      id
      profile {
        ...ProfileStorageConfig
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;
export const PostInCalloutOnCollaborationWithStorageConfigFragmentDoc = gql`
  fragment PostInCalloutOnCollaborationWithStorageConfig on Collaboration {
    id
    callouts(IDs: [$calloutId]) {
      id
      posts(IDs: [$postId]) {
        id
        profile {
          ...ProfileStorageConfig
        }
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;
export const EventProfileFragmentDoc = gql`
  fragment EventProfile on Profile {
    id
    displayName
    description
    tagset {
      ...TagsetDetails
    }
    references {
      id
      name
      uri
      description
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export const CalendarEventInfoFragmentDoc = gql`
  fragment CalendarEventInfo on CalendarEvent {
    id
    nameID
    startDate
    durationDays
    durationMinutes
    wholeDay
    multipleDays
    profile {
      ...EventProfile
    }
  }
  ${EventProfileFragmentDoc}
`;
export const CollaborationTimelineInfoFragmentDoc = gql`
  fragment CollaborationTimelineInfo on Collaboration {
    id
    timeline {
      id
      calendar {
        id
        authorization {
          id
          myPrivileges
        }
        events(limit: $limit) {
          ...CalendarEventInfo
        }
      }
    }
  }
  ${CalendarEventInfoFragmentDoc}
`;
export const CalendarEventDetailsFragmentDoc = gql`
  fragment CalendarEventDetails on CalendarEvent {
    ...CalendarEventInfo
    type
    createdBy {
      id
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
          uri
        }
        tagsets {
          ...TagsetDetails
        }
      }
    }
    createdDate
    comments {
      ...CommentsWithMessages
    }
  }
  ${CalendarEventInfoFragmentDoc}
  ${TagsetDetailsFragmentDoc}
  ${CommentsWithMessagesFragmentDoc}
`;
export const LibraryTemplatesFragmentDoc = gql`
  fragment LibraryTemplates on TemplatesSet {
    id
    postTemplates {
      id
      profile {
        id
        displayName
        description
        visual(type: CARD) {
          ...VisualUri
        }
        tagset {
          ...TagsetDetails
        }
      }
      type
      defaultDescription
    }
    whiteboardTemplates {
      id
      profile {
        id
        displayName
        description
        visual(type: CARD) {
          ...VisualUri
        }
        tagset {
          ...TagsetDetails
        }
      }
    }
    innovationFlowTemplates {
      id
      profile {
        id
        displayName
        description
        visual(type: CARD) {
          ...VisualUri
        }
        tagset {
          ...TagsetDetails
        }
      }
      definition
      type
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const InnovationPackProviderProfileWithAvatarFragmentDoc = gql`
  fragment InnovationPackProviderProfileWithAvatar on Organization {
    id
    nameID
    profile {
      id
      displayName
      avatar: visual(type: AVATAR) {
        id
        uri
      }
    }
  }
`;
export const InnovationPackCardFragmentDoc = gql`
  fragment InnovationPackCard on InnovationPack {
    id
    nameID
    profile {
      id
      displayName
      description
      tagset {
        ...TagsetDetails
      }
    }
    templates {
      ...LibraryTemplates
    }
    provider {
      ...InnovationPackProviderProfileWithAvatar
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${LibraryTemplatesFragmentDoc}
  ${InnovationPackProviderProfileWithAvatarFragmentDoc}
`;
export const AssignUserAsBetaTesterDocument = gql`
  mutation assignUserAsBetaTester($input: GrantAuthorizationCredentialInput!) {
    grantCredentialToUser(grantCredentialData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserAsBetaTesterMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsBetaTesterMutation,
  SchemaTypes.AssignUserAsBetaTesterMutationVariables
>;

/**
 * __useAssignUserAsBetaTesterMutation__
 *
 * To run a mutation, you first call `useAssignUserAsBetaTesterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsBetaTesterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsBetaTesterMutation, { data, loading, error }] = useAssignUserAsBetaTesterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserAsBetaTesterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsBetaTesterMutation,
    SchemaTypes.AssignUserAsBetaTesterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsBetaTesterMutation,
    SchemaTypes.AssignUserAsBetaTesterMutationVariables
  >(AssignUserAsBetaTesterDocument, options);
}

export type AssignUserAsBetaTesterMutationHookResult = ReturnType<typeof useAssignUserAsBetaTesterMutation>;
export type AssignUserAsBetaTesterMutationResult = Apollo.MutationResult<SchemaTypes.AssignUserAsBetaTesterMutation>;
export type AssignUserAsBetaTesterMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsBetaTesterMutation,
  SchemaTypes.AssignUserAsBetaTesterMutationVariables
>;
export const AssignUserAsGlobalAdminDocument = gql`
  mutation assignUserAsGlobalAdmin($input: AssignGlobalAdminInput!) {
    assignUserAsGlobalAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserAsGlobalAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsGlobalAdminMutation,
  SchemaTypes.AssignUserAsGlobalAdminMutationVariables
>;

/**
 * __useAssignUserAsGlobalAdminMutation__
 *
 * To run a mutation, you first call `useAssignUserAsGlobalAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsGlobalAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsGlobalAdminMutation, { data, loading, error }] = useAssignUserAsGlobalAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserAsGlobalAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsGlobalAdminMutation,
    SchemaTypes.AssignUserAsGlobalAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsGlobalAdminMutation,
    SchemaTypes.AssignUserAsGlobalAdminMutationVariables
  >(AssignUserAsGlobalAdminDocument, options);
}

export type AssignUserAsGlobalAdminMutationHookResult = ReturnType<typeof useAssignUserAsGlobalAdminMutation>;
export type AssignUserAsGlobalAdminMutationResult = Apollo.MutationResult<SchemaTypes.AssignUserAsGlobalAdminMutation>;
export type AssignUserAsGlobalAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsGlobalAdminMutation,
  SchemaTypes.AssignUserAsGlobalAdminMutationVariables
>;
export const AssignUserAsGlobalCommunityAdminDocument = gql`
  mutation assignUserAsGlobalCommunityAdmin($input: AssignGlobalCommunityAdminInput!) {
    assignUserAsGlobalCommunityAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserAsGlobalCommunityAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsGlobalCommunityAdminMutation,
  SchemaTypes.AssignUserAsGlobalCommunityAdminMutationVariables
>;

/**
 * __useAssignUserAsGlobalCommunityAdminMutation__
 *
 * To run a mutation, you first call `useAssignUserAsGlobalCommunityAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsGlobalCommunityAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsGlobalCommunityAdminMutation, { data, loading, error }] = useAssignUserAsGlobalCommunityAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserAsGlobalCommunityAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsGlobalCommunityAdminMutation,
    SchemaTypes.AssignUserAsGlobalCommunityAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsGlobalCommunityAdminMutation,
    SchemaTypes.AssignUserAsGlobalCommunityAdminMutationVariables
  >(AssignUserAsGlobalCommunityAdminDocument, options);
}

export type AssignUserAsGlobalCommunityAdminMutationHookResult = ReturnType<
  typeof useAssignUserAsGlobalCommunityAdminMutation
>;
export type AssignUserAsGlobalCommunityAdminMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserAsGlobalCommunityAdminMutation>;
export type AssignUserAsGlobalCommunityAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsGlobalCommunityAdminMutation,
  SchemaTypes.AssignUserAsGlobalCommunityAdminMutationVariables
>;
export const AssignUserAsGlobalSpacesAdminDocument = gql`
  mutation assignUserAsGlobalSpacesAdmin($input: AssignGlobalSpacesAdminInput!) {
    assignUserAsGlobalSpacesAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserAsGlobalSpacesAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsGlobalSpacesAdminMutation,
  SchemaTypes.AssignUserAsGlobalSpacesAdminMutationVariables
>;

/**
 * __useAssignUserAsGlobalSpacesAdminMutation__
 *
 * To run a mutation, you first call `useAssignUserAsGlobalSpacesAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsGlobalSpacesAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsGlobalSpacesAdminMutation, { data, loading, error }] = useAssignUserAsGlobalSpacesAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserAsGlobalSpacesAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsGlobalSpacesAdminMutation,
    SchemaTypes.AssignUserAsGlobalSpacesAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsGlobalSpacesAdminMutation,
    SchemaTypes.AssignUserAsGlobalSpacesAdminMutationVariables
  >(AssignUserAsGlobalSpacesAdminDocument, options);
}

export type AssignUserAsGlobalSpacesAdminMutationHookResult = ReturnType<
  typeof useAssignUserAsGlobalSpacesAdminMutation
>;
export type AssignUserAsGlobalSpacesAdminMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserAsGlobalSpacesAdminMutation>;
export type AssignUserAsGlobalSpacesAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsGlobalSpacesAdminMutation,
  SchemaTypes.AssignUserAsGlobalSpacesAdminMutationVariables
>;
export const AssignUserAsOrganizationOwnerDocument = gql`
  mutation assignUserAsOrganizationOwner($input: AssignOrganizationOwnerInput!) {
    assignUserAsOrganizationOwner(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserAsOrganizationOwnerMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsOrganizationOwnerMutation,
  SchemaTypes.AssignUserAsOrganizationOwnerMutationVariables
>;

/**
 * __useAssignUserAsOrganizationOwnerMutation__
 *
 * To run a mutation, you first call `useAssignUserAsOrganizationOwnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsOrganizationOwnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsOrganizationOwnerMutation, { data, loading, error }] = useAssignUserAsOrganizationOwnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserAsOrganizationOwnerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsOrganizationOwnerMutation,
    SchemaTypes.AssignUserAsOrganizationOwnerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsOrganizationOwnerMutation,
    SchemaTypes.AssignUserAsOrganizationOwnerMutationVariables
  >(AssignUserAsOrganizationOwnerDocument, options);
}

export type AssignUserAsOrganizationOwnerMutationHookResult = ReturnType<
  typeof useAssignUserAsOrganizationOwnerMutation
>;
export type AssignUserAsOrganizationOwnerMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserAsOrganizationOwnerMutation>;
export type AssignUserAsOrganizationOwnerMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsOrganizationOwnerMutation,
  SchemaTypes.AssignUserAsOrganizationOwnerMutationVariables
>;
export const RemoveUserAsBetaTesterDocument = gql`
  mutation removeUserAsBetaTester($input: RevokeAuthorizationCredentialInput!) {
    revokeCredentialFromUser(revokeCredentialData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserAsBetaTesterMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsBetaTesterMutation,
  SchemaTypes.RemoveUserAsBetaTesterMutationVariables
>;

/**
 * __useRemoveUserAsBetaTesterMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsBetaTesterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsBetaTesterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsBetaTesterMutation, { data, loading, error }] = useRemoveUserAsBetaTesterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserAsBetaTesterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsBetaTesterMutation,
    SchemaTypes.RemoveUserAsBetaTesterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsBetaTesterMutation,
    SchemaTypes.RemoveUserAsBetaTesterMutationVariables
  >(RemoveUserAsBetaTesterDocument, options);
}

export type RemoveUserAsBetaTesterMutationHookResult = ReturnType<typeof useRemoveUserAsBetaTesterMutation>;
export type RemoveUserAsBetaTesterMutationResult = Apollo.MutationResult<SchemaTypes.RemoveUserAsBetaTesterMutation>;
export type RemoveUserAsBetaTesterMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsBetaTesterMutation,
  SchemaTypes.RemoveUserAsBetaTesterMutationVariables
>;
export const RemoveUserAsGlobalAdminDocument = gql`
  mutation removeUserAsGlobalAdmin($input: RemoveGlobalAdminInput!) {
    removeUserAsGlobalAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserAsGlobalAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsGlobalAdminMutation,
  SchemaTypes.RemoveUserAsGlobalAdminMutationVariables
>;

/**
 * __useRemoveUserAsGlobalAdminMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsGlobalAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsGlobalAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsGlobalAdminMutation, { data, loading, error }] = useRemoveUserAsGlobalAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserAsGlobalAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsGlobalAdminMutation,
    SchemaTypes.RemoveUserAsGlobalAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsGlobalAdminMutation,
    SchemaTypes.RemoveUserAsGlobalAdminMutationVariables
  >(RemoveUserAsGlobalAdminDocument, options);
}

export type RemoveUserAsGlobalAdminMutationHookResult = ReturnType<typeof useRemoveUserAsGlobalAdminMutation>;
export type RemoveUserAsGlobalAdminMutationResult = Apollo.MutationResult<SchemaTypes.RemoveUserAsGlobalAdminMutation>;
export type RemoveUserAsGlobalAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsGlobalAdminMutation,
  SchemaTypes.RemoveUserAsGlobalAdminMutationVariables
>;
export const RemoveUserAsGlobalCommunityAdminDocument = gql`
  mutation removeUserAsGlobalCommunityAdmin($input: RemoveGlobalCommunityAdminInput!) {
    removeUserAsGlobalCommunityAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserAsGlobalCommunityAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsGlobalCommunityAdminMutation,
  SchemaTypes.RemoveUserAsGlobalCommunityAdminMutationVariables
>;

/**
 * __useRemoveUserAsGlobalCommunityAdminMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsGlobalCommunityAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsGlobalCommunityAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsGlobalCommunityAdminMutation, { data, loading, error }] = useRemoveUserAsGlobalCommunityAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserAsGlobalCommunityAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsGlobalCommunityAdminMutation,
    SchemaTypes.RemoveUserAsGlobalCommunityAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsGlobalCommunityAdminMutation,
    SchemaTypes.RemoveUserAsGlobalCommunityAdminMutationVariables
  >(RemoveUserAsGlobalCommunityAdminDocument, options);
}

export type RemoveUserAsGlobalCommunityAdminMutationHookResult = ReturnType<
  typeof useRemoveUserAsGlobalCommunityAdminMutation
>;
export type RemoveUserAsGlobalCommunityAdminMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserAsGlobalCommunityAdminMutation>;
export type RemoveUserAsGlobalCommunityAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsGlobalCommunityAdminMutation,
  SchemaTypes.RemoveUserAsGlobalCommunityAdminMutationVariables
>;
export const RemoveUserAsGlobalSpacesAdminDocument = gql`
  mutation removeUserAsGlobalSpacesAdmin($input: RemoveGlobalSpacesAdminInput!) {
    removeUserAsGlobalSpacesAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserAsGlobalSpacesAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsGlobalSpacesAdminMutation,
  SchemaTypes.RemoveUserAsGlobalSpacesAdminMutationVariables
>;

/**
 * __useRemoveUserAsGlobalSpacesAdminMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsGlobalSpacesAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsGlobalSpacesAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsGlobalSpacesAdminMutation, { data, loading, error }] = useRemoveUserAsGlobalSpacesAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserAsGlobalSpacesAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsGlobalSpacesAdminMutation,
    SchemaTypes.RemoveUserAsGlobalSpacesAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsGlobalSpacesAdminMutation,
    SchemaTypes.RemoveUserAsGlobalSpacesAdminMutationVariables
  >(RemoveUserAsGlobalSpacesAdminDocument, options);
}

export type RemoveUserAsGlobalSpacesAdminMutationHookResult = ReturnType<
  typeof useRemoveUserAsGlobalSpacesAdminMutation
>;
export type RemoveUserAsGlobalSpacesAdminMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserAsGlobalSpacesAdminMutation>;
export type RemoveUserAsGlobalSpacesAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsGlobalSpacesAdminMutation,
  SchemaTypes.RemoveUserAsGlobalSpacesAdminMutationVariables
>;
export const RemoveUserAsOrganizationOwnerDocument = gql`
  mutation removeUserAsOrganizationOwner($input: RemoveOrganizationOwnerInput!) {
    removeUserAsOrganizationOwner(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserAsOrganizationOwnerMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsOrganizationOwnerMutation,
  SchemaTypes.RemoveUserAsOrganizationOwnerMutationVariables
>;

/**
 * __useRemoveUserAsOrganizationOwnerMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsOrganizationOwnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsOrganizationOwnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsOrganizationOwnerMutation, { data, loading, error }] = useRemoveUserAsOrganizationOwnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserAsOrganizationOwnerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsOrganizationOwnerMutation,
    SchemaTypes.RemoveUserAsOrganizationOwnerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsOrganizationOwnerMutation,
    SchemaTypes.RemoveUserAsOrganizationOwnerMutationVariables
  >(RemoveUserAsOrganizationOwnerDocument, options);
}

export type RemoveUserAsOrganizationOwnerMutationHookResult = ReturnType<
  typeof useRemoveUserAsOrganizationOwnerMutation
>;
export type RemoveUserAsOrganizationOwnerMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserAsOrganizationOwnerMutation>;
export type RemoveUserAsOrganizationOwnerMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsOrganizationOwnerMutation,
  SchemaTypes.RemoveUserAsOrganizationOwnerMutationVariables
>;
export const UploadFileOnReferenceDocument = gql`
  mutation UploadFileOnReference($file: Upload!, $uploadData: StorageBucketUploadFileOnReferenceInput!) {
    uploadFileOnReference(uploadData: $uploadData, file: $file) {
      id
      uri
    }
  }
`;
export type UploadFileOnReferenceMutationFn = Apollo.MutationFunction<
  SchemaTypes.UploadFileOnReferenceMutation,
  SchemaTypes.UploadFileOnReferenceMutationVariables
>;

/**
 * __useUploadFileOnReferenceMutation__
 *
 * To run a mutation, you first call `useUploadFileOnReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileOnReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileOnReferenceMutation, { data, loading, error }] = useUploadFileOnReferenceMutation({
 *   variables: {
 *      file: // value for 'file'
 *      uploadData: // value for 'uploadData'
 *   },
 * });
 */
export function useUploadFileOnReferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UploadFileOnReferenceMutation,
    SchemaTypes.UploadFileOnReferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UploadFileOnReferenceMutation,
    SchemaTypes.UploadFileOnReferenceMutationVariables
  >(UploadFileOnReferenceDocument, options);
}

export type UploadFileOnReferenceMutationHookResult = ReturnType<typeof useUploadFileOnReferenceMutation>;
export type UploadFileOnReferenceMutationResult = Apollo.MutationResult<SchemaTypes.UploadFileOnReferenceMutation>;
export type UploadFileOnReferenceMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UploadFileOnReferenceMutation,
  SchemaTypes.UploadFileOnReferenceMutationVariables
>;
export const UploadFileDocument = gql`
  mutation UploadFile($file: Upload!, $uploadData: StorageBucketUploadFileInput!) {
    uploadFileOnStorageBucket(uploadData: $uploadData, file: $file)
  }
`;
export type UploadFileMutationFn = Apollo.MutationFunction<
  SchemaTypes.UploadFileMutation,
  SchemaTypes.UploadFileMutationVariables
>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      uploadData: // value for 'uploadData'
 *   },
 * });
 */
export function useUploadFileMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.UploadFileMutation, SchemaTypes.UploadFileMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UploadFileMutation, SchemaTypes.UploadFileMutationVariables>(
    UploadFileDocument,
    options
  );
}

export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<SchemaTypes.UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UploadFileMutation,
  SchemaTypes.UploadFileMutationVariables
>;
export const ProfileVerifiedCredentialDocument = gql`
  subscription profileVerifiedCredential {
    profileVerifiedCredential {
      vc
    }
  }
`;

/**
 * __useProfileVerifiedCredentialSubscription__
 *
 * To run a query within a React component, call `useProfileVerifiedCredentialSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProfileVerifiedCredentialSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileVerifiedCredentialSubscription({
 *   variables: {
 *   },
 * });
 */
export function useProfileVerifiedCredentialSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    SchemaTypes.ProfileVerifiedCredentialSubscription,
    SchemaTypes.ProfileVerifiedCredentialSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.ProfileVerifiedCredentialSubscription,
    SchemaTypes.ProfileVerifiedCredentialSubscriptionVariables
  >(ProfileVerifiedCredentialDocument, options);
}

export type ProfileVerifiedCredentialSubscriptionHookResult = ReturnType<
  typeof useProfileVerifiedCredentialSubscription
>;
export type ProfileVerifiedCredentialSubscriptionResult =
  Apollo.SubscriptionResult<SchemaTypes.ProfileVerifiedCredentialSubscription>;
export const GetSupportedCredentialMetadataDocument = gql`
  query getSupportedCredentialMetadata {
    getSupportedVerifiedCredentialMetadata {
      name
      description
      schema
      types
      uniqueType
      context
    }
  }
`;

/**
 * __useGetSupportedCredentialMetadataQuery__
 *
 * To run a query within a React component, call `useGetSupportedCredentialMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSupportedCredentialMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSupportedCredentialMetadataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSupportedCredentialMetadataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.GetSupportedCredentialMetadataQuery,
    SchemaTypes.GetSupportedCredentialMetadataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.GetSupportedCredentialMetadataQuery,
    SchemaTypes.GetSupportedCredentialMetadataQueryVariables
  >(GetSupportedCredentialMetadataDocument, options);
}

export function useGetSupportedCredentialMetadataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.GetSupportedCredentialMetadataQuery,
    SchemaTypes.GetSupportedCredentialMetadataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.GetSupportedCredentialMetadataQuery,
    SchemaTypes.GetSupportedCredentialMetadataQueryVariables
  >(GetSupportedCredentialMetadataDocument, options);
}

export type GetSupportedCredentialMetadataQueryHookResult = ReturnType<typeof useGetSupportedCredentialMetadataQuery>;
export type GetSupportedCredentialMetadataLazyQueryHookResult = ReturnType<
  typeof useGetSupportedCredentialMetadataLazyQuery
>;
export type GetSupportedCredentialMetadataQueryResult = Apollo.QueryResult<
  SchemaTypes.GetSupportedCredentialMetadataQuery,
  SchemaTypes.GetSupportedCredentialMetadataQueryVariables
>;
export function refetchGetSupportedCredentialMetadataQuery(
  variables?: SchemaTypes.GetSupportedCredentialMetadataQueryVariables
) {
  return { query: GetSupportedCredentialMetadataDocument, variables: variables };
}

export const BeginCredentialRequestInteractionDocument = gql`
  mutation beginCredentialRequestInteraction($types: [String!]!) {
    beginVerifiedCredentialRequestInteraction(types: $types) {
      qrCodeImg
      jwt
    }
  }
`;
export type BeginCredentialRequestInteractionMutationFn = Apollo.MutationFunction<
  SchemaTypes.BeginCredentialRequestInteractionMutation,
  SchemaTypes.BeginCredentialRequestInteractionMutationVariables
>;

/**
 * __useBeginCredentialRequestInteractionMutation__
 *
 * To run a mutation, you first call `useBeginCredentialRequestInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBeginCredentialRequestInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [beginCredentialRequestInteractionMutation, { data, loading, error }] = useBeginCredentialRequestInteractionMutation({
 *   variables: {
 *      types: // value for 'types'
 *   },
 * });
 */
export function useBeginCredentialRequestInteractionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.BeginCredentialRequestInteractionMutation,
    SchemaTypes.BeginCredentialRequestInteractionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.BeginCredentialRequestInteractionMutation,
    SchemaTypes.BeginCredentialRequestInteractionMutationVariables
  >(BeginCredentialRequestInteractionDocument, options);
}

export type BeginCredentialRequestInteractionMutationHookResult = ReturnType<
  typeof useBeginCredentialRequestInteractionMutation
>;
export type BeginCredentialRequestInteractionMutationResult =
  Apollo.MutationResult<SchemaTypes.BeginCredentialRequestInteractionMutation>;
export type BeginCredentialRequestInteractionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.BeginCredentialRequestInteractionMutation,
  SchemaTypes.BeginCredentialRequestInteractionMutationVariables
>;
export const BeginAlkemioUserCredentialOfferInteractionDocument = gql`
  mutation beginAlkemioUserCredentialOfferInteraction {
    beginAlkemioUserVerifiedCredentialOfferInteraction {
      jwt
      qrCodeImg
    }
  }
`;
export type BeginAlkemioUserCredentialOfferInteractionMutationFn = Apollo.MutationFunction<
  SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutation,
  SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutationVariables
>;

/**
 * __useBeginAlkemioUserCredentialOfferInteractionMutation__
 *
 * To run a mutation, you first call `useBeginAlkemioUserCredentialOfferInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBeginAlkemioUserCredentialOfferInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [beginAlkemioUserCredentialOfferInteractionMutation, { data, loading, error }] = useBeginAlkemioUserCredentialOfferInteractionMutation({
 *   variables: {
 *   },
 * });
 */
export function useBeginAlkemioUserCredentialOfferInteractionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutation,
    SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutation,
    SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutationVariables
  >(BeginAlkemioUserCredentialOfferInteractionDocument, options);
}

export type BeginAlkemioUserCredentialOfferInteractionMutationHookResult = ReturnType<
  typeof useBeginAlkemioUserCredentialOfferInteractionMutation
>;
export type BeginAlkemioUserCredentialOfferInteractionMutationResult =
  Apollo.MutationResult<SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutation>;
export type BeginAlkemioUserCredentialOfferInteractionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutation,
  SchemaTypes.BeginAlkemioUserCredentialOfferInteractionMutationVariables
>;
export const BeginCommunityMemberCredentialOfferInteractionDocument = gql`
  mutation beginCommunityMemberCredentialOfferInteraction($communityID: String!) {
    beginCommunityMemberVerifiedCredentialOfferInteraction(communityID: $communityID) {
      jwt
      qrCodeImg
    }
  }
`;
export type BeginCommunityMemberCredentialOfferInteractionMutationFn = Apollo.MutationFunction<
  SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutation,
  SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutationVariables
>;

/**
 * __useBeginCommunityMemberCredentialOfferInteractionMutation__
 *
 * To run a mutation, you first call `useBeginCommunityMemberCredentialOfferInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBeginCommunityMemberCredentialOfferInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [beginCommunityMemberCredentialOfferInteractionMutation, { data, loading, error }] = useBeginCommunityMemberCredentialOfferInteractionMutation({
 *   variables: {
 *      communityID: // value for 'communityID'
 *   },
 * });
 */
export function useBeginCommunityMemberCredentialOfferInteractionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutation,
    SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutation,
    SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutationVariables
  >(BeginCommunityMemberCredentialOfferInteractionDocument, options);
}

export type BeginCommunityMemberCredentialOfferInteractionMutationHookResult = ReturnType<
  typeof useBeginCommunityMemberCredentialOfferInteractionMutation
>;
export type BeginCommunityMemberCredentialOfferInteractionMutationResult =
  Apollo.MutationResult<SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutation>;
export type BeginCommunityMemberCredentialOfferInteractionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutation,
  SchemaTypes.BeginCommunityMemberCredentialOfferInteractionMutationVariables
>;
export const UserSsiDocument = gql`
  query userSsi {
    me {
      user {
        ...UserAgentSsi
      }
    }
  }
  ${UserAgentSsiFragmentDoc}
`;

/**
 * __useUserSsiQuery__
 *
 * To run a query within a React component, call `useUserSsiQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSsiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSsiQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserSsiQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.UserSsiQuery, SchemaTypes.UserSsiQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserSsiQuery, SchemaTypes.UserSsiQueryVariables>(UserSsiDocument, options);
}

export function useUserSsiLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserSsiQuery, SchemaTypes.UserSsiQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserSsiQuery, SchemaTypes.UserSsiQueryVariables>(UserSsiDocument, options);
}

export type UserSsiQueryHookResult = ReturnType<typeof useUserSsiQuery>;
export type UserSsiLazyQueryHookResult = ReturnType<typeof useUserSsiLazyQuery>;
export type UserSsiQueryResult = Apollo.QueryResult<SchemaTypes.UserSsiQuery, SchemaTypes.UserSsiQueryVariables>;
export function refetchUserSsiQuery(variables?: SchemaTypes.UserSsiQueryVariables) {
  return { query: UserSsiDocument, variables: variables };
}

export const CalloutPageCalloutDocument = gql`
  query CalloutPageCallout(
    $calloutNameId: UUID_NAMEID!
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      collaboration @include(if: $includeSpace) {
        id
        callouts(IDs: [$calloutNameId]) {
          ...Callout
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            ...Callout
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            ...Callout
          }
        }
      }
    }
  }
  ${CalloutFragmentDoc}
`;

/**
 * __useCalloutPageCalloutQuery__
 *
 * To run a query within a React component, call `useCalloutPageCalloutQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutPageCalloutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutPageCalloutQuery({
 *   variables: {
 *      calloutNameId: // value for 'calloutNameId'
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *   },
 * });
 */
export function useCalloutPageCalloutQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CalloutPageCalloutQuery,
    SchemaTypes.CalloutPageCalloutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalloutPageCalloutQuery, SchemaTypes.CalloutPageCalloutQueryVariables>(
    CalloutPageCalloutDocument,
    options
  );
}

export function useCalloutPageCalloutLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CalloutPageCalloutQuery,
    SchemaTypes.CalloutPageCalloutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CalloutPageCalloutQuery, SchemaTypes.CalloutPageCalloutQueryVariables>(
    CalloutPageCalloutDocument,
    options
  );
}

export type CalloutPageCalloutQueryHookResult = ReturnType<typeof useCalloutPageCalloutQuery>;
export type CalloutPageCalloutLazyQueryHookResult = ReturnType<typeof useCalloutPageCalloutLazyQuery>;
export type CalloutPageCalloutQueryResult = Apollo.QueryResult<
  SchemaTypes.CalloutPageCalloutQuery,
  SchemaTypes.CalloutPageCalloutQueryVariables
>;
export function refetchCalloutPageCalloutQuery(variables: SchemaTypes.CalloutPageCalloutQueryVariables) {
  return { query: CalloutPageCalloutDocument, variables: variables };
}

export const InnovationFlowBlockDocument = gql`
  query InnovationFlowBlock(
    $spaceNameId: UUID_NAMEID!
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
  ) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        nameID
        innovationFlow {
          id
          profile {
            id
            displayName
            cardBanner: visual(type: CARD) {
              id
              name
              uri
              alternativeText
            }
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        nameID
        innovationFlow {
          id
          profile {
            id
            displayName
            cardBanner: visual(type: CARD) {
              id
              name
              uri
              alternativeText
            }
          }
        }
      }
    }
  }
`;

/**
 * __useInnovationFlowBlockQuery__
 *
 * To run a query within a React component, call `useInnovationFlowBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationFlowBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationFlowBlockQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *   },
 * });
 */
export function useInnovationFlowBlockQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationFlowBlockQuery,
    SchemaTypes.InnovationFlowBlockQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.InnovationFlowBlockQuery, SchemaTypes.InnovationFlowBlockQueryVariables>(
    InnovationFlowBlockDocument,
    options
  );
}

export function useInnovationFlowBlockLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationFlowBlockQuery,
    SchemaTypes.InnovationFlowBlockQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.InnovationFlowBlockQuery, SchemaTypes.InnovationFlowBlockQueryVariables>(
    InnovationFlowBlockDocument,
    options
  );
}

export type InnovationFlowBlockQueryHookResult = ReturnType<typeof useInnovationFlowBlockQuery>;
export type InnovationFlowBlockLazyQueryHookResult = ReturnType<typeof useInnovationFlowBlockLazyQuery>;
export type InnovationFlowBlockQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationFlowBlockQuery,
  SchemaTypes.InnovationFlowBlockQueryVariables
>;
export function refetchInnovationFlowBlockQuery(variables: SchemaTypes.InnovationFlowBlockQueryVariables) {
  return { query: InnovationFlowBlockDocument, variables: variables };
}

export const ChallengeInnovationFlowEventDocument = gql`
  mutation ChallengeInnovationFlowEvent($eventName: String!, $innovationFlowID: UUID!) {
    eventOnChallenge(innovationFlowEventData: { eventName: $eventName, innovationFlowID: $innovationFlowID }) {
      id
    }
  }
`;
export type ChallengeInnovationFlowEventMutationFn = Apollo.MutationFunction<
  SchemaTypes.ChallengeInnovationFlowEventMutation,
  SchemaTypes.ChallengeInnovationFlowEventMutationVariables
>;

/**
 * __useChallengeInnovationFlowEventMutation__
 *
 * To run a mutation, you first call `useChallengeInnovationFlowEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChallengeInnovationFlowEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [challengeInnovationFlowEventMutation, { data, loading, error }] = useChallengeInnovationFlowEventMutation({
 *   variables: {
 *      eventName: // value for 'eventName'
 *      innovationFlowID: // value for 'innovationFlowID'
 *   },
 * });
 */
export function useChallengeInnovationFlowEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.ChallengeInnovationFlowEventMutation,
    SchemaTypes.ChallengeInnovationFlowEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.ChallengeInnovationFlowEventMutation,
    SchemaTypes.ChallengeInnovationFlowEventMutationVariables
  >(ChallengeInnovationFlowEventDocument, options);
}

export type ChallengeInnovationFlowEventMutationHookResult = ReturnType<typeof useChallengeInnovationFlowEventMutation>;
export type ChallengeInnovationFlowEventMutationResult =
  Apollo.MutationResult<SchemaTypes.ChallengeInnovationFlowEventMutation>;
export type ChallengeInnovationFlowEventMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.ChallengeInnovationFlowEventMutation,
  SchemaTypes.ChallengeInnovationFlowEventMutationVariables
>;
export const OpportunityInnovationFlowEventDocument = gql`
  mutation OpportunityInnovationFlowEvent($eventName: String!, $innovationFlowID: UUID!) {
    eventOnOpportunity(innovationFlowEventData: { eventName: $eventName, innovationFlowID: $innovationFlowID }) {
      id
    }
  }
`;
export type OpportunityInnovationFlowEventMutationFn = Apollo.MutationFunction<
  SchemaTypes.OpportunityInnovationFlowEventMutation,
  SchemaTypes.OpportunityInnovationFlowEventMutationVariables
>;

/**
 * __useOpportunityInnovationFlowEventMutation__
 *
 * To run a mutation, you first call `useOpportunityInnovationFlowEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpportunityInnovationFlowEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [opportunityInnovationFlowEventMutation, { data, loading, error }] = useOpportunityInnovationFlowEventMutation({
 *   variables: {
 *      eventName: // value for 'eventName'
 *      innovationFlowID: // value for 'innovationFlowID'
 *   },
 * });
 */
export function useOpportunityInnovationFlowEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.OpportunityInnovationFlowEventMutation,
    SchemaTypes.OpportunityInnovationFlowEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.OpportunityInnovationFlowEventMutation,
    SchemaTypes.OpportunityInnovationFlowEventMutationVariables
  >(OpportunityInnovationFlowEventDocument, options);
}

export type OpportunityInnovationFlowEventMutationHookResult = ReturnType<
  typeof useOpportunityInnovationFlowEventMutation
>;
export type OpportunityInnovationFlowEventMutationResult =
  Apollo.MutationResult<SchemaTypes.OpportunityInnovationFlowEventMutation>;
export type OpportunityInnovationFlowEventMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.OpportunityInnovationFlowEventMutation,
  SchemaTypes.OpportunityInnovationFlowEventMutationVariables
>;
export const InnovationFlowSettingsDocument = gql`
  query InnovationFlowSettings(
    $spaceNameId: UUID_NAMEID!
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
  ) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        nameID
        innovationFlow {
          id
          profile {
            ...LifecycleProfile
          }
          type
          lifecycle {
            ...LifecycleDetails
          }
        }
        collaboration {
          ...InnovationFlowCollaboration
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        nameID
        innovationFlow {
          id
          profile {
            ...LifecycleProfile
          }
          type
          lifecycle {
            ...LifecycleDetails
          }
        }
        collaboration {
          ...InnovationFlowCollaboration
        }
      }
    }
  }
  ${LifecycleProfileFragmentDoc}
  ${LifecycleDetailsFragmentDoc}
  ${InnovationFlowCollaborationFragmentDoc}
`;

/**
 * __useInnovationFlowSettingsQuery__
 *
 * To run a query within a React component, call `useInnovationFlowSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationFlowSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationFlowSettingsQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *   },
 * });
 */
export function useInnovationFlowSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationFlowSettingsQuery,
    SchemaTypes.InnovationFlowSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.InnovationFlowSettingsQuery, SchemaTypes.InnovationFlowSettingsQueryVariables>(
    InnovationFlowSettingsDocument,
    options
  );
}

export function useInnovationFlowSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationFlowSettingsQuery,
    SchemaTypes.InnovationFlowSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.InnovationFlowSettingsQuery, SchemaTypes.InnovationFlowSettingsQueryVariables>(
    InnovationFlowSettingsDocument,
    options
  );
}

export type InnovationFlowSettingsQueryHookResult = ReturnType<typeof useInnovationFlowSettingsQuery>;
export type InnovationFlowSettingsLazyQueryHookResult = ReturnType<typeof useInnovationFlowSettingsLazyQuery>;
export type InnovationFlowSettingsQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationFlowSettingsQuery,
  SchemaTypes.InnovationFlowSettingsQueryVariables
>;
export function refetchInnovationFlowSettingsQuery(variables: SchemaTypes.InnovationFlowSettingsQueryVariables) {
  return { query: InnovationFlowSettingsDocument, variables: variables };
}

export const UpdateInnovationFlowDocument = gql`
  mutation UpdateInnovationFlow($updateInnovationFlowData: UpdateInnovationFlowInput!) {
    updateInnovationFlow(innovationFlowData: $updateInnovationFlowData) {
      id
    }
  }
`;
export type UpdateInnovationFlowMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateInnovationFlowMutation,
  SchemaTypes.UpdateInnovationFlowMutationVariables
>;

/**
 * __useUpdateInnovationFlowMutation__
 *
 * To run a mutation, you first call `useUpdateInnovationFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInnovationFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInnovationFlowMutation, { data, loading, error }] = useUpdateInnovationFlowMutation({
 *   variables: {
 *      updateInnovationFlowData: // value for 'updateInnovationFlowData'
 *   },
 * });
 */
export function useUpdateInnovationFlowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateInnovationFlowMutation,
    SchemaTypes.UpdateInnovationFlowMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateInnovationFlowMutation,
    SchemaTypes.UpdateInnovationFlowMutationVariables
  >(UpdateInnovationFlowDocument, options);
}

export type UpdateInnovationFlowMutationHookResult = ReturnType<typeof useUpdateInnovationFlowMutation>;
export type UpdateInnovationFlowMutationResult = Apollo.MutationResult<SchemaTypes.UpdateInnovationFlowMutation>;
export type UpdateInnovationFlowMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateInnovationFlowMutation,
  SchemaTypes.UpdateInnovationFlowMutationVariables
>;
export const UpdateCalloutFlowStateDocument = gql`
  mutation UpdateCalloutFlowState($calloutId: UUID!, $flowStateTagsetId: UUID!, $value: String!) {
    updateCallout(
      calloutData: { ID: $calloutId, profileData: { tagsets: [{ ID: $flowStateTagsetId, tags: [$value] }] } }
    ) {
      id
      sortOrder
      profile {
        id
        flowState: tagset(tagsetName: FLOW_STATE) {
          ...TagsetDetails
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export type UpdateCalloutFlowStateMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateCalloutFlowStateMutation,
  SchemaTypes.UpdateCalloutFlowStateMutationVariables
>;

/**
 * __useUpdateCalloutFlowStateMutation__
 *
 * To run a mutation, you first call `useUpdateCalloutFlowStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalloutFlowStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalloutFlowStateMutation, { data, loading, error }] = useUpdateCalloutFlowStateMutation({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *      flowStateTagsetId: // value for 'flowStateTagsetId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateCalloutFlowStateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateCalloutFlowStateMutation,
    SchemaTypes.UpdateCalloutFlowStateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateCalloutFlowStateMutation,
    SchemaTypes.UpdateCalloutFlowStateMutationVariables
  >(UpdateCalloutFlowStateDocument, options);
}

export type UpdateCalloutFlowStateMutationHookResult = ReturnType<typeof useUpdateCalloutFlowStateMutation>;
export type UpdateCalloutFlowStateMutationResult = Apollo.MutationResult<SchemaTypes.UpdateCalloutFlowStateMutation>;
export type UpdateCalloutFlowStateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateCalloutFlowStateMutation,
  SchemaTypes.UpdateCalloutFlowStateMutationVariables
>;
export const ChallengeInnovationFlowStatesAllowedValuesDocument = gql`
  query ChallengeInnovationFlowStatesAllowedValues($id: UUID!) {
    lookup {
      journey: challenge(ID: $id) {
        id
        innovationFlow {
          ...JourneyInnovationFlowStatesAllowedValues
        }
      }
    }
  }
  ${JourneyInnovationFlowStatesAllowedValuesFragmentDoc}
`;

/**
 * __useChallengeInnovationFlowStatesAllowedValuesQuery__
 *
 * To run a query within a React component, call `useChallengeInnovationFlowStatesAllowedValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeInnovationFlowStatesAllowedValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeInnovationFlowStatesAllowedValuesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChallengeInnovationFlowStatesAllowedValuesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQueryVariables
  >(ChallengeInnovationFlowStatesAllowedValuesDocument, options);
}

export function useChallengeInnovationFlowStatesAllowedValuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQueryVariables
  >(ChallengeInnovationFlowStatesAllowedValuesDocument, options);
}

export type ChallengeInnovationFlowStatesAllowedValuesQueryHookResult = ReturnType<
  typeof useChallengeInnovationFlowStatesAllowedValuesQuery
>;
export type ChallengeInnovationFlowStatesAllowedValuesLazyQueryHookResult = ReturnType<
  typeof useChallengeInnovationFlowStatesAllowedValuesLazyQuery
>;
export type ChallengeInnovationFlowStatesAllowedValuesQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQuery,
  SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQueryVariables
>;
export function refetchChallengeInnovationFlowStatesAllowedValuesQuery(
  variables: SchemaTypes.ChallengeInnovationFlowStatesAllowedValuesQueryVariables
) {
  return { query: ChallengeInnovationFlowStatesAllowedValuesDocument, variables: variables };
}

export const OpportunityInnovationFlowStatesAllowedValuesDocument = gql`
  query OpportunityInnovationFlowStatesAllowedValues($id: UUID!) {
    lookup {
      journey: opportunity(ID: $id) {
        id
        innovationFlow {
          ...JourneyInnovationFlowStatesAllowedValues
        }
      }
    }
  }
  ${JourneyInnovationFlowStatesAllowedValuesFragmentDoc}
`;

/**
 * __useOpportunityInnovationFlowStatesAllowedValuesQuery__
 *
 * To run a query within a React component, call `useOpportunityInnovationFlowStatesAllowedValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityInnovationFlowStatesAllowedValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityInnovationFlowStatesAllowedValuesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpportunityInnovationFlowStatesAllowedValuesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQueryVariables
  >(OpportunityInnovationFlowStatesAllowedValuesDocument, options);
}

export function useOpportunityInnovationFlowStatesAllowedValuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQuery,
    SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQueryVariables
  >(OpportunityInnovationFlowStatesAllowedValuesDocument, options);
}

export type OpportunityInnovationFlowStatesAllowedValuesQueryHookResult = ReturnType<
  typeof useOpportunityInnovationFlowStatesAllowedValuesQuery
>;
export type OpportunityInnovationFlowStatesAllowedValuesLazyQueryHookResult = ReturnType<
  typeof useOpportunityInnovationFlowStatesAllowedValuesLazyQuery
>;
export type OpportunityInnovationFlowStatesAllowedValuesQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQuery,
  SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQueryVariables
>;
export function refetchOpportunityInnovationFlowStatesAllowedValuesQuery(
  variables: SchemaTypes.OpportunityInnovationFlowStatesAllowedValuesQueryVariables
) {
  return { query: OpportunityInnovationFlowStatesAllowedValuesDocument, variables: variables };
}

export const InnovationPackProfilePageDocument = gql`
  query InnovationPackProfilePage($innovationPackId: UUID_NAMEID!) {
    platform {
      id
      library {
        id
        innovationPack(ID: $innovationPackId) {
          id
          nameID
          authorization {
            id
            myPrivileges
          }
          provider {
            ...InnovationPackProviderProfileWithAvatar
          }
          profile {
            ...InnovationPackProfile
            tagline
          }
          templates {
            id
            whiteboardTemplates {
              ...WhiteboardTemplateCard
            }
            postTemplates {
              ...PostTemplateCard
            }
            innovationFlowTemplates {
              ...InnovationFlowTemplateCard
            }
          }
        }
      }
    }
  }
  ${InnovationPackProviderProfileWithAvatarFragmentDoc}
  ${InnovationPackProfileFragmentDoc}
  ${WhiteboardTemplateCardFragmentDoc}
  ${PostTemplateCardFragmentDoc}
  ${InnovationFlowTemplateCardFragmentDoc}
`;

/**
 * __useInnovationPackProfilePageQuery__
 *
 * To run a query within a React component, call `useInnovationPackProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationPackProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationPackProfilePageQuery({
 *   variables: {
 *      innovationPackId: // value for 'innovationPackId'
 *   },
 * });
 */
export function useInnovationPackProfilePageQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationPackProfilePageQuery,
    SchemaTypes.InnovationPackProfilePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.InnovationPackProfilePageQuery,
    SchemaTypes.InnovationPackProfilePageQueryVariables
  >(InnovationPackProfilePageDocument, options);
}

export function useInnovationPackProfilePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationPackProfilePageQuery,
    SchemaTypes.InnovationPackProfilePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.InnovationPackProfilePageQuery,
    SchemaTypes.InnovationPackProfilePageQueryVariables
  >(InnovationPackProfilePageDocument, options);
}

export type InnovationPackProfilePageQueryHookResult = ReturnType<typeof useInnovationPackProfilePageQuery>;
export type InnovationPackProfilePageLazyQueryHookResult = ReturnType<typeof useInnovationPackProfilePageLazyQuery>;
export type InnovationPackProfilePageQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationPackProfilePageQuery,
  SchemaTypes.InnovationPackProfilePageQueryVariables
>;
export function refetchInnovationPackProfilePageQuery(variables: SchemaTypes.InnovationPackProfilePageQueryVariables) {
  return { query: InnovationPackProfilePageDocument, variables: variables };
}

export const ActivityCreatedDocument = gql`
  subscription activityCreated($input: ActivityCreatedSubscriptionInput!) {
    activityCreated(input: $input) {
      activity {
        ...ActivityLogOnCollaboration
      }
    }
  }
  ${ActivityLogOnCollaborationFragmentDoc}
`;

/**
 * __useActivityCreatedSubscription__
 *
 * To run a query within a React component, call `useActivityCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useActivityCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityCreatedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.ActivityCreatedSubscription,
    SchemaTypes.ActivityCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.ActivityCreatedSubscription,
    SchemaTypes.ActivityCreatedSubscriptionVariables
  >(ActivityCreatedDocument, options);
}

export type ActivityCreatedSubscriptionHookResult = ReturnType<typeof useActivityCreatedSubscription>;
export type ActivityCreatedSubscriptionResult = Apollo.SubscriptionResult<SchemaTypes.ActivityCreatedSubscription>;
export const ActivityLogOnCollaborationDocument = gql`
  query activityLogOnCollaboration($collaborationID: UUID!, $limit: Float!, $types: [ActivityEventType!]) {
    activityLogOnCollaboration(
      queryData: { collaborationID: $collaborationID, limit: $limit, types: $types, includeChild: true }
    ) {
      id
      collaborationID
      createdDate
      description
      type
      child
      parentNameID
      journeyDisplayName: parentDisplayName
      __typename
      triggeredBy {
        id
        nameID
        firstName
        lastName
        profile {
          id
          displayName
          avatar: visual(type: AVATAR) {
            id
            uri
          }
          tagsets {
            ...TagsetDetails
          }
          location {
            id
            city
            country
          }
        }
      }
      ... on ActivityLogEntryMemberJoined {
        ...ActivityLogMemberJoined
      }
      ... on ActivityLogEntryCalloutPublished {
        ...ActivityLogCalloutPublished
      }
      ... on ActivityLogEntryCalloutPostCreated {
        ...ActivityLogCalloutPostCreated
      }
      ... on ActivityLogEntryCalloutLinkCreated {
        ...ActivityLogCalloutLinkCreated
      }
      ... on ActivityLogEntryCalloutPostComment {
        ...ActivityLogCalloutPostComment
      }
      ... on ActivityLogEntryCalloutWhiteboardCreated {
        ...ActivityLogCalloutWhiteboardCreated
      }
      ... on ActivityLogEntryCalloutDiscussionComment {
        ...ActivityLogCalloutDiscussionComment
      }
      ... on ActivityLogEntryChallengeCreated {
        ...ActivityLogChallengeCreated
      }
      ... on ActivityLogEntryOpportunityCreated {
        ...ActivityLogOpportunityCreated
      }
      ... on ActivityLogEntryUpdateSent {
        ...ActivityLogUpdateSent
      }
      ... on ActivityLogEntryCalendarEventCreated {
        ...ActivityLogCalendarEventCreated
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${ActivityLogMemberJoinedFragmentDoc}
  ${ActivityLogCalloutPublishedFragmentDoc}
  ${ActivityLogCalloutPostCreatedFragmentDoc}
  ${ActivityLogCalloutLinkCreatedFragmentDoc}
  ${ActivityLogCalloutPostCommentFragmentDoc}
  ${ActivityLogCalloutWhiteboardCreatedFragmentDoc}
  ${ActivityLogCalloutDiscussionCommentFragmentDoc}
  ${ActivityLogChallengeCreatedFragmentDoc}
  ${ActivityLogOpportunityCreatedFragmentDoc}
  ${ActivityLogUpdateSentFragmentDoc}
  ${ActivityLogCalendarEventCreatedFragmentDoc}
`;

/**
 * __useActivityLogOnCollaborationQuery__
 *
 * To run a query within a React component, call `useActivityLogOnCollaborationQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityLogOnCollaborationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityLogOnCollaborationQuery({
 *   variables: {
 *      collaborationID: // value for 'collaborationID'
 *      limit: // value for 'limit'
 *      types: // value for 'types'
 *   },
 * });
 */
export function useActivityLogOnCollaborationQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ActivityLogOnCollaborationQuery,
    SchemaTypes.ActivityLogOnCollaborationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ActivityLogOnCollaborationQuery,
    SchemaTypes.ActivityLogOnCollaborationQueryVariables
  >(ActivityLogOnCollaborationDocument, options);
}

export function useActivityLogOnCollaborationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ActivityLogOnCollaborationQuery,
    SchemaTypes.ActivityLogOnCollaborationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ActivityLogOnCollaborationQuery,
    SchemaTypes.ActivityLogOnCollaborationQueryVariables
  >(ActivityLogOnCollaborationDocument, options);
}

export type ActivityLogOnCollaborationQueryHookResult = ReturnType<typeof useActivityLogOnCollaborationQuery>;
export type ActivityLogOnCollaborationLazyQueryHookResult = ReturnType<typeof useActivityLogOnCollaborationLazyQuery>;
export type ActivityLogOnCollaborationQueryResult = Apollo.QueryResult<
  SchemaTypes.ActivityLogOnCollaborationQuery,
  SchemaTypes.ActivityLogOnCollaborationQueryVariables
>;
export function refetchActivityLogOnCollaborationQuery(
  variables: SchemaTypes.ActivityLogOnCollaborationQueryVariables
) {
  return { query: ActivityLogOnCollaborationDocument, variables: variables };
}

export const UpdateCalloutsSortOrderDocument = gql`
  mutation UpdateCalloutsSortOrder($collaborationId: UUID!, $calloutIds: [UUID_NAMEID!]!) {
    updateCalloutsSortOrder(sortOrderData: { collaborationID: $collaborationId, calloutIDs: $calloutIds }) {
      id
      sortOrder
    }
  }
`;
export type UpdateCalloutsSortOrderMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateCalloutsSortOrderMutation,
  SchemaTypes.UpdateCalloutsSortOrderMutationVariables
>;

/**
 * __useUpdateCalloutsSortOrderMutation__
 *
 * To run a mutation, you first call `useUpdateCalloutsSortOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalloutsSortOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalloutsSortOrderMutation, { data, loading, error }] = useUpdateCalloutsSortOrderMutation({
 *   variables: {
 *      collaborationId: // value for 'collaborationId'
 *      calloutIds: // value for 'calloutIds'
 *   },
 * });
 */
export function useUpdateCalloutsSortOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateCalloutsSortOrderMutation,
    SchemaTypes.UpdateCalloutsSortOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateCalloutsSortOrderMutation,
    SchemaTypes.UpdateCalloutsSortOrderMutationVariables
  >(UpdateCalloutsSortOrderDocument, options);
}

export type UpdateCalloutsSortOrderMutationHookResult = ReturnType<typeof useUpdateCalloutsSortOrderMutation>;
export type UpdateCalloutsSortOrderMutationResult = Apollo.MutationResult<SchemaTypes.UpdateCalloutsSortOrderMutation>;
export type UpdateCalloutsSortOrderMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateCalloutsSortOrderMutation,
  SchemaTypes.UpdateCalloutsSortOrderMutationVariables
>;
export const PostTemplatesOnCalloutCreationDocument = gql`
  query PostTemplatesOnCalloutCreation($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        postTemplates {
          id
          profile {
            ...ProfileDisplayName
          }
        }
      }
    }
  }
  ${ProfileDisplayNameFragmentDoc}
`;

/**
 * __usePostTemplatesOnCalloutCreationQuery__
 *
 * To run a query within a React component, call `usePostTemplatesOnCalloutCreationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostTemplatesOnCalloutCreationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostTemplatesOnCalloutCreationQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function usePostTemplatesOnCalloutCreationQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PostTemplatesOnCalloutCreationQuery,
    SchemaTypes.PostTemplatesOnCalloutCreationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PostTemplatesOnCalloutCreationQuery,
    SchemaTypes.PostTemplatesOnCalloutCreationQueryVariables
  >(PostTemplatesOnCalloutCreationDocument, options);
}

export function usePostTemplatesOnCalloutCreationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PostTemplatesOnCalloutCreationQuery,
    SchemaTypes.PostTemplatesOnCalloutCreationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PostTemplatesOnCalloutCreationQuery,
    SchemaTypes.PostTemplatesOnCalloutCreationQueryVariables
  >(PostTemplatesOnCalloutCreationDocument, options);
}

export type PostTemplatesOnCalloutCreationQueryHookResult = ReturnType<typeof usePostTemplatesOnCalloutCreationQuery>;
export type PostTemplatesOnCalloutCreationLazyQueryHookResult = ReturnType<
  typeof usePostTemplatesOnCalloutCreationLazyQuery
>;
export type PostTemplatesOnCalloutCreationQueryResult = Apollo.QueryResult<
  SchemaTypes.PostTemplatesOnCalloutCreationQuery,
  SchemaTypes.PostTemplatesOnCalloutCreationQueryVariables
>;
export function refetchPostTemplatesOnCalloutCreationQuery(
  variables: SchemaTypes.PostTemplatesOnCalloutCreationQueryVariables
) {
  return { query: PostTemplatesOnCalloutCreationDocument, variables: variables };
}

export const WhiteboardTemplatesOnCalloutCreationDocument = gql`
  query WhiteboardTemplatesOnCalloutCreation($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        whiteboardTemplates {
          id
          profile {
            ...ProfileDisplayName
          }
        }
      }
    }
  }
  ${ProfileDisplayNameFragmentDoc}
`;

/**
 * __useWhiteboardTemplatesOnCalloutCreationQuery__
 *
 * To run a query within a React component, call `useWhiteboardTemplatesOnCalloutCreationQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardTemplatesOnCalloutCreationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardTemplatesOnCalloutCreationQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useWhiteboardTemplatesOnCalloutCreationQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQuery,
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQuery,
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQueryVariables
  >(WhiteboardTemplatesOnCalloutCreationDocument, options);
}

export function useWhiteboardTemplatesOnCalloutCreationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQuery,
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQuery,
    SchemaTypes.WhiteboardTemplatesOnCalloutCreationQueryVariables
  >(WhiteboardTemplatesOnCalloutCreationDocument, options);
}

export type WhiteboardTemplatesOnCalloutCreationQueryHookResult = ReturnType<
  typeof useWhiteboardTemplatesOnCalloutCreationQuery
>;
export type WhiteboardTemplatesOnCalloutCreationLazyQueryHookResult = ReturnType<
  typeof useWhiteboardTemplatesOnCalloutCreationLazyQuery
>;
export type WhiteboardTemplatesOnCalloutCreationQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardTemplatesOnCalloutCreationQuery,
  SchemaTypes.WhiteboardTemplatesOnCalloutCreationQueryVariables
>;
export function refetchWhiteboardTemplatesOnCalloutCreationQuery(
  variables: SchemaTypes.WhiteboardTemplatesOnCalloutCreationQueryVariables
) {
  return { query: WhiteboardTemplatesOnCalloutCreationDocument, variables: variables };
}

export const CreateCalloutDocument = gql`
  mutation createCallout($calloutData: CreateCalloutOnCollaborationInput!) {
    createCalloutOnCollaboration(calloutData: $calloutData) {
      ...Callout
    }
  }
  ${CalloutFragmentDoc}
`;
export type CreateCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateCalloutMutation,
  SchemaTypes.CreateCalloutMutationVariables
>;

/**
 * __useCreateCalloutMutation__
 *
 * To run a mutation, you first call `useCreateCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCalloutMutation, { data, loading, error }] = useCreateCalloutMutation({
 *   variables: {
 *      calloutData: // value for 'calloutData'
 *   },
 * });
 */
export function useCreateCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateCalloutMutation,
    SchemaTypes.CreateCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateCalloutMutation, SchemaTypes.CreateCalloutMutationVariables>(
    CreateCalloutDocument,
    options
  );
}

export type CreateCalloutMutationHookResult = ReturnType<typeof useCreateCalloutMutation>;
export type CreateCalloutMutationResult = Apollo.MutationResult<SchemaTypes.CreateCalloutMutation>;
export type CreateCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateCalloutMutation,
  SchemaTypes.CreateCalloutMutationVariables
>;
export const SpaceCollaborationIdDocument = gql`
  query spaceCollaborationId($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      collaboration {
        id
      }
    }
  }
`;

/**
 * __useSpaceCollaborationIdQuery__
 *
 * To run a query within a React component, call `useSpaceCollaborationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceCollaborationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceCollaborationIdQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceCollaborationIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceCollaborationIdQuery,
    SchemaTypes.SpaceCollaborationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceCollaborationIdQuery, SchemaTypes.SpaceCollaborationIdQueryVariables>(
    SpaceCollaborationIdDocument,
    options
  );
}

export function useSpaceCollaborationIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceCollaborationIdQuery,
    SchemaTypes.SpaceCollaborationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceCollaborationIdQuery, SchemaTypes.SpaceCollaborationIdQueryVariables>(
    SpaceCollaborationIdDocument,
    options
  );
}

export type SpaceCollaborationIdQueryHookResult = ReturnType<typeof useSpaceCollaborationIdQuery>;
export type SpaceCollaborationIdLazyQueryHookResult = ReturnType<typeof useSpaceCollaborationIdLazyQuery>;
export type SpaceCollaborationIdQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceCollaborationIdQuery,
  SchemaTypes.SpaceCollaborationIdQueryVariables
>;
export function refetchSpaceCollaborationIdQuery(variables: SchemaTypes.SpaceCollaborationIdQueryVariables) {
  return { query: SpaceCollaborationIdDocument, variables: variables };
}

export const ChallengeCollaborationIdDocument = gql`
  query challengeCollaborationId($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        collaboration {
          id
        }
      }
    }
  }
`;

/**
 * __useChallengeCollaborationIdQuery__
 *
 * To run a query within a React component, call `useChallengeCollaborationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeCollaborationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeCollaborationIdQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeCollaborationIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeCollaborationIdQuery,
    SchemaTypes.ChallengeCollaborationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeCollaborationIdQuery, SchemaTypes.ChallengeCollaborationIdQueryVariables>(
    ChallengeCollaborationIdDocument,
    options
  );
}

export function useChallengeCollaborationIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeCollaborationIdQuery,
    SchemaTypes.ChallengeCollaborationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeCollaborationIdQuery,
    SchemaTypes.ChallengeCollaborationIdQueryVariables
  >(ChallengeCollaborationIdDocument, options);
}

export type ChallengeCollaborationIdQueryHookResult = ReturnType<typeof useChallengeCollaborationIdQuery>;
export type ChallengeCollaborationIdLazyQueryHookResult = ReturnType<typeof useChallengeCollaborationIdLazyQuery>;
export type ChallengeCollaborationIdQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeCollaborationIdQuery,
  SchemaTypes.ChallengeCollaborationIdQueryVariables
>;
export function refetchChallengeCollaborationIdQuery(variables: SchemaTypes.ChallengeCollaborationIdQueryVariables) {
  return { query: ChallengeCollaborationIdDocument, variables: variables };
}

export const OpportunityCollaborationIdDocument = gql`
  query opportunityCollaborationId($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        collaboration {
          id
        }
      }
    }
  }
`;

/**
 * __useOpportunityCollaborationIdQuery__
 *
 * To run a query within a React component, call `useOpportunityCollaborationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityCollaborationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityCollaborationIdQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityCollaborationIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityCollaborationIdQuery,
    SchemaTypes.OpportunityCollaborationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityCollaborationIdQuery,
    SchemaTypes.OpportunityCollaborationIdQueryVariables
  >(OpportunityCollaborationIdDocument, options);
}

export function useOpportunityCollaborationIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityCollaborationIdQuery,
    SchemaTypes.OpportunityCollaborationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityCollaborationIdQuery,
    SchemaTypes.OpportunityCollaborationIdQueryVariables
  >(OpportunityCollaborationIdDocument, options);
}

export type OpportunityCollaborationIdQueryHookResult = ReturnType<typeof useOpportunityCollaborationIdQuery>;
export type OpportunityCollaborationIdLazyQueryHookResult = ReturnType<typeof useOpportunityCollaborationIdLazyQuery>;
export type OpportunityCollaborationIdQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityCollaborationIdQuery,
  SchemaTypes.OpportunityCollaborationIdQueryVariables
>;
export function refetchOpportunityCollaborationIdQuery(
  variables: SchemaTypes.OpportunityCollaborationIdQueryVariables
) {
  return { query: OpportunityCollaborationIdDocument, variables: variables };
}

export const UpdateCalloutDocument = gql`
  mutation UpdateCallout($calloutData: UpdateCalloutInput!) {
    updateCallout(calloutData: $calloutData) {
      id
      profile {
        id
        description
        displayName
        tagset {
          ...TagsetDetails
        }
        displayLocationTagset: tagset(tagsetName: CALLOUT_DISPLAY_LOCATION) {
          ...TagsetDetails
        }
        references {
          id
          name
          uri
        }
      }
      state
      type
      visibility
      ...CalloutPostTemplate
      ...CalloutWhiteboardTemplate
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${CalloutPostTemplateFragmentDoc}
  ${CalloutWhiteboardTemplateFragmentDoc}
`;
export type UpdateCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateCalloutMutation,
  SchemaTypes.UpdateCalloutMutationVariables
>;

/**
 * __useUpdateCalloutMutation__
 *
 * To run a mutation, you first call `useUpdateCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalloutMutation, { data, loading, error }] = useUpdateCalloutMutation({
 *   variables: {
 *      calloutData: // value for 'calloutData'
 *   },
 * });
 */
export function useUpdateCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateCalloutMutation,
    SchemaTypes.UpdateCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateCalloutMutation, SchemaTypes.UpdateCalloutMutationVariables>(
    UpdateCalloutDocument,
    options
  );
}

export type UpdateCalloutMutationHookResult = ReturnType<typeof useUpdateCalloutMutation>;
export type UpdateCalloutMutationResult = Apollo.MutationResult<SchemaTypes.UpdateCalloutMutation>;
export type UpdateCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateCalloutMutation,
  SchemaTypes.UpdateCalloutMutationVariables
>;
export const UpdateCalloutVisibilityDocument = gql`
  mutation UpdateCalloutVisibility($calloutData: UpdateCalloutVisibilityInput!) {
    updateCalloutVisibility(calloutData: $calloutData) {
      id
      visibility
    }
  }
`;
export type UpdateCalloutVisibilityMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateCalloutVisibilityMutation,
  SchemaTypes.UpdateCalloutVisibilityMutationVariables
>;

/**
 * __useUpdateCalloutVisibilityMutation__
 *
 * To run a mutation, you first call `useUpdateCalloutVisibilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalloutVisibilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalloutVisibilityMutation, { data, loading, error }] = useUpdateCalloutVisibilityMutation({
 *   variables: {
 *      calloutData: // value for 'calloutData'
 *   },
 * });
 */
export function useUpdateCalloutVisibilityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateCalloutVisibilityMutation,
    SchemaTypes.UpdateCalloutVisibilityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateCalloutVisibilityMutation,
    SchemaTypes.UpdateCalloutVisibilityMutationVariables
  >(UpdateCalloutVisibilityDocument, options);
}

export type UpdateCalloutVisibilityMutationHookResult = ReturnType<typeof useUpdateCalloutVisibilityMutation>;
export type UpdateCalloutVisibilityMutationResult = Apollo.MutationResult<SchemaTypes.UpdateCalloutVisibilityMutation>;
export type UpdateCalloutVisibilityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateCalloutVisibilityMutation,
  SchemaTypes.UpdateCalloutVisibilityMutationVariables
>;
export const DeleteCalloutDocument = gql`
  mutation DeleteCallout($calloutId: UUID!) {
    deleteCallout(deleteData: { ID: $calloutId }) {
      id
    }
  }
`;
export type DeleteCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteCalloutMutation,
  SchemaTypes.DeleteCalloutMutationVariables
>;

/**
 * __useDeleteCalloutMutation__
 *
 * To run a mutation, you first call `useDeleteCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCalloutMutation, { data, loading, error }] = useDeleteCalloutMutation({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *   },
 * });
 */
export function useDeleteCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteCalloutMutation,
    SchemaTypes.DeleteCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteCalloutMutation, SchemaTypes.DeleteCalloutMutationVariables>(
    DeleteCalloutDocument,
    options
  );
}

export type DeleteCalloutMutationHookResult = ReturnType<typeof useDeleteCalloutMutation>;
export type DeleteCalloutMutationResult = Apollo.MutationResult<SchemaTypes.DeleteCalloutMutation>;
export type DeleteCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteCalloutMutation,
  SchemaTypes.DeleteCalloutMutationVariables
>;
export const CalloutIdDocument = gql`
  query CalloutId(
    $calloutNameId: UUID_NAMEID!
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $isSpace: Boolean = false
    $isChallenge: Boolean = false
    $isOpportunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $isSpace) {
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            id
          }
        }
      }
      challenge(ID: $challengeNameId) @include(if: $isChallenge) {
        id
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            id
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $isOpportunity) {
        id
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            id
          }
        }
      }
    }
  }
`;

/**
 * __useCalloutIdQuery__
 *
 * To run a query within a React component, call `useCalloutIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutIdQuery({
 *   variables: {
 *      calloutNameId: // value for 'calloutNameId'
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      isSpace: // value for 'isSpace'
 *      isChallenge: // value for 'isChallenge'
 *      isOpportunity: // value for 'isOpportunity'
 *   },
 * });
 */
export function useCalloutIdQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.CalloutIdQuery, SchemaTypes.CalloutIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalloutIdQuery, SchemaTypes.CalloutIdQueryVariables>(CalloutIdDocument, options);
}

export function useCalloutIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.CalloutIdQuery, SchemaTypes.CalloutIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CalloutIdQuery, SchemaTypes.CalloutIdQueryVariables>(
    CalloutIdDocument,
    options
  );
}

export type CalloutIdQueryHookResult = ReturnType<typeof useCalloutIdQuery>;
export type CalloutIdLazyQueryHookResult = ReturnType<typeof useCalloutIdLazyQuery>;
export type CalloutIdQueryResult = Apollo.QueryResult<SchemaTypes.CalloutIdQuery, SchemaTypes.CalloutIdQueryVariables>;
export function refetchCalloutIdQuery(variables: SchemaTypes.CalloutIdQueryVariables) {
  return { query: CalloutIdDocument, variables: variables };
}

export const CreatePostFromContributeTabDocument = gql`
  mutation CreatePostFromContributeTab($postData: CreatePostOnCalloutInput!) {
    createPostOnCallout(postData: $postData) {
      id
      nameID
      type
      profile {
        id
        displayName
        description
        tagset {
          ...TagsetDetails
        }
        visual(type: CARD) {
          ...VisualUri
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;
export type CreatePostFromContributeTabMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreatePostFromContributeTabMutation,
  SchemaTypes.CreatePostFromContributeTabMutationVariables
>;

/**
 * __useCreatePostFromContributeTabMutation__
 *
 * To run a mutation, you first call `useCreatePostFromContributeTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostFromContributeTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostFromContributeTabMutation, { data, loading, error }] = useCreatePostFromContributeTabMutation({
 *   variables: {
 *      postData: // value for 'postData'
 *   },
 * });
 */
export function useCreatePostFromContributeTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreatePostFromContributeTabMutation,
    SchemaTypes.CreatePostFromContributeTabMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreatePostFromContributeTabMutation,
    SchemaTypes.CreatePostFromContributeTabMutationVariables
  >(CreatePostFromContributeTabDocument, options);
}

export type CreatePostFromContributeTabMutationHookResult = ReturnType<typeof useCreatePostFromContributeTabMutation>;
export type CreatePostFromContributeTabMutationResult =
  Apollo.MutationResult<SchemaTypes.CreatePostFromContributeTabMutation>;
export type CreatePostFromContributeTabMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreatePostFromContributeTabMutation,
  SchemaTypes.CreatePostFromContributeTabMutationVariables
>;
export const RemoveCommentFromCalloutDocument = gql`
  mutation RemoveCommentFromCallout($messageData: RoomRemoveMessageInput!) {
    removeMessageOnRoom(messageData: $messageData)
  }
`;
export type RemoveCommentFromCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveCommentFromCalloutMutation,
  SchemaTypes.RemoveCommentFromCalloutMutationVariables
>;

/**
 * __useRemoveCommentFromCalloutMutation__
 *
 * To run a mutation, you first call `useRemoveCommentFromCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentFromCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentFromCalloutMutation, { data, loading, error }] = useRemoveCommentFromCalloutMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useRemoveCommentFromCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveCommentFromCalloutMutation,
    SchemaTypes.RemoveCommentFromCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveCommentFromCalloutMutation,
    SchemaTypes.RemoveCommentFromCalloutMutationVariables
  >(RemoveCommentFromCalloutDocument, options);
}

export type RemoveCommentFromCalloutMutationHookResult = ReturnType<typeof useRemoveCommentFromCalloutMutation>;
export type RemoveCommentFromCalloutMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveCommentFromCalloutMutation>;
export type RemoveCommentFromCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveCommentFromCalloutMutation,
  SchemaTypes.RemoveCommentFromCalloutMutationVariables
>;
export const CreateLinkOnCalloutDocument = gql`
  mutation createLinkOnCallout($input: CreateLinkOnCalloutInput!) {
    createLinkOnCallout(linkData: $input) {
      ...ReferenceDetails
    }
  }
  ${ReferenceDetailsFragmentDoc}
`;
export type CreateLinkOnCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateLinkOnCalloutMutation,
  SchemaTypes.CreateLinkOnCalloutMutationVariables
>;

/**
 * __useCreateLinkOnCalloutMutation__
 *
 * To run a mutation, you first call `useCreateLinkOnCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkOnCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkOnCalloutMutation, { data, loading, error }] = useCreateLinkOnCalloutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLinkOnCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateLinkOnCalloutMutation,
    SchemaTypes.CreateLinkOnCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateLinkOnCalloutMutation, SchemaTypes.CreateLinkOnCalloutMutationVariables>(
    CreateLinkOnCalloutDocument,
    options
  );
}

export type CreateLinkOnCalloutMutationHookResult = ReturnType<typeof useCreateLinkOnCalloutMutation>;
export type CreateLinkOnCalloutMutationResult = Apollo.MutationResult<SchemaTypes.CreateLinkOnCalloutMutation>;
export type CreateLinkOnCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateLinkOnCalloutMutation,
  SchemaTypes.CreateLinkOnCalloutMutationVariables
>;
export const CalloutPostCreatedDocument = gql`
  subscription CalloutPostCreated($calloutId: UUID!) {
    calloutPostCreated(calloutID: $calloutId) {
      post {
        ...ContributeTabPost
      }
    }
  }
  ${ContributeTabPostFragmentDoc}
`;

/**
 * __useCalloutPostCreatedSubscription__
 *
 * To run a query within a React component, call `useCalloutPostCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCalloutPostCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutPostCreatedSubscription({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *   },
 * });
 */
export function useCalloutPostCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.CalloutPostCreatedSubscription,
    SchemaTypes.CalloutPostCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.CalloutPostCreatedSubscription,
    SchemaTypes.CalloutPostCreatedSubscriptionVariables
  >(CalloutPostCreatedDocument, options);
}

export type CalloutPostCreatedSubscriptionHookResult = ReturnType<typeof useCalloutPostCreatedSubscription>;
export type CalloutPostCreatedSubscriptionResult =
  Apollo.SubscriptionResult<SchemaTypes.CalloutPostCreatedSubscription>;
export const CalloutPostsDocument = gql`
  query CalloutPosts($calloutId: UUID!) {
    lookup {
      callout(ID: $calloutId) {
        id
        posts {
          ...ContributeTabPost
        }
      }
    }
  }
  ${ContributeTabPostFragmentDoc}
`;

/**
 * __useCalloutPostsQuery__
 *
 * To run a query within a React component, call `useCalloutPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutPostsQuery({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *   },
 * });
 */
export function useCalloutPostsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.CalloutPostsQuery, SchemaTypes.CalloutPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalloutPostsQuery, SchemaTypes.CalloutPostsQueryVariables>(
    CalloutPostsDocument,
    options
  );
}

export function useCalloutPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.CalloutPostsQuery, SchemaTypes.CalloutPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CalloutPostsQuery, SchemaTypes.CalloutPostsQueryVariables>(
    CalloutPostsDocument,
    options
  );
}

export type CalloutPostsQueryHookResult = ReturnType<typeof useCalloutPostsQuery>;
export type CalloutPostsLazyQueryHookResult = ReturnType<typeof useCalloutPostsLazyQuery>;
export type CalloutPostsQueryResult = Apollo.QueryResult<
  SchemaTypes.CalloutPostsQuery,
  SchemaTypes.CalloutPostsQueryVariables
>;
export function refetchCalloutPostsQuery(variables: SchemaTypes.CalloutPostsQueryVariables) {
  return { query: CalloutPostsDocument, variables: variables };
}

export const CalloutsDocument = gql`
  query Callouts(
    $spaceNameId: UUID_NAMEID!
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $displayLocations: [CalloutDisplayLocation!]
    $calloutIds: [UUID_NAMEID!]
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        nameID
        collaboration {
          ...CollaborationWithCallouts
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        nameID
        ... on Challenge @skip(if: $includeOpportunity) {
          collaboration {
            ...CollaborationWithCallouts
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        nameID
        collaboration {
          ...CollaborationWithCallouts
        }
      }
    }
  }
  ${CollaborationWithCalloutsFragmentDoc}
`;

/**
 * __useCalloutsQuery__
 *
 * To run a query within a React component, call `useCalloutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutsQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      displayLocations: // value for 'displayLocations'
 *      calloutIds: // value for 'calloutIds'
 *   },
 * });
 */
export function useCalloutsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.CalloutsQuery, SchemaTypes.CalloutsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalloutsQuery, SchemaTypes.CalloutsQueryVariables>(CalloutsDocument, options);
}

export function useCalloutsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.CalloutsQuery, SchemaTypes.CalloutsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CalloutsQuery, SchemaTypes.CalloutsQueryVariables>(CalloutsDocument, options);
}

export type CalloutsQueryHookResult = ReturnType<typeof useCalloutsQuery>;
export type CalloutsLazyQueryHookResult = ReturnType<typeof useCalloutsLazyQuery>;
export type CalloutsQueryResult = Apollo.QueryResult<SchemaTypes.CalloutsQuery, SchemaTypes.CalloutsQueryVariables>;
export function refetchCalloutsQuery(variables: SchemaTypes.CalloutsQueryVariables) {
  return { query: CalloutsDocument, variables: variables };
}

export const SpacePostTemplatesLibraryDocument = gql`
  query SpacePostTemplatesLibrary($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        postTemplates {
          ...PostTemplateCard
        }
      }
      host {
        id
        nameID
        profile {
          ...TemplateProviderProfile
        }
      }
    }
  }
  ${PostTemplateCardFragmentDoc}
  ${TemplateProviderProfileFragmentDoc}
`;

/**
 * __useSpacePostTemplatesLibraryQuery__
 *
 * To run a query within a React component, call `useSpacePostTemplatesLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacePostTemplatesLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacePostTemplatesLibraryQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpacePostTemplatesLibraryQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpacePostTemplatesLibraryQuery,
    SchemaTypes.SpacePostTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpacePostTemplatesLibraryQuery,
    SchemaTypes.SpacePostTemplatesLibraryQueryVariables
  >(SpacePostTemplatesLibraryDocument, options);
}

export function useSpacePostTemplatesLibraryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpacePostTemplatesLibraryQuery,
    SchemaTypes.SpacePostTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpacePostTemplatesLibraryQuery,
    SchemaTypes.SpacePostTemplatesLibraryQueryVariables
  >(SpacePostTemplatesLibraryDocument, options);
}

export type SpacePostTemplatesLibraryQueryHookResult = ReturnType<typeof useSpacePostTemplatesLibraryQuery>;
export type SpacePostTemplatesLibraryLazyQueryHookResult = ReturnType<typeof useSpacePostTemplatesLibraryLazyQuery>;
export type SpacePostTemplatesLibraryQueryResult = Apollo.QueryResult<
  SchemaTypes.SpacePostTemplatesLibraryQuery,
  SchemaTypes.SpacePostTemplatesLibraryQueryVariables
>;
export function refetchSpacePostTemplatesLibraryQuery(variables: SchemaTypes.SpacePostTemplatesLibraryQueryVariables) {
  return { query: SpacePostTemplatesLibraryDocument, variables: variables };
}

export const PlatformPostTemplatesLibraryDocument = gql`
  query PlatformPostTemplatesLibrary {
    platform {
      id
      library {
        id
        innovationPacks {
          id
          nameID
          profile {
            id
            displayName
          }
          provider {
            id
            profile {
              ...TemplateProviderProfile
            }
          }
          templates {
            id
            postTemplates {
              ...PostTemplateCard
            }
          }
        }
      }
    }
  }
  ${TemplateProviderProfileFragmentDoc}
  ${PostTemplateCardFragmentDoc}
`;

/**
 * __usePlatformPostTemplatesLibraryQuery__
 *
 * To run a query within a React component, call `usePlatformPostTemplatesLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformPostTemplatesLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformPostTemplatesLibraryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlatformPostTemplatesLibraryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.PlatformPostTemplatesLibraryQuery,
    SchemaTypes.PlatformPostTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PlatformPostTemplatesLibraryQuery,
    SchemaTypes.PlatformPostTemplatesLibraryQueryVariables
  >(PlatformPostTemplatesLibraryDocument, options);
}

export function usePlatformPostTemplatesLibraryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformPostTemplatesLibraryQuery,
    SchemaTypes.PlatformPostTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PlatformPostTemplatesLibraryQuery,
    SchemaTypes.PlatformPostTemplatesLibraryQueryVariables
  >(PlatformPostTemplatesLibraryDocument, options);
}

export type PlatformPostTemplatesLibraryQueryHookResult = ReturnType<typeof usePlatformPostTemplatesLibraryQuery>;
export type PlatformPostTemplatesLibraryLazyQueryHookResult = ReturnType<
  typeof usePlatformPostTemplatesLibraryLazyQuery
>;
export type PlatformPostTemplatesLibraryQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformPostTemplatesLibraryQuery,
  SchemaTypes.PlatformPostTemplatesLibraryQueryVariables
>;
export function refetchPlatformPostTemplatesLibraryQuery(
  variables?: SchemaTypes.PlatformPostTemplatesLibraryQueryVariables
) {
  return { query: PlatformPostTemplatesLibraryDocument, variables: variables };
}

export const SpacePostDocument = gql`
  query SpacePost($spaceNameId: UUID_NAMEID!, $postNameId: UUID_NAMEID!, $calloutNameId: UUID_NAMEID!) {
    space(ID: $spaceNameId) {
      id
      collaboration {
        ...PostDashboardData
      }
    }
  }
  ${PostDashboardDataFragmentDoc}
`;

/**
 * __useSpacePostQuery__
 *
 * To run a query within a React component, call `useSpacePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacePostQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useSpacePostQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpacePostQuery, SchemaTypes.SpacePostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpacePostQuery, SchemaTypes.SpacePostQueryVariables>(SpacePostDocument, options);
}

export function useSpacePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpacePostQuery, SchemaTypes.SpacePostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpacePostQuery, SchemaTypes.SpacePostQueryVariables>(
    SpacePostDocument,
    options
  );
}

export type SpacePostQueryHookResult = ReturnType<typeof useSpacePostQuery>;
export type SpacePostLazyQueryHookResult = ReturnType<typeof useSpacePostLazyQuery>;
export type SpacePostQueryResult = Apollo.QueryResult<SchemaTypes.SpacePostQuery, SchemaTypes.SpacePostQueryVariables>;
export function refetchSpacePostQuery(variables: SchemaTypes.SpacePostQueryVariables) {
  return { query: SpacePostDocument, variables: variables };
}

export const ChallengePostDocument = gql`
  query ChallengePost(
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID!
    $postNameId: UUID_NAMEID!
    $calloutNameId: UUID_NAMEID!
  ) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) {
        id
        collaboration {
          ...PostDashboardData
        }
      }
    }
  }
  ${PostDashboardDataFragmentDoc}
`;

/**
 * __useChallengePostQuery__
 *
 * To run a query within a React component, call `useChallengePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengePostQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useChallengePostQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.ChallengePostQuery, SchemaTypes.ChallengePostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengePostQuery, SchemaTypes.ChallengePostQueryVariables>(
    ChallengePostDocument,
    options
  );
}

export function useChallengePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.ChallengePostQuery, SchemaTypes.ChallengePostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengePostQuery, SchemaTypes.ChallengePostQueryVariables>(
    ChallengePostDocument,
    options
  );
}

export type ChallengePostQueryHookResult = ReturnType<typeof useChallengePostQuery>;
export type ChallengePostLazyQueryHookResult = ReturnType<typeof useChallengePostLazyQuery>;
export type ChallengePostQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengePostQuery,
  SchemaTypes.ChallengePostQueryVariables
>;
export function refetchChallengePostQuery(variables: SchemaTypes.ChallengePostQueryVariables) {
  return { query: ChallengePostDocument, variables: variables };
}

export const OpportunityPostDocument = gql`
  query OpportunityPost(
    $spaceNameId: UUID_NAMEID!
    $opportunityNameId: UUID_NAMEID!
    $postNameId: UUID_NAMEID!
    $calloutNameId: UUID_NAMEID!
  ) {
    space(ID: $spaceNameId) {
      id
      opportunity(ID: $opportunityNameId) {
        id
        collaboration {
          ...PostDashboardData
        }
      }
    }
  }
  ${PostDashboardDataFragmentDoc}
`;

/**
 * __useOpportunityPostQuery__
 *
 * To run a query within a React component, call `useOpportunityPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityPostQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useOpportunityPostQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.OpportunityPostQuery, SchemaTypes.OpportunityPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityPostQuery, SchemaTypes.OpportunityPostQueryVariables>(
    OpportunityPostDocument,
    options
  );
}

export function useOpportunityPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.OpportunityPostQuery, SchemaTypes.OpportunityPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunityPostQuery, SchemaTypes.OpportunityPostQueryVariables>(
    OpportunityPostDocument,
    options
  );
}

export type OpportunityPostQueryHookResult = ReturnType<typeof useOpportunityPostQuery>;
export type OpportunityPostLazyQueryHookResult = ReturnType<typeof useOpportunityPostLazyQuery>;
export type OpportunityPostQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityPostQuery,
  SchemaTypes.OpportunityPostQueryVariables
>;
export function refetchOpportunityPostQuery(variables: SchemaTypes.OpportunityPostQueryVariables) {
  return { query: OpportunityPostDocument, variables: variables };
}

export const UpdatePostDocument = gql`
  mutation updatePost($input: UpdatePostInput!) {
    updatePost(postData: $input) {
      id
      type
      profile {
        id
        displayName
        description
        tagset {
          ...TagsetDetails
        }
        references {
          id
          name
          description
          uri
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdatePostMutation,
  SchemaTypes.UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.UpdatePostMutation, SchemaTypes.UpdatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdatePostMutation, SchemaTypes.UpdatePostMutationVariables>(
    UpdatePostDocument,
    options
  );
}

export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<SchemaTypes.UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdatePostMutation,
  SchemaTypes.UpdatePostMutationVariables
>;
export const SpacePostSettingsDocument = gql`
  query SpacePostSettings($spaceNameId: UUID_NAMEID!, $postNameId: UUID_NAMEID!, $calloutNameId: UUID_NAMEID!) {
    space(ID: $spaceNameId) {
      id
      collaboration {
        id
        callouts(IDs: [$calloutNameId]) {
          ...PostSettingsCallout
        }
      }
    }
  }
  ${PostSettingsCalloutFragmentDoc}
`;

/**
 * __useSpacePostSettingsQuery__
 *
 * To run a query within a React component, call `useSpacePostSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacePostSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacePostSettingsQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useSpacePostSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpacePostSettingsQuery, SchemaTypes.SpacePostSettingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpacePostSettingsQuery, SchemaTypes.SpacePostSettingsQueryVariables>(
    SpacePostSettingsDocument,
    options
  );
}

export function useSpacePostSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpacePostSettingsQuery,
    SchemaTypes.SpacePostSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpacePostSettingsQuery, SchemaTypes.SpacePostSettingsQueryVariables>(
    SpacePostSettingsDocument,
    options
  );
}

export type SpacePostSettingsQueryHookResult = ReturnType<typeof useSpacePostSettingsQuery>;
export type SpacePostSettingsLazyQueryHookResult = ReturnType<typeof useSpacePostSettingsLazyQuery>;
export type SpacePostSettingsQueryResult = Apollo.QueryResult<
  SchemaTypes.SpacePostSettingsQuery,
  SchemaTypes.SpacePostSettingsQueryVariables
>;
export function refetchSpacePostSettingsQuery(variables: SchemaTypes.SpacePostSettingsQueryVariables) {
  return { query: SpacePostSettingsDocument, variables: variables };
}

export const ChallengePostSettingsDocument = gql`
  query ChallengePostSettings(
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID!
    $postNameId: UUID_NAMEID!
    $calloutNameId: UUID_NAMEID!
  ) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) {
        id
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            ...PostSettingsCallout
          }
        }
      }
    }
  }
  ${PostSettingsCalloutFragmentDoc}
`;

/**
 * __useChallengePostSettingsQuery__
 *
 * To run a query within a React component, call `useChallengePostSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengePostSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengePostSettingsQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useChallengePostSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengePostSettingsQuery,
    SchemaTypes.ChallengePostSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengePostSettingsQuery, SchemaTypes.ChallengePostSettingsQueryVariables>(
    ChallengePostSettingsDocument,
    options
  );
}

export function useChallengePostSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengePostSettingsQuery,
    SchemaTypes.ChallengePostSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengePostSettingsQuery, SchemaTypes.ChallengePostSettingsQueryVariables>(
    ChallengePostSettingsDocument,
    options
  );
}

export type ChallengePostSettingsQueryHookResult = ReturnType<typeof useChallengePostSettingsQuery>;
export type ChallengePostSettingsLazyQueryHookResult = ReturnType<typeof useChallengePostSettingsLazyQuery>;
export type ChallengePostSettingsQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengePostSettingsQuery,
  SchemaTypes.ChallengePostSettingsQueryVariables
>;
export function refetchChallengePostSettingsQuery(variables: SchemaTypes.ChallengePostSettingsQueryVariables) {
  return { query: ChallengePostSettingsDocument, variables: variables };
}

export const OpportunityPostSettingsDocument = gql`
  query OpportunityPostSettings(
    $spaceNameId: UUID_NAMEID!
    $opportunityNameId: UUID_NAMEID!
    $postNameId: UUID_NAMEID!
    $calloutNameId: UUID_NAMEID!
  ) {
    space(ID: $spaceNameId) {
      id
      opportunity(ID: $opportunityNameId) {
        id
        collaboration {
          id
          callouts(IDs: [$calloutNameId]) {
            ...PostSettingsCallout
          }
        }
      }
    }
  }
  ${PostSettingsCalloutFragmentDoc}
`;

/**
 * __useOpportunityPostSettingsQuery__
 *
 * To run a query within a React component, call `useOpportunityPostSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityPostSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityPostSettingsQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useOpportunityPostSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityPostSettingsQuery,
    SchemaTypes.OpportunityPostSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityPostSettingsQuery, SchemaTypes.OpportunityPostSettingsQueryVariables>(
    OpportunityPostSettingsDocument,
    options
  );
}

export function useOpportunityPostSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityPostSettingsQuery,
    SchemaTypes.OpportunityPostSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityPostSettingsQuery,
    SchemaTypes.OpportunityPostSettingsQueryVariables
  >(OpportunityPostSettingsDocument, options);
}

export type OpportunityPostSettingsQueryHookResult = ReturnType<typeof useOpportunityPostSettingsQuery>;
export type OpportunityPostSettingsLazyQueryHookResult = ReturnType<typeof useOpportunityPostSettingsLazyQuery>;
export type OpportunityPostSettingsQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityPostSettingsQuery,
  SchemaTypes.OpportunityPostSettingsQueryVariables
>;
export function refetchOpportunityPostSettingsQuery(variables: SchemaTypes.OpportunityPostSettingsQueryVariables) {
  return { query: OpportunityPostSettingsDocument, variables: variables };
}

export const SpacePostProviderDocument = gql`
  query SpacePostProvider($spaceNameId: UUID_NAMEID!, $postNameId: UUID_NAMEID!, $calloutNameId: UUID_NAMEID!) {
    space(ID: $spaceNameId) {
      id
      collaboration {
        ...PostProviderData
      }
    }
  }
  ${PostProviderDataFragmentDoc}
`;

/**
 * __useSpacePostProviderQuery__
 *
 * To run a query within a React component, call `useSpacePostProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacePostProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacePostProviderQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useSpacePostProviderQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpacePostProviderQuery, SchemaTypes.SpacePostProviderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpacePostProviderQuery, SchemaTypes.SpacePostProviderQueryVariables>(
    SpacePostProviderDocument,
    options
  );
}

export function useSpacePostProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpacePostProviderQuery,
    SchemaTypes.SpacePostProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpacePostProviderQuery, SchemaTypes.SpacePostProviderQueryVariables>(
    SpacePostProviderDocument,
    options
  );
}

export type SpacePostProviderQueryHookResult = ReturnType<typeof useSpacePostProviderQuery>;
export type SpacePostProviderLazyQueryHookResult = ReturnType<typeof useSpacePostProviderLazyQuery>;
export type SpacePostProviderQueryResult = Apollo.QueryResult<
  SchemaTypes.SpacePostProviderQuery,
  SchemaTypes.SpacePostProviderQueryVariables
>;
export function refetchSpacePostProviderQuery(variables: SchemaTypes.SpacePostProviderQueryVariables) {
  return { query: SpacePostProviderDocument, variables: variables };
}

export const ChallengePostProviderDocument = gql`
  query ChallengePostProvider(
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID!
    $postNameId: UUID_NAMEID!
    $calloutNameId: UUID_NAMEID!
  ) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) {
        id
        collaboration {
          ...PostProviderData
        }
      }
    }
  }
  ${PostProviderDataFragmentDoc}
`;

/**
 * __useChallengePostProviderQuery__
 *
 * To run a query within a React component, call `useChallengePostProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengePostProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengePostProviderQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useChallengePostProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengePostProviderQuery,
    SchemaTypes.ChallengePostProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengePostProviderQuery, SchemaTypes.ChallengePostProviderQueryVariables>(
    ChallengePostProviderDocument,
    options
  );
}

export function useChallengePostProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengePostProviderQuery,
    SchemaTypes.ChallengePostProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengePostProviderQuery, SchemaTypes.ChallengePostProviderQueryVariables>(
    ChallengePostProviderDocument,
    options
  );
}

export type ChallengePostProviderQueryHookResult = ReturnType<typeof useChallengePostProviderQuery>;
export type ChallengePostProviderLazyQueryHookResult = ReturnType<typeof useChallengePostProviderLazyQuery>;
export type ChallengePostProviderQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengePostProviderQuery,
  SchemaTypes.ChallengePostProviderQueryVariables
>;
export function refetchChallengePostProviderQuery(variables: SchemaTypes.ChallengePostProviderQueryVariables) {
  return { query: ChallengePostProviderDocument, variables: variables };
}

export const OpportunityPostProviderDocument = gql`
  query OpportunityPostProvider(
    $spaceNameId: UUID_NAMEID!
    $opportunityNameId: UUID_NAMEID!
    $postNameId: UUID_NAMEID!
    $calloutNameId: UUID_NAMEID!
  ) {
    space(ID: $spaceNameId) {
      id
      opportunity(ID: $opportunityNameId) {
        id
        collaboration {
          ...PostProviderData
        }
      }
    }
  }
  ${PostProviderDataFragmentDoc}
`;

/**
 * __useOpportunityPostProviderQuery__
 *
 * To run a query within a React component, call `useOpportunityPostProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityPostProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityPostProviderQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      postNameId: // value for 'postNameId'
 *      calloutNameId: // value for 'calloutNameId'
 *   },
 * });
 */
export function useOpportunityPostProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityPostProviderQuery,
    SchemaTypes.OpportunityPostProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityPostProviderQuery, SchemaTypes.OpportunityPostProviderQueryVariables>(
    OpportunityPostProviderDocument,
    options
  );
}

export function useOpportunityPostProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityPostProviderQuery,
    SchemaTypes.OpportunityPostProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityPostProviderQuery,
    SchemaTypes.OpportunityPostProviderQueryVariables
  >(OpportunityPostProviderDocument, options);
}

export type OpportunityPostProviderQueryHookResult = ReturnType<typeof useOpportunityPostProviderQuery>;
export type OpportunityPostProviderLazyQueryHookResult = ReturnType<typeof useOpportunityPostProviderLazyQuery>;
export type OpportunityPostProviderQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityPostProviderQuery,
  SchemaTypes.OpportunityPostProviderQueryVariables
>;
export function refetchOpportunityPostProviderQuery(variables: SchemaTypes.OpportunityPostProviderQueryVariables) {
  return { query: OpportunityPostProviderDocument, variables: variables };
}

export const DeletePostDocument = gql`
  mutation deletePost($input: DeletePostInput!) {
    deletePost(deleteData: $input) {
      id
    }
  }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeletePostMutation,
  SchemaTypes.DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.DeletePostMutation, SchemaTypes.DeletePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeletePostMutation, SchemaTypes.DeletePostMutationVariables>(
    DeletePostDocument,
    options
  );
}

export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<SchemaTypes.DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeletePostMutation,
  SchemaTypes.DeletePostMutationVariables
>;
export const MovePostToCalloutDocument = gql`
  mutation MovePostToCallout($postId: UUID!, $calloutId: UUID!) {
    movePostToCallout(movePostData: { postID: $postId, calloutID: $calloutId }) {
      id
      nameID
      callout {
        id
        nameID
      }
    }
  }
`;
export type MovePostToCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.MovePostToCalloutMutation,
  SchemaTypes.MovePostToCalloutMutationVariables
>;

/**
 * __useMovePostToCalloutMutation__
 *
 * To run a mutation, you first call `useMovePostToCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovePostToCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movePostToCalloutMutation, { data, loading, error }] = useMovePostToCalloutMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      calloutId: // value for 'calloutId'
 *   },
 * });
 */
export function useMovePostToCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.MovePostToCalloutMutation,
    SchemaTypes.MovePostToCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.MovePostToCalloutMutation, SchemaTypes.MovePostToCalloutMutationVariables>(
    MovePostToCalloutDocument,
    options
  );
}

export type MovePostToCalloutMutationHookResult = ReturnType<typeof useMovePostToCalloutMutation>;
export type MovePostToCalloutMutationResult = Apollo.MutationResult<SchemaTypes.MovePostToCalloutMutation>;
export type MovePostToCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.MovePostToCalloutMutation,
  SchemaTypes.MovePostToCalloutMutationVariables
>;
export const SpaceWhiteboardTemplatesLibraryDocument = gql`
  query SpaceWhiteboardTemplatesLibrary($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        whiteboardTemplates {
          ...WhiteboardTemplateCard
        }
      }
      host {
        id
        nameID
        profile {
          ...TemplateProviderProfile
        }
      }
    }
  }
  ${WhiteboardTemplateCardFragmentDoc}
  ${TemplateProviderProfileFragmentDoc}
`;

/**
 * __useSpaceWhiteboardTemplatesLibraryQuery__
 *
 * To run a query within a React component, call `useSpaceWhiteboardTemplatesLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceWhiteboardTemplatesLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceWhiteboardTemplatesLibraryQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceWhiteboardTemplatesLibraryQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQuery,
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQuery,
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQueryVariables
  >(SpaceWhiteboardTemplatesLibraryDocument, options);
}

export function useSpaceWhiteboardTemplatesLibraryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQuery,
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQuery,
    SchemaTypes.SpaceWhiteboardTemplatesLibraryQueryVariables
  >(SpaceWhiteboardTemplatesLibraryDocument, options);
}

export type SpaceWhiteboardTemplatesLibraryQueryHookResult = ReturnType<typeof useSpaceWhiteboardTemplatesLibraryQuery>;
export type SpaceWhiteboardTemplatesLibraryLazyQueryHookResult = ReturnType<
  typeof useSpaceWhiteboardTemplatesLibraryLazyQuery
>;
export type SpaceWhiteboardTemplatesLibraryQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceWhiteboardTemplatesLibraryQuery,
  SchemaTypes.SpaceWhiteboardTemplatesLibraryQueryVariables
>;
export function refetchSpaceWhiteboardTemplatesLibraryQuery(
  variables: SchemaTypes.SpaceWhiteboardTemplatesLibraryQueryVariables
) {
  return { query: SpaceWhiteboardTemplatesLibraryDocument, variables: variables };
}

export const PlatformWhiteboardTemplatesLibraryDocument = gql`
  query PlatformWhiteboardTemplatesLibrary {
    platform {
      id
      library {
        id
        innovationPacks {
          id
          nameID
          profile {
            id
            displayName
          }
          provider {
            id
            profile {
              ...TemplateProviderProfile
            }
          }
          templates {
            id
            whiteboardTemplates {
              ...WhiteboardTemplateCard
            }
          }
        }
      }
    }
  }
  ${TemplateProviderProfileFragmentDoc}
  ${WhiteboardTemplateCardFragmentDoc}
`;

/**
 * __usePlatformWhiteboardTemplatesLibraryQuery__
 *
 * To run a query within a React component, call `usePlatformWhiteboardTemplatesLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformWhiteboardTemplatesLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformWhiteboardTemplatesLibraryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlatformWhiteboardTemplatesLibraryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQuery,
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQuery,
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQueryVariables
  >(PlatformWhiteboardTemplatesLibraryDocument, options);
}

export function usePlatformWhiteboardTemplatesLibraryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQuery,
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQuery,
    SchemaTypes.PlatformWhiteboardTemplatesLibraryQueryVariables
  >(PlatformWhiteboardTemplatesLibraryDocument, options);
}

export type PlatformWhiteboardTemplatesLibraryQueryHookResult = ReturnType<
  typeof usePlatformWhiteboardTemplatesLibraryQuery
>;
export type PlatformWhiteboardTemplatesLibraryLazyQueryHookResult = ReturnType<
  typeof usePlatformWhiteboardTemplatesLibraryLazyQuery
>;
export type PlatformWhiteboardTemplatesLibraryQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformWhiteboardTemplatesLibraryQuery,
  SchemaTypes.PlatformWhiteboardTemplatesLibraryQueryVariables
>;
export function refetchPlatformWhiteboardTemplatesLibraryQuery(
  variables?: SchemaTypes.PlatformWhiteboardTemplatesLibraryQueryVariables
) {
  return { query: PlatformWhiteboardTemplatesLibraryDocument, variables: variables };
}

export const WhiteboardLockedByDetailsDocument = gql`
  query WhiteboardLockedByDetails($ids: [UUID!]!) {
    users(IDs: $ids) {
      ...LockedByDetails
    }
  }
  ${LockedByDetailsFragmentDoc}
`;

/**
 * __useWhiteboardLockedByDetailsQuery__
 *
 * To run a query within a React component, call `useWhiteboardLockedByDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardLockedByDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardLockedByDetailsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useWhiteboardLockedByDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardLockedByDetailsQuery,
    SchemaTypes.WhiteboardLockedByDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.WhiteboardLockedByDetailsQuery,
    SchemaTypes.WhiteboardLockedByDetailsQueryVariables
  >(WhiteboardLockedByDetailsDocument, options);
}

export function useWhiteboardLockedByDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardLockedByDetailsQuery,
    SchemaTypes.WhiteboardLockedByDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardLockedByDetailsQuery,
    SchemaTypes.WhiteboardLockedByDetailsQueryVariables
  >(WhiteboardLockedByDetailsDocument, options);
}

export type WhiteboardLockedByDetailsQueryHookResult = ReturnType<typeof useWhiteboardLockedByDetailsQuery>;
export type WhiteboardLockedByDetailsLazyQueryHookResult = ReturnType<typeof useWhiteboardLockedByDetailsLazyQuery>;
export type WhiteboardLockedByDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardLockedByDetailsQuery,
  SchemaTypes.WhiteboardLockedByDetailsQueryVariables
>;
export function refetchWhiteboardLockedByDetailsQuery(variables: SchemaTypes.WhiteboardLockedByDetailsQueryVariables) {
  return { query: WhiteboardLockedByDetailsDocument, variables: variables };
}

export const WhiteboardTemplatesDocument = gql`
  query whiteboardTemplates($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        whiteboardTemplates {
          ...CreateWhiteboardWhiteboardTemplate
        }
      }
    }
  }
  ${CreateWhiteboardWhiteboardTemplateFragmentDoc}
`;

/**
 * __useWhiteboardTemplatesQuery__
 *
 * To run a query within a React component, call `useWhiteboardTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardTemplatesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useWhiteboardTemplatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardTemplatesQuery,
    SchemaTypes.WhiteboardTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.WhiteboardTemplatesQuery, SchemaTypes.WhiteboardTemplatesQueryVariables>(
    WhiteboardTemplatesDocument,
    options
  );
}

export function useWhiteboardTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardTemplatesQuery,
    SchemaTypes.WhiteboardTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.WhiteboardTemplatesQuery, SchemaTypes.WhiteboardTemplatesQueryVariables>(
    WhiteboardTemplatesDocument,
    options
  );
}

export type WhiteboardTemplatesQueryHookResult = ReturnType<typeof useWhiteboardTemplatesQuery>;
export type WhiteboardTemplatesLazyQueryHookResult = ReturnType<typeof useWhiteboardTemplatesLazyQuery>;
export type WhiteboardTemplatesQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardTemplatesQuery,
  SchemaTypes.WhiteboardTemplatesQueryVariables
>;
export function refetchWhiteboardTemplatesQuery(variables: SchemaTypes.WhiteboardTemplatesQueryVariables) {
  return { query: WhiteboardTemplatesDocument, variables: variables };
}

export const WhiteboardFromCalloutDocument = gql`
  query WhiteboardFromCallout($calloutId: UUID!, $whiteboardId: UUID_NAMEID!) {
    lookup {
      callout(ID: $calloutId) {
        ...CalloutWithWhiteboard
      }
    }
  }
  ${CalloutWithWhiteboardFragmentDoc}
`;

/**
 * __useWhiteboardFromCalloutQuery__
 *
 * To run a query within a React component, call `useWhiteboardFromCalloutQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardFromCalloutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardFromCalloutQuery({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *      whiteboardId: // value for 'whiteboardId'
 *   },
 * });
 */
export function useWhiteboardFromCalloutQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardFromCalloutQuery,
    SchemaTypes.WhiteboardFromCalloutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.WhiteboardFromCalloutQuery, SchemaTypes.WhiteboardFromCalloutQueryVariables>(
    WhiteboardFromCalloutDocument,
    options
  );
}

export function useWhiteboardFromCalloutLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardFromCalloutQuery,
    SchemaTypes.WhiteboardFromCalloutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.WhiteboardFromCalloutQuery, SchemaTypes.WhiteboardFromCalloutQueryVariables>(
    WhiteboardFromCalloutDocument,
    options
  );
}

export type WhiteboardFromCalloutQueryHookResult = ReturnType<typeof useWhiteboardFromCalloutQuery>;
export type WhiteboardFromCalloutLazyQueryHookResult = ReturnType<typeof useWhiteboardFromCalloutLazyQuery>;
export type WhiteboardFromCalloutQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardFromCalloutQuery,
  SchemaTypes.WhiteboardFromCalloutQueryVariables
>;
export function refetchWhiteboardFromCalloutQuery(variables: SchemaTypes.WhiteboardFromCalloutQueryVariables) {
  return { query: WhiteboardFromCalloutDocument, variables: variables };
}

export const WhiteboardRtFromCalloutDocument = gql`
  query WhiteboardRtFromCallout($calloutId: UUID!) {
    lookup {
      callout(ID: $calloutId) {
        ...CalloutWithWhiteboardRt
      }
    }
  }
  ${CalloutWithWhiteboardRtFragmentDoc}
`;

/**
 * __useWhiteboardRtFromCalloutQuery__
 *
 * To run a query within a React component, call `useWhiteboardRtFromCalloutQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardRtFromCalloutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardRtFromCalloutQuery({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *   },
 * });
 */
export function useWhiteboardRtFromCalloutQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardRtFromCalloutQuery,
    SchemaTypes.WhiteboardRtFromCalloutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.WhiteboardRtFromCalloutQuery, SchemaTypes.WhiteboardRtFromCalloutQueryVariables>(
    WhiteboardRtFromCalloutDocument,
    options
  );
}

export function useWhiteboardRtFromCalloutLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardRtFromCalloutQuery,
    SchemaTypes.WhiteboardRtFromCalloutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardRtFromCalloutQuery,
    SchemaTypes.WhiteboardRtFromCalloutQueryVariables
  >(WhiteboardRtFromCalloutDocument, options);
}

export type WhiteboardRtFromCalloutQueryHookResult = ReturnType<typeof useWhiteboardRtFromCalloutQuery>;
export type WhiteboardRtFromCalloutLazyQueryHookResult = ReturnType<typeof useWhiteboardRtFromCalloutLazyQuery>;
export type WhiteboardRtFromCalloutQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardRtFromCalloutQuery,
  SchemaTypes.WhiteboardRtFromCalloutQueryVariables
>;
export function refetchWhiteboardRtFromCalloutQuery(variables: SchemaTypes.WhiteboardRtFromCalloutQueryVariables) {
  return { query: WhiteboardRtFromCalloutDocument, variables: variables };
}

export const WhiteboardWithContentDocument = gql`
  query WhiteboardWithContent($whiteboardId: UUID!) {
    lookup {
      whiteboard(ID: $whiteboardId) {
        ...WhiteboardDetails
        ...WhiteboardContent
      }
    }
  }
  ${WhiteboardDetailsFragmentDoc}
  ${WhiteboardContentFragmentDoc}
`;

/**
 * __useWhiteboardWithContentQuery__
 *
 * To run a query within a React component, call `useWhiteboardWithContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardWithContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardWithContentQuery({
 *   variables: {
 *      whiteboardId: // value for 'whiteboardId'
 *   },
 * });
 */
export function useWhiteboardWithContentQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardWithContentQuery,
    SchemaTypes.WhiteboardWithContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.WhiteboardWithContentQuery, SchemaTypes.WhiteboardWithContentQueryVariables>(
    WhiteboardWithContentDocument,
    options
  );
}

export function useWhiteboardWithContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardWithContentQuery,
    SchemaTypes.WhiteboardWithContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.WhiteboardWithContentQuery, SchemaTypes.WhiteboardWithContentQueryVariables>(
    WhiteboardWithContentDocument,
    options
  );
}

export type WhiteboardWithContentQueryHookResult = ReturnType<typeof useWhiteboardWithContentQuery>;
export type WhiteboardWithContentLazyQueryHookResult = ReturnType<typeof useWhiteboardWithContentLazyQuery>;
export type WhiteboardWithContentQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardWithContentQuery,
  SchemaTypes.WhiteboardWithContentQueryVariables
>;
export function refetchWhiteboardWithContentQuery(variables: SchemaTypes.WhiteboardWithContentQueryVariables) {
  return { query: WhiteboardWithContentDocument, variables: variables };
}

export const WhiteboardRtWithContentDocument = gql`
  query whiteboardRtWithContent($whiteboardId: UUID!) {
    lookup {
      whiteboardRt(ID: $whiteboardId) {
        ...WhiteboardRtDetails
        ...WhiteboardRtContent
      }
    }
  }
  ${WhiteboardRtDetailsFragmentDoc}
  ${WhiteboardRtContentFragmentDoc}
`;

/**
 * __useWhiteboardRtWithContentQuery__
 *
 * To run a query within a React component, call `useWhiteboardRtWithContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardRtWithContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardRtWithContentQuery({
 *   variables: {
 *      whiteboardId: // value for 'whiteboardId'
 *   },
 * });
 */
export function useWhiteboardRtWithContentQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardRtWithContentQuery,
    SchemaTypes.WhiteboardRtWithContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.WhiteboardRtWithContentQuery, SchemaTypes.WhiteboardRtWithContentQueryVariables>(
    WhiteboardRtWithContentDocument,
    options
  );
}

export function useWhiteboardRtWithContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardRtWithContentQuery,
    SchemaTypes.WhiteboardRtWithContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardRtWithContentQuery,
    SchemaTypes.WhiteboardRtWithContentQueryVariables
  >(WhiteboardRtWithContentDocument, options);
}

export type WhiteboardRtWithContentQueryHookResult = ReturnType<typeof useWhiteboardRtWithContentQuery>;
export type WhiteboardRtWithContentLazyQueryHookResult = ReturnType<typeof useWhiteboardRtWithContentLazyQuery>;
export type WhiteboardRtWithContentQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardRtWithContentQuery,
  SchemaTypes.WhiteboardRtWithContentQueryVariables
>;
export function refetchWhiteboardRtWithContentQuery(variables: SchemaTypes.WhiteboardRtWithContentQueryVariables) {
  return { query: WhiteboardRtWithContentDocument, variables: variables };
}

export const WhiteboardRtLastUpdatedDateDocument = gql`
  query whiteboardRtLastUpdatedDate($whiteboardId: UUID!) {
    lookup {
      whiteboardRt(ID: $whiteboardId) {
        id
        updatedDate
      }
    }
  }
`;

/**
 * __useWhiteboardRtLastUpdatedDateQuery__
 *
 * To run a query within a React component, call `useWhiteboardRtLastUpdatedDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardRtLastUpdatedDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardRtLastUpdatedDateQuery({
 *   variables: {
 *      whiteboardId: // value for 'whiteboardId'
 *   },
 * });
 */
export function useWhiteboardRtLastUpdatedDateQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardRtLastUpdatedDateQuery,
    SchemaTypes.WhiteboardRtLastUpdatedDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.WhiteboardRtLastUpdatedDateQuery,
    SchemaTypes.WhiteboardRtLastUpdatedDateQueryVariables
  >(WhiteboardRtLastUpdatedDateDocument, options);
}

export function useWhiteboardRtLastUpdatedDateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardRtLastUpdatedDateQuery,
    SchemaTypes.WhiteboardRtLastUpdatedDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardRtLastUpdatedDateQuery,
    SchemaTypes.WhiteboardRtLastUpdatedDateQueryVariables
  >(WhiteboardRtLastUpdatedDateDocument, options);
}

export type WhiteboardRtLastUpdatedDateQueryHookResult = ReturnType<typeof useWhiteboardRtLastUpdatedDateQuery>;
export type WhiteboardRtLastUpdatedDateLazyQueryHookResult = ReturnType<typeof useWhiteboardRtLastUpdatedDateLazyQuery>;
export type WhiteboardRtLastUpdatedDateQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardRtLastUpdatedDateQuery,
  SchemaTypes.WhiteboardRtLastUpdatedDateQueryVariables
>;
export function refetchWhiteboardRtLastUpdatedDateQuery(
  variables: SchemaTypes.WhiteboardRtLastUpdatedDateQueryVariables
) {
  return { query: WhiteboardRtLastUpdatedDateDocument, variables: variables };
}

export const PlatformTemplateWhiteboardContentsDocument = gql`
  query platformTemplateWhiteboardContents($innovationPackId: UUID_NAMEID!, $whiteboardId: UUID!) {
    platform {
      id
      library {
        id
        innovationPack(ID: $innovationPackId) {
          templates {
            id
            whiteboardTemplate(ID: $whiteboardId) {
              id
              profile {
                ...WhiteboardProfile
              }
              content
            }
          }
        }
      }
    }
  }
  ${WhiteboardProfileFragmentDoc}
`;

/**
 * __usePlatformTemplateWhiteboardContentsQuery__
 *
 * To run a query within a React component, call `usePlatformTemplateWhiteboardContentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformTemplateWhiteboardContentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformTemplateWhiteboardContentsQuery({
 *   variables: {
 *      innovationPackId: // value for 'innovationPackId'
 *      whiteboardId: // value for 'whiteboardId'
 *   },
 * });
 */
export function usePlatformTemplateWhiteboardContentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PlatformTemplateWhiteboardContentsQuery,
    SchemaTypes.PlatformTemplateWhiteboardContentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PlatformTemplateWhiteboardContentsQuery,
    SchemaTypes.PlatformTemplateWhiteboardContentsQueryVariables
  >(PlatformTemplateWhiteboardContentsDocument, options);
}

export function usePlatformTemplateWhiteboardContentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformTemplateWhiteboardContentsQuery,
    SchemaTypes.PlatformTemplateWhiteboardContentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PlatformTemplateWhiteboardContentsQuery,
    SchemaTypes.PlatformTemplateWhiteboardContentsQueryVariables
  >(PlatformTemplateWhiteboardContentsDocument, options);
}

export type PlatformTemplateWhiteboardContentsQueryHookResult = ReturnType<
  typeof usePlatformTemplateWhiteboardContentsQuery
>;
export type PlatformTemplateWhiteboardContentsLazyQueryHookResult = ReturnType<
  typeof usePlatformTemplateWhiteboardContentsLazyQuery
>;
export type PlatformTemplateWhiteboardContentsQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformTemplateWhiteboardContentsQuery,
  SchemaTypes.PlatformTemplateWhiteboardContentsQueryVariables
>;
export function refetchPlatformTemplateWhiteboardContentsQuery(
  variables: SchemaTypes.PlatformTemplateWhiteboardContentsQueryVariables
) {
  return { query: PlatformTemplateWhiteboardContentsDocument, variables: variables };
}

export const CreateWhiteboardOnCalloutDocument = gql`
  mutation createWhiteboardOnCallout($input: CreateWhiteboardOnCalloutInput!) {
    createWhiteboardOnCallout(whiteboardData: $input) {
      ...WhiteboardDetails
    }
  }
  ${WhiteboardDetailsFragmentDoc}
`;
export type CreateWhiteboardOnCalloutMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateWhiteboardOnCalloutMutation,
  SchemaTypes.CreateWhiteboardOnCalloutMutationVariables
>;

/**
 * __useCreateWhiteboardOnCalloutMutation__
 *
 * To run a mutation, you first call `useCreateWhiteboardOnCalloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWhiteboardOnCalloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWhiteboardOnCalloutMutation, { data, loading, error }] = useCreateWhiteboardOnCalloutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWhiteboardOnCalloutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateWhiteboardOnCalloutMutation,
    SchemaTypes.CreateWhiteboardOnCalloutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateWhiteboardOnCalloutMutation,
    SchemaTypes.CreateWhiteboardOnCalloutMutationVariables
  >(CreateWhiteboardOnCalloutDocument, options);
}

export type CreateWhiteboardOnCalloutMutationHookResult = ReturnType<typeof useCreateWhiteboardOnCalloutMutation>;
export type CreateWhiteboardOnCalloutMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateWhiteboardOnCalloutMutation>;
export type CreateWhiteboardOnCalloutMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateWhiteboardOnCalloutMutation,
  SchemaTypes.CreateWhiteboardOnCalloutMutationVariables
>;
export const DeleteWhiteboardDocument = gql`
  mutation deleteWhiteboard($input: DeleteWhiteboardInput!) {
    deleteWhiteboard(whiteboardData: $input) {
      id
    }
  }
`;
export type DeleteWhiteboardMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteWhiteboardMutation,
  SchemaTypes.DeleteWhiteboardMutationVariables
>;

/**
 * __useDeleteWhiteboardMutation__
 *
 * To run a mutation, you first call `useDeleteWhiteboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWhiteboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWhiteboardMutation, { data, loading, error }] = useDeleteWhiteboardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteWhiteboardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteWhiteboardMutation,
    SchemaTypes.DeleteWhiteboardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteWhiteboardMutation, SchemaTypes.DeleteWhiteboardMutationVariables>(
    DeleteWhiteboardDocument,
    options
  );
}

export type DeleteWhiteboardMutationHookResult = ReturnType<typeof useDeleteWhiteboardMutation>;
export type DeleteWhiteboardMutationResult = Apollo.MutationResult<SchemaTypes.DeleteWhiteboardMutation>;
export type DeleteWhiteboardMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteWhiteboardMutation,
  SchemaTypes.DeleteWhiteboardMutationVariables
>;
export const UpdateWhiteboardDocument = gql`
  mutation updateWhiteboard($input: UpdateWhiteboardDirectInput!) {
    updateWhiteboard(whiteboardData: $input) {
      id
      content
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateWhiteboardMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateWhiteboardMutation,
  SchemaTypes.UpdateWhiteboardMutationVariables
>;

/**
 * __useUpdateWhiteboardMutation__
 *
 * To run a mutation, you first call `useUpdateWhiteboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWhiteboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWhiteboardMutation, { data, loading, error }] = useUpdateWhiteboardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWhiteboardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateWhiteboardMutation,
    SchemaTypes.UpdateWhiteboardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateWhiteboardMutation, SchemaTypes.UpdateWhiteboardMutationVariables>(
    UpdateWhiteboardDocument,
    options
  );
}

export type UpdateWhiteboardMutationHookResult = ReturnType<typeof useUpdateWhiteboardMutation>;
export type UpdateWhiteboardMutationResult = Apollo.MutationResult<SchemaTypes.UpdateWhiteboardMutation>;
export type UpdateWhiteboardMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateWhiteboardMutation,
  SchemaTypes.UpdateWhiteboardMutationVariables
>;
export const UpdateWhiteboardRtDocument = gql`
  mutation updateWhiteboardRt($input: UpdateWhiteboardRtDirectInput!) {
    updateWhiteboardRt(whiteboardData: $input) {
      id
      content
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateWhiteboardRtMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateWhiteboardRtMutation,
  SchemaTypes.UpdateWhiteboardRtMutationVariables
>;

/**
 * __useUpdateWhiteboardRtMutation__
 *
 * To run a mutation, you first call `useUpdateWhiteboardRtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWhiteboardRtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWhiteboardRtMutation, { data, loading, error }] = useUpdateWhiteboardRtMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWhiteboardRtMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateWhiteboardRtMutation,
    SchemaTypes.UpdateWhiteboardRtMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateWhiteboardRtMutation, SchemaTypes.UpdateWhiteboardRtMutationVariables>(
    UpdateWhiteboardRtDocument,
    options
  );
}

export type UpdateWhiteboardRtMutationHookResult = ReturnType<typeof useUpdateWhiteboardRtMutation>;
export type UpdateWhiteboardRtMutationResult = Apollo.MutationResult<SchemaTypes.UpdateWhiteboardRtMutation>;
export type UpdateWhiteboardRtMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateWhiteboardRtMutation,
  SchemaTypes.UpdateWhiteboardRtMutationVariables
>;
export const CheckoutWhiteboardDocument = gql`
  mutation checkoutWhiteboard($input: WhiteboardCheckoutEventInput!) {
    eventOnWhiteboardCheckout(whiteboardCheckoutEventData: $input) {
      ...CheckoutDetails
    }
  }
  ${CheckoutDetailsFragmentDoc}
`;
export type CheckoutWhiteboardMutationFn = Apollo.MutationFunction<
  SchemaTypes.CheckoutWhiteboardMutation,
  SchemaTypes.CheckoutWhiteboardMutationVariables
>;

/**
 * __useCheckoutWhiteboardMutation__
 *
 * To run a mutation, you first call `useCheckoutWhiteboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutWhiteboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutWhiteboardMutation, { data, loading, error }] = useCheckoutWhiteboardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckoutWhiteboardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CheckoutWhiteboardMutation,
    SchemaTypes.CheckoutWhiteboardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CheckoutWhiteboardMutation, SchemaTypes.CheckoutWhiteboardMutationVariables>(
    CheckoutWhiteboardDocument,
    options
  );
}

export type CheckoutWhiteboardMutationHookResult = ReturnType<typeof useCheckoutWhiteboardMutation>;
export type CheckoutWhiteboardMutationResult = Apollo.MutationResult<SchemaTypes.CheckoutWhiteboardMutation>;
export type CheckoutWhiteboardMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CheckoutWhiteboardMutation,
  SchemaTypes.CheckoutWhiteboardMutationVariables
>;
export const WhiteboardContentUpdatedDocument = gql`
  subscription whiteboardContentUpdated($whiteboardIDs: [UUID!]!) {
    whiteboardContentUpdated(whiteboardIDs: $whiteboardIDs) {
      whiteboardID
      content
    }
  }
`;

/**
 * __useWhiteboardContentUpdatedSubscription__
 *
 * To run a query within a React component, call `useWhiteboardContentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardContentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardContentUpdatedSubscription({
 *   variables: {
 *      whiteboardIDs: // value for 'whiteboardIDs'
 *   },
 * });
 */
export function useWhiteboardContentUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.WhiteboardContentUpdatedSubscription,
    SchemaTypes.WhiteboardContentUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.WhiteboardContentUpdatedSubscription,
    SchemaTypes.WhiteboardContentUpdatedSubscriptionVariables
  >(WhiteboardContentUpdatedDocument, options);
}

export type WhiteboardContentUpdatedSubscriptionHookResult = ReturnType<typeof useWhiteboardContentUpdatedSubscription>;
export type WhiteboardContentUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<SchemaTypes.WhiteboardContentUpdatedSubscription>;
export const ChallengePreferencesDocument = gql`
  query challengePreferences($spaceNameId: UUID_NAMEID!, $challengeNameId: UUID_NAMEID!) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) {
        id
        preferences {
          id
          value
          definition {
            id
            description
            displayName
            group
            type
            valueType
          }
        }
      }
    }
  }
`;

/**
 * __useChallengePreferencesQuery__
 *
 * To run a query within a React component, call `useChallengePreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengePreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengePreferencesQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *   },
 * });
 */
export function useChallengePreferencesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengePreferencesQuery,
    SchemaTypes.ChallengePreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengePreferencesQuery, SchemaTypes.ChallengePreferencesQueryVariables>(
    ChallengePreferencesDocument,
    options
  );
}

export function useChallengePreferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengePreferencesQuery,
    SchemaTypes.ChallengePreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengePreferencesQuery, SchemaTypes.ChallengePreferencesQueryVariables>(
    ChallengePreferencesDocument,
    options
  );
}

export type ChallengePreferencesQueryHookResult = ReturnType<typeof useChallengePreferencesQuery>;
export type ChallengePreferencesLazyQueryHookResult = ReturnType<typeof useChallengePreferencesLazyQuery>;
export type ChallengePreferencesQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengePreferencesQuery,
  SchemaTypes.ChallengePreferencesQueryVariables
>;
export function refetchChallengePreferencesQuery(variables: SchemaTypes.ChallengePreferencesQueryVariables) {
  return { query: ChallengePreferencesDocument, variables: variables };
}

export const UpdatePreferenceOnChallengeDocument = gql`
  mutation updatePreferenceOnChallenge($preferenceData: UpdateChallengePreferenceInput!) {
    updatePreferenceOnChallenge(preferenceData: $preferenceData) {
      id
      value
    }
  }
`;
export type UpdatePreferenceOnChallengeMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdatePreferenceOnChallengeMutation,
  SchemaTypes.UpdatePreferenceOnChallengeMutationVariables
>;

/**
 * __useUpdatePreferenceOnChallengeMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceOnChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceOnChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceOnChallengeMutation, { data, loading, error }] = useUpdatePreferenceOnChallengeMutation({
 *   variables: {
 *      preferenceData: // value for 'preferenceData'
 *   },
 * });
 */
export function useUpdatePreferenceOnChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdatePreferenceOnChallengeMutation,
    SchemaTypes.UpdatePreferenceOnChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdatePreferenceOnChallengeMutation,
    SchemaTypes.UpdatePreferenceOnChallengeMutationVariables
  >(UpdatePreferenceOnChallengeDocument, options);
}

export type UpdatePreferenceOnChallengeMutationHookResult = ReturnType<typeof useUpdatePreferenceOnChallengeMutation>;
export type UpdatePreferenceOnChallengeMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdatePreferenceOnChallengeMutation>;
export type UpdatePreferenceOnChallengeMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdatePreferenceOnChallengeMutation,
  SchemaTypes.UpdatePreferenceOnChallengeMutationVariables
>;
export const OrganizationPreferencesDocument = gql`
  query organizationPreferences($orgId: UUID_NAMEID!) {
    organization(ID: $orgId) {
      id
      preferences {
        id
        value
        definition {
          id
          description
          displayName
          group
          type
          valueType
        }
      }
    }
  }
`;

/**
 * __useOrganizationPreferencesQuery__
 *
 * To run a query within a React component, call `useOrganizationPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationPreferencesQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useOrganizationPreferencesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OrganizationPreferencesQuery,
    SchemaTypes.OrganizationPreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationPreferencesQuery, SchemaTypes.OrganizationPreferencesQueryVariables>(
    OrganizationPreferencesDocument,
    options
  );
}

export function useOrganizationPreferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationPreferencesQuery,
    SchemaTypes.OrganizationPreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OrganizationPreferencesQuery,
    SchemaTypes.OrganizationPreferencesQueryVariables
  >(OrganizationPreferencesDocument, options);
}

export type OrganizationPreferencesQueryHookResult = ReturnType<typeof useOrganizationPreferencesQuery>;
export type OrganizationPreferencesLazyQueryHookResult = ReturnType<typeof useOrganizationPreferencesLazyQuery>;
export type OrganizationPreferencesQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationPreferencesQuery,
  SchemaTypes.OrganizationPreferencesQueryVariables
>;
export function refetchOrganizationPreferencesQuery(variables: SchemaTypes.OrganizationPreferencesQueryVariables) {
  return { query: OrganizationPreferencesDocument, variables: variables };
}

export const UpdatePreferenceOnOrganizationDocument = gql`
  mutation updatePreferenceOnOrganization($preferenceData: UpdateOrganizationPreferenceInput!) {
    updatePreferenceOnOrganization(preferenceData: $preferenceData) {
      id
      value
    }
  }
`;
export type UpdatePreferenceOnOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdatePreferenceOnOrganizationMutation,
  SchemaTypes.UpdatePreferenceOnOrganizationMutationVariables
>;

/**
 * __useUpdatePreferenceOnOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceOnOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceOnOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceOnOrganizationMutation, { data, loading, error }] = useUpdatePreferenceOnOrganizationMutation({
 *   variables: {
 *      preferenceData: // value for 'preferenceData'
 *   },
 * });
 */
export function useUpdatePreferenceOnOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdatePreferenceOnOrganizationMutation,
    SchemaTypes.UpdatePreferenceOnOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdatePreferenceOnOrganizationMutation,
    SchemaTypes.UpdatePreferenceOnOrganizationMutationVariables
  >(UpdatePreferenceOnOrganizationDocument, options);
}

export type UpdatePreferenceOnOrganizationMutationHookResult = ReturnType<
  typeof useUpdatePreferenceOnOrganizationMutation
>;
export type UpdatePreferenceOnOrganizationMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdatePreferenceOnOrganizationMutation>;
export type UpdatePreferenceOnOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdatePreferenceOnOrganizationMutation,
  SchemaTypes.UpdatePreferenceOnOrganizationMutationVariables
>;
export const SpacePreferencesDocument = gql`
  query spacePreferences($spaceNameId: UUID_NAMEID!) {
    space(ID: $spaceNameId) {
      id
      preferences {
        id
        value
        definition {
          id
          description
          displayName
          group
          type
          valueType
        }
      }
    }
  }
`;

/**
 * __useSpacePreferencesQuery__
 *
 * To run a query within a React component, call `useSpacePreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacePreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacePreferencesQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *   },
 * });
 */
export function useSpacePreferencesQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpacePreferencesQuery, SchemaTypes.SpacePreferencesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpacePreferencesQuery, SchemaTypes.SpacePreferencesQueryVariables>(
    SpacePreferencesDocument,
    options
  );
}

export function useSpacePreferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpacePreferencesQuery,
    SchemaTypes.SpacePreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpacePreferencesQuery, SchemaTypes.SpacePreferencesQueryVariables>(
    SpacePreferencesDocument,
    options
  );
}

export type SpacePreferencesQueryHookResult = ReturnType<typeof useSpacePreferencesQuery>;
export type SpacePreferencesLazyQueryHookResult = ReturnType<typeof useSpacePreferencesLazyQuery>;
export type SpacePreferencesQueryResult = Apollo.QueryResult<
  SchemaTypes.SpacePreferencesQuery,
  SchemaTypes.SpacePreferencesQueryVariables
>;
export function refetchSpacePreferencesQuery(variables: SchemaTypes.SpacePreferencesQueryVariables) {
  return { query: SpacePreferencesDocument, variables: variables };
}

export const UpdatePreferenceOnSpaceDocument = gql`
  mutation updatePreferenceOnSpace($preferenceData: UpdateSpacePreferenceInput!) {
    updatePreferenceOnSpace(preferenceData: $preferenceData) {
      id
      value
    }
  }
`;
export type UpdatePreferenceOnSpaceMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdatePreferenceOnSpaceMutation,
  SchemaTypes.UpdatePreferenceOnSpaceMutationVariables
>;

/**
 * __useUpdatePreferenceOnSpaceMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceOnSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceOnSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceOnSpaceMutation, { data, loading, error }] = useUpdatePreferenceOnSpaceMutation({
 *   variables: {
 *      preferenceData: // value for 'preferenceData'
 *   },
 * });
 */
export function useUpdatePreferenceOnSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdatePreferenceOnSpaceMutation,
    SchemaTypes.UpdatePreferenceOnSpaceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdatePreferenceOnSpaceMutation,
    SchemaTypes.UpdatePreferenceOnSpaceMutationVariables
  >(UpdatePreferenceOnSpaceDocument, options);
}

export type UpdatePreferenceOnSpaceMutationHookResult = ReturnType<typeof useUpdatePreferenceOnSpaceMutation>;
export type UpdatePreferenceOnSpaceMutationResult = Apollo.MutationResult<SchemaTypes.UpdatePreferenceOnSpaceMutation>;
export type UpdatePreferenceOnSpaceMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdatePreferenceOnSpaceMutation,
  SchemaTypes.UpdatePreferenceOnSpaceMutationVariables
>;
export const CreateReferenceOnProfileDocument = gql`
  mutation createReferenceOnProfile($input: CreateReferenceOnProfileInput!) {
    createReferenceOnProfile(referenceInput: $input) {
      ...ReferenceDetails
    }
  }
  ${ReferenceDetailsFragmentDoc}
`;
export type CreateReferenceOnProfileMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateReferenceOnProfileMutation,
  SchemaTypes.CreateReferenceOnProfileMutationVariables
>;

/**
 * __useCreateReferenceOnProfileMutation__
 *
 * To run a mutation, you first call `useCreateReferenceOnProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReferenceOnProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReferenceOnProfileMutation, { data, loading, error }] = useCreateReferenceOnProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReferenceOnProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateReferenceOnProfileMutation,
    SchemaTypes.CreateReferenceOnProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateReferenceOnProfileMutation,
    SchemaTypes.CreateReferenceOnProfileMutationVariables
  >(CreateReferenceOnProfileDocument, options);
}

export type CreateReferenceOnProfileMutationHookResult = ReturnType<typeof useCreateReferenceOnProfileMutation>;
export type CreateReferenceOnProfileMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateReferenceOnProfileMutation>;
export type CreateReferenceOnProfileMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateReferenceOnProfileMutation,
  SchemaTypes.CreateReferenceOnProfileMutationVariables
>;
export const DeleteReferenceDocument = gql`
  mutation deleteReference($input: DeleteReferenceInput!) {
    deleteReference(deleteData: $input) {
      id
    }
  }
`;
export type DeleteReferenceMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteReferenceMutation,
  SchemaTypes.DeleteReferenceMutationVariables
>;

/**
 * __useDeleteReferenceMutation__
 *
 * To run a mutation, you first call `useDeleteReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReferenceMutation, { data, loading, error }] = useDeleteReferenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteReferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteReferenceMutation,
    SchemaTypes.DeleteReferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteReferenceMutation, SchemaTypes.DeleteReferenceMutationVariables>(
    DeleteReferenceDocument,
    options
  );
}

export type DeleteReferenceMutationHookResult = ReturnType<typeof useDeleteReferenceMutation>;
export type DeleteReferenceMutationResult = Apollo.MutationResult<SchemaTypes.DeleteReferenceMutation>;
export type DeleteReferenceMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteReferenceMutation,
  SchemaTypes.DeleteReferenceMutationVariables
>;
export const CreateTagsetOnProfileDocument = gql`
  mutation createTagsetOnProfile($input: CreateTagsetOnProfileInput!) {
    createTagsetOnProfile(tagsetData: $input) {
      ...TagsetDetails
    }
  }
  ${TagsetDetailsFragmentDoc}
`;
export type CreateTagsetOnProfileMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateTagsetOnProfileMutation,
  SchemaTypes.CreateTagsetOnProfileMutationVariables
>;

/**
 * __useCreateTagsetOnProfileMutation__
 *
 * To run a mutation, you first call `useCreateTagsetOnProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagsetOnProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagsetOnProfileMutation, { data, loading, error }] = useCreateTagsetOnProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagsetOnProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateTagsetOnProfileMutation,
    SchemaTypes.CreateTagsetOnProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateTagsetOnProfileMutation,
    SchemaTypes.CreateTagsetOnProfileMutationVariables
  >(CreateTagsetOnProfileDocument, options);
}

export type CreateTagsetOnProfileMutationHookResult = ReturnType<typeof useCreateTagsetOnProfileMutation>;
export type CreateTagsetOnProfileMutationResult = Apollo.MutationResult<SchemaTypes.CreateTagsetOnProfileMutation>;
export type CreateTagsetOnProfileMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateTagsetOnProfileMutation,
  SchemaTypes.CreateTagsetOnProfileMutationVariables
>;
export const UploadVisualDocument = gql`
  mutation uploadVisual($file: Upload!, $uploadData: VisualUploadImageInput!) {
    uploadImageOnVisual(file: $file, uploadData: $uploadData) {
      id
      uri
      alternativeText
    }
  }
`;
export type UploadVisualMutationFn = Apollo.MutationFunction<
  SchemaTypes.UploadVisualMutation,
  SchemaTypes.UploadVisualMutationVariables
>;

/**
 * __useUploadVisualMutation__
 *
 * To run a mutation, you first call `useUploadVisualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadVisualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadVisualMutation, { data, loading, error }] = useUploadVisualMutation({
 *   variables: {
 *      file: // value for 'file'
 *      uploadData: // value for 'uploadData'
 *   },
 * });
 */
export function useUploadVisualMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.UploadVisualMutation, SchemaTypes.UploadVisualMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UploadVisualMutation, SchemaTypes.UploadVisualMutationVariables>(
    UploadVisualDocument,
    options
  );
}

export type UploadVisualMutationHookResult = ReturnType<typeof useUploadVisualMutation>;
export type UploadVisualMutationResult = Apollo.MutationResult<SchemaTypes.UploadVisualMutation>;
export type UploadVisualMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UploadVisualMutation,
  SchemaTypes.UploadVisualMutationVariables
>;
export const AuthorDetailsDocument = gql`
  query authorDetails($ids: [UUID!]!) {
    users(IDs: $ids) {
      ...UserCard
      firstName
      lastName
    }
  }
  ${UserCardFragmentDoc}
`;

/**
 * __useAuthorDetailsQuery__
 *
 * To run a query within a React component, call `useAuthorDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorDetailsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAuthorDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.AuthorDetailsQuery, SchemaTypes.AuthorDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AuthorDetailsQuery, SchemaTypes.AuthorDetailsQueryVariables>(
    AuthorDetailsDocument,
    options
  );
}

export function useAuthorDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.AuthorDetailsQuery, SchemaTypes.AuthorDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AuthorDetailsQuery, SchemaTypes.AuthorDetailsQueryVariables>(
    AuthorDetailsDocument,
    options
  );
}

export type AuthorDetailsQueryHookResult = ReturnType<typeof useAuthorDetailsQuery>;
export type AuthorDetailsLazyQueryHookResult = ReturnType<typeof useAuthorDetailsLazyQuery>;
export type AuthorDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.AuthorDetailsQuery,
  SchemaTypes.AuthorDetailsQueryVariables
>;
export function refetchAuthorDetailsQuery(variables: SchemaTypes.AuthorDetailsQueryVariables) {
  return { query: AuthorDetailsDocument, variables: variables };
}

export const CreateDiscussionDocument = gql`
  mutation createDiscussion($input: CommunicationCreateDiscussionInput!) {
    createDiscussion(createData: $input) {
      ...DiscussionDetails
    }
  }
  ${DiscussionDetailsFragmentDoc}
`;
export type CreateDiscussionMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateDiscussionMutation,
  SchemaTypes.CreateDiscussionMutationVariables
>;

/**
 * __useCreateDiscussionMutation__
 *
 * To run a mutation, you first call `useCreateDiscussionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiscussionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiscussionMutation, { data, loading, error }] = useCreateDiscussionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiscussionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateDiscussionMutation,
    SchemaTypes.CreateDiscussionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateDiscussionMutation, SchemaTypes.CreateDiscussionMutationVariables>(
    CreateDiscussionDocument,
    options
  );
}

export type CreateDiscussionMutationHookResult = ReturnType<typeof useCreateDiscussionMutation>;
export type CreateDiscussionMutationResult = Apollo.MutationResult<SchemaTypes.CreateDiscussionMutation>;
export type CreateDiscussionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateDiscussionMutation,
  SchemaTypes.CreateDiscussionMutationVariables
>;
export const DeleteDiscussionDocument = gql`
  mutation deleteDiscussion($deleteData: DeleteDiscussionInput!) {
    deleteDiscussion(deleteData: $deleteData) {
      id
    }
  }
`;
export type DeleteDiscussionMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteDiscussionMutation,
  SchemaTypes.DeleteDiscussionMutationVariables
>;

/**
 * __useDeleteDiscussionMutation__
 *
 * To run a mutation, you first call `useDeleteDiscussionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDiscussionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDiscussionMutation, { data, loading, error }] = useDeleteDiscussionMutation({
 *   variables: {
 *      deleteData: // value for 'deleteData'
 *   },
 * });
 */
export function useDeleteDiscussionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteDiscussionMutation,
    SchemaTypes.DeleteDiscussionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteDiscussionMutation, SchemaTypes.DeleteDiscussionMutationVariables>(
    DeleteDiscussionDocument,
    options
  );
}

export type DeleteDiscussionMutationHookResult = ReturnType<typeof useDeleteDiscussionMutation>;
export type DeleteDiscussionMutationResult = Apollo.MutationResult<SchemaTypes.DeleteDiscussionMutation>;
export type DeleteDiscussionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteDiscussionMutation,
  SchemaTypes.DeleteDiscussionMutationVariables
>;
export const PlatformDiscussionsDocument = gql`
  query platformDiscussions {
    platform {
      id
      communication {
        id
        discussionCategories
        authorization {
          id
          myPrivileges
          anonymousReadAccess
        }
        discussions {
          id
          nameID
          profile {
            id
            displayName
            description
            tagline
            visual(type: AVATAR) {
              ...VisualFull
            }
          }
          category
          timestamp
          comments {
            id
            messagesCount
            authorization {
              myPrivileges
            }
          }
          createdBy
          authorization {
            id
            myPrivileges
            anonymousReadAccess
          }
        }
      }
    }
  }
  ${VisualFullFragmentDoc}
`;

/**
 * __usePlatformDiscussionsQuery__
 *
 * To run a query within a React component, call `usePlatformDiscussionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformDiscussionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformDiscussionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlatformDiscussionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.PlatformDiscussionsQuery,
    SchemaTypes.PlatformDiscussionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.PlatformDiscussionsQuery, SchemaTypes.PlatformDiscussionsQueryVariables>(
    PlatformDiscussionsDocument,
    options
  );
}

export function usePlatformDiscussionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformDiscussionsQuery,
    SchemaTypes.PlatformDiscussionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.PlatformDiscussionsQuery, SchemaTypes.PlatformDiscussionsQueryVariables>(
    PlatformDiscussionsDocument,
    options
  );
}

export type PlatformDiscussionsQueryHookResult = ReturnType<typeof usePlatformDiscussionsQuery>;
export type PlatformDiscussionsLazyQueryHookResult = ReturnType<typeof usePlatformDiscussionsLazyQuery>;
export type PlatformDiscussionsQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformDiscussionsQuery,
  SchemaTypes.PlatformDiscussionsQueryVariables
>;
export function refetchPlatformDiscussionsQuery(variables?: SchemaTypes.PlatformDiscussionsQueryVariables) {
  return { query: PlatformDiscussionsDocument, variables: variables };
}

export const PlatformDiscussionDocument = gql`
  query platformDiscussion($discussionId: String!) {
    platform {
      id
      communication {
        id
        authorization {
          id
          myPrivileges
          anonymousReadAccess
        }
        discussion(ID: $discussionId) {
          ...DiscussionDetails
        }
      }
    }
  }
  ${DiscussionDetailsFragmentDoc}
`;

/**
 * __usePlatformDiscussionQuery__
 *
 * To run a query within a React component, call `usePlatformDiscussionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformDiscussionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformDiscussionQuery({
 *   variables: {
 *      discussionId: // value for 'discussionId'
 *   },
 * });
 */
export function usePlatformDiscussionQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PlatformDiscussionQuery,
    SchemaTypes.PlatformDiscussionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.PlatformDiscussionQuery, SchemaTypes.PlatformDiscussionQueryVariables>(
    PlatformDiscussionDocument,
    options
  );
}

export function usePlatformDiscussionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformDiscussionQuery,
    SchemaTypes.PlatformDiscussionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.PlatformDiscussionQuery, SchemaTypes.PlatformDiscussionQueryVariables>(
    PlatformDiscussionDocument,
    options
  );
}

export type PlatformDiscussionQueryHookResult = ReturnType<typeof usePlatformDiscussionQuery>;
export type PlatformDiscussionLazyQueryHookResult = ReturnType<typeof usePlatformDiscussionLazyQuery>;
export type PlatformDiscussionQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformDiscussionQuery,
  SchemaTypes.PlatformDiscussionQueryVariables
>;
export function refetchPlatformDiscussionQuery(variables: SchemaTypes.PlatformDiscussionQueryVariables) {
  return { query: PlatformDiscussionDocument, variables: variables };
}

export const CommunicationDiscussionUpdatedDocument = gql`
  subscription communicationDiscussionUpdated($communicationID: UUID!) {
    communicationDiscussionUpdated(communicationID: $communicationID) {
      id
      nameID
      profile {
        id
        displayName
        description
        tagline
        visuals {
          ...VisualFull
        }
      }
      createdBy
      timestamp
      category
      comments {
        id
        messagesCount
      }
    }
  }
  ${VisualFullFragmentDoc}
`;

/**
 * __useCommunicationDiscussionUpdatedSubscription__
 *
 * To run a query within a React component, call `useCommunicationDiscussionUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommunicationDiscussionUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunicationDiscussionUpdatedSubscription({
 *   variables: {
 *      communicationID: // value for 'communicationID'
 *   },
 * });
 */
export function useCommunicationDiscussionUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.CommunicationDiscussionUpdatedSubscription,
    SchemaTypes.CommunicationDiscussionUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.CommunicationDiscussionUpdatedSubscription,
    SchemaTypes.CommunicationDiscussionUpdatedSubscriptionVariables
  >(CommunicationDiscussionUpdatedDocument, options);
}

export type CommunicationDiscussionUpdatedSubscriptionHookResult = ReturnType<
  typeof useCommunicationDiscussionUpdatedSubscription
>;
export type CommunicationDiscussionUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<SchemaTypes.CommunicationDiscussionUpdatedSubscription>;
export const SendMessageToUserDocument = gql`
  mutation sendMessageToUser($messageData: CommunicationSendMessageToUserInput!) {
    sendMessageToUser(messageData: $messageData)
  }
`;
export type SendMessageToUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.SendMessageToUserMutation,
  SchemaTypes.SendMessageToUserMutationVariables
>;

/**
 * __useSendMessageToUserMutation__
 *
 * To run a mutation, you first call `useSendMessageToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageToUserMutation, { data, loading, error }] = useSendMessageToUserMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useSendMessageToUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.SendMessageToUserMutation,
    SchemaTypes.SendMessageToUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.SendMessageToUserMutation, SchemaTypes.SendMessageToUserMutationVariables>(
    SendMessageToUserDocument,
    options
  );
}

export type SendMessageToUserMutationHookResult = ReturnType<typeof useSendMessageToUserMutation>;
export type SendMessageToUserMutationResult = Apollo.MutationResult<SchemaTypes.SendMessageToUserMutation>;
export type SendMessageToUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.SendMessageToUserMutation,
  SchemaTypes.SendMessageToUserMutationVariables
>;
export const SendMessageToOrganizationDocument = gql`
  mutation sendMessageToOrganization($messageData: CommunicationSendMessageToOrganizationInput!) {
    sendMessageToOrganization(messageData: $messageData)
  }
`;
export type SendMessageToOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.SendMessageToOrganizationMutation,
  SchemaTypes.SendMessageToOrganizationMutationVariables
>;

/**
 * __useSendMessageToOrganizationMutation__
 *
 * To run a mutation, you first call `useSendMessageToOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageToOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageToOrganizationMutation, { data, loading, error }] = useSendMessageToOrganizationMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useSendMessageToOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.SendMessageToOrganizationMutation,
    SchemaTypes.SendMessageToOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.SendMessageToOrganizationMutation,
    SchemaTypes.SendMessageToOrganizationMutationVariables
  >(SendMessageToOrganizationDocument, options);
}

export type SendMessageToOrganizationMutationHookResult = ReturnType<typeof useSendMessageToOrganizationMutation>;
export type SendMessageToOrganizationMutationResult =
  Apollo.MutationResult<SchemaTypes.SendMessageToOrganizationMutation>;
export type SendMessageToOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.SendMessageToOrganizationMutation,
  SchemaTypes.SendMessageToOrganizationMutationVariables
>;
export const SendMessageToCommunityLeadsDocument = gql`
  mutation sendMessageToCommunityLeads($messageData: CommunicationSendMessageToCommunityLeadsInput!) {
    sendMessageToCommunityLeads(messageData: $messageData)
  }
`;
export type SendMessageToCommunityLeadsMutationFn = Apollo.MutationFunction<
  SchemaTypes.SendMessageToCommunityLeadsMutation,
  SchemaTypes.SendMessageToCommunityLeadsMutationVariables
>;

/**
 * __useSendMessageToCommunityLeadsMutation__
 *
 * To run a mutation, you first call `useSendMessageToCommunityLeadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageToCommunityLeadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageToCommunityLeadsMutation, { data, loading, error }] = useSendMessageToCommunityLeadsMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useSendMessageToCommunityLeadsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.SendMessageToCommunityLeadsMutation,
    SchemaTypes.SendMessageToCommunityLeadsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.SendMessageToCommunityLeadsMutation,
    SchemaTypes.SendMessageToCommunityLeadsMutationVariables
  >(SendMessageToCommunityLeadsDocument, options);
}

export type SendMessageToCommunityLeadsMutationHookResult = ReturnType<typeof useSendMessageToCommunityLeadsMutation>;
export type SendMessageToCommunityLeadsMutationResult =
  Apollo.MutationResult<SchemaTypes.SendMessageToCommunityLeadsMutation>;
export type SendMessageToCommunityLeadsMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.SendMessageToCommunityLeadsMutation,
  SchemaTypes.SendMessageToCommunityLeadsMutationVariables
>;
export const AddReactionDocument = gql`
  mutation AddReaction($roomId: UUID!, $messageId: MessageID!, $emoji: Emoji!) {
    addReactionToMessageInRoom(reactionData: { emoji: $emoji, messageID: $messageId, roomID: $roomId }) {
      id
      emoji
      sender {
        id
        firstName
        lastName
      }
    }
  }
`;
export type AddReactionMutationFn = Apollo.MutationFunction<
  SchemaTypes.AddReactionMutation,
  SchemaTypes.AddReactionMutationVariables
>;

/**
 * __useAddReactionMutation__
 *
 * To run a mutation, you first call `useAddReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReactionMutation, { data, loading, error }] = useAddReactionMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      messageId: // value for 'messageId'
 *      emoji: // value for 'emoji'
 *   },
 * });
 */
export function useAddReactionMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.AddReactionMutation, SchemaTypes.AddReactionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.AddReactionMutation, SchemaTypes.AddReactionMutationVariables>(
    AddReactionDocument,
    options
  );
}

export type AddReactionMutationHookResult = ReturnType<typeof useAddReactionMutation>;
export type AddReactionMutationResult = Apollo.MutationResult<SchemaTypes.AddReactionMutation>;
export type AddReactionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AddReactionMutation,
  SchemaTypes.AddReactionMutationVariables
>;
export const RemoveReactionDocument = gql`
  mutation RemoveReaction($roomId: UUID!, $reactionId: MessageID!) {
    removeReactionToMessageInRoom(reactionData: { reactionID: $reactionId, roomID: $roomId })
  }
`;
export type RemoveReactionMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveReactionMutation,
  SchemaTypes.RemoveReactionMutationVariables
>;

/**
 * __useRemoveReactionMutation__
 *
 * To run a mutation, you first call `useRemoveReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReactionMutation, { data, loading, error }] = useRemoveReactionMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      reactionId: // value for 'reactionId'
 *   },
 * });
 */
export function useRemoveReactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveReactionMutation,
    SchemaTypes.RemoveReactionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.RemoveReactionMutation, SchemaTypes.RemoveReactionMutationVariables>(
    RemoveReactionDocument,
    options
  );
}

export type RemoveReactionMutationHookResult = ReturnType<typeof useRemoveReactionMutation>;
export type RemoveReactionMutationResult = Apollo.MutationResult<SchemaTypes.RemoveReactionMutation>;
export type RemoveReactionMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveReactionMutation,
  SchemaTypes.RemoveReactionMutationVariables
>;
export const ReplyToMessageDocument = gql`
  mutation ReplyToMessage($roomId: UUID!, $message: String!, $threadId: MessageID!) {
    sendMessageReplyToRoom(messageData: { roomID: $roomId, threadID: $threadId, message: $message }) {
      id
      message
      sender {
        id
      }
      timestamp
    }
  }
`;
export type ReplyToMessageMutationFn = Apollo.MutationFunction<
  SchemaTypes.ReplyToMessageMutation,
  SchemaTypes.ReplyToMessageMutationVariables
>;

/**
 * __useReplyToMessageMutation__
 *
 * To run a mutation, you first call `useReplyToMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyToMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyToMessageMutation, { data, loading, error }] = useReplyToMessageMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      message: // value for 'message'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useReplyToMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.ReplyToMessageMutation,
    SchemaTypes.ReplyToMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.ReplyToMessageMutation, SchemaTypes.ReplyToMessageMutationVariables>(
    ReplyToMessageDocument,
    options
  );
}

export type ReplyToMessageMutationHookResult = ReturnType<typeof useReplyToMessageMutation>;
export type ReplyToMessageMutationResult = Apollo.MutationResult<SchemaTypes.ReplyToMessageMutation>;
export type ReplyToMessageMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.ReplyToMessageMutation,
  SchemaTypes.ReplyToMessageMutationVariables
>;
export const MentionableUsersDocument = gql`
  query MentionableUsers($filter: UserFilterInput, $first: Int) {
    usersPaginated(filter: $filter, first: $first) {
      users {
        id
        nameID
        profile {
          id
          displayName
          location {
            id
            city
            country
          }
          visual(type: AVATAR) {
            ...VisualUri
          }
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
`;

/**
 * __useMentionableUsersQuery__
 *
 * To run a query within a React component, call `useMentionableUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentionableUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentionableUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useMentionableUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.MentionableUsersQuery, SchemaTypes.MentionableUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.MentionableUsersQuery, SchemaTypes.MentionableUsersQueryVariables>(
    MentionableUsersDocument,
    options
  );
}

export function useMentionableUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.MentionableUsersQuery,
    SchemaTypes.MentionableUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.MentionableUsersQuery, SchemaTypes.MentionableUsersQueryVariables>(
    MentionableUsersDocument,
    options
  );
}

export type MentionableUsersQueryHookResult = ReturnType<typeof useMentionableUsersQuery>;
export type MentionableUsersLazyQueryHookResult = ReturnType<typeof useMentionableUsersLazyQuery>;
export type MentionableUsersQueryResult = Apollo.QueryResult<
  SchemaTypes.MentionableUsersQuery,
  SchemaTypes.MentionableUsersQueryVariables
>;
export function refetchMentionableUsersQuery(variables?: SchemaTypes.MentionableUsersQueryVariables) {
  return { query: MentionableUsersDocument, variables: variables };
}

export const SendMessageToRoomDocument = gql`
  mutation sendMessageToRoom($messageData: RoomSendMessageInput!) {
    sendMessageToRoom(messageData: $messageData) {
      id
      message
      sender {
        id
      }
      timestamp
    }
  }
`;
export type SendMessageToRoomMutationFn = Apollo.MutationFunction<
  SchemaTypes.SendMessageToRoomMutation,
  SchemaTypes.SendMessageToRoomMutationVariables
>;

/**
 * __useSendMessageToRoomMutation__
 *
 * To run a mutation, you first call `useSendMessageToRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageToRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageToRoomMutation, { data, loading, error }] = useSendMessageToRoomMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useSendMessageToRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.SendMessageToRoomMutation,
    SchemaTypes.SendMessageToRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.SendMessageToRoomMutation, SchemaTypes.SendMessageToRoomMutationVariables>(
    SendMessageToRoomDocument,
    options
  );
}

export type SendMessageToRoomMutationHookResult = ReturnType<typeof useSendMessageToRoomMutation>;
export type SendMessageToRoomMutationResult = Apollo.MutationResult<SchemaTypes.SendMessageToRoomMutation>;
export type SendMessageToRoomMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.SendMessageToRoomMutation,
  SchemaTypes.SendMessageToRoomMutationVariables
>;
export const RemoveMessageOnRoomDocument = gql`
  mutation removeMessageOnRoom($messageData: RoomRemoveMessageInput!) {
    removeMessageOnRoom(messageData: $messageData)
  }
`;
export type RemoveMessageOnRoomMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveMessageOnRoomMutation,
  SchemaTypes.RemoveMessageOnRoomMutationVariables
>;

/**
 * __useRemoveMessageOnRoomMutation__
 *
 * To run a mutation, you first call `useRemoveMessageOnRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMessageOnRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMessageOnRoomMutation, { data, loading, error }] = useRemoveMessageOnRoomMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useRemoveMessageOnRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveMessageOnRoomMutation,
    SchemaTypes.RemoveMessageOnRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.RemoveMessageOnRoomMutation, SchemaTypes.RemoveMessageOnRoomMutationVariables>(
    RemoveMessageOnRoomDocument,
    options
  );
}

export type RemoveMessageOnRoomMutationHookResult = ReturnType<typeof useRemoveMessageOnRoomMutation>;
export type RemoveMessageOnRoomMutationResult = Apollo.MutationResult<SchemaTypes.RemoveMessageOnRoomMutation>;
export type RemoveMessageOnRoomMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveMessageOnRoomMutation,
  SchemaTypes.RemoveMessageOnRoomMutationVariables
>;
export const RoomEventsDocument = gql`
  subscription roomEvents($roomID: UUID!) {
    roomEvents(roomID: $roomID) {
      roomID
      message {
        type
        data {
          ...MessageDetails
        }
      }
      reaction {
        type
        messageID
        data {
          ...ReactionDetails
        }
      }
    }
  }
  ${MessageDetailsFragmentDoc}
  ${ReactionDetailsFragmentDoc}
`;

/**
 * __useRoomEventsSubscription__
 *
 * To run a query within a React component, call `useRoomEventsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomEventsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomEventsSubscription({
 *   variables: {
 *      roomID: // value for 'roomID'
 *   },
 * });
 */
export function useRoomEventsSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.RoomEventsSubscription,
    SchemaTypes.RoomEventsSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<SchemaTypes.RoomEventsSubscription, SchemaTypes.RoomEventsSubscriptionVariables>(
    RoomEventsDocument,
    options
  );
}

export type RoomEventsSubscriptionHookResult = ReturnType<typeof useRoomEventsSubscription>;
export type RoomEventsSubscriptionResult = Apollo.SubscriptionResult<SchemaTypes.RoomEventsSubscription>;
export const CommunityUpdatesDocument = gql`
  query communityUpdates($communityId: UUID!) {
    lookup {
      community(ID: $communityId) {
        id
        communication {
          id
          updates {
            id
            messages {
              id
              ...MessageDetails
            }
            messagesCount
          }
        }
      }
    }
  }
  ${MessageDetailsFragmentDoc}
`;

/**
 * __useCommunityUpdatesQuery__
 *
 * To run a query within a React component, call `useCommunityUpdatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityUpdatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityUpdatesQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCommunityUpdatesQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.CommunityUpdatesQuery, SchemaTypes.CommunityUpdatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CommunityUpdatesQuery, SchemaTypes.CommunityUpdatesQueryVariables>(
    CommunityUpdatesDocument,
    options
  );
}

export function useCommunityUpdatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityUpdatesQuery,
    SchemaTypes.CommunityUpdatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CommunityUpdatesQuery, SchemaTypes.CommunityUpdatesQueryVariables>(
    CommunityUpdatesDocument,
    options
  );
}

export type CommunityUpdatesQueryHookResult = ReturnType<typeof useCommunityUpdatesQuery>;
export type CommunityUpdatesLazyQueryHookResult = ReturnType<typeof useCommunityUpdatesLazyQuery>;
export type CommunityUpdatesQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityUpdatesQuery,
  SchemaTypes.CommunityUpdatesQueryVariables
>;
export function refetchCommunityUpdatesQuery(variables: SchemaTypes.CommunityUpdatesQueryVariables) {
  return { query: CommunityUpdatesDocument, variables: variables };
}

export const PlatformUpdatesRoomDocument = gql`
  query platformUpdatesRoom {
    platform {
      id
      communication {
        id
        updates {
          id
        }
      }
    }
  }
`;

/**
 * __usePlatformUpdatesRoomQuery__
 *
 * To run a query within a React component, call `usePlatformUpdatesRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformUpdatesRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformUpdatesRoomQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlatformUpdatesRoomQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.PlatformUpdatesRoomQuery,
    SchemaTypes.PlatformUpdatesRoomQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.PlatformUpdatesRoomQuery, SchemaTypes.PlatformUpdatesRoomQueryVariables>(
    PlatformUpdatesRoomDocument,
    options
  );
}

export function usePlatformUpdatesRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformUpdatesRoomQuery,
    SchemaTypes.PlatformUpdatesRoomQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.PlatformUpdatesRoomQuery, SchemaTypes.PlatformUpdatesRoomQueryVariables>(
    PlatformUpdatesRoomDocument,
    options
  );
}

export type PlatformUpdatesRoomQueryHookResult = ReturnType<typeof usePlatformUpdatesRoomQuery>;
export type PlatformUpdatesRoomLazyQueryHookResult = ReturnType<typeof usePlatformUpdatesRoomLazyQuery>;
export type PlatformUpdatesRoomQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformUpdatesRoomQuery,
  SchemaTypes.PlatformUpdatesRoomQueryVariables
>;
export function refetchPlatformUpdatesRoomQuery(variables?: SchemaTypes.PlatformUpdatesRoomQueryVariables) {
  return { query: PlatformUpdatesRoomDocument, variables: variables };
}

export const CommunityUserPrivilegesDocument = gql`
  query communityUserPrivileges($spaceNameId: UUID_NAMEID!, $communityId: UUID!) {
    space(ID: $spaceNameId) {
      id
      spaceCommunity: community {
        id
        myMembershipStatus
        authorization {
          id
          myPrivileges
        }
      }
      applicationCommunity: community(ID: $communityId) {
        id
        authorization {
          id
          myPrivileges
        }
      }
    }
  }
`;

/**
 * __useCommunityUserPrivilegesQuery__
 *
 * To run a query within a React component, call `useCommunityUserPrivilegesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityUserPrivilegesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityUserPrivilegesQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCommunityUserPrivilegesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CommunityUserPrivilegesQuery,
    SchemaTypes.CommunityUserPrivilegesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CommunityUserPrivilegesQuery, SchemaTypes.CommunityUserPrivilegesQueryVariables>(
    CommunityUserPrivilegesDocument,
    options
  );
}

export function useCommunityUserPrivilegesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityUserPrivilegesQuery,
    SchemaTypes.CommunityUserPrivilegesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CommunityUserPrivilegesQuery,
    SchemaTypes.CommunityUserPrivilegesQueryVariables
  >(CommunityUserPrivilegesDocument, options);
}

export type CommunityUserPrivilegesQueryHookResult = ReturnType<typeof useCommunityUserPrivilegesQuery>;
export type CommunityUserPrivilegesLazyQueryHookResult = ReturnType<typeof useCommunityUserPrivilegesLazyQuery>;
export type CommunityUserPrivilegesQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityUserPrivilegesQuery,
  SchemaTypes.CommunityUserPrivilegesQueryVariables
>;
export function refetchCommunityUserPrivilegesQuery(variables: SchemaTypes.CommunityUserPrivilegesQueryVariables) {
  return { query: CommunityUserPrivilegesDocument, variables: variables };
}

export const JoinCommunityDocument = gql`
  mutation joinCommunity($joiningData: CommunityJoinInput!) {
    joinCommunity(joinCommunityData: $joiningData) {
      id
    }
  }
`;
export type JoinCommunityMutationFn = Apollo.MutationFunction<
  SchemaTypes.JoinCommunityMutation,
  SchemaTypes.JoinCommunityMutationVariables
>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      joiningData: // value for 'joiningData'
 *   },
 * });
 */
export function useJoinCommunityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.JoinCommunityMutation,
    SchemaTypes.JoinCommunityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.JoinCommunityMutation, SchemaTypes.JoinCommunityMutationVariables>(
    JoinCommunityDocument,
    options
  );
}

export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<SchemaTypes.JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.JoinCommunityMutation,
  SchemaTypes.JoinCommunityMutationVariables
>;
export const ApplyForCommunityMembershipDocument = gql`
  mutation applyForCommunityMembership($input: CommunityApplyInput!) {
    applyForCommunityMembership(applicationData: $input) {
      id
    }
  }
`;
export type ApplyForCommunityMembershipMutationFn = Apollo.MutationFunction<
  SchemaTypes.ApplyForCommunityMembershipMutation,
  SchemaTypes.ApplyForCommunityMembershipMutationVariables
>;

/**
 * __useApplyForCommunityMembershipMutation__
 *
 * To run a mutation, you first call `useApplyForCommunityMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyForCommunityMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyForCommunityMembershipMutation, { data, loading, error }] = useApplyForCommunityMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApplyForCommunityMembershipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.ApplyForCommunityMembershipMutation,
    SchemaTypes.ApplyForCommunityMembershipMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.ApplyForCommunityMembershipMutation,
    SchemaTypes.ApplyForCommunityMembershipMutationVariables
  >(ApplyForCommunityMembershipDocument, options);
}

export type ApplyForCommunityMembershipMutationHookResult = ReturnType<typeof useApplyForCommunityMembershipMutation>;
export type ApplyForCommunityMembershipMutationResult =
  Apollo.MutationResult<SchemaTypes.ApplyForCommunityMembershipMutation>;
export type ApplyForCommunityMembershipMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.ApplyForCommunityMembershipMutation,
  SchemaTypes.ApplyForCommunityMembershipMutationVariables
>;
export const EventOnApplicationDocument = gql`
  mutation eventOnApplication($input: ApplicationEventInput!) {
    eventOnApplication(applicationEventData: $input) {
      id
      lifecycle {
        id
        nextEvents
        state
      }
    }
  }
`;
export type EventOnApplicationMutationFn = Apollo.MutationFunction<
  SchemaTypes.EventOnApplicationMutation,
  SchemaTypes.EventOnApplicationMutationVariables
>;

/**
 * __useEventOnApplicationMutation__
 *
 * To run a mutation, you first call `useEventOnApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventOnApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventOnApplicationMutation, { data, loading, error }] = useEventOnApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventOnApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.EventOnApplicationMutation,
    SchemaTypes.EventOnApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.EventOnApplicationMutation, SchemaTypes.EventOnApplicationMutationVariables>(
    EventOnApplicationDocument,
    options
  );
}

export type EventOnApplicationMutationHookResult = ReturnType<typeof useEventOnApplicationMutation>;
export type EventOnApplicationMutationResult = Apollo.MutationResult<SchemaTypes.EventOnApplicationMutation>;
export type EventOnApplicationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.EventOnApplicationMutation,
  SchemaTypes.EventOnApplicationMutationVariables
>;
export const EventOnChallengeDocument = gql`
  mutation eventOnChallenge($input: InnovationFlowEvent!) {
    eventOnChallenge(innovationFlowEventData: $input) {
      id
      lifecycle {
        id
        nextEvents
        state
      }
    }
  }
`;
export type EventOnChallengeMutationFn = Apollo.MutationFunction<
  SchemaTypes.EventOnChallengeMutation,
  SchemaTypes.EventOnChallengeMutationVariables
>;

/**
 * __useEventOnChallengeMutation__
 *
 * To run a mutation, you first call `useEventOnChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventOnChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventOnChallengeMutation, { data, loading, error }] = useEventOnChallengeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventOnChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.EventOnChallengeMutation,
    SchemaTypes.EventOnChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.EventOnChallengeMutation, SchemaTypes.EventOnChallengeMutationVariables>(
    EventOnChallengeDocument,
    options
  );
}

export type EventOnChallengeMutationHookResult = ReturnType<typeof useEventOnChallengeMutation>;
export type EventOnChallengeMutationResult = Apollo.MutationResult<SchemaTypes.EventOnChallengeMutation>;
export type EventOnChallengeMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.EventOnChallengeMutation,
  SchemaTypes.EventOnChallengeMutationVariables
>;
export const ChallengeApplicationDocument = gql`
  query challengeApplication($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        profile {
          id
          displayName
        }
        community {
          id
        }
      }
    }
  }
`;

/**
 * __useChallengeApplicationQuery__
 *
 * To run a query within a React component, call `useChallengeApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeApplicationQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeApplicationQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeApplicationQuery,
    SchemaTypes.ChallengeApplicationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeApplicationQuery, SchemaTypes.ChallengeApplicationQueryVariables>(
    ChallengeApplicationDocument,
    options
  );
}

export function useChallengeApplicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeApplicationQuery,
    SchemaTypes.ChallengeApplicationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeApplicationQuery, SchemaTypes.ChallengeApplicationQueryVariables>(
    ChallengeApplicationDocument,
    options
  );
}

export type ChallengeApplicationQueryHookResult = ReturnType<typeof useChallengeApplicationQuery>;
export type ChallengeApplicationLazyQueryHookResult = ReturnType<typeof useChallengeApplicationLazyQuery>;
export type ChallengeApplicationQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeApplicationQuery,
  SchemaTypes.ChallengeApplicationQueryVariables
>;
export function refetchChallengeApplicationQuery(variables: SchemaTypes.ChallengeApplicationQueryVariables) {
  return { query: ChallengeApplicationDocument, variables: variables };
}

export const SpaceApplicationDocument = gql`
  query spaceApplication($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      profile {
        id
        displayName
      }
      community {
        id
      }
    }
  }
`;

/**
 * __useSpaceApplicationQuery__
 *
 * To run a query within a React component, call `useSpaceApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceApplicationQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceApplicationQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceApplicationQuery, SchemaTypes.SpaceApplicationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceApplicationQuery, SchemaTypes.SpaceApplicationQueryVariables>(
    SpaceApplicationDocument,
    options
  );
}

export function useSpaceApplicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceApplicationQuery,
    SchemaTypes.SpaceApplicationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceApplicationQuery, SchemaTypes.SpaceApplicationQueryVariables>(
    SpaceApplicationDocument,
    options
  );
}

export type SpaceApplicationQueryHookResult = ReturnType<typeof useSpaceApplicationQuery>;
export type SpaceApplicationLazyQueryHookResult = ReturnType<typeof useSpaceApplicationLazyQuery>;
export type SpaceApplicationQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceApplicationQuery,
  SchemaTypes.SpaceApplicationQueryVariables
>;
export function refetchSpaceApplicationQuery(variables: SchemaTypes.SpaceApplicationQueryVariables) {
  return { query: SpaceApplicationDocument, variables: variables };
}

export const CommunityApplicationsInvitationsDocument = gql`
  query CommunityApplicationsInvitations($communityId: UUID!) {
    lookup {
      community(ID: $communityId) {
        id
        applications {
          ...AdminCommunityApplication
        }
        invitations {
          ...AdminCommunityInvitation
        }
        invitationsExternal {
          ...AdminCommunityInvitationExternal
        }
      }
    }
  }
  ${AdminCommunityApplicationFragmentDoc}
  ${AdminCommunityInvitationFragmentDoc}
  ${AdminCommunityInvitationExternalFragmentDoc}
`;

/**
 * __useCommunityApplicationsInvitationsQuery__
 *
 * To run a query within a React component, call `useCommunityApplicationsInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityApplicationsInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityApplicationsInvitationsQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCommunityApplicationsInvitationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CommunityApplicationsInvitationsQuery,
    SchemaTypes.CommunityApplicationsInvitationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.CommunityApplicationsInvitationsQuery,
    SchemaTypes.CommunityApplicationsInvitationsQueryVariables
  >(CommunityApplicationsInvitationsDocument, options);
}

export function useCommunityApplicationsInvitationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityApplicationsInvitationsQuery,
    SchemaTypes.CommunityApplicationsInvitationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CommunityApplicationsInvitationsQuery,
    SchemaTypes.CommunityApplicationsInvitationsQueryVariables
  >(CommunityApplicationsInvitationsDocument, options);
}

export type CommunityApplicationsInvitationsQueryHookResult = ReturnType<
  typeof useCommunityApplicationsInvitationsQuery
>;
export type CommunityApplicationsInvitationsLazyQueryHookResult = ReturnType<
  typeof useCommunityApplicationsInvitationsLazyQuery
>;
export type CommunityApplicationsInvitationsQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityApplicationsInvitationsQuery,
  SchemaTypes.CommunityApplicationsInvitationsQueryVariables
>;
export function refetchCommunityApplicationsInvitationsQuery(
  variables: SchemaTypes.CommunityApplicationsInvitationsQueryVariables
) {
  return { query: CommunityApplicationsInvitationsDocument, variables: variables };
}

export const CommunityApplicationFormDocument = gql`
  query CommunityApplicationForm(
    $spaceId: UUID_NAMEID!
    $challengeId: UUID_NAMEID = "mockid"
    $isSpace: Boolean = false
    $isChallenge: Boolean = false
  ) {
    space(ID: $spaceId) {
      id
      ... on Space @include(if: $isSpace) {
        community {
          id
          applicationForm {
            ...ApplicationForm
          }
        }
      }
      ... on Space @include(if: $isChallenge) {
        challenge(ID: $challengeId) {
          community {
            id
            applicationForm {
              ...ApplicationForm
            }
          }
        }
      }
    }
  }
  ${ApplicationFormFragmentDoc}
`;

/**
 * __useCommunityApplicationFormQuery__
 *
 * To run a query within a React component, call `useCommunityApplicationFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityApplicationFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityApplicationFormQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *      isSpace: // value for 'isSpace'
 *      isChallenge: // value for 'isChallenge'
 *   },
 * });
 */
export function useCommunityApplicationFormQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CommunityApplicationFormQuery,
    SchemaTypes.CommunityApplicationFormQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CommunityApplicationFormQuery, SchemaTypes.CommunityApplicationFormQueryVariables>(
    CommunityApplicationFormDocument,
    options
  );
}

export function useCommunityApplicationFormLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityApplicationFormQuery,
    SchemaTypes.CommunityApplicationFormQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CommunityApplicationFormQuery,
    SchemaTypes.CommunityApplicationFormQueryVariables
  >(CommunityApplicationFormDocument, options);
}

export type CommunityApplicationFormQueryHookResult = ReturnType<typeof useCommunityApplicationFormQuery>;
export type CommunityApplicationFormLazyQueryHookResult = ReturnType<typeof useCommunityApplicationFormLazyQuery>;
export type CommunityApplicationFormQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityApplicationFormQuery,
  SchemaTypes.CommunityApplicationFormQueryVariables
>;
export function refetchCommunityApplicationFormQuery(variables: SchemaTypes.CommunityApplicationFormQueryVariables) {
  return { query: CommunityApplicationFormDocument, variables: variables };
}

export const UpdateCommunityApplicationQuestionsDocument = gql`
  mutation updateCommunityApplicationQuestions($communityId: UUID!, $formData: UpdateFormInput!) {
    updateCommunityApplicationForm(applicationFormData: { communityID: $communityId, formData: $formData }) {
      id
    }
  }
`;
export type UpdateCommunityApplicationQuestionsMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateCommunityApplicationQuestionsMutation,
  SchemaTypes.UpdateCommunityApplicationQuestionsMutationVariables
>;

/**
 * __useUpdateCommunityApplicationQuestionsMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityApplicationQuestionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityApplicationQuestionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityApplicationQuestionsMutation, { data, loading, error }] = useUpdateCommunityApplicationQuestionsMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      formData: // value for 'formData'
 *   },
 * });
 */
export function useUpdateCommunityApplicationQuestionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateCommunityApplicationQuestionsMutation,
    SchemaTypes.UpdateCommunityApplicationQuestionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateCommunityApplicationQuestionsMutation,
    SchemaTypes.UpdateCommunityApplicationQuestionsMutationVariables
  >(UpdateCommunityApplicationQuestionsDocument, options);
}

export type UpdateCommunityApplicationQuestionsMutationHookResult = ReturnType<
  typeof useUpdateCommunityApplicationQuestionsMutation
>;
export type UpdateCommunityApplicationQuestionsMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateCommunityApplicationQuestionsMutation>;
export type UpdateCommunityApplicationQuestionsMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateCommunityApplicationQuestionsMutation,
  SchemaTypes.UpdateCommunityApplicationQuestionsMutationVariables
>;
export const ChallengeCommunityDocument = gql`
  query challengeCommunity($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!, $includeDetails: Boolean = false) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        profile {
          id
          displayName
        }
        community {
          id
          ...CommunityDetails @include(if: $includeDetails)
        }
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
`;

/**
 * __useChallengeCommunityQuery__
 *
 * To run a query within a React component, call `useChallengeCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeCommunityQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *      includeDetails: // value for 'includeDetails'
 *   },
 * });
 */
export function useChallengeCommunityQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeCommunityQuery,
    SchemaTypes.ChallengeCommunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeCommunityQuery, SchemaTypes.ChallengeCommunityQueryVariables>(
    ChallengeCommunityDocument,
    options
  );
}

export function useChallengeCommunityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeCommunityQuery,
    SchemaTypes.ChallengeCommunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeCommunityQuery, SchemaTypes.ChallengeCommunityQueryVariables>(
    ChallengeCommunityDocument,
    options
  );
}

export type ChallengeCommunityQueryHookResult = ReturnType<typeof useChallengeCommunityQuery>;
export type ChallengeCommunityLazyQueryHookResult = ReturnType<typeof useChallengeCommunityLazyQuery>;
export type ChallengeCommunityQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeCommunityQuery,
  SchemaTypes.ChallengeCommunityQueryVariables
>;
export function refetchChallengeCommunityQuery(variables: SchemaTypes.ChallengeCommunityQueryVariables) {
  return { query: ChallengeCommunityDocument, variables: variables };
}

export const OpportunityCommunityDocument = gql`
  query opportunityCommunity($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!, $includeDetails: Boolean = false) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        profile {
          id
          displayName
        }
        community {
          id
          ...CommunityDetails @include(if: $includeDetails)
        }
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
`;

/**
 * __useOpportunityCommunityQuery__
 *
 * To run a query within a React component, call `useOpportunityCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityCommunityQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *      includeDetails: // value for 'includeDetails'
 *   },
 * });
 */
export function useOpportunityCommunityQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityCommunityQuery,
    SchemaTypes.OpportunityCommunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityCommunityQuery, SchemaTypes.OpportunityCommunityQueryVariables>(
    OpportunityCommunityDocument,
    options
  );
}

export function useOpportunityCommunityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityCommunityQuery,
    SchemaTypes.OpportunityCommunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunityCommunityQuery, SchemaTypes.OpportunityCommunityQueryVariables>(
    OpportunityCommunityDocument,
    options
  );
}

export type OpportunityCommunityQueryHookResult = ReturnType<typeof useOpportunityCommunityQuery>;
export type OpportunityCommunityLazyQueryHookResult = ReturnType<typeof useOpportunityCommunityLazyQuery>;
export type OpportunityCommunityQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityCommunityQuery,
  SchemaTypes.OpportunityCommunityQueryVariables
>;
export function refetchOpportunityCommunityQuery(variables: SchemaTypes.OpportunityCommunityQueryVariables) {
  return { query: OpportunityCommunityDocument, variables: variables };
}

export const SpaceCommunityDocument = gql`
  query spaceCommunity($spaceId: UUID_NAMEID!, $includeDetails: Boolean = false) {
    space(ID: $spaceId) {
      id
      profile {
        id
        displayName
      }
      community {
        id
        ...CommunityDetails @include(if: $includeDetails)
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
`;

/**
 * __useSpaceCommunityQuery__
 *
 * To run a query within a React component, call `useSpaceCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceCommunityQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      includeDetails: // value for 'includeDetails'
 *   },
 * });
 */
export function useSpaceCommunityQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceCommunityQuery, SchemaTypes.SpaceCommunityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceCommunityQuery, SchemaTypes.SpaceCommunityQueryVariables>(
    SpaceCommunityDocument,
    options
  );
}

export function useSpaceCommunityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpaceCommunityQuery, SchemaTypes.SpaceCommunityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceCommunityQuery, SchemaTypes.SpaceCommunityQueryVariables>(
    SpaceCommunityDocument,
    options
  );
}

export type SpaceCommunityQueryHookResult = ReturnType<typeof useSpaceCommunityQuery>;
export type SpaceCommunityLazyQueryHookResult = ReturnType<typeof useSpaceCommunityLazyQuery>;
export type SpaceCommunityQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceCommunityQuery,
  SchemaTypes.SpaceCommunityQueryVariables
>;
export function refetchSpaceCommunityQuery(variables: SchemaTypes.SpaceCommunityQueryVariables) {
  return { query: SpaceCommunityDocument, variables: variables };
}

export const SpaceCommunityContributorsDocument = gql`
  query SpaceCommunityContributors($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      host {
        ...OrganizationCard
      }
      community {
        id
        leadUsers: usersInRole(role: LEAD) {
          ...UserCard
        }
        memberUsers {
          ...UserCard
        }
        memberOrganizations: organizationsInRole(role: MEMBER) {
          ...OrganizationCard
        }
      }
    }
  }
  ${OrganizationCardFragmentDoc}
  ${UserCardFragmentDoc}
`;

/**
 * __useSpaceCommunityContributorsQuery__
 *
 * To run a query within a React component, call `useSpaceCommunityContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceCommunityContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceCommunityContributorsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceCommunityContributorsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceCommunityContributorsQuery,
    SchemaTypes.SpaceCommunityContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpaceCommunityContributorsQuery,
    SchemaTypes.SpaceCommunityContributorsQueryVariables
  >(SpaceCommunityContributorsDocument, options);
}

export function useSpaceCommunityContributorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceCommunityContributorsQuery,
    SchemaTypes.SpaceCommunityContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceCommunityContributorsQuery,
    SchemaTypes.SpaceCommunityContributorsQueryVariables
  >(SpaceCommunityContributorsDocument, options);
}

export type SpaceCommunityContributorsQueryHookResult = ReturnType<typeof useSpaceCommunityContributorsQuery>;
export type SpaceCommunityContributorsLazyQueryHookResult = ReturnType<typeof useSpaceCommunityContributorsLazyQuery>;
export type SpaceCommunityContributorsQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceCommunityContributorsQuery,
  SchemaTypes.SpaceCommunityContributorsQueryVariables
>;
export function refetchSpaceCommunityContributorsQuery(
  variables: SchemaTypes.SpaceCommunityContributorsQueryVariables
) {
  return { query: SpaceCommunityContributorsDocument, variables: variables };
}

export const ChallengeCommunityContributorsDocument = gql`
  query ChallengeCommunityContributors($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        community {
          id
          ...CommunityMembers
        }
      }
    }
  }
  ${CommunityMembersFragmentDoc}
`;

/**
 * __useChallengeCommunityContributorsQuery__
 *
 * To run a query within a React component, call `useChallengeCommunityContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeCommunityContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeCommunityContributorsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeCommunityContributorsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeCommunityContributorsQuery,
    SchemaTypes.ChallengeCommunityContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeCommunityContributorsQuery,
    SchemaTypes.ChallengeCommunityContributorsQueryVariables
  >(ChallengeCommunityContributorsDocument, options);
}

export function useChallengeCommunityContributorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeCommunityContributorsQuery,
    SchemaTypes.ChallengeCommunityContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeCommunityContributorsQuery,
    SchemaTypes.ChallengeCommunityContributorsQueryVariables
  >(ChallengeCommunityContributorsDocument, options);
}

export type ChallengeCommunityContributorsQueryHookResult = ReturnType<typeof useChallengeCommunityContributorsQuery>;
export type ChallengeCommunityContributorsLazyQueryHookResult = ReturnType<
  typeof useChallengeCommunityContributorsLazyQuery
>;
export type ChallengeCommunityContributorsQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeCommunityContributorsQuery,
  SchemaTypes.ChallengeCommunityContributorsQueryVariables
>;
export function refetchChallengeCommunityContributorsQuery(
  variables: SchemaTypes.ChallengeCommunityContributorsQueryVariables
) {
  return { query: ChallengeCommunityContributorsDocument, variables: variables };
}

export const OpportunityCommunityContributorsDocument = gql`
  query OpportunityCommunityContributors($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        community {
          id
          ...CommunityMembers
        }
      }
    }
  }
  ${CommunityMembersFragmentDoc}
`;

/**
 * __useOpportunityCommunityContributorsQuery__
 *
 * To run a query within a React component, call `useOpportunityCommunityContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityCommunityContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityCommunityContributorsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityCommunityContributorsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityCommunityContributorsQuery,
    SchemaTypes.OpportunityCommunityContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityCommunityContributorsQuery,
    SchemaTypes.OpportunityCommunityContributorsQueryVariables
  >(OpportunityCommunityContributorsDocument, options);
}

export function useOpportunityCommunityContributorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityCommunityContributorsQuery,
    SchemaTypes.OpportunityCommunityContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityCommunityContributorsQuery,
    SchemaTypes.OpportunityCommunityContributorsQueryVariables
  >(OpportunityCommunityContributorsDocument, options);
}

export type OpportunityCommunityContributorsQueryHookResult = ReturnType<
  typeof useOpportunityCommunityContributorsQuery
>;
export type OpportunityCommunityContributorsLazyQueryHookResult = ReturnType<
  typeof useOpportunityCommunityContributorsLazyQuery
>;
export type OpportunityCommunityContributorsQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityCommunityContributorsQuery,
  SchemaTypes.OpportunityCommunityContributorsQueryVariables
>;
export function refetchOpportunityCommunityContributorsQuery(
  variables: SchemaTypes.OpportunityCommunityContributorsQueryVariables
) {
  return { query: OpportunityCommunityContributorsDocument, variables: variables };
}

export const ContributingOrganizationsDocument = gql`
  query contributingOrganizations($limit: Float, $shuffle: Boolean, $filterCredentials: [AuthorizationCredential!]) {
    organizations(limit: $limit, shuffle: $shuffle, filter: { credentials: $filterCredentials }) {
      id
      nameID
      profile {
        id
        displayName
        visual(type: AVATAR) {
          ...VisualUri
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
`;

/**
 * __useContributingOrganizationsQuery__
 *
 * To run a query within a React component, call `useContributingOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributingOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributingOrganizationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      shuffle: // value for 'shuffle'
 *      filterCredentials: // value for 'filterCredentials'
 *   },
 * });
 */
export function useContributingOrganizationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.ContributingOrganizationsQuery,
    SchemaTypes.ContributingOrganizationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ContributingOrganizationsQuery,
    SchemaTypes.ContributingOrganizationsQueryVariables
  >(ContributingOrganizationsDocument, options);
}

export function useContributingOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ContributingOrganizationsQuery,
    SchemaTypes.ContributingOrganizationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ContributingOrganizationsQuery,
    SchemaTypes.ContributingOrganizationsQueryVariables
  >(ContributingOrganizationsDocument, options);
}

export type ContributingOrganizationsQueryHookResult = ReturnType<typeof useContributingOrganizationsQuery>;
export type ContributingOrganizationsLazyQueryHookResult = ReturnType<typeof useContributingOrganizationsLazyQuery>;
export type ContributingOrganizationsQueryResult = Apollo.QueryResult<
  SchemaTypes.ContributingOrganizationsQuery,
  SchemaTypes.ContributingOrganizationsQueryVariables
>;
export function refetchContributingOrganizationsQuery(variables?: SchemaTypes.ContributingOrganizationsQueryVariables) {
  return { query: ContributingOrganizationsDocument, variables: variables };
}

export const ContributingUsersDocument = gql`
  query contributingUsers($limit: Float, $shuffle: Boolean, $filterCredentials: [AuthorizationCredential!]) {
    users(limit: $limit, shuffle: $shuffle, filter: { credentials: $filterCredentials }) {
      id
      nameID
      isContactable
      profile {
        id
        displayName
        location {
          id
          city
          country
        }
        visual(type: AVATAR) {
          id
          uri
        }
        tagsets {
          ...TagsetDetails
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
`;

/**
 * __useContributingUsersQuery__
 *
 * To run a query within a React component, call `useContributingUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributingUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributingUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      shuffle: // value for 'shuffle'
 *      filterCredentials: // value for 'filterCredentials'
 *   },
 * });
 */
export function useContributingUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.ContributingUsersQuery, SchemaTypes.ContributingUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ContributingUsersQuery, SchemaTypes.ContributingUsersQueryVariables>(
    ContributingUsersDocument,
    options
  );
}

export function useContributingUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ContributingUsersQuery,
    SchemaTypes.ContributingUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ContributingUsersQuery, SchemaTypes.ContributingUsersQueryVariables>(
    ContributingUsersDocument,
    options
  );
}

export type ContributingUsersQueryHookResult = ReturnType<typeof useContributingUsersQuery>;
export type ContributingUsersLazyQueryHookResult = ReturnType<typeof useContributingUsersLazyQuery>;
export type ContributingUsersQueryResult = Apollo.QueryResult<
  SchemaTypes.ContributingUsersQuery,
  SchemaTypes.ContributingUsersQueryVariables
>;
export function refetchContributingUsersQuery(variables?: SchemaTypes.ContributingUsersQueryVariables) {
  return { query: ContributingUsersDocument, variables: variables };
}

export const CreateGroupOnCommunityDocument = gql`
  mutation createGroupOnCommunity($input: CreateUserGroupInput!) {
    createGroupOnCommunity(groupData: $input) {
      ...GroupDetails
    }
  }
  ${GroupDetailsFragmentDoc}
`;
export type CreateGroupOnCommunityMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateGroupOnCommunityMutation,
  SchemaTypes.CreateGroupOnCommunityMutationVariables
>;

/**
 * __useCreateGroupOnCommunityMutation__
 *
 * To run a mutation, you first call `useCreateGroupOnCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupOnCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupOnCommunityMutation, { data, loading, error }] = useCreateGroupOnCommunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupOnCommunityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateGroupOnCommunityMutation,
    SchemaTypes.CreateGroupOnCommunityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateGroupOnCommunityMutation,
    SchemaTypes.CreateGroupOnCommunityMutationVariables
  >(CreateGroupOnCommunityDocument, options);
}

export type CreateGroupOnCommunityMutationHookResult = ReturnType<typeof useCreateGroupOnCommunityMutation>;
export type CreateGroupOnCommunityMutationResult = Apollo.MutationResult<SchemaTypes.CreateGroupOnCommunityMutation>;
export type CreateGroupOnCommunityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateGroupOnCommunityMutation,
  SchemaTypes.CreateGroupOnCommunityMutationVariables
>;
export const ChallengesWithProfileDocument = gql`
  query challengesWithProfile($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenges {
        id
        nameID
        profile {
          id
          displayName
        }
      }
    }
  }
`;

/**
 * __useChallengesWithProfileQuery__
 *
 * To run a query within a React component, call `useChallengesWithProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengesWithProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengesWithProfileQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useChallengesWithProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengesWithProfileQuery,
    SchemaTypes.ChallengesWithProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengesWithProfileQuery, SchemaTypes.ChallengesWithProfileQueryVariables>(
    ChallengesWithProfileDocument,
    options
  );
}

export function useChallengesWithProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengesWithProfileQuery,
    SchemaTypes.ChallengesWithProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengesWithProfileQuery, SchemaTypes.ChallengesWithProfileQueryVariables>(
    ChallengesWithProfileDocument,
    options
  );
}

export type ChallengesWithProfileQueryHookResult = ReturnType<typeof useChallengesWithProfileQuery>;
export type ChallengesWithProfileLazyQueryHookResult = ReturnType<typeof useChallengesWithProfileLazyQuery>;
export type ChallengesWithProfileQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengesWithProfileQuery,
  SchemaTypes.ChallengesWithProfileQueryVariables
>;
export function refetchChallengesWithProfileQuery(variables: SchemaTypes.ChallengesWithProfileQueryVariables) {
  return { query: ChallengesWithProfileDocument, variables: variables };
}

export const CommunityGroupsDocument = gql`
  query communityGroups($communityId: UUID!) {
    lookup {
      community(ID: $communityId) {
        id
        groups {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useCommunityGroupsQuery__
 *
 * To run a query within a React component, call `useCommunityGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityGroupsQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCommunityGroupsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.CommunityGroupsQuery, SchemaTypes.CommunityGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CommunityGroupsQuery, SchemaTypes.CommunityGroupsQueryVariables>(
    CommunityGroupsDocument,
    options
  );
}

export function useCommunityGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.CommunityGroupsQuery, SchemaTypes.CommunityGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CommunityGroupsQuery, SchemaTypes.CommunityGroupsQueryVariables>(
    CommunityGroupsDocument,
    options
  );
}

export type CommunityGroupsQueryHookResult = ReturnType<typeof useCommunityGroupsQuery>;
export type CommunityGroupsLazyQueryHookResult = ReturnType<typeof useCommunityGroupsLazyQuery>;
export type CommunityGroupsQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityGroupsQuery,
  SchemaTypes.CommunityGroupsQueryVariables
>;
export function refetchCommunityGroupsQuery(variables: SchemaTypes.CommunityGroupsQueryVariables) {
  return { query: CommunityGroupsDocument, variables: variables };
}

export const CommunityMembersDocument = gql`
  query communityMembers($communityId: UUID!) {
    lookup {
      community(ID: $communityId) {
        id
        memberUsers {
          ...UserDisplayName
        }
      }
    }
  }
  ${UserDisplayNameFragmentDoc}
`;

/**
 * __useCommunityMembersQuery__
 *
 * To run a query within a React component, call `useCommunityMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityMembersQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCommunityMembersQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.CommunityMembersQuery, SchemaTypes.CommunityMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CommunityMembersQuery, SchemaTypes.CommunityMembersQueryVariables>(
    CommunityMembersDocument,
    options
  );
}

export function useCommunityMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityMembersQuery,
    SchemaTypes.CommunityMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CommunityMembersQuery, SchemaTypes.CommunityMembersQueryVariables>(
    CommunityMembersDocument,
    options
  );
}

export type CommunityMembersQueryHookResult = ReturnType<typeof useCommunityMembersQuery>;
export type CommunityMembersLazyQueryHookResult = ReturnType<typeof useCommunityMembersLazyQuery>;
export type CommunityMembersQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityMembersQuery,
  SchemaTypes.CommunityMembersQueryVariables
>;
export function refetchCommunityMembersQuery(variables: SchemaTypes.CommunityMembersQueryVariables) {
  return { query: CommunityMembersDocument, variables: variables };
}

export const AvailableUsersDocument = gql`
  query availableUsers($first: Int!, $after: UUID, $filter: UserFilterInput) {
    usersPaginated(first: $first, after: $after, filter: $filter) {
      users {
        id
        profile {
          id
          displayName
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

/**
 * __useAvailableUsersQuery__
 *
 * To run a query within a React component, call `useAvailableUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAvailableUsersQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.AvailableUsersQuery, SchemaTypes.AvailableUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AvailableUsersQuery, SchemaTypes.AvailableUsersQueryVariables>(
    AvailableUsersDocument,
    options
  );
}

export function useAvailableUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.AvailableUsersQuery, SchemaTypes.AvailableUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AvailableUsersQuery, SchemaTypes.AvailableUsersQueryVariables>(
    AvailableUsersDocument,
    options
  );
}

export type AvailableUsersQueryHookResult = ReturnType<typeof useAvailableUsersQuery>;
export type AvailableUsersLazyQueryHookResult = ReturnType<typeof useAvailableUsersLazyQuery>;
export type AvailableUsersQueryResult = Apollo.QueryResult<
  SchemaTypes.AvailableUsersQuery,
  SchemaTypes.AvailableUsersQueryVariables
>;
export function refetchAvailableUsersQuery(variables: SchemaTypes.AvailableUsersQueryVariables) {
  return { query: AvailableUsersDocument, variables: variables };
}

export const CommunityMembersListDocument = gql`
  query CommunityMembersList(
    $communityId: UUID!
    $spaceId: UUID_NAMEID = "mockid"
    $includeSpaceHost: Boolean = false
  ) {
    space(ID: $spaceId) @include(if: $includeSpaceHost) {
      host {
        ...OrganizationDetails
      }
    }
    lookup {
      community(ID: $communityId) {
        ...CommunityMembersDetails
      }
    }
  }
  ${OrganizationDetailsFragmentDoc}
  ${CommunityMembersDetailsFragmentDoc}
`;

/**
 * __useCommunityMembersListQuery__
 *
 * To run a query within a React component, call `useCommunityMembersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityMembersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityMembersListQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      spaceId: // value for 'spaceId'
 *      includeSpaceHost: // value for 'includeSpaceHost'
 *   },
 * });
 */
export function useCommunityMembersListQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CommunityMembersListQuery,
    SchemaTypes.CommunityMembersListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CommunityMembersListQuery, SchemaTypes.CommunityMembersListQueryVariables>(
    CommunityMembersListDocument,
    options
  );
}

export function useCommunityMembersListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityMembersListQuery,
    SchemaTypes.CommunityMembersListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CommunityMembersListQuery, SchemaTypes.CommunityMembersListQueryVariables>(
    CommunityMembersListDocument,
    options
  );
}

export type CommunityMembersListQueryHookResult = ReturnType<typeof useCommunityMembersListQuery>;
export type CommunityMembersListLazyQueryHookResult = ReturnType<typeof useCommunityMembersListLazyQuery>;
export type CommunityMembersListQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityMembersListQuery,
  SchemaTypes.CommunityMembersListQueryVariables
>;
export function refetchCommunityMembersListQuery(variables: SchemaTypes.CommunityMembersListQueryVariables) {
  return { query: CommunityMembersListDocument, variables: variables };
}

export const CommunityAvailableMembersDocument = gql`
  query CommunityAvailableMembers($communityId: UUID!, $first: Int!, $after: UUID, $filter: UserFilterInput) {
    lookup {
      availableMembers: community(ID: $communityId) {
        ...CommunityAvailableMemberUsers
      }
    }
  }
  ${CommunityAvailableMemberUsersFragmentDoc}
`;

/**
 * __useCommunityAvailableMembersQuery__
 *
 * To run a query within a React component, call `useCommunityAvailableMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAvailableMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAvailableMembersQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCommunityAvailableMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CommunityAvailableMembersQuery,
    SchemaTypes.CommunityAvailableMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.CommunityAvailableMembersQuery,
    SchemaTypes.CommunityAvailableMembersQueryVariables
  >(CommunityAvailableMembersDocument, options);
}

export function useCommunityAvailableMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityAvailableMembersQuery,
    SchemaTypes.CommunityAvailableMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CommunityAvailableMembersQuery,
    SchemaTypes.CommunityAvailableMembersQueryVariables
  >(CommunityAvailableMembersDocument, options);
}

export type CommunityAvailableMembersQueryHookResult = ReturnType<typeof useCommunityAvailableMembersQuery>;
export type CommunityAvailableMembersLazyQueryHookResult = ReturnType<typeof useCommunityAvailableMembersLazyQuery>;
export type CommunityAvailableMembersQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityAvailableMembersQuery,
  SchemaTypes.CommunityAvailableMembersQueryVariables
>;
export function refetchCommunityAvailableMembersQuery(variables: SchemaTypes.CommunityAvailableMembersQueryVariables) {
  return { query: CommunityAvailableMembersDocument, variables: variables };
}

export const AllOrganizationsDocument = gql`
  query AllOrganizations($first: Int!, $after: UUID, $filter: OrganizationFilterInput) {
    organizationsPaginated(first: $first, after: $after, filter: $filter) {
      organization {
        ...BasicOrganizationDetails
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${BasicOrganizationDetailsFragmentDoc}
  ${PageInfoFragmentDoc}
`;

/**
 * __useAllOrganizationsQuery__
 *
 * To run a query within a React component, call `useAllOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllOrganizationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAllOrganizationsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.AllOrganizationsQuery, SchemaTypes.AllOrganizationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AllOrganizationsQuery, SchemaTypes.AllOrganizationsQueryVariables>(
    AllOrganizationsDocument,
    options
  );
}

export function useAllOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AllOrganizationsQuery,
    SchemaTypes.AllOrganizationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AllOrganizationsQuery, SchemaTypes.AllOrganizationsQueryVariables>(
    AllOrganizationsDocument,
    options
  );
}

export type AllOrganizationsQueryHookResult = ReturnType<typeof useAllOrganizationsQuery>;
export type AllOrganizationsLazyQueryHookResult = ReturnType<typeof useAllOrganizationsLazyQuery>;
export type AllOrganizationsQueryResult = Apollo.QueryResult<
  SchemaTypes.AllOrganizationsQuery,
  SchemaTypes.AllOrganizationsQueryVariables
>;
export function refetchAllOrganizationsQuery(variables: SchemaTypes.AllOrganizationsQueryVariables) {
  return { query: AllOrganizationsDocument, variables: variables };
}

export const AssignUserAsCommunityMemberDocument = gql`
  mutation assignUserAsCommunityMember($communityId: UUID!, $memberId: UUID_NAMEID_EMAIL!) {
    assignCommunityRoleToUser(roleData: { communityID: $communityId, userID: $memberId, role: MEMBER }) {
      id
    }
  }
`;
export type AssignUserAsCommunityMemberMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsCommunityMemberMutation,
  SchemaTypes.AssignUserAsCommunityMemberMutationVariables
>;

/**
 * __useAssignUserAsCommunityMemberMutation__
 *
 * To run a mutation, you first call `useAssignUserAsCommunityMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsCommunityMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsCommunityMemberMutation, { data, loading, error }] = useAssignUserAsCommunityMemberMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useAssignUserAsCommunityMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsCommunityMemberMutation,
    SchemaTypes.AssignUserAsCommunityMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsCommunityMemberMutation,
    SchemaTypes.AssignUserAsCommunityMemberMutationVariables
  >(AssignUserAsCommunityMemberDocument, options);
}

export type AssignUserAsCommunityMemberMutationHookResult = ReturnType<typeof useAssignUserAsCommunityMemberMutation>;
export type AssignUserAsCommunityMemberMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserAsCommunityMemberMutation>;
export type AssignUserAsCommunityMemberMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsCommunityMemberMutation,
  SchemaTypes.AssignUserAsCommunityMemberMutationVariables
>;
export const AssignUserAsCommunityLeadDocument = gql`
  mutation assignUserAsCommunityLead($communityId: UUID!, $memberId: UUID_NAMEID_EMAIL!) {
    assignCommunityRoleToUser(roleData: { communityID: $communityId, userID: $memberId, role: LEAD }) {
      id
    }
  }
`;
export type AssignUserAsCommunityLeadMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsCommunityLeadMutation,
  SchemaTypes.AssignUserAsCommunityLeadMutationVariables
>;

/**
 * __useAssignUserAsCommunityLeadMutation__
 *
 * To run a mutation, you first call `useAssignUserAsCommunityLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsCommunityLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsCommunityLeadMutation, { data, loading, error }] = useAssignUserAsCommunityLeadMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useAssignUserAsCommunityLeadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsCommunityLeadMutation,
    SchemaTypes.AssignUserAsCommunityLeadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsCommunityLeadMutation,
    SchemaTypes.AssignUserAsCommunityLeadMutationVariables
  >(AssignUserAsCommunityLeadDocument, options);
}

export type AssignUserAsCommunityLeadMutationHookResult = ReturnType<typeof useAssignUserAsCommunityLeadMutation>;
export type AssignUserAsCommunityLeadMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserAsCommunityLeadMutation>;
export type AssignUserAsCommunityLeadMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsCommunityLeadMutation,
  SchemaTypes.AssignUserAsCommunityLeadMutationVariables
>;
export const RemoveUserAsCommunityMemberDocument = gql`
  mutation removeUserAsCommunityMember($communityId: UUID!, $memberId: UUID_NAMEID_EMAIL!) {
    removeCommunityRoleFromUser(roleData: { communityID: $communityId, userID: $memberId, role: MEMBER }) {
      id
    }
  }
`;
export type RemoveUserAsCommunityMemberMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsCommunityMemberMutation,
  SchemaTypes.RemoveUserAsCommunityMemberMutationVariables
>;

/**
 * __useRemoveUserAsCommunityMemberMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsCommunityMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsCommunityMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsCommunityMemberMutation, { data, loading, error }] = useRemoveUserAsCommunityMemberMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useRemoveUserAsCommunityMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsCommunityMemberMutation,
    SchemaTypes.RemoveUserAsCommunityMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsCommunityMemberMutation,
    SchemaTypes.RemoveUserAsCommunityMemberMutationVariables
  >(RemoveUserAsCommunityMemberDocument, options);
}

export type RemoveUserAsCommunityMemberMutationHookResult = ReturnType<typeof useRemoveUserAsCommunityMemberMutation>;
export type RemoveUserAsCommunityMemberMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserAsCommunityMemberMutation>;
export type RemoveUserAsCommunityMemberMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsCommunityMemberMutation,
  SchemaTypes.RemoveUserAsCommunityMemberMutationVariables
>;
export const RemoveUserAsCommunityLeadDocument = gql`
  mutation removeUserAsCommunityLead($communityId: UUID!, $memberId: UUID_NAMEID_EMAIL!) {
    removeCommunityRoleFromUser(roleData: { communityID: $communityId, userID: $memberId, role: LEAD }) {
      id
    }
  }
`;
export type RemoveUserAsCommunityLeadMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsCommunityLeadMutation,
  SchemaTypes.RemoveUserAsCommunityLeadMutationVariables
>;

/**
 * __useRemoveUserAsCommunityLeadMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsCommunityLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsCommunityLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsCommunityLeadMutation, { data, loading, error }] = useRemoveUserAsCommunityLeadMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useRemoveUserAsCommunityLeadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsCommunityLeadMutation,
    SchemaTypes.RemoveUserAsCommunityLeadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsCommunityLeadMutation,
    SchemaTypes.RemoveUserAsCommunityLeadMutationVariables
  >(RemoveUserAsCommunityLeadDocument, options);
}

export type RemoveUserAsCommunityLeadMutationHookResult = ReturnType<typeof useRemoveUserAsCommunityLeadMutation>;
export type RemoveUserAsCommunityLeadMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserAsCommunityLeadMutation>;
export type RemoveUserAsCommunityLeadMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsCommunityLeadMutation,
  SchemaTypes.RemoveUserAsCommunityLeadMutationVariables
>;
export const AssignOrganizationAsCommunityMemberDocument = gql`
  mutation assignOrganizationAsCommunityMember($communityId: UUID!, $memberId: UUID_NAMEID!) {
    assignCommunityRoleToOrganization(
      roleData: { communityID: $communityId, organizationID: $memberId, role: MEMBER }
    ) {
      id
    }
  }
`;
export type AssignOrganizationAsCommunityMemberMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignOrganizationAsCommunityMemberMutation,
  SchemaTypes.AssignOrganizationAsCommunityMemberMutationVariables
>;

/**
 * __useAssignOrganizationAsCommunityMemberMutation__
 *
 * To run a mutation, you first call `useAssignOrganizationAsCommunityMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignOrganizationAsCommunityMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignOrganizationAsCommunityMemberMutation, { data, loading, error }] = useAssignOrganizationAsCommunityMemberMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useAssignOrganizationAsCommunityMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignOrganizationAsCommunityMemberMutation,
    SchemaTypes.AssignOrganizationAsCommunityMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignOrganizationAsCommunityMemberMutation,
    SchemaTypes.AssignOrganizationAsCommunityMemberMutationVariables
  >(AssignOrganizationAsCommunityMemberDocument, options);
}

export type AssignOrganizationAsCommunityMemberMutationHookResult = ReturnType<
  typeof useAssignOrganizationAsCommunityMemberMutation
>;
export type AssignOrganizationAsCommunityMemberMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignOrganizationAsCommunityMemberMutation>;
export type AssignOrganizationAsCommunityMemberMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignOrganizationAsCommunityMemberMutation,
  SchemaTypes.AssignOrganizationAsCommunityMemberMutationVariables
>;
export const AssignOrganizationAsCommunityLeadDocument = gql`
  mutation assignOrganizationAsCommunityLead($communityId: UUID!, $memberId: UUID_NAMEID!) {
    assignCommunityRoleToOrganization(roleData: { communityID: $communityId, organizationID: $memberId, role: LEAD }) {
      id
    }
  }
`;
export type AssignOrganizationAsCommunityLeadMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignOrganizationAsCommunityLeadMutation,
  SchemaTypes.AssignOrganizationAsCommunityLeadMutationVariables
>;

/**
 * __useAssignOrganizationAsCommunityLeadMutation__
 *
 * To run a mutation, you first call `useAssignOrganizationAsCommunityLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignOrganizationAsCommunityLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignOrganizationAsCommunityLeadMutation, { data, loading, error }] = useAssignOrganizationAsCommunityLeadMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useAssignOrganizationAsCommunityLeadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignOrganizationAsCommunityLeadMutation,
    SchemaTypes.AssignOrganizationAsCommunityLeadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignOrganizationAsCommunityLeadMutation,
    SchemaTypes.AssignOrganizationAsCommunityLeadMutationVariables
  >(AssignOrganizationAsCommunityLeadDocument, options);
}

export type AssignOrganizationAsCommunityLeadMutationHookResult = ReturnType<
  typeof useAssignOrganizationAsCommunityLeadMutation
>;
export type AssignOrganizationAsCommunityLeadMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignOrganizationAsCommunityLeadMutation>;
export type AssignOrganizationAsCommunityLeadMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignOrganizationAsCommunityLeadMutation,
  SchemaTypes.AssignOrganizationAsCommunityLeadMutationVariables
>;
export const RemoveOrganizationAsCommunityMemberDocument = gql`
  mutation removeOrganizationAsCommunityMember($communityId: UUID!, $memberId: UUID_NAMEID!) {
    removeCommunityRoleFromOrganization(
      roleData: { communityID: $communityId, organizationID: $memberId, role: MEMBER }
    ) {
      id
    }
  }
`;
export type RemoveOrganizationAsCommunityMemberMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveOrganizationAsCommunityMemberMutation,
  SchemaTypes.RemoveOrganizationAsCommunityMemberMutationVariables
>;

/**
 * __useRemoveOrganizationAsCommunityMemberMutation__
 *
 * To run a mutation, you first call `useRemoveOrganizationAsCommunityMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrganizationAsCommunityMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrganizationAsCommunityMemberMutation, { data, loading, error }] = useRemoveOrganizationAsCommunityMemberMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useRemoveOrganizationAsCommunityMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveOrganizationAsCommunityMemberMutation,
    SchemaTypes.RemoveOrganizationAsCommunityMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveOrganizationAsCommunityMemberMutation,
    SchemaTypes.RemoveOrganizationAsCommunityMemberMutationVariables
  >(RemoveOrganizationAsCommunityMemberDocument, options);
}

export type RemoveOrganizationAsCommunityMemberMutationHookResult = ReturnType<
  typeof useRemoveOrganizationAsCommunityMemberMutation
>;
export type RemoveOrganizationAsCommunityMemberMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveOrganizationAsCommunityMemberMutation>;
export type RemoveOrganizationAsCommunityMemberMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveOrganizationAsCommunityMemberMutation,
  SchemaTypes.RemoveOrganizationAsCommunityMemberMutationVariables
>;
export const RemoveOrganizationAsCommunityLeadDocument = gql`
  mutation removeOrganizationAsCommunityLead($communityId: UUID!, $memberId: UUID_NAMEID!) {
    removeCommunityRoleFromOrganization(
      roleData: { communityID: $communityId, organizationID: $memberId, role: LEAD }
    ) {
      id
    }
  }
`;
export type RemoveOrganizationAsCommunityLeadMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveOrganizationAsCommunityLeadMutation,
  SchemaTypes.RemoveOrganizationAsCommunityLeadMutationVariables
>;

/**
 * __useRemoveOrganizationAsCommunityLeadMutation__
 *
 * To run a mutation, you first call `useRemoveOrganizationAsCommunityLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrganizationAsCommunityLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrganizationAsCommunityLeadMutation, { data, loading, error }] = useRemoveOrganizationAsCommunityLeadMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useRemoveOrganizationAsCommunityLeadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveOrganizationAsCommunityLeadMutation,
    SchemaTypes.RemoveOrganizationAsCommunityLeadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveOrganizationAsCommunityLeadMutation,
    SchemaTypes.RemoveOrganizationAsCommunityLeadMutationVariables
  >(RemoveOrganizationAsCommunityLeadDocument, options);
}

export type RemoveOrganizationAsCommunityLeadMutationHookResult = ReturnType<
  typeof useRemoveOrganizationAsCommunityLeadMutation
>;
export type RemoveOrganizationAsCommunityLeadMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveOrganizationAsCommunityLeadMutation>;
export type RemoveOrganizationAsCommunityLeadMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveOrganizationAsCommunityLeadMutation,
  SchemaTypes.RemoveOrganizationAsCommunityLeadMutationVariables
>;
export const AssignCommunityRoleToUserDocument = gql`
  mutation AssignCommunityRoleToUser($communityID: UUID!, $role: CommunityRole!, $userID: UUID_NAMEID_EMAIL!) {
    assignCommunityRoleToUser(roleData: { communityID: $communityID, role: $role, userID: $userID }) {
      id
    }
  }
`;
export type AssignCommunityRoleToUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignCommunityRoleToUserMutation,
  SchemaTypes.AssignCommunityRoleToUserMutationVariables
>;

/**
 * __useAssignCommunityRoleToUserMutation__
 *
 * To run a mutation, you first call `useAssignCommunityRoleToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignCommunityRoleToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignCommunityRoleToUserMutation, { data, loading, error }] = useAssignCommunityRoleToUserMutation({
 *   variables: {
 *      communityID: // value for 'communityID'
 *      role: // value for 'role'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAssignCommunityRoleToUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignCommunityRoleToUserMutation,
    SchemaTypes.AssignCommunityRoleToUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignCommunityRoleToUserMutation,
    SchemaTypes.AssignCommunityRoleToUserMutationVariables
  >(AssignCommunityRoleToUserDocument, options);
}

export type AssignCommunityRoleToUserMutationHookResult = ReturnType<typeof useAssignCommunityRoleToUserMutation>;
export type AssignCommunityRoleToUserMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignCommunityRoleToUserMutation>;
export type AssignCommunityRoleToUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignCommunityRoleToUserMutation,
  SchemaTypes.AssignCommunityRoleToUserMutationVariables
>;
export const RemoveCommunityRoleFromUserDocument = gql`
  mutation RemoveCommunityRoleFromUser($communityID: UUID!, $role: CommunityRole!, $userID: UUID_NAMEID_EMAIL!) {
    removeCommunityRoleFromUser(roleData: { communityID: $communityID, role: $role, userID: $userID }) {
      id
    }
  }
`;
export type RemoveCommunityRoleFromUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveCommunityRoleFromUserMutation,
  SchemaTypes.RemoveCommunityRoleFromUserMutationVariables
>;

/**
 * __useRemoveCommunityRoleFromUserMutation__
 *
 * To run a mutation, you first call `useRemoveCommunityRoleFromUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommunityRoleFromUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommunityRoleFromUserMutation, { data, loading, error }] = useRemoveCommunityRoleFromUserMutation({
 *   variables: {
 *      communityID: // value for 'communityID'
 *      role: // value for 'role'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveCommunityRoleFromUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveCommunityRoleFromUserMutation,
    SchemaTypes.RemoveCommunityRoleFromUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveCommunityRoleFromUserMutation,
    SchemaTypes.RemoveCommunityRoleFromUserMutationVariables
  >(RemoveCommunityRoleFromUserDocument, options);
}

export type RemoveCommunityRoleFromUserMutationHookResult = ReturnType<typeof useRemoveCommunityRoleFromUserMutation>;
export type RemoveCommunityRoleFromUserMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveCommunityRoleFromUserMutation>;
export type RemoveCommunityRoleFromUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveCommunityRoleFromUserMutation,
  SchemaTypes.RemoveCommunityRoleFromUserMutationVariables
>;
export const ContributorsPageOrganizationsDocument = gql`
  query ContributorsPageOrganizations($first: Int!, $after: UUID, $filter: OrganizationFilterInput) {
    organizationsPaginated(first: $first, after: $after, filter: $filter) {
      ...OrganizationContributorPaginated
    }
  }
  ${OrganizationContributorPaginatedFragmentDoc}
`;

/**
 * __useContributorsPageOrganizationsQuery__
 *
 * To run a query within a React component, call `useContributorsPageOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributorsPageOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributorsPageOrganizationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useContributorsPageOrganizationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ContributorsPageOrganizationsQuery,
    SchemaTypes.ContributorsPageOrganizationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ContributorsPageOrganizationsQuery,
    SchemaTypes.ContributorsPageOrganizationsQueryVariables
  >(ContributorsPageOrganizationsDocument, options);
}

export function useContributorsPageOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ContributorsPageOrganizationsQuery,
    SchemaTypes.ContributorsPageOrganizationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ContributorsPageOrganizationsQuery,
    SchemaTypes.ContributorsPageOrganizationsQueryVariables
  >(ContributorsPageOrganizationsDocument, options);
}

export type ContributorsPageOrganizationsQueryHookResult = ReturnType<typeof useContributorsPageOrganizationsQuery>;
export type ContributorsPageOrganizationsLazyQueryHookResult = ReturnType<
  typeof useContributorsPageOrganizationsLazyQuery
>;
export type ContributorsPageOrganizationsQueryResult = Apollo.QueryResult<
  SchemaTypes.ContributorsPageOrganizationsQuery,
  SchemaTypes.ContributorsPageOrganizationsQueryVariables
>;
export function refetchContributorsPageOrganizationsQuery(
  variables: SchemaTypes.ContributorsPageOrganizationsQueryVariables
) {
  return { query: ContributorsPageOrganizationsDocument, variables: variables };
}

export const ContributorsPageUsersDocument = gql`
  query ContributorsPageUsers($first: Int!, $after: UUID, $filter: UserFilterInput) {
    usersPaginated(first: $first, after: $after, filter: $filter) {
      ...UserContributorPaginated
    }
  }
  ${UserContributorPaginatedFragmentDoc}
`;

/**
 * __useContributorsPageUsersQuery__
 *
 * To run a query within a React component, call `useContributorsPageUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributorsPageUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributorsPageUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useContributorsPageUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ContributorsPageUsersQuery,
    SchemaTypes.ContributorsPageUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ContributorsPageUsersQuery, SchemaTypes.ContributorsPageUsersQueryVariables>(
    ContributorsPageUsersDocument,
    options
  );
}

export function useContributorsPageUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ContributorsPageUsersQuery,
    SchemaTypes.ContributorsPageUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ContributorsPageUsersQuery, SchemaTypes.ContributorsPageUsersQueryVariables>(
    ContributorsPageUsersDocument,
    options
  );
}

export type ContributorsPageUsersQueryHookResult = ReturnType<typeof useContributorsPageUsersQuery>;
export type ContributorsPageUsersLazyQueryHookResult = ReturnType<typeof useContributorsPageUsersLazyQuery>;
export type ContributorsPageUsersQueryResult = Apollo.QueryResult<
  SchemaTypes.ContributorsPageUsersQuery,
  SchemaTypes.ContributorsPageUsersQueryVariables
>;
export function refetchContributorsPageUsersQuery(variables: SchemaTypes.ContributorsPageUsersQueryVariables) {
  return { query: ContributorsPageUsersDocument, variables: variables };
}

export const AssociatedOrganizationDocument = gql`
  query associatedOrganization($organizationId: UUID_NAMEID!) {
    organization(ID: $organizationId) {
      ...AssociatedOrganizationDetails
    }
  }
  ${AssociatedOrganizationDetailsFragmentDoc}
`;

/**
 * __useAssociatedOrganizationQuery__
 *
 * To run a query within a React component, call `useAssociatedOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssociatedOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssociatedOrganizationQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useAssociatedOrganizationQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AssociatedOrganizationQuery,
    SchemaTypes.AssociatedOrganizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AssociatedOrganizationQuery, SchemaTypes.AssociatedOrganizationQueryVariables>(
    AssociatedOrganizationDocument,
    options
  );
}

export function useAssociatedOrganizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AssociatedOrganizationQuery,
    SchemaTypes.AssociatedOrganizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AssociatedOrganizationQuery, SchemaTypes.AssociatedOrganizationQueryVariables>(
    AssociatedOrganizationDocument,
    options
  );
}

export type AssociatedOrganizationQueryHookResult = ReturnType<typeof useAssociatedOrganizationQuery>;
export type AssociatedOrganizationLazyQueryHookResult = ReturnType<typeof useAssociatedOrganizationLazyQuery>;
export type AssociatedOrganizationQueryResult = Apollo.QueryResult<
  SchemaTypes.AssociatedOrganizationQuery,
  SchemaTypes.AssociatedOrganizationQueryVariables
>;
export function refetchAssociatedOrganizationQuery(variables: SchemaTypes.AssociatedOrganizationQueryVariables) {
  return { query: AssociatedOrganizationDocument, variables: variables };
}

export const AssignUserToOrganizationDocument = gql`
  mutation assignUserToOrganization($input: AssignOrganizationAssociateInput!) {
    assignUserToOrganization(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserToOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserToOrganizationMutation,
  SchemaTypes.AssignUserToOrganizationMutationVariables
>;

/**
 * __useAssignUserToOrganizationMutation__
 *
 * To run a mutation, you first call `useAssignUserToOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserToOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserToOrganizationMutation, { data, loading, error }] = useAssignUserToOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserToOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserToOrganizationMutation,
    SchemaTypes.AssignUserToOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserToOrganizationMutation,
    SchemaTypes.AssignUserToOrganizationMutationVariables
  >(AssignUserToOrganizationDocument, options);
}

export type AssignUserToOrganizationMutationHookResult = ReturnType<typeof useAssignUserToOrganizationMutation>;
export type AssignUserToOrganizationMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserToOrganizationMutation>;
export type AssignUserToOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserToOrganizationMutation,
  SchemaTypes.AssignUserToOrganizationMutationVariables
>;
export const RemoveUserFromOrganizationDocument = gql`
  mutation removeUserFromOrganization($input: RemoveOrganizationAssociateInput!) {
    removeUserFromOrganization(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserFromOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserFromOrganizationMutation,
  SchemaTypes.RemoveUserFromOrganizationMutationVariables
>;

/**
 * __useRemoveUserFromOrganizationMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromOrganizationMutation, { data, loading, error }] = useRemoveUserFromOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserFromOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserFromOrganizationMutation,
    SchemaTypes.RemoveUserFromOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserFromOrganizationMutation,
    SchemaTypes.RemoveUserFromOrganizationMutationVariables
  >(RemoveUserFromOrganizationDocument, options);
}

export type RemoveUserFromOrganizationMutationHookResult = ReturnType<typeof useRemoveUserFromOrganizationMutation>;
export type RemoveUserFromOrganizationMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserFromOrganizationMutation>;
export type RemoveUserFromOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserFromOrganizationMutation,
  SchemaTypes.RemoveUserFromOrganizationMutationVariables
>;
export const AssignUserAsOrganizationAdminDocument = gql`
  mutation assignUserAsOrganizationAdmin($input: AssignOrganizationAdminInput!) {
    assignUserAsOrganizationAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type AssignUserAsOrganizationAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserAsOrganizationAdminMutation,
  SchemaTypes.AssignUserAsOrganizationAdminMutationVariables
>;

/**
 * __useAssignUserAsOrganizationAdminMutation__
 *
 * To run a mutation, you first call `useAssignUserAsOrganizationAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserAsOrganizationAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserAsOrganizationAdminMutation, { data, loading, error }] = useAssignUserAsOrganizationAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserAsOrganizationAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserAsOrganizationAdminMutation,
    SchemaTypes.AssignUserAsOrganizationAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.AssignUserAsOrganizationAdminMutation,
    SchemaTypes.AssignUserAsOrganizationAdminMutationVariables
  >(AssignUserAsOrganizationAdminDocument, options);
}

export type AssignUserAsOrganizationAdminMutationHookResult = ReturnType<
  typeof useAssignUserAsOrganizationAdminMutation
>;
export type AssignUserAsOrganizationAdminMutationResult =
  Apollo.MutationResult<SchemaTypes.AssignUserAsOrganizationAdminMutation>;
export type AssignUserAsOrganizationAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserAsOrganizationAdminMutation,
  SchemaTypes.AssignUserAsOrganizationAdminMutationVariables
>;
export const RemoveUserAsOrganizationAdminDocument = gql`
  mutation removeUserAsOrganizationAdmin($input: RemoveOrganizationAdminInput!) {
    removeUserAsOrganizationAdmin(membershipData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type RemoveUserAsOrganizationAdminMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserAsOrganizationAdminMutation,
  SchemaTypes.RemoveUserAsOrganizationAdminMutationVariables
>;

/**
 * __useRemoveUserAsOrganizationAdminMutation__
 *
 * To run a mutation, you first call `useRemoveUserAsOrganizationAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserAsOrganizationAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserAsOrganizationAdminMutation, { data, loading, error }] = useRemoveUserAsOrganizationAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserAsOrganizationAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserAsOrganizationAdminMutation,
    SchemaTypes.RemoveUserAsOrganizationAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.RemoveUserAsOrganizationAdminMutation,
    SchemaTypes.RemoveUserAsOrganizationAdminMutationVariables
  >(RemoveUserAsOrganizationAdminDocument, options);
}

export type RemoveUserAsOrganizationAdminMutationHookResult = ReturnType<
  typeof useRemoveUserAsOrganizationAdminMutation
>;
export type RemoveUserAsOrganizationAdminMutationResult =
  Apollo.MutationResult<SchemaTypes.RemoveUserAsOrganizationAdminMutation>;
export type RemoveUserAsOrganizationAdminMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserAsOrganizationAdminMutation,
  SchemaTypes.RemoveUserAsOrganizationAdminMutationVariables
>;
export const OrganizationAssociatesDocument = gql`
  query organizationAssociates($id: UUID_NAMEID!) {
    organization(ID: $id) {
      id
      associates {
        ...GroupMembers
      }
    }
  }
  ${GroupMembersFragmentDoc}
`;

/**
 * __useOrganizationAssociatesQuery__
 *
 * To run a query within a React component, call `useOrganizationAssociatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationAssociatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationAssociatesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationAssociatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OrganizationAssociatesQuery,
    SchemaTypes.OrganizationAssociatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationAssociatesQuery, SchemaTypes.OrganizationAssociatesQueryVariables>(
    OrganizationAssociatesDocument,
    options
  );
}

export function useOrganizationAssociatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationAssociatesQuery,
    SchemaTypes.OrganizationAssociatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OrganizationAssociatesQuery, SchemaTypes.OrganizationAssociatesQueryVariables>(
    OrganizationAssociatesDocument,
    options
  );
}

export type OrganizationAssociatesQueryHookResult = ReturnType<typeof useOrganizationAssociatesQuery>;
export type OrganizationAssociatesLazyQueryHookResult = ReturnType<typeof useOrganizationAssociatesLazyQuery>;
export type OrganizationAssociatesQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationAssociatesQuery,
  SchemaTypes.OrganizationAssociatesQueryVariables
>;
export function refetchOrganizationAssociatesQuery(variables: SchemaTypes.OrganizationAssociatesQueryVariables) {
  return { query: OrganizationAssociatesDocument, variables: variables };
}

export const RolesOrganizationDocument = gql`
  query rolesOrganization($input: UUID_NAMEID!) {
    rolesOrganization(rolesData: { organizationID: $input, filter: { visibilities: [ACTIVE, DEMO] } }) {
      id
      spaces {
        nameID
        id
        roles
        displayName
        visibility
        challenges {
          nameID
          id
          displayName
          roles
        }
      }
    }
  }
`;

/**
 * __useRolesOrganizationQuery__
 *
 * To run a query within a React component, call `useRolesOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesOrganizationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRolesOrganizationQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.RolesOrganizationQuery, SchemaTypes.RolesOrganizationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.RolesOrganizationQuery, SchemaTypes.RolesOrganizationQueryVariables>(
    RolesOrganizationDocument,
    options
  );
}

export function useRolesOrganizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.RolesOrganizationQuery,
    SchemaTypes.RolesOrganizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.RolesOrganizationQuery, SchemaTypes.RolesOrganizationQueryVariables>(
    RolesOrganizationDocument,
    options
  );
}

export type RolesOrganizationQueryHookResult = ReturnType<typeof useRolesOrganizationQuery>;
export type RolesOrganizationLazyQueryHookResult = ReturnType<typeof useRolesOrganizationLazyQuery>;
export type RolesOrganizationQueryResult = Apollo.QueryResult<
  SchemaTypes.RolesOrganizationQuery,
  SchemaTypes.RolesOrganizationQueryVariables
>;
export function refetchRolesOrganizationQuery(variables: SchemaTypes.RolesOrganizationQueryVariables) {
  return { query: RolesOrganizationDocument, variables: variables };
}

export const OrganizationInfoDocument = gql`
  query organizationInfo($organizationId: UUID_NAMEID!, $includeAssociates: Boolean = false) {
    organization(ID: $organizationId) {
      ...OrganizationInfo
    }
  }
  ${OrganizationInfoFragmentDoc}
`;

/**
 * __useOrganizationInfoQuery__
 *
 * To run a query within a React component, call `useOrganizationInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationInfoQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      includeAssociates: // value for 'includeAssociates'
 *   },
 * });
 */
export function useOrganizationInfoQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.OrganizationInfoQuery, SchemaTypes.OrganizationInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationInfoQuery, SchemaTypes.OrganizationInfoQueryVariables>(
    OrganizationInfoDocument,
    options
  );
}

export function useOrganizationInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationInfoQuery,
    SchemaTypes.OrganizationInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OrganizationInfoQuery, SchemaTypes.OrganizationInfoQueryVariables>(
    OrganizationInfoDocument,
    options
  );
}

export type OrganizationInfoQueryHookResult = ReturnType<typeof useOrganizationInfoQuery>;
export type OrganizationInfoLazyQueryHookResult = ReturnType<typeof useOrganizationInfoLazyQuery>;
export type OrganizationInfoQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationInfoQuery,
  SchemaTypes.OrganizationInfoQueryVariables
>;
export function refetchOrganizationInfoQuery(variables: SchemaTypes.OrganizationInfoQueryVariables) {
  return { query: OrganizationInfoDocument, variables: variables };
}

export const CreateGroupOnOrganizationDocument = gql`
  mutation createGroupOnOrganization($input: CreateUserGroupInput!) {
    createGroupOnOrganization(groupData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type CreateGroupOnOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateGroupOnOrganizationMutation,
  SchemaTypes.CreateGroupOnOrganizationMutationVariables
>;

/**
 * __useCreateGroupOnOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateGroupOnOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupOnOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupOnOrganizationMutation, { data, loading, error }] = useCreateGroupOnOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupOnOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateGroupOnOrganizationMutation,
    SchemaTypes.CreateGroupOnOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateGroupOnOrganizationMutation,
    SchemaTypes.CreateGroupOnOrganizationMutationVariables
  >(CreateGroupOnOrganizationDocument, options);
}

export type CreateGroupOnOrganizationMutationHookResult = ReturnType<typeof useCreateGroupOnOrganizationMutation>;
export type CreateGroupOnOrganizationMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateGroupOnOrganizationMutation>;
export type CreateGroupOnOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateGroupOnOrganizationMutation,
  SchemaTypes.CreateGroupOnOrganizationMutationVariables
>;
export const CreateOrganizationDocument = gql`
  mutation createOrganization($input: CreateOrganizationInput!) {
    createOrganization(organizationData: $input) {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateOrganizationMutation,
  SchemaTypes.CreateOrganizationMutationVariables
>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateOrganizationMutation,
    SchemaTypes.CreateOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateOrganizationMutation, SchemaTypes.CreateOrganizationMutationVariables>(
    CreateOrganizationDocument,
    options
  );
}

export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<SchemaTypes.CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateOrganizationMutation,
  SchemaTypes.CreateOrganizationMutationVariables
>;
export const DeleteOrganizationDocument = gql`
  mutation deleteOrganization($input: DeleteOrganizationInput!) {
    deleteOrganization(deleteData: $input) {
      id
    }
  }
`;
export type DeleteOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteOrganizationMutation,
  SchemaTypes.DeleteOrganizationMutationVariables
>;

/**
 * __useDeleteOrganizationMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationMutation, { data, loading, error }] = useDeleteOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteOrganizationMutation,
    SchemaTypes.DeleteOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteOrganizationMutation, SchemaTypes.DeleteOrganizationMutationVariables>(
    DeleteOrganizationDocument,
    options
  );
}

export type DeleteOrganizationMutationHookResult = ReturnType<typeof useDeleteOrganizationMutation>;
export type DeleteOrganizationMutationResult = Apollo.MutationResult<SchemaTypes.DeleteOrganizationMutation>;
export type DeleteOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteOrganizationMutation,
  SchemaTypes.DeleteOrganizationMutationVariables
>;
export const UpdateOrganizationDocument = gql`
  mutation updateOrganization($input: UpdateOrganizationInput!) {
    updateOrganization(organizationData: $input) {
      ...OrganizationProfileInfo
    }
  }
  ${OrganizationProfileInfoFragmentDoc}
`;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateOrganizationMutation,
  SchemaTypes.UpdateOrganizationMutationVariables
>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateOrganizationMutation,
    SchemaTypes.UpdateOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateOrganizationMutation, SchemaTypes.UpdateOrganizationMutationVariables>(
    UpdateOrganizationDocument,
    options
  );
}

export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<SchemaTypes.UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateOrganizationMutation,
  SchemaTypes.UpdateOrganizationMutationVariables
>;
export const OrganizationGroupDocument = gql`
  query organizationGroup($organizationId: UUID_NAMEID!, $groupId: UUID!) {
    organization(ID: $organizationId) {
      id
      associates {
        ...GroupMembers
      }
      group(ID: $groupId) {
        ...GroupInfo
      }
    }
  }
  ${GroupMembersFragmentDoc}
  ${GroupInfoFragmentDoc}
`;

/**
 * __useOrganizationGroupQuery__
 *
 * To run a query within a React component, call `useOrganizationGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationGroupQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useOrganizationGroupQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.OrganizationGroupQuery, SchemaTypes.OrganizationGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationGroupQuery, SchemaTypes.OrganizationGroupQueryVariables>(
    OrganizationGroupDocument,
    options
  );
}

export function useOrganizationGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationGroupQuery,
    SchemaTypes.OrganizationGroupQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OrganizationGroupQuery, SchemaTypes.OrganizationGroupQueryVariables>(
    OrganizationGroupDocument,
    options
  );
}

export type OrganizationGroupQueryHookResult = ReturnType<typeof useOrganizationGroupQuery>;
export type OrganizationGroupLazyQueryHookResult = ReturnType<typeof useOrganizationGroupLazyQuery>;
export type OrganizationGroupQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationGroupQuery,
  SchemaTypes.OrganizationGroupQueryVariables
>;
export function refetchOrganizationGroupQuery(variables: SchemaTypes.OrganizationGroupQueryVariables) {
  return { query: OrganizationGroupDocument, variables: variables };
}

export const OrganizationGroupsDocument = gql`
  query organizationGroups($id: UUID_NAMEID!) {
    organization(ID: $id) {
      id
      groups {
        id
        profile {
          id
          displayName
        }
      }
    }
  }
`;

/**
 * __useOrganizationGroupsQuery__
 *
 * To run a query within a React component, call `useOrganizationGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationGroupsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationGroupsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OrganizationGroupsQuery,
    SchemaTypes.OrganizationGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationGroupsQuery, SchemaTypes.OrganizationGroupsQueryVariables>(
    OrganizationGroupsDocument,
    options
  );
}

export function useOrganizationGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationGroupsQuery,
    SchemaTypes.OrganizationGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OrganizationGroupsQuery, SchemaTypes.OrganizationGroupsQueryVariables>(
    OrganizationGroupsDocument,
    options
  );
}

export type OrganizationGroupsQueryHookResult = ReturnType<typeof useOrganizationGroupsQuery>;
export type OrganizationGroupsLazyQueryHookResult = ReturnType<typeof useOrganizationGroupsLazyQuery>;
export type OrganizationGroupsQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationGroupsQuery,
  SchemaTypes.OrganizationGroupsQueryVariables
>;
export function refetchOrganizationGroupsQuery(variables: SchemaTypes.OrganizationGroupsQueryVariables) {
  return { query: OrganizationGroupsDocument, variables: variables };
}

export const OrganizationProfileInfoDocument = gql`
  query organizationProfileInfo($id: UUID_NAMEID!) {
    organization(ID: $id) {
      ...OrganizationProfileInfo
    }
  }
  ${OrganizationProfileInfoFragmentDoc}
`;

/**
 * __useOrganizationProfileInfoQuery__
 *
 * To run a query within a React component, call `useOrganizationProfileInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationProfileInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationProfileInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationProfileInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OrganizationProfileInfoQuery,
    SchemaTypes.OrganizationProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationProfileInfoQuery, SchemaTypes.OrganizationProfileInfoQueryVariables>(
    OrganizationProfileInfoDocument,
    options
  );
}

export function useOrganizationProfileInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationProfileInfoQuery,
    SchemaTypes.OrganizationProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OrganizationProfileInfoQuery,
    SchemaTypes.OrganizationProfileInfoQueryVariables
  >(OrganizationProfileInfoDocument, options);
}

export type OrganizationProfileInfoQueryHookResult = ReturnType<typeof useOrganizationProfileInfoQuery>;
export type OrganizationProfileInfoLazyQueryHookResult = ReturnType<typeof useOrganizationProfileInfoLazyQuery>;
export type OrganizationProfileInfoQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationProfileInfoQuery,
  SchemaTypes.OrganizationProfileInfoQueryVariables
>;
export function refetchOrganizationProfileInfoQuery(variables: SchemaTypes.OrganizationProfileInfoQueryVariables) {
  return { query: OrganizationProfileInfoDocument, variables: variables };
}

export const OrganizationsListDocument = gql`
  query organizationsList($limit: Float, $shuffle: Boolean, $filterCredentials: [AuthorizationCredential!]) {
    organizations(limit: $limit, shuffle: $shuffle, filter: { credentials: $filterCredentials }) {
      id
      nameID
      profile {
        id
        displayName
        visual(type: AVATAR) {
          ...VisualUri
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
`;

/**
 * __useOrganizationsListQuery__
 *
 * To run a query within a React component, call `useOrganizationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationsListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      shuffle: // value for 'shuffle'
 *      filterCredentials: // value for 'filterCredentials'
 *   },
 * });
 */
export function useOrganizationsListQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.OrganizationsListQuery, SchemaTypes.OrganizationsListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OrganizationsListQuery, SchemaTypes.OrganizationsListQueryVariables>(
    OrganizationsListDocument,
    options
  );
}

export function useOrganizationsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationsListQuery,
    SchemaTypes.OrganizationsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OrganizationsListQuery, SchemaTypes.OrganizationsListQueryVariables>(
    OrganizationsListDocument,
    options
  );
}

export type OrganizationsListQueryHookResult = ReturnType<typeof useOrganizationsListQuery>;
export type OrganizationsListLazyQueryHookResult = ReturnType<typeof useOrganizationsListLazyQuery>;
export type OrganizationsListQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationsListQuery,
  SchemaTypes.OrganizationsListQueryVariables
>;
export function refetchOrganizationsListQuery(variables?: SchemaTypes.OrganizationsListQueryVariables) {
  return { query: OrganizationsListDocument, variables: variables };
}

export const DeleteInvitationDocument = gql`
  mutation DeleteInvitation($invitationId: UUID!) {
    deleteInvitation(deleteData: { ID: $invitationId }) {
      id
    }
  }
`;
export type DeleteInvitationMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteInvitationMutation,
  SchemaTypes.DeleteInvitationMutationVariables
>;

/**
 * __useDeleteInvitationMutation__
 *
 * To run a mutation, you first call `useDeleteInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvitationMutation, { data, loading, error }] = useDeleteInvitationMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useDeleteInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteInvitationMutation,
    SchemaTypes.DeleteInvitationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteInvitationMutation, SchemaTypes.DeleteInvitationMutationVariables>(
    DeleteInvitationDocument,
    options
  );
}

export type DeleteInvitationMutationHookResult = ReturnType<typeof useDeleteInvitationMutation>;
export type DeleteInvitationMutationResult = Apollo.MutationResult<SchemaTypes.DeleteInvitationMutation>;
export type DeleteInvitationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteInvitationMutation,
  SchemaTypes.DeleteInvitationMutationVariables
>;
export const DeleteExternalInvitationDocument = gql`
  mutation DeleteExternalInvitation($invitationId: UUID!) {
    deleteInvitationExternal(deleteData: { ID: $invitationId }) {
      id
    }
  }
`;
export type DeleteExternalInvitationMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteExternalInvitationMutation,
  SchemaTypes.DeleteExternalInvitationMutationVariables
>;

/**
 * __useDeleteExternalInvitationMutation__
 *
 * To run a mutation, you first call `useDeleteExternalInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExternalInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExternalInvitationMutation, { data, loading, error }] = useDeleteExternalInvitationMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useDeleteExternalInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteExternalInvitationMutation,
    SchemaTypes.DeleteExternalInvitationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.DeleteExternalInvitationMutation,
    SchemaTypes.DeleteExternalInvitationMutationVariables
  >(DeleteExternalInvitationDocument, options);
}

export type DeleteExternalInvitationMutationHookResult = ReturnType<typeof useDeleteExternalInvitationMutation>;
export type DeleteExternalInvitationMutationResult =
  Apollo.MutationResult<SchemaTypes.DeleteExternalInvitationMutation>;
export type DeleteExternalInvitationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteExternalInvitationMutation,
  SchemaTypes.DeleteExternalInvitationMutationVariables
>;
export const InvitationStateEventDocument = gql`
  mutation InvitationStateEvent($eventName: String!, $invitationId: UUID!) {
    eventOnCommunityInvitation(invitationEventData: { eventName: $eventName, invitationID: $invitationId }) {
      id
      lifecycle {
        id
        nextEvents
        state
      }
    }
  }
`;
export type InvitationStateEventMutationFn = Apollo.MutationFunction<
  SchemaTypes.InvitationStateEventMutation,
  SchemaTypes.InvitationStateEventMutationVariables
>;

/**
 * __useInvitationStateEventMutation__
 *
 * To run a mutation, you first call `useInvitationStateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvitationStateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invitationStateEventMutation, { data, loading, error }] = useInvitationStateEventMutation({
 *   variables: {
 *      eventName: // value for 'eventName'
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useInvitationStateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.InvitationStateEventMutation,
    SchemaTypes.InvitationStateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.InvitationStateEventMutation,
    SchemaTypes.InvitationStateEventMutationVariables
  >(InvitationStateEventDocument, options);
}

export type InvitationStateEventMutationHookResult = ReturnType<typeof useInvitationStateEventMutation>;
export type InvitationStateEventMutationResult = Apollo.MutationResult<SchemaTypes.InvitationStateEventMutation>;
export type InvitationStateEventMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.InvitationStateEventMutation,
  SchemaTypes.InvitationStateEventMutationVariables
>;
export const InviteExistingUserDocument = gql`
  mutation InviteExistingUser($userIds: [UUID!]!, $communityId: UUID!, $message: String) {
    inviteExistingUserForCommunityMembership(
      invitationData: { invitedUsers: $userIds, communityID: $communityId, welcomeMessage: $message }
    ) {
      id
    }
  }
`;
export type InviteExistingUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.InviteExistingUserMutation,
  SchemaTypes.InviteExistingUserMutationVariables
>;

/**
 * __useInviteExistingUserMutation__
 *
 * To run a mutation, you first call `useInviteExistingUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteExistingUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteExistingUserMutation, { data, loading, error }] = useInviteExistingUserMutation({
 *   variables: {
 *      userIds: // value for 'userIds'
 *      communityId: // value for 'communityId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInviteExistingUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.InviteExistingUserMutation,
    SchemaTypes.InviteExistingUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.InviteExistingUserMutation, SchemaTypes.InviteExistingUserMutationVariables>(
    InviteExistingUserDocument,
    options
  );
}

export type InviteExistingUserMutationHookResult = ReturnType<typeof useInviteExistingUserMutation>;
export type InviteExistingUserMutationResult = Apollo.MutationResult<SchemaTypes.InviteExistingUserMutation>;
export type InviteExistingUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.InviteExistingUserMutation,
  SchemaTypes.InviteExistingUserMutationVariables
>;
export const InviteExternalUserDocument = gql`
  mutation InviteExternalUser($email: String!, $communityId: UUID!, $message: String) {
    inviteExternalUserForCommunityMembership(
      invitationData: { email: $email, communityID: $communityId, welcomeMessage: $message }
    ) {
      id
    }
  }
`;
export type InviteExternalUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.InviteExternalUserMutation,
  SchemaTypes.InviteExternalUserMutationVariables
>;

/**
 * __useInviteExternalUserMutation__
 *
 * To run a mutation, you first call `useInviteExternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteExternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteExternalUserMutation, { data, loading, error }] = useInviteExternalUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      communityId: // value for 'communityId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInviteExternalUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.InviteExternalUserMutation,
    SchemaTypes.InviteExternalUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.InviteExternalUserMutation, SchemaTypes.InviteExternalUserMutationVariables>(
    InviteExternalUserDocument,
    options
  );
}

export type InviteExternalUserMutationHookResult = ReturnType<typeof useInviteExternalUserMutation>;
export type InviteExternalUserMutationResult = Apollo.MutationResult<SchemaTypes.InviteExternalUserMutation>;
export type InviteExternalUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.InviteExternalUserMutation,
  SchemaTypes.InviteExternalUserMutationVariables
>;
export const PendingMembershipsSpaceDocument = gql`
  query PendingMembershipsSpace($spaceId: UUID_NAMEID!, $fetchDetails: Boolean! = false) {
    space(ID: $spaceId) {
      id
      nameID
      profile {
        ...PendingMembershipsJourneyProfile
      }
    }
  }
  ${PendingMembershipsJourneyProfileFragmentDoc}
`;

/**
 * __usePendingMembershipsSpaceQuery__
 *
 * To run a query within a React component, call `usePendingMembershipsSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingMembershipsSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingMembershipsSpaceQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      fetchDetails: // value for 'fetchDetails'
 *   },
 * });
 */
export function usePendingMembershipsSpaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PendingMembershipsSpaceQuery,
    SchemaTypes.PendingMembershipsSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.PendingMembershipsSpaceQuery, SchemaTypes.PendingMembershipsSpaceQueryVariables>(
    PendingMembershipsSpaceDocument,
    options
  );
}

export function usePendingMembershipsSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PendingMembershipsSpaceQuery,
    SchemaTypes.PendingMembershipsSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PendingMembershipsSpaceQuery,
    SchemaTypes.PendingMembershipsSpaceQueryVariables
  >(PendingMembershipsSpaceDocument, options);
}

export type PendingMembershipsSpaceQueryHookResult = ReturnType<typeof usePendingMembershipsSpaceQuery>;
export type PendingMembershipsSpaceLazyQueryHookResult = ReturnType<typeof usePendingMembershipsSpaceLazyQuery>;
export type PendingMembershipsSpaceQueryResult = Apollo.QueryResult<
  SchemaTypes.PendingMembershipsSpaceQuery,
  SchemaTypes.PendingMembershipsSpaceQueryVariables
>;
export function refetchPendingMembershipsSpaceQuery(variables: SchemaTypes.PendingMembershipsSpaceQueryVariables) {
  return { query: PendingMembershipsSpaceDocument, variables: variables };
}

export const PendingMembershipsChallengeDocument = gql`
  query PendingMembershipsChallenge(
    $spaceId: UUID_NAMEID!
    $challengeId: UUID_NAMEID!
    $fetchDetails: Boolean! = false
  ) {
    space(ID: $spaceId) {
      id
      nameID
      challenge(ID: $challengeId) {
        id
        nameID
        profile {
          ...PendingMembershipsJourneyProfile
        }
      }
    }
  }
  ${PendingMembershipsJourneyProfileFragmentDoc}
`;

/**
 * __usePendingMembershipsChallengeQuery__
 *
 * To run a query within a React component, call `usePendingMembershipsChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingMembershipsChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingMembershipsChallengeQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *      fetchDetails: // value for 'fetchDetails'
 *   },
 * });
 */
export function usePendingMembershipsChallengeQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PendingMembershipsChallengeQuery,
    SchemaTypes.PendingMembershipsChallengeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PendingMembershipsChallengeQuery,
    SchemaTypes.PendingMembershipsChallengeQueryVariables
  >(PendingMembershipsChallengeDocument, options);
}

export function usePendingMembershipsChallengeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PendingMembershipsChallengeQuery,
    SchemaTypes.PendingMembershipsChallengeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PendingMembershipsChallengeQuery,
    SchemaTypes.PendingMembershipsChallengeQueryVariables
  >(PendingMembershipsChallengeDocument, options);
}

export type PendingMembershipsChallengeQueryHookResult = ReturnType<typeof usePendingMembershipsChallengeQuery>;
export type PendingMembershipsChallengeLazyQueryHookResult = ReturnType<typeof usePendingMembershipsChallengeLazyQuery>;
export type PendingMembershipsChallengeQueryResult = Apollo.QueryResult<
  SchemaTypes.PendingMembershipsChallengeQuery,
  SchemaTypes.PendingMembershipsChallengeQueryVariables
>;
export function refetchPendingMembershipsChallengeQuery(
  variables: SchemaTypes.PendingMembershipsChallengeQueryVariables
) {
  return { query: PendingMembershipsChallengeDocument, variables: variables };
}

export const PendingMembershipsOpportunityDocument = gql`
  query PendingMembershipsOpportunity(
    $spaceId: UUID_NAMEID!
    $opportunityId: UUID_NAMEID!
    $fetchDetails: Boolean! = false
  ) {
    space(ID: $spaceId) {
      id
      nameID
      opportunity(ID: $opportunityId) {
        id
        nameID
        parentNameID
        profile {
          ...PendingMembershipsJourneyProfile
        }
      }
    }
  }
  ${PendingMembershipsJourneyProfileFragmentDoc}
`;

/**
 * __usePendingMembershipsOpportunityQuery__
 *
 * To run a query within a React component, call `usePendingMembershipsOpportunityQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingMembershipsOpportunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingMembershipsOpportunityQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *      fetchDetails: // value for 'fetchDetails'
 *   },
 * });
 */
export function usePendingMembershipsOpportunityQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PendingMembershipsOpportunityQuery,
    SchemaTypes.PendingMembershipsOpportunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PendingMembershipsOpportunityQuery,
    SchemaTypes.PendingMembershipsOpportunityQueryVariables
  >(PendingMembershipsOpportunityDocument, options);
}

export function usePendingMembershipsOpportunityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PendingMembershipsOpportunityQuery,
    SchemaTypes.PendingMembershipsOpportunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PendingMembershipsOpportunityQuery,
    SchemaTypes.PendingMembershipsOpportunityQueryVariables
  >(PendingMembershipsOpportunityDocument, options);
}

export type PendingMembershipsOpportunityQueryHookResult = ReturnType<typeof usePendingMembershipsOpportunityQuery>;
export type PendingMembershipsOpportunityLazyQueryHookResult = ReturnType<
  typeof usePendingMembershipsOpportunityLazyQuery
>;
export type PendingMembershipsOpportunityQueryResult = Apollo.QueryResult<
  SchemaTypes.PendingMembershipsOpportunityQuery,
  SchemaTypes.PendingMembershipsOpportunityQueryVariables
>;
export function refetchPendingMembershipsOpportunityQuery(
  variables: SchemaTypes.PendingMembershipsOpportunityQueryVariables
) {
  return { query: PendingMembershipsOpportunityDocument, variables: variables };
}

export const PendingMembershipsUserDocument = gql`
  query PendingMembershipsUser($userId: UUID!) {
    users(IDs: [$userId]) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;

/**
 * __usePendingMembershipsUserQuery__
 *
 * To run a query within a React component, call `usePendingMembershipsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingMembershipsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingMembershipsUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePendingMembershipsUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.PendingMembershipsUserQuery,
    SchemaTypes.PendingMembershipsUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.PendingMembershipsUserQuery, SchemaTypes.PendingMembershipsUserQueryVariables>(
    PendingMembershipsUserDocument,
    options
  );
}

export function usePendingMembershipsUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PendingMembershipsUserQuery,
    SchemaTypes.PendingMembershipsUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.PendingMembershipsUserQuery, SchemaTypes.PendingMembershipsUserQueryVariables>(
    PendingMembershipsUserDocument,
    options
  );
}

export type PendingMembershipsUserQueryHookResult = ReturnType<typeof usePendingMembershipsUserQuery>;
export type PendingMembershipsUserLazyQueryHookResult = ReturnType<typeof usePendingMembershipsUserLazyQuery>;
export type PendingMembershipsUserQueryResult = Apollo.QueryResult<
  SchemaTypes.PendingMembershipsUserQuery,
  SchemaTypes.PendingMembershipsUserQueryVariables
>;
export function refetchPendingMembershipsUserQuery(variables: SchemaTypes.PendingMembershipsUserQueryVariables) {
  return { query: PendingMembershipsUserDocument, variables: variables };
}

export const SpaceContributionDetailsDocument = gql`
  query spaceContributionDetails($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      visibility
      profile {
        id
        displayName
        tagline
        visuals {
          ...VisualUri
        }
        tagset {
          ...TagsetDetails
        }
      }
      context {
        id
      }
      community {
        id
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;

/**
 * __useSpaceContributionDetailsQuery__
 *
 * To run a query within a React component, call `useSpaceContributionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceContributionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceContributionDetailsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceContributionDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceContributionDetailsQuery,
    SchemaTypes.SpaceContributionDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceContributionDetailsQuery, SchemaTypes.SpaceContributionDetailsQueryVariables>(
    SpaceContributionDetailsDocument,
    options
  );
}

export function useSpaceContributionDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceContributionDetailsQuery,
    SchemaTypes.SpaceContributionDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceContributionDetailsQuery,
    SchemaTypes.SpaceContributionDetailsQueryVariables
  >(SpaceContributionDetailsDocument, options);
}

export type SpaceContributionDetailsQueryHookResult = ReturnType<typeof useSpaceContributionDetailsQuery>;
export type SpaceContributionDetailsLazyQueryHookResult = ReturnType<typeof useSpaceContributionDetailsLazyQuery>;
export type SpaceContributionDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceContributionDetailsQuery,
  SchemaTypes.SpaceContributionDetailsQueryVariables
>;
export function refetchSpaceContributionDetailsQuery(variables: SchemaTypes.SpaceContributionDetailsQueryVariables) {
  return { query: SpaceContributionDetailsDocument, variables: variables };
}

export const ChallengeContributionDetailsDocument = gql`
  query challengeContributionDetails($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      challenge(ID: $challengeId) {
        id
        nameID
        profile {
          id
          displayName
          tagset {
            ...TagsetDetails
          }
          tagline
          visuals {
            ...VisualUri
          }
        }
        context {
          id
        }
        community {
          id
        }
      }
      visibility
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;

/**
 * __useChallengeContributionDetailsQuery__
 *
 * To run a query within a React component, call `useChallengeContributionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeContributionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeContributionDetailsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeContributionDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeContributionDetailsQuery,
    SchemaTypes.ChallengeContributionDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeContributionDetailsQuery,
    SchemaTypes.ChallengeContributionDetailsQueryVariables
  >(ChallengeContributionDetailsDocument, options);
}

export function useChallengeContributionDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeContributionDetailsQuery,
    SchemaTypes.ChallengeContributionDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeContributionDetailsQuery,
    SchemaTypes.ChallengeContributionDetailsQueryVariables
  >(ChallengeContributionDetailsDocument, options);
}

export type ChallengeContributionDetailsQueryHookResult = ReturnType<typeof useChallengeContributionDetailsQuery>;
export type ChallengeContributionDetailsLazyQueryHookResult = ReturnType<
  typeof useChallengeContributionDetailsLazyQuery
>;
export type ChallengeContributionDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeContributionDetailsQuery,
  SchemaTypes.ChallengeContributionDetailsQueryVariables
>;
export function refetchChallengeContributionDetailsQuery(
  variables: SchemaTypes.ChallengeContributionDetailsQueryVariables
) {
  return { query: ChallengeContributionDetailsDocument, variables: variables };
}

export const OpportunityContributionDetailsDocument = gql`
  query opportunityContributionDetails($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      opportunity(ID: $opportunityId) {
        id
        nameID
        profile {
          id
          displayName
          tagset {
            ...TagsetDetails
          }
          tagline
          visuals {
            ...VisualUri
          }
        }
        parentNameID
        context {
          id
        }
        community {
          id
        }
      }
      visibility
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualUriFragmentDoc}
`;

/**
 * __useOpportunityContributionDetailsQuery__
 *
 * To run a query within a React component, call `useOpportunityContributionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityContributionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityContributionDetailsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityContributionDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityContributionDetailsQuery,
    SchemaTypes.OpportunityContributionDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityContributionDetailsQuery,
    SchemaTypes.OpportunityContributionDetailsQueryVariables
  >(OpportunityContributionDetailsDocument, options);
}

export function useOpportunityContributionDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityContributionDetailsQuery,
    SchemaTypes.OpportunityContributionDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityContributionDetailsQuery,
    SchemaTypes.OpportunityContributionDetailsQueryVariables
  >(OpportunityContributionDetailsDocument, options);
}

export type OpportunityContributionDetailsQueryHookResult = ReturnType<typeof useOpportunityContributionDetailsQuery>;
export type OpportunityContributionDetailsLazyQueryHookResult = ReturnType<
  typeof useOpportunityContributionDetailsLazyQuery
>;
export type OpportunityContributionDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityContributionDetailsQuery,
  SchemaTypes.OpportunityContributionDetailsQueryVariables
>;
export function refetchOpportunityContributionDetailsQuery(
  variables: SchemaTypes.OpportunityContributionDetailsQueryVariables
) {
  return { query: OpportunityContributionDetailsDocument, variables: variables };
}

export const UserSelectorDocument = gql`
  query UserSelector($filter: UserFilterInput, $first: Int) {
    usersPaginated(filter: $filter, first: $first) {
      users {
        ...UserSelectorUserInformation
      }
    }
  }
  ${UserSelectorUserInformationFragmentDoc}
`;

/**
 * __useUserSelectorQuery__
 *
 * To run a query within a React component, call `useUserSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSelectorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSelectorQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useUserSelectorQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.UserSelectorQuery, SchemaTypes.UserSelectorQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserSelectorQuery, SchemaTypes.UserSelectorQueryVariables>(
    UserSelectorDocument,
    options
  );
}

export function useUserSelectorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserSelectorQuery, SchemaTypes.UserSelectorQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserSelectorQuery, SchemaTypes.UserSelectorQueryVariables>(
    UserSelectorDocument,
    options
  );
}

export type UserSelectorQueryHookResult = ReturnType<typeof useUserSelectorQuery>;
export type UserSelectorLazyQueryHookResult = ReturnType<typeof useUserSelectorLazyQuery>;
export type UserSelectorQueryResult = Apollo.QueryResult<
  SchemaTypes.UserSelectorQuery,
  SchemaTypes.UserSelectorQueryVariables
>;
export function refetchUserSelectorQuery(variables?: SchemaTypes.UserSelectorQueryVariables) {
  return { query: UserSelectorDocument, variables: variables };
}

export const UserSelectorUserDetailsDocument = gql`
  query UserSelectorUserDetails($id: UUID_NAMEID_EMAIL!) {
    user(ID: $id) {
      ...UserSelectorUserInformation
    }
  }
  ${UserSelectorUserInformationFragmentDoc}
`;

/**
 * __useUserSelectorUserDetailsQuery__
 *
 * To run a query within a React component, call `useUserSelectorUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSelectorUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSelectorUserDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserSelectorUserDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UserSelectorUserDetailsQuery,
    SchemaTypes.UserSelectorUserDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserSelectorUserDetailsQuery, SchemaTypes.UserSelectorUserDetailsQueryVariables>(
    UserSelectorUserDetailsDocument,
    options
  );
}

export function useUserSelectorUserDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserSelectorUserDetailsQuery,
    SchemaTypes.UserSelectorUserDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.UserSelectorUserDetailsQuery,
    SchemaTypes.UserSelectorUserDetailsQueryVariables
  >(UserSelectorUserDetailsDocument, options);
}

export type UserSelectorUserDetailsQueryHookResult = ReturnType<typeof useUserSelectorUserDetailsQuery>;
export type UserSelectorUserDetailsLazyQueryHookResult = ReturnType<typeof useUserSelectorUserDetailsLazyQuery>;
export type UserSelectorUserDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.UserSelectorUserDetailsQuery,
  SchemaTypes.UserSelectorUserDetailsQueryVariables
>;
export function refetchUserSelectorUserDetailsQuery(variables: SchemaTypes.UserSelectorUserDetailsQueryVariables) {
  return { query: UserSelectorUserDetailsDocument, variables: variables };
}

export const PlatformLevelAuthorizationDocument = gql`
  query PlatformLevelAuthorization {
    platform {
      authorization {
        ...MyPrivileges
      }
    }
  }
  ${MyPrivilegesFragmentDoc}
`;

/**
 * __usePlatformLevelAuthorizationQuery__
 *
 * To run a query within a React component, call `usePlatformLevelAuthorizationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformLevelAuthorizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformLevelAuthorizationQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlatformLevelAuthorizationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.PlatformLevelAuthorizationQuery,
    SchemaTypes.PlatformLevelAuthorizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.PlatformLevelAuthorizationQuery,
    SchemaTypes.PlatformLevelAuthorizationQueryVariables
  >(PlatformLevelAuthorizationDocument, options);
}

export function usePlatformLevelAuthorizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformLevelAuthorizationQuery,
    SchemaTypes.PlatformLevelAuthorizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.PlatformLevelAuthorizationQuery,
    SchemaTypes.PlatformLevelAuthorizationQueryVariables
  >(PlatformLevelAuthorizationDocument, options);
}

export type PlatformLevelAuthorizationQueryHookResult = ReturnType<typeof usePlatformLevelAuthorizationQuery>;
export type PlatformLevelAuthorizationLazyQueryHookResult = ReturnType<typeof usePlatformLevelAuthorizationLazyQuery>;
export type PlatformLevelAuthorizationQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformLevelAuthorizationQuery,
  SchemaTypes.PlatformLevelAuthorizationQueryVariables
>;
export function refetchPlatformLevelAuthorizationQuery(
  variables?: SchemaTypes.PlatformLevelAuthorizationQueryVariables
) {
  return { query: PlatformLevelAuthorizationDocument, variables: variables };
}

export const UserAvatarsDocument = gql`
  query userAvatars($ids: [UUID!]!) {
    users(IDs: $ids) {
      id
      nameID
      profile {
        id
        displayName
        location {
          country
          city
        }
        visual(type: AVATAR) {
          ...VisualUri
        }
        tagsets {
          ...TagsetDetails
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;

/**
 * __useUserAvatarsQuery__
 *
 * To run a query within a React component, call `useUserAvatarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAvatarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAvatarsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUserAvatarsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.UserAvatarsQuery, SchemaTypes.UserAvatarsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserAvatarsQuery, SchemaTypes.UserAvatarsQueryVariables>(
    UserAvatarsDocument,
    options
  );
}

export function useUserAvatarsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserAvatarsQuery, SchemaTypes.UserAvatarsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserAvatarsQuery, SchemaTypes.UserAvatarsQueryVariables>(
    UserAvatarsDocument,
    options
  );
}

export type UserAvatarsQueryHookResult = ReturnType<typeof useUserAvatarsQuery>;
export type UserAvatarsLazyQueryHookResult = ReturnType<typeof useUserAvatarsLazyQuery>;
export type UserAvatarsQueryResult = Apollo.QueryResult<
  SchemaTypes.UserAvatarsQuery,
  SchemaTypes.UserAvatarsQueryVariables
>;
export function refetchUserAvatarsQuery(variables: SchemaTypes.UserAvatarsQueryVariables) {
  return { query: UserAvatarsDocument, variables: variables };
}

export const AssignUserToGroupDocument = gql`
  mutation assignUserToGroup($input: AssignUserGroupMemberInput!) {
    assignUserToGroup(membershipData: $input) {
      id
      members {
        ...GroupMembers
      }
    }
  }
  ${GroupMembersFragmentDoc}
`;
export type AssignUserToGroupMutationFn = Apollo.MutationFunction<
  SchemaTypes.AssignUserToGroupMutation,
  SchemaTypes.AssignUserToGroupMutationVariables
>;

/**
 * __useAssignUserToGroupMutation__
 *
 * To run a mutation, you first call `useAssignUserToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserToGroupMutation, { data, loading, error }] = useAssignUserToGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserToGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.AssignUserToGroupMutation,
    SchemaTypes.AssignUserToGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.AssignUserToGroupMutation, SchemaTypes.AssignUserToGroupMutationVariables>(
    AssignUserToGroupDocument,
    options
  );
}

export type AssignUserToGroupMutationHookResult = ReturnType<typeof useAssignUserToGroupMutation>;
export type AssignUserToGroupMutationResult = Apollo.MutationResult<SchemaTypes.AssignUserToGroupMutation>;
export type AssignUserToGroupMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.AssignUserToGroupMutation,
  SchemaTypes.AssignUserToGroupMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(userData: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateUserMutation,
  SchemaTypes.CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.CreateUserMutation, SchemaTypes.CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateUserMutation, SchemaTypes.CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}

export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<SchemaTypes.CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateUserMutation,
  SchemaTypes.CreateUserMutationVariables
>;
export const CreateUserNewRegistrationDocument = gql`
  mutation createUserNewRegistration {
    createUserNewRegistration {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export type CreateUserNewRegistrationMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateUserNewRegistrationMutation,
  SchemaTypes.CreateUserNewRegistrationMutationVariables
>;

/**
 * __useCreateUserNewRegistrationMutation__
 *
 * To run a mutation, you first call `useCreateUserNewRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserNewRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserNewRegistrationMutation, { data, loading, error }] = useCreateUserNewRegistrationMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserNewRegistrationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateUserNewRegistrationMutation,
    SchemaTypes.CreateUserNewRegistrationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateUserNewRegistrationMutation,
    SchemaTypes.CreateUserNewRegistrationMutationVariables
  >(CreateUserNewRegistrationDocument, options);
}

export type CreateUserNewRegistrationMutationHookResult = ReturnType<typeof useCreateUserNewRegistrationMutation>;
export type CreateUserNewRegistrationMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateUserNewRegistrationMutation>;
export type CreateUserNewRegistrationMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateUserNewRegistrationMutation,
  SchemaTypes.CreateUserNewRegistrationMutationVariables
>;
export const DeleteGroupDocument = gql`
  mutation deleteGroup($input: DeleteUserGroupInput!) {
    deleteUserGroup(deleteData: $input) {
      id
      name
    }
  }
`;
export type DeleteGroupMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteGroupMutation,
  SchemaTypes.DeleteGroupMutationVariables
>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.DeleteGroupMutation, SchemaTypes.DeleteGroupMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteGroupMutation, SchemaTypes.DeleteGroupMutationVariables>(
    DeleteGroupDocument,
    options
  );
}

export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<SchemaTypes.DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteGroupMutation,
  SchemaTypes.DeleteGroupMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(deleteData: $input) {
      id
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteUserMutation,
  SchemaTypes.DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.DeleteUserMutation, SchemaTypes.DeleteUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteUserMutation, SchemaTypes.DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}

export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<SchemaTypes.DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteUserMutation,
  SchemaTypes.DeleteUserMutationVariables
>;
export const RemoveUserFromGroupDocument = gql`
  mutation removeUserFromGroup($input: RemoveUserGroupMemberInput!) {
    removeUserFromGroup(membershipData: $input) {
      id
      name
      members {
        ...GroupMembers
      }
    }
  }
  ${GroupMembersFragmentDoc}
`;
export type RemoveUserFromGroupMutationFn = Apollo.MutationFunction<
  SchemaTypes.RemoveUserFromGroupMutation,
  SchemaTypes.RemoveUserFromGroupMutationVariables
>;

/**
 * __useRemoveUserFromGroupMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromGroupMutation, { data, loading, error }] = useRemoveUserFromGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserFromGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.RemoveUserFromGroupMutation,
    SchemaTypes.RemoveUserFromGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.RemoveUserFromGroupMutation, SchemaTypes.RemoveUserFromGroupMutationVariables>(
    RemoveUserFromGroupDocument,
    options
  );
}

export type RemoveUserFromGroupMutationHookResult = ReturnType<typeof useRemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationResult = Apollo.MutationResult<SchemaTypes.RemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.RemoveUserFromGroupMutation,
  SchemaTypes.RemoveUserFromGroupMutationVariables
>;
export const UpdateGroupDocument = gql`
  mutation updateGroup($input: UpdateUserGroupInput!) {
    updateUserGroup(userGroupData: $input) {
      id
      name
      profile {
        id
        visual(type: AVATAR) {
          ...VisualUri
        }
        description
        references {
          uri
          name
          description
        }
        tagsets {
          ...TagsetDetails
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export type UpdateGroupMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateGroupMutation,
  SchemaTypes.UpdateGroupMutationVariables
>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.UpdateGroupMutation, SchemaTypes.UpdateGroupMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateGroupMutation, SchemaTypes.UpdateGroupMutationVariables>(
    UpdateGroupDocument,
    options
  );
}

export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<SchemaTypes.UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateGroupMutation,
  SchemaTypes.UpdateGroupMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(userData: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateUserMutation,
  SchemaTypes.UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.UpdateUserMutation, SchemaTypes.UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateUserMutation, SchemaTypes.UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}

export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<SchemaTypes.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateUserMutation,
  SchemaTypes.UpdateUserMutationVariables
>;
export const UpdatePreferenceOnUserDocument = gql`
  mutation updatePreferenceOnUser($input: UpdateUserPreferenceInput!) {
    updatePreferenceOnUser(preferenceData: $input) {
      id
      value
    }
  }
`;
export type UpdatePreferenceOnUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdatePreferenceOnUserMutation,
  SchemaTypes.UpdatePreferenceOnUserMutationVariables
>;

/**
 * __useUpdatePreferenceOnUserMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceOnUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceOnUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceOnUserMutation, { data, loading, error }] = useUpdatePreferenceOnUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePreferenceOnUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdatePreferenceOnUserMutation,
    SchemaTypes.UpdatePreferenceOnUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdatePreferenceOnUserMutation,
    SchemaTypes.UpdatePreferenceOnUserMutationVariables
  >(UpdatePreferenceOnUserDocument, options);
}

export type UpdatePreferenceOnUserMutationHookResult = ReturnType<typeof useUpdatePreferenceOnUserMutation>;
export type UpdatePreferenceOnUserMutationResult = Apollo.MutationResult<SchemaTypes.UpdatePreferenceOnUserMutation>;
export type UpdatePreferenceOnUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdatePreferenceOnUserMutation,
  SchemaTypes.UpdatePreferenceOnUserMutationVariables
>;
export const UserDocument = gql`
  query user($id: UUID_NAMEID_EMAIL!) {
    user(ID: $id) {
      ...UserDetails
      ...UserAgent
    }
  }
  ${UserDetailsFragmentDoc}
  ${UserAgentFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.UserQuery, SchemaTypes.UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserQuery, SchemaTypes.UserQueryVariables>(UserDocument, options);
}

export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserQuery, SchemaTypes.UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserQuery, SchemaTypes.UserQueryVariables>(UserDocument, options);
}

export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<SchemaTypes.UserQuery, SchemaTypes.UserQueryVariables>;
export function refetchUserQuery(variables: SchemaTypes.UserQueryVariables) {
  return { query: UserDocument, variables: variables };
}

export const UserNotificationsPreferencesDocument = gql`
  query userNotificationsPreferences($userId: UUID_NAMEID_EMAIL!) {
    user(ID: $userId) {
      id
      preferences {
        id
        definition {
          id
          description
          displayName
          group
          type
          valueType
        }
        value
      }
    }
  }
`;

/**
 * __useUserNotificationsPreferencesQuery__
 *
 * To run a query within a React component, call `useUserNotificationsPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNotificationsPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNotificationsPreferencesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserNotificationsPreferencesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UserNotificationsPreferencesQuery,
    SchemaTypes.UserNotificationsPreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.UserNotificationsPreferencesQuery,
    SchemaTypes.UserNotificationsPreferencesQueryVariables
  >(UserNotificationsPreferencesDocument, options);
}

export function useUserNotificationsPreferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserNotificationsPreferencesQuery,
    SchemaTypes.UserNotificationsPreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.UserNotificationsPreferencesQuery,
    SchemaTypes.UserNotificationsPreferencesQueryVariables
  >(UserNotificationsPreferencesDocument, options);
}

export type UserNotificationsPreferencesQueryHookResult = ReturnType<typeof useUserNotificationsPreferencesQuery>;
export type UserNotificationsPreferencesLazyQueryHookResult = ReturnType<
  typeof useUserNotificationsPreferencesLazyQuery
>;
export type UserNotificationsPreferencesQueryResult = Apollo.QueryResult<
  SchemaTypes.UserNotificationsPreferencesQuery,
  SchemaTypes.UserNotificationsPreferencesQueryVariables
>;
export function refetchUserNotificationsPreferencesQuery(
  variables: SchemaTypes.UserNotificationsPreferencesQueryVariables
) {
  return { query: UserNotificationsPreferencesDocument, variables: variables };
}

export const UserProfileDocument = gql`
  query userProfile($input: UUID_NAMEID_EMAIL!) {
    user(ID: $input) {
      isContactable
      ...UserDetails
      ...UserAgent
    }
    rolesUser(rolesData: { userID: $input, filter: { visibilities: [ACTIVE, DEMO] } }) {
      id
      ...UserRolesDetails
    }
    platform {
      authorization {
        ...MyPrivileges
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${UserAgentFragmentDoc}
  ${UserRolesDetailsFragmentDoc}
  ${MyPrivilegesFragmentDoc}
`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.UserProfileQuery, SchemaTypes.UserProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserProfileQuery, SchemaTypes.UserProfileQueryVariables>(
    UserProfileDocument,
    options
  );
}

export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserProfileQuery, SchemaTypes.UserProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserProfileQuery, SchemaTypes.UserProfileQueryVariables>(
    UserProfileDocument,
    options
  );
}

export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<
  SchemaTypes.UserProfileQuery,
  SchemaTypes.UserProfileQueryVariables
>;
export function refetchUserProfileQuery(variables: SchemaTypes.UserProfileQueryVariables) {
  return { query: UserProfileDocument, variables: variables };
}

export const UsersWithCredentialsDocument = gql`
  query usersWithCredentials($input: UsersWithAuthorizationCredentialInput!) {
    usersWithAuthorizationCredential(credentialsCriteriaData: $input) {
      id
      nameID
      firstName
      lastName
      email
      profile {
        id
        displayName
        visual(type: AVATAR) {
          ...VisualUri
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
`;

/**
 * __useUsersWithCredentialsQuery__
 *
 * To run a query within a React component, call `useUsersWithCredentialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithCredentialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithCredentialsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersWithCredentialsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UsersWithCredentialsQuery,
    SchemaTypes.UsersWithCredentialsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UsersWithCredentialsQuery, SchemaTypes.UsersWithCredentialsQueryVariables>(
    UsersWithCredentialsDocument,
    options
  );
}

export function useUsersWithCredentialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UsersWithCredentialsQuery,
    SchemaTypes.UsersWithCredentialsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UsersWithCredentialsQuery, SchemaTypes.UsersWithCredentialsQueryVariables>(
    UsersWithCredentialsDocument,
    options
  );
}

export type UsersWithCredentialsQueryHookResult = ReturnType<typeof useUsersWithCredentialsQuery>;
export type UsersWithCredentialsLazyQueryHookResult = ReturnType<typeof useUsersWithCredentialsLazyQuery>;
export type UsersWithCredentialsQueryResult = Apollo.QueryResult<
  SchemaTypes.UsersWithCredentialsQuery,
  SchemaTypes.UsersWithCredentialsQueryVariables
>;
export function refetchUsersWithCredentialsQuery(variables: SchemaTypes.UsersWithCredentialsQueryVariables) {
  return { query: UsersWithCredentialsDocument, variables: variables };
}

export const UsersWithCredentialsSimpleListDocument = gql`
  query usersWithCredentialsSimpleList($input: UsersWithAuthorizationCredentialInput!) {
    usersWithAuthorizationCredential(credentialsCriteriaData: $input) {
      id
      profile {
        id
        displayName
      }
      firstName
      lastName
      email
    }
  }
`;

/**
 * __useUsersWithCredentialsSimpleListQuery__
 *
 * To run a query within a React component, call `useUsersWithCredentialsSimpleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithCredentialsSimpleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithCredentialsSimpleListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersWithCredentialsSimpleListQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UsersWithCredentialsSimpleListQuery,
    SchemaTypes.UsersWithCredentialsSimpleListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.UsersWithCredentialsSimpleListQuery,
    SchemaTypes.UsersWithCredentialsSimpleListQueryVariables
  >(UsersWithCredentialsSimpleListDocument, options);
}

export function useUsersWithCredentialsSimpleListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UsersWithCredentialsSimpleListQuery,
    SchemaTypes.UsersWithCredentialsSimpleListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.UsersWithCredentialsSimpleListQuery,
    SchemaTypes.UsersWithCredentialsSimpleListQueryVariables
  >(UsersWithCredentialsSimpleListDocument, options);
}

export type UsersWithCredentialsSimpleListQueryHookResult = ReturnType<typeof useUsersWithCredentialsSimpleListQuery>;
export type UsersWithCredentialsSimpleListLazyQueryHookResult = ReturnType<
  typeof useUsersWithCredentialsSimpleListLazyQuery
>;
export type UsersWithCredentialsSimpleListQueryResult = Apollo.QueryResult<
  SchemaTypes.UsersWithCredentialsSimpleListQuery,
  SchemaTypes.UsersWithCredentialsSimpleListQueryVariables
>;
export function refetchUsersWithCredentialsSimpleListQuery(
  variables: SchemaTypes.UsersWithCredentialsSimpleListQueryVariables
) {
  return { query: UsersWithCredentialsSimpleListDocument, variables: variables };
}

export const UserProviderDocument = gql`
  query UserProvider {
    me {
      user {
        ...UserDetails
        ...UserAgent
      }
      applications(states: ["new"]) {
        id
        communityID
        displayName
        state
        spaceID
        challengeID
        opportunityID
      }
      invitations(states: ["invited"]) {
        id
        spaceID
        challengeID
        opportunityID
        welcomeMessage
        createdBy
        createdDate
        state
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${UserAgentFragmentDoc}
`;

/**
 * __useUserProviderQuery__
 *
 * To run a query within a React component, call `useUserProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProviderQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProviderQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.UserProviderQuery, SchemaTypes.UserProviderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserProviderQuery, SchemaTypes.UserProviderQueryVariables>(
    UserProviderDocument,
    options
  );
}

export function useUserProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserProviderQuery, SchemaTypes.UserProviderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserProviderQuery, SchemaTypes.UserProviderQueryVariables>(
    UserProviderDocument,
    options
  );
}

export type UserProviderQueryHookResult = ReturnType<typeof useUserProviderQuery>;
export type UserProviderLazyQueryHookResult = ReturnType<typeof useUserProviderLazyQuery>;
export type UserProviderQueryResult = Apollo.QueryResult<
  SchemaTypes.UserProviderQuery,
  SchemaTypes.UserProviderQueryVariables
>;
export function refetchUserProviderQuery(variables?: SchemaTypes.UserProviderQueryVariables) {
  return { query: UserProviderDocument, variables: variables };
}

export const UserListDocument = gql`
  query userList($first: Int!, $after: UUID, $filter: UserFilterInput) {
    usersPaginated(first: $first, after: $after, filter: $filter) {
      users {
        id
        nameID
        profile {
          id
          displayName
        }
        email
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserListQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.UserListQuery, SchemaTypes.UserListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserListQuery, SchemaTypes.UserListQueryVariables>(UserListDocument, options);
}

export function useUserListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserListQuery, SchemaTypes.UserListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserListQuery, SchemaTypes.UserListQueryVariables>(UserListDocument, options);
}

export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<SchemaTypes.UserListQuery, SchemaTypes.UserListQueryVariables>;
export function refetchUserListQuery(variables: SchemaTypes.UserListQueryVariables) {
  return { query: UserListDocument, variables: variables };
}

export const UserContributionDisplayNamesDocument = gql`
  query UserContributionDisplayNames($userId: UUID_NAMEID_EMAIL!) {
    rolesUser(rolesData: { userID: $userId, filter: { visibilities: [ACTIVE, DEMO] } }) {
      spaces {
        id
        displayName
        challenges {
          id
          displayName
        }
        opportunities {
          id
          displayName
        }
      }
      organizations {
        id
        displayName
      }
    }
  }
`;

/**
 * __useUserContributionDisplayNamesQuery__
 *
 * To run a query within a React component, call `useUserContributionDisplayNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContributionDisplayNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContributionDisplayNamesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserContributionDisplayNamesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UserContributionDisplayNamesQuery,
    SchemaTypes.UserContributionDisplayNamesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.UserContributionDisplayNamesQuery,
    SchemaTypes.UserContributionDisplayNamesQueryVariables
  >(UserContributionDisplayNamesDocument, options);
}

export function useUserContributionDisplayNamesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserContributionDisplayNamesQuery,
    SchemaTypes.UserContributionDisplayNamesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.UserContributionDisplayNamesQuery,
    SchemaTypes.UserContributionDisplayNamesQueryVariables
  >(UserContributionDisplayNamesDocument, options);
}

export type UserContributionDisplayNamesQueryHookResult = ReturnType<typeof useUserContributionDisplayNamesQuery>;
export type UserContributionDisplayNamesLazyQueryHookResult = ReturnType<
  typeof useUserContributionDisplayNamesLazyQuery
>;
export type UserContributionDisplayNamesQueryResult = Apollo.QueryResult<
  SchemaTypes.UserContributionDisplayNamesQuery,
  SchemaTypes.UserContributionDisplayNamesQueryVariables
>;
export function refetchUserContributionDisplayNamesQuery(
  variables: SchemaTypes.UserContributionDisplayNamesQueryVariables
) {
  return { query: UserContributionDisplayNamesDocument, variables: variables };
}

export const UserContributionsDocument = gql`
  query UserContributions($userId: UUID_NAMEID_EMAIL!) {
    rolesUser(rolesData: { userID: $userId, filter: { visibilities: [ACTIVE, DEMO] } }) {
      spaces {
        id
        nameID
        challenges {
          id
          nameID
        }
        opportunities {
          id
          nameID
        }
      }
    }
  }
`;

/**
 * __useUserContributionsQuery__
 *
 * To run a query within a React component, call `useUserContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContributionsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserContributionsQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.UserContributionsQuery, SchemaTypes.UserContributionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserContributionsQuery, SchemaTypes.UserContributionsQueryVariables>(
    UserContributionsDocument,
    options
  );
}

export function useUserContributionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserContributionsQuery,
    SchemaTypes.UserContributionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserContributionsQuery, SchemaTypes.UserContributionsQueryVariables>(
    UserContributionsDocument,
    options
  );
}

export type UserContributionsQueryHookResult = ReturnType<typeof useUserContributionsQuery>;
export type UserContributionsLazyQueryHookResult = ReturnType<typeof useUserContributionsLazyQuery>;
export type UserContributionsQueryResult = Apollo.QueryResult<
  SchemaTypes.UserContributionsQuery,
  SchemaTypes.UserContributionsQueryVariables
>;
export function refetchUserContributionsQuery(variables: SchemaTypes.UserContributionsQueryVariables) {
  return { query: UserContributionsDocument, variables: variables };
}

export const UserOrganizationIdsDocument = gql`
  query UserOrganizationIds($userId: UUID_NAMEID_EMAIL!) {
    rolesUser(rolesData: { userID: $userId }) {
      organizations {
        id
      }
    }
  }
`;

/**
 * __useUserOrganizationIdsQuery__
 *
 * To run a query within a React component, call `useUserOrganizationIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrganizationIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrganizationIdsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserOrganizationIdsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UserOrganizationIdsQuery,
    SchemaTypes.UserOrganizationIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserOrganizationIdsQuery, SchemaTypes.UserOrganizationIdsQueryVariables>(
    UserOrganizationIdsDocument,
    options
  );
}

export function useUserOrganizationIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserOrganizationIdsQuery,
    SchemaTypes.UserOrganizationIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserOrganizationIdsQuery, SchemaTypes.UserOrganizationIdsQueryVariables>(
    UserOrganizationIdsDocument,
    options
  );
}

export type UserOrganizationIdsQueryHookResult = ReturnType<typeof useUserOrganizationIdsQuery>;
export type UserOrganizationIdsLazyQueryHookResult = ReturnType<typeof useUserOrganizationIdsLazyQuery>;
export type UserOrganizationIdsQueryResult = Apollo.QueryResult<
  SchemaTypes.UserOrganizationIdsQuery,
  SchemaTypes.UserOrganizationIdsQueryVariables
>;
export function refetchUserOrganizationIdsQuery(variables: SchemaTypes.UserOrganizationIdsQueryVariables) {
  return { query: UserOrganizationIdsDocument, variables: variables };
}

export const UserSpacesDocument = gql`
  query UserSpaces {
    me {
      spaceMemberships {
        id
        nameID
        profile {
          id
          displayName
          tagline
          tagset {
            id
            tags
          }
          cardBanner: visual(type: CARD) {
            id
            uri
          }
        }
        context {
          id
          vision
        }
        metrics {
          id
          name
          value
        }
      }
    }
  }
`;

/**
 * __useUserSpacesQuery__
 *
 * To run a query within a React component, call `useUserSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSpacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserSpacesQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.UserSpacesQuery, SchemaTypes.UserSpacesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserSpacesQuery, SchemaTypes.UserSpacesQueryVariables>(
    UserSpacesDocument,
    options
  );
}

export function useUserSpacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.UserSpacesQuery, SchemaTypes.UserSpacesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserSpacesQuery, SchemaTypes.UserSpacesQueryVariables>(
    UserSpacesDocument,
    options
  );
}

export type UserSpacesQueryHookResult = ReturnType<typeof useUserSpacesQuery>;
export type UserSpacesLazyQueryHookResult = ReturnType<typeof useUserSpacesLazyQuery>;
export type UserSpacesQueryResult = Apollo.QueryResult<
  SchemaTypes.UserSpacesQuery,
  SchemaTypes.UserSpacesQueryVariables
>;
export function refetchUserSpacesQuery(variables?: SchemaTypes.UserSpacesQueryVariables) {
  return { query: UserSpacesDocument, variables: variables };
}

export const InnovationHubAvailableSpacesDocument = gql`
  query InnovationHubAvailableSpaces {
    spaces(filter: { visibilities: [ACTIVE, DEMO] }) {
      ...InnovationHubSpace
    }
  }
  ${InnovationHubSpaceFragmentDoc}
`;

/**
 * __useInnovationHubAvailableSpacesQuery__
 *
 * To run a query within a React component, call `useInnovationHubAvailableSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationHubAvailableSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationHubAvailableSpacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInnovationHubAvailableSpacesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.InnovationHubAvailableSpacesQuery,
    SchemaTypes.InnovationHubAvailableSpacesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.InnovationHubAvailableSpacesQuery,
    SchemaTypes.InnovationHubAvailableSpacesQueryVariables
  >(InnovationHubAvailableSpacesDocument, options);
}

export function useInnovationHubAvailableSpacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationHubAvailableSpacesQuery,
    SchemaTypes.InnovationHubAvailableSpacesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.InnovationHubAvailableSpacesQuery,
    SchemaTypes.InnovationHubAvailableSpacesQueryVariables
  >(InnovationHubAvailableSpacesDocument, options);
}

export type InnovationHubAvailableSpacesQueryHookResult = ReturnType<typeof useInnovationHubAvailableSpacesQuery>;
export type InnovationHubAvailableSpacesLazyQueryHookResult = ReturnType<
  typeof useInnovationHubAvailableSpacesLazyQuery
>;
export type InnovationHubAvailableSpacesQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationHubAvailableSpacesQuery,
  SchemaTypes.InnovationHubAvailableSpacesQueryVariables
>;
export function refetchInnovationHubAvailableSpacesQuery(
  variables?: SchemaTypes.InnovationHubAvailableSpacesQueryVariables
) {
  return { query: InnovationHubAvailableSpacesDocument, variables: variables };
}

export const AdminInnovationHubsListDocument = gql`
  query AdminInnovationHubsList {
    platform {
      id
      innovationHubs {
        id
        nameID
        subdomain
        profile {
          id
          displayName
        }
      }
    }
  }
`;

/**
 * __useAdminInnovationHubsListQuery__
 *
 * To run a query within a React component, call `useAdminInnovationHubsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminInnovationHubsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminInnovationHubsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminInnovationHubsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.AdminInnovationHubsListQuery,
    SchemaTypes.AdminInnovationHubsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AdminInnovationHubsListQuery, SchemaTypes.AdminInnovationHubsListQueryVariables>(
    AdminInnovationHubsListDocument,
    options
  );
}

export function useAdminInnovationHubsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AdminInnovationHubsListQuery,
    SchemaTypes.AdminInnovationHubsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.AdminInnovationHubsListQuery,
    SchemaTypes.AdminInnovationHubsListQueryVariables
  >(AdminInnovationHubsListDocument, options);
}

export type AdminInnovationHubsListQueryHookResult = ReturnType<typeof useAdminInnovationHubsListQuery>;
export type AdminInnovationHubsListLazyQueryHookResult = ReturnType<typeof useAdminInnovationHubsListLazyQuery>;
export type AdminInnovationHubsListQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminInnovationHubsListQuery,
  SchemaTypes.AdminInnovationHubsListQueryVariables
>;
export function refetchAdminInnovationHubsListQuery(variables?: SchemaTypes.AdminInnovationHubsListQueryVariables) {
  return { query: AdminInnovationHubsListDocument, variables: variables };
}

export const DeleteInnovationHubDocument = gql`
  mutation deleteInnovationHub($innovationHubId: UUID!) {
    deleteInnovationHub(deleteData: { ID: $innovationHubId }) {
      id
    }
  }
`;
export type DeleteInnovationHubMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteInnovationHubMutation,
  SchemaTypes.DeleteInnovationHubMutationVariables
>;

/**
 * __useDeleteInnovationHubMutation__
 *
 * To run a mutation, you first call `useDeleteInnovationHubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInnovationHubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInnovationHubMutation, { data, loading, error }] = useDeleteInnovationHubMutation({
 *   variables: {
 *      innovationHubId: // value for 'innovationHubId'
 *   },
 * });
 */
export function useDeleteInnovationHubMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteInnovationHubMutation,
    SchemaTypes.DeleteInnovationHubMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteInnovationHubMutation, SchemaTypes.DeleteInnovationHubMutationVariables>(
    DeleteInnovationHubDocument,
    options
  );
}

export type DeleteInnovationHubMutationHookResult = ReturnType<typeof useDeleteInnovationHubMutation>;
export type DeleteInnovationHubMutationResult = Apollo.MutationResult<SchemaTypes.DeleteInnovationHubMutation>;
export type DeleteInnovationHubMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteInnovationHubMutation,
  SchemaTypes.DeleteInnovationHubMutationVariables
>;
export const AdminInnovationHubDocument = gql`
  query AdminInnovationHub($innovationHubId: UUID_NAMEID!) {
    platform {
      id
      innovationHub(id: $innovationHubId) {
        ...AdminInnovationHub
      }
    }
  }
  ${AdminInnovationHubFragmentDoc}
`;

/**
 * __useAdminInnovationHubQuery__
 *
 * To run a query within a React component, call `useAdminInnovationHubQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminInnovationHubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminInnovationHubQuery({
 *   variables: {
 *      innovationHubId: // value for 'innovationHubId'
 *   },
 * });
 */
export function useAdminInnovationHubQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AdminInnovationHubQuery,
    SchemaTypes.AdminInnovationHubQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AdminInnovationHubQuery, SchemaTypes.AdminInnovationHubQueryVariables>(
    AdminInnovationHubDocument,
    options
  );
}

export function useAdminInnovationHubLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AdminInnovationHubQuery,
    SchemaTypes.AdminInnovationHubQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AdminInnovationHubQuery, SchemaTypes.AdminInnovationHubQueryVariables>(
    AdminInnovationHubDocument,
    options
  );
}

export type AdminInnovationHubQueryHookResult = ReturnType<typeof useAdminInnovationHubQuery>;
export type AdminInnovationHubLazyQueryHookResult = ReturnType<typeof useAdminInnovationHubLazyQuery>;
export type AdminInnovationHubQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminInnovationHubQuery,
  SchemaTypes.AdminInnovationHubQueryVariables
>;
export function refetchAdminInnovationHubQuery(variables: SchemaTypes.AdminInnovationHubQueryVariables) {
  return { query: AdminInnovationHubDocument, variables: variables };
}

export const CreateInnovationHubDocument = gql`
  mutation createInnovationHub($hubData: CreateInnovationHubInput!) {
    createInnovationHub(createData: $hubData) {
      ...AdminInnovationHub
    }
  }
  ${AdminInnovationHubFragmentDoc}
`;
export type CreateInnovationHubMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateInnovationHubMutation,
  SchemaTypes.CreateInnovationHubMutationVariables
>;

/**
 * __useCreateInnovationHubMutation__
 *
 * To run a mutation, you first call `useCreateInnovationHubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInnovationHubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInnovationHubMutation, { data, loading, error }] = useCreateInnovationHubMutation({
 *   variables: {
 *      hubData: // value for 'hubData'
 *   },
 * });
 */
export function useCreateInnovationHubMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateInnovationHubMutation,
    SchemaTypes.CreateInnovationHubMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateInnovationHubMutation, SchemaTypes.CreateInnovationHubMutationVariables>(
    CreateInnovationHubDocument,
    options
  );
}

export type CreateInnovationHubMutationHookResult = ReturnType<typeof useCreateInnovationHubMutation>;
export type CreateInnovationHubMutationResult = Apollo.MutationResult<SchemaTypes.CreateInnovationHubMutation>;
export type CreateInnovationHubMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateInnovationHubMutation,
  SchemaTypes.CreateInnovationHubMutationVariables
>;
export const UpdateInnovationHubDocument = gql`
  mutation updateInnovationHub($hubData: UpdateInnovationHubInput!) {
    updateInnovationHub(updateData: $hubData) {
      ...AdminInnovationHub
    }
  }
  ${AdminInnovationHubFragmentDoc}
`;
export type UpdateInnovationHubMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateInnovationHubMutation,
  SchemaTypes.UpdateInnovationHubMutationVariables
>;

/**
 * __useUpdateInnovationHubMutation__
 *
 * To run a mutation, you first call `useUpdateInnovationHubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInnovationHubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInnovationHubMutation, { data, loading, error }] = useUpdateInnovationHubMutation({
 *   variables: {
 *      hubData: // value for 'hubData'
 *   },
 * });
 */
export function useUpdateInnovationHubMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateInnovationHubMutation,
    SchemaTypes.UpdateInnovationHubMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateInnovationHubMutation, SchemaTypes.UpdateInnovationHubMutationVariables>(
    UpdateInnovationHubDocument,
    options
  );
}

export type UpdateInnovationHubMutationHookResult = ReturnType<typeof useUpdateInnovationHubMutation>;
export type UpdateInnovationHubMutationResult = Apollo.MutationResult<SchemaTypes.UpdateInnovationHubMutation>;
export type UpdateInnovationHubMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateInnovationHubMutation,
  SchemaTypes.UpdateInnovationHubMutationVariables
>;
export const InnovationHubDocument = gql`
  query InnovationHub($subdomain: String) {
    platform {
      id
      innovationHub(subdomain: $subdomain) {
        ...InnovationHubHomeInnovationHub
      }
    }
  }
  ${InnovationHubHomeInnovationHubFragmentDoc}
`;

/**
 * __useInnovationHubQuery__
 *
 * To run a query within a React component, call `useInnovationHubQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationHubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationHubQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useInnovationHubQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.InnovationHubQuery, SchemaTypes.InnovationHubQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.InnovationHubQuery, SchemaTypes.InnovationHubQueryVariables>(
    InnovationHubDocument,
    options
  );
}

export function useInnovationHubLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.InnovationHubQuery, SchemaTypes.InnovationHubQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.InnovationHubQuery, SchemaTypes.InnovationHubQueryVariables>(
    InnovationHubDocument,
    options
  );
}

export type InnovationHubQueryHookResult = ReturnType<typeof useInnovationHubQuery>;
export type InnovationHubLazyQueryHookResult = ReturnType<typeof useInnovationHubLazyQuery>;
export type InnovationHubQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationHubQuery,
  SchemaTypes.InnovationHubQueryVariables
>;
export function refetchInnovationHubQuery(variables?: SchemaTypes.InnovationHubQueryVariables) {
  return { query: InnovationHubDocument, variables: variables };
}

export const ChallengeOpportunityCardsDocument = gql`
  query ChallengeOpportunityCards($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        opportunities {
          ...OpportunityCard
        }
      }
    }
  }
  ${OpportunityCardFragmentDoc}
`;

/**
 * __useChallengeOpportunityCardsQuery__
 *
 * To run a query within a React component, call `useChallengeOpportunityCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeOpportunityCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeOpportunityCardsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeOpportunityCardsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeOpportunityCardsQuery,
    SchemaTypes.ChallengeOpportunityCardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeOpportunityCardsQuery,
    SchemaTypes.ChallengeOpportunityCardsQueryVariables
  >(ChallengeOpportunityCardsDocument, options);
}

export function useChallengeOpportunityCardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeOpportunityCardsQuery,
    SchemaTypes.ChallengeOpportunityCardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeOpportunityCardsQuery,
    SchemaTypes.ChallengeOpportunityCardsQueryVariables
  >(ChallengeOpportunityCardsDocument, options);
}

export type ChallengeOpportunityCardsQueryHookResult = ReturnType<typeof useChallengeOpportunityCardsQuery>;
export type ChallengeOpportunityCardsLazyQueryHookResult = ReturnType<typeof useChallengeOpportunityCardsLazyQuery>;
export type ChallengeOpportunityCardsQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeOpportunityCardsQuery,
  SchemaTypes.ChallengeOpportunityCardsQueryVariables
>;
export function refetchChallengeOpportunityCardsQuery(variables: SchemaTypes.ChallengeOpportunityCardsQueryVariables) {
  return { query: ChallengeOpportunityCardsDocument, variables: variables };
}

export const ChallengePageDocument = gql`
  query challengePage($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        ...ChallengeProfile
      }
    }
  }
  ${ChallengeProfileFragmentDoc}
`;

/**
 * __useChallengePageQuery__
 *
 * To run a query within a React component, call `useChallengePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengePageQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengePageQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.ChallengePageQuery, SchemaTypes.ChallengePageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengePageQuery, SchemaTypes.ChallengePageQueryVariables>(
    ChallengePageDocument,
    options
  );
}

export function useChallengePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.ChallengePageQuery, SchemaTypes.ChallengePageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengePageQuery, SchemaTypes.ChallengePageQueryVariables>(
    ChallengePageDocument,
    options
  );
}

export type ChallengePageQueryHookResult = ReturnType<typeof useChallengePageQuery>;
export type ChallengePageLazyQueryHookResult = ReturnType<typeof useChallengePageLazyQuery>;
export type ChallengePageQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengePageQuery,
  SchemaTypes.ChallengePageQueryVariables
>;
export function refetchChallengePageQuery(variables: SchemaTypes.ChallengePageQueryVariables) {
  return { query: ChallengePageDocument, variables: variables };
}

export const ChallengeDashboardReferencesDocument = gql`
  query ChallengeDashboardReferences($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        profile {
          id
          references {
            id
            name
            uri
            description
          }
        }
      }
    }
  }
`;

/**
 * __useChallengeDashboardReferencesQuery__
 *
 * To run a query within a React component, call `useChallengeDashboardReferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeDashboardReferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeDashboardReferencesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeDashboardReferencesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeDashboardReferencesQuery,
    SchemaTypes.ChallengeDashboardReferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeDashboardReferencesQuery,
    SchemaTypes.ChallengeDashboardReferencesQueryVariables
  >(ChallengeDashboardReferencesDocument, options);
}

export function useChallengeDashboardReferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeDashboardReferencesQuery,
    SchemaTypes.ChallengeDashboardReferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeDashboardReferencesQuery,
    SchemaTypes.ChallengeDashboardReferencesQueryVariables
  >(ChallengeDashboardReferencesDocument, options);
}

export type ChallengeDashboardReferencesQueryHookResult = ReturnType<typeof useChallengeDashboardReferencesQuery>;
export type ChallengeDashboardReferencesLazyQueryHookResult = ReturnType<
  typeof useChallengeDashboardReferencesLazyQuery
>;
export type ChallengeDashboardReferencesQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeDashboardReferencesQuery,
  SchemaTypes.ChallengeDashboardReferencesQueryVariables
>;
export function refetchChallengeDashboardReferencesQuery(
  variables: SchemaTypes.ChallengeDashboardReferencesQueryVariables
) {
  return { query: ChallengeDashboardReferencesDocument, variables: variables };
}

export const CreateChallengeDocument = gql`
  mutation createChallenge($input: CreateChallengeOnSpaceInput!) {
    createChallenge(challengeData: $input) {
      ...ChallengeCard
    }
  }
  ${ChallengeCardFragmentDoc}
`;
export type CreateChallengeMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateChallengeMutation,
  SchemaTypes.CreateChallengeMutationVariables
>;

/**
 * __useCreateChallengeMutation__
 *
 * To run a mutation, you first call `useCreateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeMutation, { data, loading, error }] = useCreateChallengeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateChallengeMutation,
    SchemaTypes.CreateChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateChallengeMutation, SchemaTypes.CreateChallengeMutationVariables>(
    CreateChallengeDocument,
    options
  );
}

export type CreateChallengeMutationHookResult = ReturnType<typeof useCreateChallengeMutation>;
export type CreateChallengeMutationResult = Apollo.MutationResult<SchemaTypes.CreateChallengeMutation>;
export type CreateChallengeMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateChallengeMutation,
  SchemaTypes.CreateChallengeMutationVariables
>;
export const DeleteChallengeDocument = gql`
  mutation deleteChallenge($input: DeleteChallengeInput!) {
    deleteChallenge(deleteData: $input) {
      id
      nameID
    }
  }
`;
export type DeleteChallengeMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteChallengeMutation,
  SchemaTypes.DeleteChallengeMutationVariables
>;

/**
 * __useDeleteChallengeMutation__
 *
 * To run a mutation, you first call `useDeleteChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChallengeMutation, { data, loading, error }] = useDeleteChallengeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteChallengeMutation,
    SchemaTypes.DeleteChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteChallengeMutation, SchemaTypes.DeleteChallengeMutationVariables>(
    DeleteChallengeDocument,
    options
  );
}

export type DeleteChallengeMutationHookResult = ReturnType<typeof useDeleteChallengeMutation>;
export type DeleteChallengeMutationResult = Apollo.MutationResult<SchemaTypes.DeleteChallengeMutation>;
export type DeleteChallengeMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteChallengeMutation,
  SchemaTypes.DeleteChallengeMutationVariables
>;
export const UpdateChallengeDocument = gql`
  mutation updateChallenge($input: UpdateChallengeInput!) {
    updateChallenge(challengeData: $input) {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateChallengeMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateChallengeMutation,
  SchemaTypes.UpdateChallengeMutationVariables
>;

/**
 * __useUpdateChallengeMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeMutation, { data, loading, error }] = useUpdateChallengeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateChallengeMutation,
    SchemaTypes.UpdateChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateChallengeMutation, SchemaTypes.UpdateChallengeMutationVariables>(
    UpdateChallengeDocument,
    options
  );
}

export type UpdateChallengeMutationHookResult = ReturnType<typeof useUpdateChallengeMutation>;
export type UpdateChallengeMutationResult = Apollo.MutationResult<SchemaTypes.UpdateChallengeMutation>;
export type UpdateChallengeMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateChallengeMutation,
  SchemaTypes.UpdateChallengeMutationVariables
>;
export const UpdateChallengeInnovationFlowDocument = gql`
  mutation updateChallengeInnovationFlow($input: UpdateInnovationFlowInput!) {
    updateInnovationFlow(innovationFlowData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateChallengeInnovationFlowMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateChallengeInnovationFlowMutation,
  SchemaTypes.UpdateChallengeInnovationFlowMutationVariables
>;

/**
 * __useUpdateChallengeInnovationFlowMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeInnovationFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeInnovationFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeInnovationFlowMutation, { data, loading, error }] = useUpdateChallengeInnovationFlowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChallengeInnovationFlowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateChallengeInnovationFlowMutation,
    SchemaTypes.UpdateChallengeInnovationFlowMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateChallengeInnovationFlowMutation,
    SchemaTypes.UpdateChallengeInnovationFlowMutationVariables
  >(UpdateChallengeInnovationFlowDocument, options);
}

export type UpdateChallengeInnovationFlowMutationHookResult = ReturnType<
  typeof useUpdateChallengeInnovationFlowMutation
>;
export type UpdateChallengeInnovationFlowMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateChallengeInnovationFlowMutation>;
export type UpdateChallengeInnovationFlowMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateChallengeInnovationFlowMutation,
  SchemaTypes.UpdateChallengeInnovationFlowMutationVariables
>;
export const ChallengeApplicationTemplateDocument = gql`
  query challengeApplicationTemplate($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        community {
          id
          applicationForm {
            description
            questions {
              required
              question
              sortOrder
              explanation
              maxLength
            }
          }
        }
      }
    }
  }
`;

/**
 * __useChallengeApplicationTemplateQuery__
 *
 * To run a query within a React component, call `useChallengeApplicationTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeApplicationTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeApplicationTemplateQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeApplicationTemplateQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeApplicationTemplateQuery,
    SchemaTypes.ChallengeApplicationTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeApplicationTemplateQuery,
    SchemaTypes.ChallengeApplicationTemplateQueryVariables
  >(ChallengeApplicationTemplateDocument, options);
}

export function useChallengeApplicationTemplateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeApplicationTemplateQuery,
    SchemaTypes.ChallengeApplicationTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeApplicationTemplateQuery,
    SchemaTypes.ChallengeApplicationTemplateQueryVariables
  >(ChallengeApplicationTemplateDocument, options);
}

export type ChallengeApplicationTemplateQueryHookResult = ReturnType<typeof useChallengeApplicationTemplateQuery>;
export type ChallengeApplicationTemplateLazyQueryHookResult = ReturnType<
  typeof useChallengeApplicationTemplateLazyQuery
>;
export type ChallengeApplicationTemplateQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeApplicationTemplateQuery,
  SchemaTypes.ChallengeApplicationTemplateQueryVariables
>;
export function refetchChallengeApplicationTemplateQuery(
  variables: SchemaTypes.ChallengeApplicationTemplateQueryVariables
) {
  return { query: ChallengeApplicationTemplateDocument, variables: variables };
}

export const ChallengeInfoDocument = gql`
  query challengeInfo($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      challenge(ID: $challengeId) {
        ...ChallengeInfo
      }
    }
  }
  ${ChallengeInfoFragmentDoc}
`;

/**
 * __useChallengeInfoQuery__
 *
 * To run a query within a React component, call `useChallengeInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeInfoQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeInfoQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.ChallengeInfoQuery, SchemaTypes.ChallengeInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeInfoQuery, SchemaTypes.ChallengeInfoQueryVariables>(
    ChallengeInfoDocument,
    options
  );
}

export function useChallengeInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.ChallengeInfoQuery, SchemaTypes.ChallengeInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeInfoQuery, SchemaTypes.ChallengeInfoQueryVariables>(
    ChallengeInfoDocument,
    options
  );
}

export type ChallengeInfoQueryHookResult = ReturnType<typeof useChallengeInfoQuery>;
export type ChallengeInfoLazyQueryHookResult = ReturnType<typeof useChallengeInfoLazyQuery>;
export type ChallengeInfoQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeInfoQuery,
  SchemaTypes.ChallengeInfoQueryVariables
>;
export function refetchChallengeInfoQuery(variables: SchemaTypes.ChallengeInfoQueryVariables) {
  return { query: ChallengeInfoDocument, variables: variables };
}

export const ChallengeInnovationFlowDocument = gql`
  query challengeInnovationFlow($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        innovationFlow {
          id
          lifecycle {
            id
            machineDef
            state
            nextEvents
            stateIsFinal
            templateName
          }
        }
      }
    }
  }
`;

/**
 * __useChallengeInnovationFlowQuery__
 *
 * To run a query within a React component, call `useChallengeInnovationFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeInnovationFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeInnovationFlowQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeInnovationFlowQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeInnovationFlowQuery,
    SchemaTypes.ChallengeInnovationFlowQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeInnovationFlowQuery, SchemaTypes.ChallengeInnovationFlowQueryVariables>(
    ChallengeInnovationFlowDocument,
    options
  );
}

export function useChallengeInnovationFlowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeInnovationFlowQuery,
    SchemaTypes.ChallengeInnovationFlowQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeInnovationFlowQuery,
    SchemaTypes.ChallengeInnovationFlowQueryVariables
  >(ChallengeInnovationFlowDocument, options);
}

export type ChallengeInnovationFlowQueryHookResult = ReturnType<typeof useChallengeInnovationFlowQuery>;
export type ChallengeInnovationFlowLazyQueryHookResult = ReturnType<typeof useChallengeInnovationFlowLazyQuery>;
export type ChallengeInnovationFlowQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeInnovationFlowQuery,
  SchemaTypes.ChallengeInnovationFlowQueryVariables
>;
export function refetchChallengeInnovationFlowQuery(variables: SchemaTypes.ChallengeInnovationFlowQueryVariables) {
  return { query: ChallengeInnovationFlowDocument, variables: variables };
}

export const ChallengeNameDocument = gql`
  query challengeName($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      challenge(ID: $challengeId) {
        id
        nameID
        profile {
          id
          displayName
        }
      }
    }
  }
`;

/**
 * __useChallengeNameQuery__
 *
 * To run a query within a React component, call `useChallengeNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeNameQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeNameQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.ChallengeNameQuery, SchemaTypes.ChallengeNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeNameQuery, SchemaTypes.ChallengeNameQueryVariables>(
    ChallengeNameDocument,
    options
  );
}

export function useChallengeNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.ChallengeNameQuery, SchemaTypes.ChallengeNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeNameQuery, SchemaTypes.ChallengeNameQueryVariables>(
    ChallengeNameDocument,
    options
  );
}

export type ChallengeNameQueryHookResult = ReturnType<typeof useChallengeNameQuery>;
export type ChallengeNameLazyQueryHookResult = ReturnType<typeof useChallengeNameLazyQuery>;
export type ChallengeNameQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeNameQuery,
  SchemaTypes.ChallengeNameQueryVariables
>;
export function refetchChallengeNameQuery(variables: SchemaTypes.ChallengeNameQueryVariables) {
  return { query: ChallengeNameDocument, variables: variables };
}

export const ChallengeProfileInfoDocument = gql`
  query challengeProfileInfo($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        nameID
        profile {
          id
          displayName
          tagline
          description
          tagset {
            ...TagsetDetails
          }
          visuals {
            ...VisualFull
          }
          references {
            id
            name
            uri
            description
          }
          location {
            ...fullLocation
          }
        }
        innovationFlow {
          id
          lifecycle {
            id
            state
          }
        }
        context {
          ...ContextDetails
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
  ${FullLocationFragmentDoc}
  ${ContextDetailsFragmentDoc}
`;

/**
 * __useChallengeProfileInfoQuery__
 *
 * To run a query within a React component, call `useChallengeProfileInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeProfileInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeProfileInfoQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useChallengeProfileInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeProfileInfoQuery,
    SchemaTypes.ChallengeProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeProfileInfoQuery, SchemaTypes.ChallengeProfileInfoQueryVariables>(
    ChallengeProfileInfoDocument,
    options
  );
}

export function useChallengeProfileInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeProfileInfoQuery,
    SchemaTypes.ChallengeProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeProfileInfoQuery, SchemaTypes.ChallengeProfileInfoQueryVariables>(
    ChallengeProfileInfoDocument,
    options
  );
}

export type ChallengeProfileInfoQueryHookResult = ReturnType<typeof useChallengeProfileInfoQuery>;
export type ChallengeProfileInfoLazyQueryHookResult = ReturnType<typeof useChallengeProfileInfoLazyQuery>;
export type ChallengeProfileInfoQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeProfileInfoQuery,
  SchemaTypes.ChallengeProfileInfoQueryVariables
>;
export function refetchChallengeProfileInfoQuery(variables: SchemaTypes.ChallengeProfileInfoQueryVariables) {
  return { query: ChallengeProfileInfoDocument, variables: variables };
}

export const OpportunityCreatedDocument = gql`
  subscription OpportunityCreated($challengeID: UUID!) {
    opportunityCreated(challengeID: $challengeID) {
      opportunity {
        ...OpportunityCard
      }
    }
  }
  ${OpportunityCardFragmentDoc}
`;

/**
 * __useOpportunityCreatedSubscription__
 *
 * To run a query within a React component, call `useOpportunityCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityCreatedSubscription({
 *   variables: {
 *      challengeID: // value for 'challengeID'
 *   },
 * });
 */
export function useOpportunityCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.OpportunityCreatedSubscription,
    SchemaTypes.OpportunityCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.OpportunityCreatedSubscription,
    SchemaTypes.OpportunityCreatedSubscriptionVariables
  >(OpportunityCreatedDocument, options);
}

export type OpportunityCreatedSubscriptionHookResult = ReturnType<typeof useOpportunityCreatedSubscription>;
export type OpportunityCreatedSubscriptionResult =
  Apollo.SubscriptionResult<SchemaTypes.OpportunityCreatedSubscription>;
export const UpdateInnovationFlowLifecycleTemplateDocument = gql`
  mutation UpdateInnovationFlowLifecycleTemplate($input: UpdateInnovationFlowLifecycleTemplateInput!) {
    updateInnovationFlowLifecycleTemplate(innovationFlowData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateInnovationFlowLifecycleTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutation,
  SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutationVariables
>;

/**
 * __useUpdateInnovationFlowLifecycleTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateInnovationFlowLifecycleTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInnovationFlowLifecycleTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInnovationFlowLifecycleTemplateMutation, { data, loading, error }] = useUpdateInnovationFlowLifecycleTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInnovationFlowLifecycleTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutation,
    SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutation,
    SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutationVariables
  >(UpdateInnovationFlowLifecycleTemplateDocument, options);
}

export type UpdateInnovationFlowLifecycleTemplateMutationHookResult = ReturnType<
  typeof useUpdateInnovationFlowLifecycleTemplateMutation
>;
export type UpdateInnovationFlowLifecycleTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutation>;
export type UpdateInnovationFlowLifecycleTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutation,
  SchemaTypes.UpdateInnovationFlowLifecycleTemplateMutationVariables
>;
export const AboutPageNonMembersDocument = gql`
  query AboutPageNonMembers(
    $spaceNameId: UUID_NAMEID!
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        nameID
        profile {
          id
          displayName
          tagline
          description
          tagset {
            ...TagsetDetails
          }
          visuals {
            ...VisualFull
          }
        }
        host {
          ...AssociatedOrganizationDetails
        }
        metrics {
          ...MetricsItem
        }
        community {
          id
          authorization {
            id
            myPrivileges
          }
        }
        context {
          ...ContextTab
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        nameID
        profile {
          id
          displayName
          tagline
          description
          tagset {
            ...TagsetDetails
          }
          visuals {
            ...VisualFull
          }
        }
        authorization {
          id
          myPrivileges
        }
        innovationFlow {
          id
          lifecycle {
            ...LifecycleContextTab
          }
        }
        context {
          ...ContextTab
        }
        metrics {
          ...MetricsItem
        }
        community {
          id
          authorization {
            id
            myPrivileges
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        nameID
        profile {
          id
          displayName
          tagline
          description
          tagset {
            ...TagsetDetails
          }
          visuals {
            ...VisualFull
          }
        }
        innovationFlow {
          id
          lifecycle {
            ...LifecycleContextTab
          }
        }
        context {
          ...ContextTab
        }
        metrics {
          ...MetricsItem
        }
        community {
          id
          authorization {
            id
            myPrivileges
          }
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
  ${AssociatedOrganizationDetailsFragmentDoc}
  ${MetricsItemFragmentDoc}
  ${ContextTabFragmentDoc}
  ${LifecycleContextTabFragmentDoc}
`;

/**
 * __useAboutPageNonMembersQuery__
 *
 * To run a query within a React component, call `useAboutPageNonMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutPageNonMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutPageNonMembersQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *   },
 * });
 */
export function useAboutPageNonMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AboutPageNonMembersQuery,
    SchemaTypes.AboutPageNonMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AboutPageNonMembersQuery, SchemaTypes.AboutPageNonMembersQueryVariables>(
    AboutPageNonMembersDocument,
    options
  );
}

export function useAboutPageNonMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AboutPageNonMembersQuery,
    SchemaTypes.AboutPageNonMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AboutPageNonMembersQuery, SchemaTypes.AboutPageNonMembersQueryVariables>(
    AboutPageNonMembersDocument,
    options
  );
}

export type AboutPageNonMembersQueryHookResult = ReturnType<typeof useAboutPageNonMembersQuery>;
export type AboutPageNonMembersLazyQueryHookResult = ReturnType<typeof useAboutPageNonMembersLazyQuery>;
export type AboutPageNonMembersQueryResult = Apollo.QueryResult<
  SchemaTypes.AboutPageNonMembersQuery,
  SchemaTypes.AboutPageNonMembersQueryVariables
>;
export function refetchAboutPageNonMembersQuery(variables: SchemaTypes.AboutPageNonMembersQueryVariables) {
  return { query: AboutPageNonMembersDocument, variables: variables };
}

export const AboutPageMembersDocument = gql`
  query AboutPageMembers(
    $spaceNameId: UUID_NAMEID!
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $communityReadAccess: Boolean!
    $referencesReadAccess: Boolean!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        community @include(if: $communityReadAccess) {
          ...EntityDashboardCommunity
        }
        profile {
          id
          references @include(if: $referencesReadAccess) {
            ...ReferenceDetails
          }
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        community @include(if: $communityReadAccess) {
          ...EntityDashboardCommunity
        }
        profile {
          id
          references @include(if: $referencesReadAccess) {
            ...ReferenceDetails
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        community @include(if: $communityReadAccess) {
          ...EntityDashboardCommunity
        }
        profile {
          id
          references @include(if: $referencesReadAccess) {
            ...ReferenceDetails
          }
        }
      }
    }
  }
  ${EntityDashboardCommunityFragmentDoc}
  ${ReferenceDetailsFragmentDoc}
`;

/**
 * __useAboutPageMembersQuery__
 *
 * To run a query within a React component, call `useAboutPageMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutPageMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutPageMembersQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      communityReadAccess: // value for 'communityReadAccess'
 *      referencesReadAccess: // value for 'referencesReadAccess'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *   },
 * });
 */
export function useAboutPageMembersQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.AboutPageMembersQuery, SchemaTypes.AboutPageMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AboutPageMembersQuery, SchemaTypes.AboutPageMembersQueryVariables>(
    AboutPageMembersDocument,
    options
  );
}

export function useAboutPageMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AboutPageMembersQuery,
    SchemaTypes.AboutPageMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AboutPageMembersQuery, SchemaTypes.AboutPageMembersQueryVariables>(
    AboutPageMembersDocument,
    options
  );
}

export type AboutPageMembersQueryHookResult = ReturnType<typeof useAboutPageMembersQuery>;
export type AboutPageMembersLazyQueryHookResult = ReturnType<typeof useAboutPageMembersLazyQuery>;
export type AboutPageMembersQueryResult = Apollo.QueryResult<
  SchemaTypes.AboutPageMembersQuery,
  SchemaTypes.AboutPageMembersQueryVariables
>;
export function refetchAboutPageMembersQuery(variables: SchemaTypes.AboutPageMembersQueryVariables) {
  return { query: AboutPageMembersDocument, variables: variables };
}

export const CommunityFeedbackTemplatesDocument = gql`
  query communityFeedbackTemplates {
    platform {
      configuration {
        template {
          challenges {
            feedback {
              name
              questions {
                question
                required
                sortOrder
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useCommunityFeedbackTemplatesQuery__
 *
 * To run a query within a React component, call `useCommunityFeedbackTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityFeedbackTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityFeedbackTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommunityFeedbackTemplatesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.CommunityFeedbackTemplatesQuery,
    SchemaTypes.CommunityFeedbackTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.CommunityFeedbackTemplatesQuery,
    SchemaTypes.CommunityFeedbackTemplatesQueryVariables
  >(CommunityFeedbackTemplatesDocument, options);
}

export function useCommunityFeedbackTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CommunityFeedbackTemplatesQuery,
    SchemaTypes.CommunityFeedbackTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CommunityFeedbackTemplatesQuery,
    SchemaTypes.CommunityFeedbackTemplatesQueryVariables
  >(CommunityFeedbackTemplatesDocument, options);
}

export type CommunityFeedbackTemplatesQueryHookResult = ReturnType<typeof useCommunityFeedbackTemplatesQuery>;
export type CommunityFeedbackTemplatesLazyQueryHookResult = ReturnType<typeof useCommunityFeedbackTemplatesLazyQuery>;
export type CommunityFeedbackTemplatesQueryResult = Apollo.QueryResult<
  SchemaTypes.CommunityFeedbackTemplatesQuery,
  SchemaTypes.CommunityFeedbackTemplatesQueryVariables
>;
export function refetchCommunityFeedbackTemplatesQuery(
  variables?: SchemaTypes.CommunityFeedbackTemplatesQueryVariables
) {
  return { query: CommunityFeedbackTemplatesDocument, variables: variables };
}

export const CreateFeedbackOnCommunityContextDocument = gql`
  mutation createFeedbackOnCommunityContext($feedbackData: CreateFeedbackOnCommunityContextInput!) {
    createFeedbackOnCommunityContext(feedbackData: $feedbackData)
  }
`;
export type CreateFeedbackOnCommunityContextMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateFeedbackOnCommunityContextMutation,
  SchemaTypes.CreateFeedbackOnCommunityContextMutationVariables
>;

/**
 * __useCreateFeedbackOnCommunityContextMutation__
 *
 * To run a mutation, you first call `useCreateFeedbackOnCommunityContextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedbackOnCommunityContextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedbackOnCommunityContextMutation, { data, loading, error }] = useCreateFeedbackOnCommunityContextMutation({
 *   variables: {
 *      feedbackData: // value for 'feedbackData'
 *   },
 * });
 */
export function useCreateFeedbackOnCommunityContextMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateFeedbackOnCommunityContextMutation,
    SchemaTypes.CreateFeedbackOnCommunityContextMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateFeedbackOnCommunityContextMutation,
    SchemaTypes.CreateFeedbackOnCommunityContextMutationVariables
  >(CreateFeedbackOnCommunityContextDocument, options);
}

export type CreateFeedbackOnCommunityContextMutationHookResult = ReturnType<
  typeof useCreateFeedbackOnCommunityContextMutation
>;
export type CreateFeedbackOnCommunityContextMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateFeedbackOnCommunityContextMutation>;
export type CreateFeedbackOnCommunityContextMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateFeedbackOnCommunityContextMutation,
  SchemaTypes.CreateFeedbackOnCommunityContextMutationVariables
>;
export const JourneyIdentityDocument = gql`
  query JourneyIdentity(
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "_"
    $opportunityNameId: UUID_NAMEID = "_"
    $isChallenge: Boolean = false
    $isOpportunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      challenge(ID: $challengeNameId) @include(if: $isChallenge) {
        id
      }
      opportunity(ID: $opportunityNameId) @include(if: $isOpportunity) {
        id
      }
    }
  }
`;

/**
 * __useJourneyIdentityQuery__
 *
 * To run a query within a React component, call `useJourneyIdentityQuery` and pass it any options that fit your needs.
 * When your component renders, `useJourneyIdentityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJourneyIdentityQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      isChallenge: // value for 'isChallenge'
 *      isOpportunity: // value for 'isOpportunity'
 *   },
 * });
 */
export function useJourneyIdentityQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.JourneyIdentityQuery, SchemaTypes.JourneyIdentityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.JourneyIdentityQuery, SchemaTypes.JourneyIdentityQueryVariables>(
    JourneyIdentityDocument,
    options
  );
}

export function useJourneyIdentityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.JourneyIdentityQuery, SchemaTypes.JourneyIdentityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.JourneyIdentityQuery, SchemaTypes.JourneyIdentityQueryVariables>(
    JourneyIdentityDocument,
    options
  );
}

export type JourneyIdentityQueryHookResult = ReturnType<typeof useJourneyIdentityQuery>;
export type JourneyIdentityLazyQueryHookResult = ReturnType<typeof useJourneyIdentityLazyQuery>;
export type JourneyIdentityQueryResult = Apollo.QueryResult<
  SchemaTypes.JourneyIdentityQuery,
  SchemaTypes.JourneyIdentityQueryVariables
>;
export function refetchJourneyIdentityQuery(variables: SchemaTypes.JourneyIdentityQueryVariables) {
  return { query: JourneyIdentityDocument, variables: variables };
}

export const JourneyCommunityPrivilegesDocument = gql`
  query JourneyCommunityPrivileges(
    $spaceNameId: UUID_NAMEID!
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        community {
          id
          authorization {
            id
            myPrivileges
          }
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        community {
          id
          authorization {
            id
            myPrivileges
          }
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        community {
          id
          authorization {
            id
            myPrivileges
          }
        }
      }
    }
  }
`;

/**
 * __useJourneyCommunityPrivilegesQuery__
 *
 * To run a query within a React component, call `useJourneyCommunityPrivilegesQuery` and pass it any options that fit your needs.
 * When your component renders, `useJourneyCommunityPrivilegesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJourneyCommunityPrivilegesQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *   },
 * });
 */
export function useJourneyCommunityPrivilegesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.JourneyCommunityPrivilegesQuery,
    SchemaTypes.JourneyCommunityPrivilegesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.JourneyCommunityPrivilegesQuery,
    SchemaTypes.JourneyCommunityPrivilegesQueryVariables
  >(JourneyCommunityPrivilegesDocument, options);
}

export function useJourneyCommunityPrivilegesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.JourneyCommunityPrivilegesQuery,
    SchemaTypes.JourneyCommunityPrivilegesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.JourneyCommunityPrivilegesQuery,
    SchemaTypes.JourneyCommunityPrivilegesQueryVariables
  >(JourneyCommunityPrivilegesDocument, options);
}

export type JourneyCommunityPrivilegesQueryHookResult = ReturnType<typeof useJourneyCommunityPrivilegesQuery>;
export type JourneyCommunityPrivilegesLazyQueryHookResult = ReturnType<typeof useJourneyCommunityPrivilegesLazyQuery>;
export type JourneyCommunityPrivilegesQueryResult = Apollo.QueryResult<
  SchemaTypes.JourneyCommunityPrivilegesQuery,
  SchemaTypes.JourneyCommunityPrivilegesQueryVariables
>;
export function refetchJourneyCommunityPrivilegesQuery(
  variables: SchemaTypes.JourneyCommunityPrivilegesQueryVariables
) {
  return { query: JourneyCommunityPrivilegesDocument, variables: variables };
}

export const JourneyDataDocument = gql`
  query JourneyData(
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $includeCommunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        profile {
          ...ProfileJourneyData
        }
        context {
          ...ContextJourneyData
        }
        community @include(if: $includeCommunity) {
          ...JourneyCommunity
        }
        metrics {
          ...MetricsItem
        }
        host {
          ...AssociatedOrganizationDetails
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        profile {
          ...ProfileJourneyData
        }
        context {
          ...ContextJourneyData
        }
        community @include(if: $includeCommunity) {
          ...JourneyCommunity
        }
        metrics {
          ...MetricsItem
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        profile {
          ...ProfileJourneyData
        }
        context {
          ...ContextJourneyData
        }
        community @include(if: $includeCommunity) {
          ...JourneyCommunity
        }
        metrics {
          ...MetricsItem
        }
      }
    }
  }
  ${ProfileJourneyDataFragmentDoc}
  ${ContextJourneyDataFragmentDoc}
  ${JourneyCommunityFragmentDoc}
  ${MetricsItemFragmentDoc}
  ${AssociatedOrganizationDetailsFragmentDoc}
`;

/**
 * __useJourneyDataQuery__
 *
 * To run a query within a React component, call `useJourneyDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useJourneyDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJourneyDataQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      includeCommunity: // value for 'includeCommunity'
 *   },
 * });
 */
export function useJourneyDataQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.JourneyDataQuery, SchemaTypes.JourneyDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.JourneyDataQuery, SchemaTypes.JourneyDataQueryVariables>(
    JourneyDataDocument,
    options
  );
}

export function useJourneyDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.JourneyDataQuery, SchemaTypes.JourneyDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.JourneyDataQuery, SchemaTypes.JourneyDataQueryVariables>(
    JourneyDataDocument,
    options
  );
}

export type JourneyDataQueryHookResult = ReturnType<typeof useJourneyDataQuery>;
export type JourneyDataLazyQueryHookResult = ReturnType<typeof useJourneyDataLazyQuery>;
export type JourneyDataQueryResult = Apollo.QueryResult<
  SchemaTypes.JourneyDataQuery,
  SchemaTypes.JourneyDataQueryVariables
>;
export function refetchJourneyDataQuery(variables: SchemaTypes.JourneyDataQueryVariables) {
  return { query: JourneyDataDocument, variables: variables };
}

export const JourneyPrivilegesDocument = gql`
  query JourneyPrivileges(
    $spaceNameId: UUID_NAMEID!
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        authorization {
          id
          myPrivileges
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        authorization {
          id
          myPrivileges
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        authorization {
          id
          myPrivileges
        }
      }
    }
  }
`;

/**
 * __useJourneyPrivilegesQuery__
 *
 * To run a query within a React component, call `useJourneyPrivilegesQuery` and pass it any options that fit your needs.
 * When your component renders, `useJourneyPrivilegesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJourneyPrivilegesQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *   },
 * });
 */
export function useJourneyPrivilegesQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.JourneyPrivilegesQuery, SchemaTypes.JourneyPrivilegesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.JourneyPrivilegesQuery, SchemaTypes.JourneyPrivilegesQueryVariables>(
    JourneyPrivilegesDocument,
    options
  );
}

export function useJourneyPrivilegesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.JourneyPrivilegesQuery,
    SchemaTypes.JourneyPrivilegesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.JourneyPrivilegesQuery, SchemaTypes.JourneyPrivilegesQueryVariables>(
    JourneyPrivilegesDocument,
    options
  );
}

export type JourneyPrivilegesQueryHookResult = ReturnType<typeof useJourneyPrivilegesQuery>;
export type JourneyPrivilegesLazyQueryHookResult = ReturnType<typeof useJourneyPrivilegesLazyQuery>;
export type JourneyPrivilegesQueryResult = Apollo.QueryResult<
  SchemaTypes.JourneyPrivilegesQuery,
  SchemaTypes.JourneyPrivilegesQueryVariables
>;
export function refetchJourneyPrivilegesQuery(variables: SchemaTypes.JourneyPrivilegesQueryVariables) {
  return { query: JourneyPrivilegesDocument, variables: variables };
}

export const OpportunityPageDocument = gql`
  query opportunityPage($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        ...OpportunityPage
      }
    }
  }
  ${OpportunityPageFragmentDoc}
`;

/**
 * __useOpportunityPageQuery__
 *
 * To run a query within a React component, call `useOpportunityPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityPageQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityPageQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.OpportunityPageQuery, SchemaTypes.OpportunityPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityPageQuery, SchemaTypes.OpportunityPageQueryVariables>(
    OpportunityPageDocument,
    options
  );
}

export function useOpportunityPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.OpportunityPageQuery, SchemaTypes.OpportunityPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunityPageQuery, SchemaTypes.OpportunityPageQueryVariables>(
    OpportunityPageDocument,
    options
  );
}

export type OpportunityPageQueryHookResult = ReturnType<typeof useOpportunityPageQuery>;
export type OpportunityPageLazyQueryHookResult = ReturnType<typeof useOpportunityPageLazyQuery>;
export type OpportunityPageQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityPageQuery,
  SchemaTypes.OpportunityPageQueryVariables
>;
export function refetchOpportunityPageQuery(variables: SchemaTypes.OpportunityPageQueryVariables) {
  return { query: OpportunityPageDocument, variables: variables };
}

export const EventOnOpportunityDocument = gql`
  mutation eventOnOpportunity($innovationFlowId: UUID!, $eventName: String!) {
    eventOnOpportunity(innovationFlowEventData: { innovationFlowID: $innovationFlowId, eventName: $eventName }) {
      id
      lifecycle {
        id
        nextEvents
        state
      }
    }
  }
`;
export type EventOnOpportunityMutationFn = Apollo.MutationFunction<
  SchemaTypes.EventOnOpportunityMutation,
  SchemaTypes.EventOnOpportunityMutationVariables
>;

/**
 * __useEventOnOpportunityMutation__
 *
 * To run a mutation, you first call `useEventOnOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventOnOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventOnOpportunityMutation, { data, loading, error }] = useEventOnOpportunityMutation({
 *   variables: {
 *      innovationFlowId: // value for 'innovationFlowId'
 *      eventName: // value for 'eventName'
 *   },
 * });
 */
export function useEventOnOpportunityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.EventOnOpportunityMutation,
    SchemaTypes.EventOnOpportunityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.EventOnOpportunityMutation, SchemaTypes.EventOnOpportunityMutationVariables>(
    EventOnOpportunityDocument,
    options
  );
}

export type EventOnOpportunityMutationHookResult = ReturnType<typeof useEventOnOpportunityMutation>;
export type EventOnOpportunityMutationResult = Apollo.MutationResult<SchemaTypes.EventOnOpportunityMutation>;
export type EventOnOpportunityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.EventOnOpportunityMutation,
  SchemaTypes.EventOnOpportunityMutationVariables
>;
export const OpportunityProviderDocument = gql`
  query opportunityProvider($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      opportunity(ID: $opportunityId) {
        ...OpportunityProvider
      }
    }
  }
  ${OpportunityProviderFragmentDoc}
`;

/**
 * __useOpportunityProviderQuery__
 *
 * To run a query within a React component, call `useOpportunityProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityProviderQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityProviderQuery,
    SchemaTypes.OpportunityProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityProviderQuery, SchemaTypes.OpportunityProviderQueryVariables>(
    OpportunityProviderDocument,
    options
  );
}

export function useOpportunityProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityProviderQuery,
    SchemaTypes.OpportunityProviderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunityProviderQuery, SchemaTypes.OpportunityProviderQueryVariables>(
    OpportunityProviderDocument,
    options
  );
}

export type OpportunityProviderQueryHookResult = ReturnType<typeof useOpportunityProviderQuery>;
export type OpportunityProviderLazyQueryHookResult = ReturnType<typeof useOpportunityProviderLazyQuery>;
export type OpportunityProviderQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityProviderQuery,
  SchemaTypes.OpportunityProviderQueryVariables
>;
export function refetchOpportunityProviderQuery(variables: SchemaTypes.OpportunityProviderQueryVariables) {
  return { query: OpportunityProviderDocument, variables: variables };
}

export const CreateOpportunityDocument = gql`
  mutation createOpportunity($input: CreateOpportunityInput!) {
    createOpportunity(opportunityData: $input) {
      ...OpportunityCard
    }
  }
  ${OpportunityCardFragmentDoc}
`;
export type CreateOpportunityMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateOpportunityMutation,
  SchemaTypes.CreateOpportunityMutationVariables
>;

/**
 * __useCreateOpportunityMutation__
 *
 * To run a mutation, you first call `useCreateOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOpportunityMutation, { data, loading, error }] = useCreateOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOpportunityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateOpportunityMutation,
    SchemaTypes.CreateOpportunityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateOpportunityMutation, SchemaTypes.CreateOpportunityMutationVariables>(
    CreateOpportunityDocument,
    options
  );
}

export type CreateOpportunityMutationHookResult = ReturnType<typeof useCreateOpportunityMutation>;
export type CreateOpportunityMutationResult = Apollo.MutationResult<SchemaTypes.CreateOpportunityMutation>;
export type CreateOpportunityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateOpportunityMutation,
  SchemaTypes.CreateOpportunityMutationVariables
>;
export const DeleteOpportunityDocument = gql`
  mutation deleteOpportunity($input: DeleteOpportunityInput!) {
    deleteOpportunity(deleteData: $input) {
      id
      nameID
    }
  }
`;
export type DeleteOpportunityMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteOpportunityMutation,
  SchemaTypes.DeleteOpportunityMutationVariables
>;

/**
 * __useDeleteOpportunityMutation__
 *
 * To run a mutation, you first call `useDeleteOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOpportunityMutation, { data, loading, error }] = useDeleteOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOpportunityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteOpportunityMutation,
    SchemaTypes.DeleteOpportunityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteOpportunityMutation, SchemaTypes.DeleteOpportunityMutationVariables>(
    DeleteOpportunityDocument,
    options
  );
}

export type DeleteOpportunityMutationHookResult = ReturnType<typeof useDeleteOpportunityMutation>;
export type DeleteOpportunityMutationResult = Apollo.MutationResult<SchemaTypes.DeleteOpportunityMutation>;
export type DeleteOpportunityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteOpportunityMutation,
  SchemaTypes.DeleteOpportunityMutationVariables
>;
export const UpdateOpportunityDocument = gql`
  mutation updateOpportunity($input: UpdateOpportunityInput!) {
    updateOpportunity(opportunityData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateOpportunityMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateOpportunityMutation,
  SchemaTypes.UpdateOpportunityMutationVariables
>;

/**
 * __useUpdateOpportunityMutation__
 *
 * To run a mutation, you first call `useUpdateOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOpportunityMutation, { data, loading, error }] = useUpdateOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOpportunityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateOpportunityMutation,
    SchemaTypes.UpdateOpportunityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateOpportunityMutation, SchemaTypes.UpdateOpportunityMutationVariables>(
    UpdateOpportunityDocument,
    options
  );
}

export type UpdateOpportunityMutationHookResult = ReturnType<typeof useUpdateOpportunityMutation>;
export type UpdateOpportunityMutationResult = Apollo.MutationResult<SchemaTypes.UpdateOpportunityMutation>;
export type UpdateOpportunityMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateOpportunityMutation,
  SchemaTypes.UpdateOpportunityMutationVariables
>;
export const UpdateOpportunityInnovationFlowDocument = gql`
  mutation updateOpportunityInnovationFlow($input: UpdateInnovationFlowInput!) {
    updateInnovationFlow(innovationFlowData: $input) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export type UpdateOpportunityInnovationFlowMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateOpportunityInnovationFlowMutation,
  SchemaTypes.UpdateOpportunityInnovationFlowMutationVariables
>;

/**
 * __useUpdateOpportunityInnovationFlowMutation__
 *
 * To run a mutation, you first call `useUpdateOpportunityInnovationFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOpportunityInnovationFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOpportunityInnovationFlowMutation, { data, loading, error }] = useUpdateOpportunityInnovationFlowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOpportunityInnovationFlowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateOpportunityInnovationFlowMutation,
    SchemaTypes.UpdateOpportunityInnovationFlowMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateOpportunityInnovationFlowMutation,
    SchemaTypes.UpdateOpportunityInnovationFlowMutationVariables
  >(UpdateOpportunityInnovationFlowDocument, options);
}

export type UpdateOpportunityInnovationFlowMutationHookResult = ReturnType<
  typeof useUpdateOpportunityInnovationFlowMutation
>;
export type UpdateOpportunityInnovationFlowMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateOpportunityInnovationFlowMutation>;
export type UpdateOpportunityInnovationFlowMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateOpportunityInnovationFlowMutation,
  SchemaTypes.UpdateOpportunityInnovationFlowMutationVariables
>;
export const OpportunitiesDocument = gql`
  query opportunities($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        opportunities {
          id
          nameID
          profile {
            id
            displayName
          }
        }
      }
    }
  }
`;

/**
 * __useOpportunitiesQuery__
 *
 * To run a query within a React component, call `useOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunitiesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useOpportunitiesQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.OpportunitiesQuery, SchemaTypes.OpportunitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunitiesQuery, SchemaTypes.OpportunitiesQueryVariables>(
    OpportunitiesDocument,
    options
  );
}

export function useOpportunitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.OpportunitiesQuery, SchemaTypes.OpportunitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunitiesQuery, SchemaTypes.OpportunitiesQueryVariables>(
    OpportunitiesDocument,
    options
  );
}

export type OpportunitiesQueryHookResult = ReturnType<typeof useOpportunitiesQuery>;
export type OpportunitiesLazyQueryHookResult = ReturnType<typeof useOpportunitiesLazyQuery>;
export type OpportunitiesQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunitiesQuery,
  SchemaTypes.OpportunitiesQueryVariables
>;
export function refetchOpportunitiesQuery(variables: SchemaTypes.OpportunitiesQueryVariables) {
  return { query: OpportunitiesDocument, variables: variables };
}

export const OpportunityInnovationFlowDocument = gql`
  query opportunityInnovationFlow($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        innovationFlow {
          id
          lifecycle {
            id
            machineDef
            state
            nextEvents
            stateIsFinal
            templateName
          }
        }
      }
    }
  }
`;

/**
 * __useOpportunityInnovationFlowQuery__
 *
 * To run a query within a React component, call `useOpportunityInnovationFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityInnovationFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityInnovationFlowQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityInnovationFlowQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityInnovationFlowQuery,
    SchemaTypes.OpportunityInnovationFlowQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityInnovationFlowQuery,
    SchemaTypes.OpportunityInnovationFlowQueryVariables
  >(OpportunityInnovationFlowDocument, options);
}

export function useOpportunityInnovationFlowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityInnovationFlowQuery,
    SchemaTypes.OpportunityInnovationFlowQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityInnovationFlowQuery,
    SchemaTypes.OpportunityInnovationFlowQueryVariables
  >(OpportunityInnovationFlowDocument, options);
}

export type OpportunityInnovationFlowQueryHookResult = ReturnType<typeof useOpportunityInnovationFlowQuery>;
export type OpportunityInnovationFlowLazyQueryHookResult = ReturnType<typeof useOpportunityInnovationFlowLazyQuery>;
export type OpportunityInnovationFlowQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityInnovationFlowQuery,
  SchemaTypes.OpportunityInnovationFlowQueryVariables
>;
export function refetchOpportunityInnovationFlowQuery(variables: SchemaTypes.OpportunityInnovationFlowQueryVariables) {
  return { query: OpportunityInnovationFlowDocument, variables: variables };
}

export const OpportunityNameDocument = gql`
  query opportunityName($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        profile {
          id
          displayName
        }
      }
    }
  }
`;

/**
 * __useOpportunityNameQuery__
 *
 * To run a query within a React component, call `useOpportunityNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityNameQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityNameQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.OpportunityNameQuery, SchemaTypes.OpportunityNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityNameQuery, SchemaTypes.OpportunityNameQueryVariables>(
    OpportunityNameDocument,
    options
  );
}

export function useOpportunityNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.OpportunityNameQuery, SchemaTypes.OpportunityNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunityNameQuery, SchemaTypes.OpportunityNameQueryVariables>(
    OpportunityNameDocument,
    options
  );
}

export type OpportunityNameQueryHookResult = ReturnType<typeof useOpportunityNameQuery>;
export type OpportunityNameLazyQueryHookResult = ReturnType<typeof useOpportunityNameLazyQuery>;
export type OpportunityNameQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityNameQuery,
  SchemaTypes.OpportunityNameQueryVariables
>;
export function refetchOpportunityNameQuery(variables: SchemaTypes.OpportunityNameQueryVariables) {
  return { query: OpportunityNameDocument, variables: variables };
}

export const OpportunityProfileInfoDocument = gql`
  query opportunityProfileInfo($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        nameID
        profile {
          id
          displayName
          description
          tagline
          tagset {
            ...TagsetDetails
          }
          visuals {
            ...VisualFull
          }
          location {
            ...fullLocation
          }
          references {
            id
            name
            description
            uri
          }
        }
        context {
          ...ContextDetails
        }
        innovationFlow {
          id
        }
      }
    }
  }
  ${TagsetDetailsFragmentDoc}
  ${VisualFullFragmentDoc}
  ${FullLocationFragmentDoc}
  ${ContextDetailsFragmentDoc}
`;

/**
 * __useOpportunityProfileInfoQuery__
 *
 * To run a query within a React component, call `useOpportunityProfileInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityProfileInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityProfileInfoQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useOpportunityProfileInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityProfileInfoQuery,
    SchemaTypes.OpportunityProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.OpportunityProfileInfoQuery, SchemaTypes.OpportunityProfileInfoQueryVariables>(
    OpportunityProfileInfoDocument,
    options
  );
}

export function useOpportunityProfileInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityProfileInfoQuery,
    SchemaTypes.OpportunityProfileInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.OpportunityProfileInfoQuery, SchemaTypes.OpportunityProfileInfoQueryVariables>(
    OpportunityProfileInfoDocument,
    options
  );
}

export type OpportunityProfileInfoQueryHookResult = ReturnType<typeof useOpportunityProfileInfoQuery>;
export type OpportunityProfileInfoLazyQueryHookResult = ReturnType<typeof useOpportunityProfileInfoLazyQuery>;
export type OpportunityProfileInfoQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityProfileInfoQuery,
  SchemaTypes.OpportunityProfileInfoQueryVariables
>;
export function refetchOpportunityProfileInfoQuery(variables: SchemaTypes.OpportunityProfileInfoQueryVariables) {
  return { query: OpportunityProfileInfoDocument, variables: variables };
}

export const DashboardSpacesDocument = gql`
  query DashboardSpaces($visibilities: [SpaceVisibility!] = [ACTIVE]) {
    spaces(filter: { visibilities: $visibilities }) {
      ...SpaceDetailsProvider
    }
  }
  ${SpaceDetailsProviderFragmentDoc}
`;

/**
 * __useDashboardSpacesQuery__
 *
 * To run a query within a React component, call `useDashboardSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardSpacesQuery({
 *   variables: {
 *      visibilities: // value for 'visibilities'
 *   },
 * });
 */
export function useDashboardSpacesQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.DashboardSpacesQuery, SchemaTypes.DashboardSpacesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.DashboardSpacesQuery, SchemaTypes.DashboardSpacesQueryVariables>(
    DashboardSpacesDocument,
    options
  );
}

export function useDashboardSpacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.DashboardSpacesQuery, SchemaTypes.DashboardSpacesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.DashboardSpacesQuery, SchemaTypes.DashboardSpacesQueryVariables>(
    DashboardSpacesDocument,
    options
  );
}

export type DashboardSpacesQueryHookResult = ReturnType<typeof useDashboardSpacesQuery>;
export type DashboardSpacesLazyQueryHookResult = ReturnType<typeof useDashboardSpacesLazyQuery>;
export type DashboardSpacesQueryResult = Apollo.QueryResult<
  SchemaTypes.DashboardSpacesQuery,
  SchemaTypes.DashboardSpacesQueryVariables
>;
export function refetchDashboardSpacesQuery(variables?: SchemaTypes.DashboardSpacesQueryVariables) {
  return { query: DashboardSpacesDocument, variables: variables };
}

export const DashboardSpacesPaginatedDocument = gql`
  query DashboardSpacesPaginated($first: Int!, $after: UUID, $visibilities: [SpaceVisibility!] = [ACTIVE]) {
    spacesPaginated(first: $first, after: $after, filter: { visibilities: $visibilities }) {
      spaces {
        ...SpaceDetailsProvider
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${SpaceDetailsProviderFragmentDoc}
  ${PageInfoFragmentDoc}
`;

/**
 * __useDashboardSpacesPaginatedQuery__
 *
 * To run a query within a React component, call `useDashboardSpacesPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardSpacesPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardSpacesPaginatedQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      visibilities: // value for 'visibilities'
 *   },
 * });
 */
export function useDashboardSpacesPaginatedQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.DashboardSpacesPaginatedQuery,
    SchemaTypes.DashboardSpacesPaginatedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.DashboardSpacesPaginatedQuery, SchemaTypes.DashboardSpacesPaginatedQueryVariables>(
    DashboardSpacesPaginatedDocument,
    options
  );
}

export function useDashboardSpacesPaginatedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.DashboardSpacesPaginatedQuery,
    SchemaTypes.DashboardSpacesPaginatedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.DashboardSpacesPaginatedQuery,
    SchemaTypes.DashboardSpacesPaginatedQueryVariables
  >(DashboardSpacesPaginatedDocument, options);
}

export type DashboardSpacesPaginatedQueryHookResult = ReturnType<typeof useDashboardSpacesPaginatedQuery>;
export type DashboardSpacesPaginatedLazyQueryHookResult = ReturnType<typeof useDashboardSpacesPaginatedLazyQuery>;
export type DashboardSpacesPaginatedQueryResult = Apollo.QueryResult<
  SchemaTypes.DashboardSpacesPaginatedQuery,
  SchemaTypes.DashboardSpacesPaginatedQueryVariables
>;
export function refetchDashboardSpacesPaginatedQuery(variables: SchemaTypes.DashboardSpacesPaginatedQueryVariables) {
  return { query: DashboardSpacesPaginatedDocument, variables: variables };
}

export const SpaceCommunityPageDocument = gql`
  query SpaceCommunityPage($spaceNameId: UUID_NAMEID!) {
    space(ID: $spaceNameId) {
      id
      host {
        ...AssociatedOrganizationDetails
      }
      community {
        ...CommunityPageCommunity
      }
      collaboration {
        id
      }
    }
  }
  ${AssociatedOrganizationDetailsFragmentDoc}
  ${CommunityPageCommunityFragmentDoc}
`;

/**
 * __useSpaceCommunityPageQuery__
 *
 * To run a query within a React component, call `useSpaceCommunityPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceCommunityPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceCommunityPageQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *   },
 * });
 */
export function useSpaceCommunityPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceCommunityPageQuery,
    SchemaTypes.SpaceCommunityPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceCommunityPageQuery, SchemaTypes.SpaceCommunityPageQueryVariables>(
    SpaceCommunityPageDocument,
    options
  );
}

export function useSpaceCommunityPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceCommunityPageQuery,
    SchemaTypes.SpaceCommunityPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceCommunityPageQuery, SchemaTypes.SpaceCommunityPageQueryVariables>(
    SpaceCommunityPageDocument,
    options
  );
}

export type SpaceCommunityPageQueryHookResult = ReturnType<typeof useSpaceCommunityPageQuery>;
export type SpaceCommunityPageLazyQueryHookResult = ReturnType<typeof useSpaceCommunityPageLazyQuery>;
export type SpaceCommunityPageQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceCommunityPageQuery,
  SchemaTypes.SpaceCommunityPageQueryVariables
>;
export function refetchSpaceCommunityPageQuery(variables: SchemaTypes.SpaceCommunityPageQueryVariables) {
  return { query: SpaceCommunityPageDocument, variables: variables };
}

export const SpaceProviderDocument = gql`
  query spaceProvider($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      ...SpaceInfo
    }
  }
  ${SpaceInfoFragmentDoc}
`;

/**
 * __useSpaceProviderQuery__
 *
 * To run a query within a React component, call `useSpaceProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceProviderQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceProviderQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceProviderQuery, SchemaTypes.SpaceProviderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceProviderQuery, SchemaTypes.SpaceProviderQueryVariables>(
    SpaceProviderDocument,
    options
  );
}

export function useSpaceProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpaceProviderQuery, SchemaTypes.SpaceProviderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceProviderQuery, SchemaTypes.SpaceProviderQueryVariables>(
    SpaceProviderDocument,
    options
  );
}

export type SpaceProviderQueryHookResult = ReturnType<typeof useSpaceProviderQuery>;
export type SpaceProviderLazyQueryHookResult = ReturnType<typeof useSpaceProviderLazyQuery>;
export type SpaceProviderQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceProviderQuery,
  SchemaTypes.SpaceProviderQueryVariables
>;
export function refetchSpaceProviderQuery(variables: SchemaTypes.SpaceProviderQueryVariables) {
  return { query: SpaceProviderDocument, variables: variables };
}

export const SpaceHostDocument = gql`
  query spaceHost($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      host {
        id
        nameID
        profile {
          id
          displayName
          avatar: visual(type: AVATAR) {
            id
            uri
          }
          location {
            id
            city
            country
          }
          tagsets {
            id
            tags
          }
        }
      }
    }
  }
`;

/**
 * __useSpaceHostQuery__
 *
 * To run a query within a React component, call `useSpaceHostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceHostQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceHostQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceHostQuery, SchemaTypes.SpaceHostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceHostQuery, SchemaTypes.SpaceHostQueryVariables>(SpaceHostDocument, options);
}

export function useSpaceHostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpaceHostQuery, SchemaTypes.SpaceHostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceHostQuery, SchemaTypes.SpaceHostQueryVariables>(
    SpaceHostDocument,
    options
  );
}

export type SpaceHostQueryHookResult = ReturnType<typeof useSpaceHostQuery>;
export type SpaceHostLazyQueryHookResult = ReturnType<typeof useSpaceHostLazyQuery>;
export type SpaceHostQueryResult = Apollo.QueryResult<SchemaTypes.SpaceHostQuery, SchemaTypes.SpaceHostQueryVariables>;
export function refetchSpaceHostQuery(variables: SchemaTypes.SpaceHostQueryVariables) {
  return { query: SpaceHostDocument, variables: variables };
}

export const SpacePageDocument = gql`
  query spacePage($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      ...SpacePage
    }
  }
  ${SpacePageFragmentDoc}
`;

/**
 * __useSpacePageQuery__
 *
 * To run a query within a React component, call `useSpacePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpacePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacePageQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpacePageQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpacePageQuery, SchemaTypes.SpacePageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpacePageQuery, SchemaTypes.SpacePageQueryVariables>(SpacePageDocument, options);
}

export function useSpacePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpacePageQuery, SchemaTypes.SpacePageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpacePageQuery, SchemaTypes.SpacePageQueryVariables>(
    SpacePageDocument,
    options
  );
}

export type SpacePageQueryHookResult = ReturnType<typeof useSpacePageQuery>;
export type SpacePageLazyQueryHookResult = ReturnType<typeof useSpacePageLazyQuery>;
export type SpacePageQueryResult = Apollo.QueryResult<SchemaTypes.SpacePageQuery, SchemaTypes.SpacePageQueryVariables>;
export function refetchSpacePageQuery(variables: SchemaTypes.SpacePageQueryVariables) {
  return { query: SpacePageDocument, variables: variables };
}

export const SpaceDashboardReferencesDocument = gql`
  query SpaceDashboardReferences($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      profile {
        id
        references {
          id
          name
          uri
          description
        }
      }
    }
  }
`;

/**
 * __useSpaceDashboardReferencesQuery__
 *
 * To run a query within a React component, call `useSpaceDashboardReferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceDashboardReferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceDashboardReferencesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceDashboardReferencesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceDashboardReferencesQuery,
    SchemaTypes.SpaceDashboardReferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceDashboardReferencesQuery, SchemaTypes.SpaceDashboardReferencesQueryVariables>(
    SpaceDashboardReferencesDocument,
    options
  );
}

export function useSpaceDashboardReferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceDashboardReferencesQuery,
    SchemaTypes.SpaceDashboardReferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceDashboardReferencesQuery,
    SchemaTypes.SpaceDashboardReferencesQueryVariables
  >(SpaceDashboardReferencesDocument, options);
}

export type SpaceDashboardReferencesQueryHookResult = ReturnType<typeof useSpaceDashboardReferencesQuery>;
export type SpaceDashboardReferencesLazyQueryHookResult = ReturnType<typeof useSpaceDashboardReferencesLazyQuery>;
export type SpaceDashboardReferencesQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceDashboardReferencesQuery,
  SchemaTypes.SpaceDashboardReferencesQueryVariables
>;
export function refetchSpaceDashboardReferencesQuery(variables: SchemaTypes.SpaceDashboardReferencesQueryVariables) {
  return { query: SpaceDashboardReferencesDocument, variables: variables };
}

export const SpaceDashboardNavigationChallengesDocument = gql`
  query SpaceDashboardNavigationChallenges($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenges {
        id
        nameID
        profile {
          ...SpaceDashboardNavigationProfile
        }
        context {
          ...SpaceDashboardNavigationContext
        }
        innovationFlow {
          id
          lifecycle {
            ...SpaceDashboardNavigationLifecycle
          }
        }
        authorization {
          id
          myPrivileges
        }
        community {
          ...SpaceDashboardNavigationCommunity
        }
      }
      visibility
    }
  }
  ${SpaceDashboardNavigationProfileFragmentDoc}
  ${SpaceDashboardNavigationContextFragmentDoc}
  ${SpaceDashboardNavigationLifecycleFragmentDoc}
  ${SpaceDashboardNavigationCommunityFragmentDoc}
`;

/**
 * __useSpaceDashboardNavigationChallengesQuery__
 *
 * To run a query within a React component, call `useSpaceDashboardNavigationChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceDashboardNavigationChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceDashboardNavigationChallengesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceDashboardNavigationChallengesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceDashboardNavigationChallengesQuery,
    SchemaTypes.SpaceDashboardNavigationChallengesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpaceDashboardNavigationChallengesQuery,
    SchemaTypes.SpaceDashboardNavigationChallengesQueryVariables
  >(SpaceDashboardNavigationChallengesDocument, options);
}

export function useSpaceDashboardNavigationChallengesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceDashboardNavigationChallengesQuery,
    SchemaTypes.SpaceDashboardNavigationChallengesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceDashboardNavigationChallengesQuery,
    SchemaTypes.SpaceDashboardNavigationChallengesQueryVariables
  >(SpaceDashboardNavigationChallengesDocument, options);
}

export type SpaceDashboardNavigationChallengesQueryHookResult = ReturnType<
  typeof useSpaceDashboardNavigationChallengesQuery
>;
export type SpaceDashboardNavigationChallengesLazyQueryHookResult = ReturnType<
  typeof useSpaceDashboardNavigationChallengesLazyQuery
>;
export type SpaceDashboardNavigationChallengesQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceDashboardNavigationChallengesQuery,
  SchemaTypes.SpaceDashboardNavigationChallengesQueryVariables
>;
export function refetchSpaceDashboardNavigationChallengesQuery(
  variables: SchemaTypes.SpaceDashboardNavigationChallengesQueryVariables
) {
  return { query: SpaceDashboardNavigationChallengesDocument, variables: variables };
}

export const SpaceDashboardNavigationOpportunitiesDocument = gql`
  query SpaceDashboardNavigationOpportunities($spaceId: UUID_NAMEID!, $challengeIds: [UUID!]!) {
    space(ID: $spaceId) {
      id
      challenges(IDs: $challengeIds) {
        id
        opportunities {
          id
          nameID
          profile {
            ...SpaceDashboardNavigationProfile
          }
          context {
            ...SpaceDashboardNavigationContext
          }
          innovationFlow {
            id
            lifecycle {
              ...SpaceDashboardNavigationLifecycle
            }
          }
          community {
            ...SpaceDashboardNavigationCommunity
          }
        }
      }
    }
  }
  ${SpaceDashboardNavigationProfileFragmentDoc}
  ${SpaceDashboardNavigationContextFragmentDoc}
  ${SpaceDashboardNavigationLifecycleFragmentDoc}
  ${SpaceDashboardNavigationCommunityFragmentDoc}
`;

/**
 * __useSpaceDashboardNavigationOpportunitiesQuery__
 *
 * To run a query within a React component, call `useSpaceDashboardNavigationOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceDashboardNavigationOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceDashboardNavigationOpportunitiesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeIds: // value for 'challengeIds'
 *   },
 * });
 */
export function useSpaceDashboardNavigationOpportunitiesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQuery,
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQuery,
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQueryVariables
  >(SpaceDashboardNavigationOpportunitiesDocument, options);
}

export function useSpaceDashboardNavigationOpportunitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQuery,
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQuery,
    SchemaTypes.SpaceDashboardNavigationOpportunitiesQueryVariables
  >(SpaceDashboardNavigationOpportunitiesDocument, options);
}

export type SpaceDashboardNavigationOpportunitiesQueryHookResult = ReturnType<
  typeof useSpaceDashboardNavigationOpportunitiesQuery
>;
export type SpaceDashboardNavigationOpportunitiesLazyQueryHookResult = ReturnType<
  typeof useSpaceDashboardNavigationOpportunitiesLazyQuery
>;
export type SpaceDashboardNavigationOpportunitiesQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceDashboardNavigationOpportunitiesQuery,
  SchemaTypes.SpaceDashboardNavigationOpportunitiesQueryVariables
>;
export function refetchSpaceDashboardNavigationOpportunitiesQuery(
  variables: SchemaTypes.SpaceDashboardNavigationOpportunitiesQueryVariables
) {
  return { query: SpaceDashboardNavigationOpportunitiesDocument, variables: variables };
}

export const CalloutFormTemplatesFromSpaceDocument = gql`
  query CalloutFormTemplatesFromSpace($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        postTemplates {
          ...PostTemplateCard
        }
        whiteboardTemplates {
          ...WhiteboardTemplateCard
        }
      }
    }
  }
  ${PostTemplateCardFragmentDoc}
  ${WhiteboardTemplateCardFragmentDoc}
`;

/**
 * __useCalloutFormTemplatesFromSpaceQuery__
 *
 * To run a query within a React component, call `useCalloutFormTemplatesFromSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutFormTemplatesFromSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutFormTemplatesFromSpaceQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useCalloutFormTemplatesFromSpaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CalloutFormTemplatesFromSpaceQuery,
    SchemaTypes.CalloutFormTemplatesFromSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.CalloutFormTemplatesFromSpaceQuery,
    SchemaTypes.CalloutFormTemplatesFromSpaceQueryVariables
  >(CalloutFormTemplatesFromSpaceDocument, options);
}

export function useCalloutFormTemplatesFromSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CalloutFormTemplatesFromSpaceQuery,
    SchemaTypes.CalloutFormTemplatesFromSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CalloutFormTemplatesFromSpaceQuery,
    SchemaTypes.CalloutFormTemplatesFromSpaceQueryVariables
  >(CalloutFormTemplatesFromSpaceDocument, options);
}

export type CalloutFormTemplatesFromSpaceQueryHookResult = ReturnType<typeof useCalloutFormTemplatesFromSpaceQuery>;
export type CalloutFormTemplatesFromSpaceLazyQueryHookResult = ReturnType<
  typeof useCalloutFormTemplatesFromSpaceLazyQuery
>;
export type CalloutFormTemplatesFromSpaceQueryResult = Apollo.QueryResult<
  SchemaTypes.CalloutFormTemplatesFromSpaceQuery,
  SchemaTypes.CalloutFormTemplatesFromSpaceQueryVariables
>;
export function refetchCalloutFormTemplatesFromSpaceQuery(
  variables: SchemaTypes.CalloutFormTemplatesFromSpaceQueryVariables
) {
  return { query: CalloutFormTemplatesFromSpaceDocument, variables: variables };
}

export const WhiteboardTemplatesFromSpaceDocument = gql`
  query WhiteboardTemplatesFromSpace($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        whiteboardTemplates {
          ...WhiteboardTemplateCard
        }
      }
    }
  }
  ${WhiteboardTemplateCardFragmentDoc}
`;

/**
 * __useWhiteboardTemplatesFromSpaceQuery__
 *
 * To run a query within a React component, call `useWhiteboardTemplatesFromSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardTemplatesFromSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardTemplatesFromSpaceQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useWhiteboardTemplatesFromSpaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardTemplatesFromSpaceQuery,
    SchemaTypes.WhiteboardTemplatesFromSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.WhiteboardTemplatesFromSpaceQuery,
    SchemaTypes.WhiteboardTemplatesFromSpaceQueryVariables
  >(WhiteboardTemplatesFromSpaceDocument, options);
}

export function useWhiteboardTemplatesFromSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardTemplatesFromSpaceQuery,
    SchemaTypes.WhiteboardTemplatesFromSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardTemplatesFromSpaceQuery,
    SchemaTypes.WhiteboardTemplatesFromSpaceQueryVariables
  >(WhiteboardTemplatesFromSpaceDocument, options);
}

export type WhiteboardTemplatesFromSpaceQueryHookResult = ReturnType<typeof useWhiteboardTemplatesFromSpaceQuery>;
export type WhiteboardTemplatesFromSpaceLazyQueryHookResult = ReturnType<
  typeof useWhiteboardTemplatesFromSpaceLazyQuery
>;
export type WhiteboardTemplatesFromSpaceQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardTemplatesFromSpaceQuery,
  SchemaTypes.WhiteboardTemplatesFromSpaceQueryVariables
>;
export function refetchWhiteboardTemplatesFromSpaceQuery(
  variables: SchemaTypes.WhiteboardTemplatesFromSpaceQueryVariables
) {
  return { query: WhiteboardTemplatesFromSpaceDocument, variables: variables };
}

export const InnovationFlowTemplatesFromSpaceDocument = gql`
  query InnovationFlowTemplatesFromSpace($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        innovationFlowTemplates {
          ...InnovationFlowTemplate
        }
      }
    }
  }
  ${InnovationFlowTemplateFragmentDoc}
`;

/**
 * __useInnovationFlowTemplatesFromSpaceQuery__
 *
 * To run a query within a React component, call `useInnovationFlowTemplatesFromSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationFlowTemplatesFromSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationFlowTemplatesFromSpaceQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useInnovationFlowTemplatesFromSpaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationFlowTemplatesFromSpaceQuery,
    SchemaTypes.InnovationFlowTemplatesFromSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.InnovationFlowTemplatesFromSpaceQuery,
    SchemaTypes.InnovationFlowTemplatesFromSpaceQueryVariables
  >(InnovationFlowTemplatesFromSpaceDocument, options);
}

export function useInnovationFlowTemplatesFromSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationFlowTemplatesFromSpaceQuery,
    SchemaTypes.InnovationFlowTemplatesFromSpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.InnovationFlowTemplatesFromSpaceQuery,
    SchemaTypes.InnovationFlowTemplatesFromSpaceQueryVariables
  >(InnovationFlowTemplatesFromSpaceDocument, options);
}

export type InnovationFlowTemplatesFromSpaceQueryHookResult = ReturnType<
  typeof useInnovationFlowTemplatesFromSpaceQuery
>;
export type InnovationFlowTemplatesFromSpaceLazyQueryHookResult = ReturnType<
  typeof useInnovationFlowTemplatesFromSpaceLazyQuery
>;
export type InnovationFlowTemplatesFromSpaceQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationFlowTemplatesFromSpaceQuery,
  SchemaTypes.InnovationFlowTemplatesFromSpaceQueryVariables
>;
export function refetchInnovationFlowTemplatesFromSpaceQuery(
  variables: SchemaTypes.InnovationFlowTemplatesFromSpaceQueryVariables
) {
  return { query: InnovationFlowTemplatesFromSpaceDocument, variables: variables };
}

export const SpaceChallengeCardsDocument = gql`
  query SpaceChallengeCards($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      challenges {
        ...ChallengeCard
      }
    }
  }
  ${ChallengeCardFragmentDoc}
`;

/**
 * __useSpaceChallengeCardsQuery__
 *
 * To run a query within a React component, call `useSpaceChallengeCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceChallengeCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceChallengeCardsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceChallengeCardsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceChallengeCardsQuery,
    SchemaTypes.SpaceChallengeCardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceChallengeCardsQuery, SchemaTypes.SpaceChallengeCardsQueryVariables>(
    SpaceChallengeCardsDocument,
    options
  );
}

export function useSpaceChallengeCardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceChallengeCardsQuery,
    SchemaTypes.SpaceChallengeCardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceChallengeCardsQuery, SchemaTypes.SpaceChallengeCardsQueryVariables>(
    SpaceChallengeCardsDocument,
    options
  );
}

export type SpaceChallengeCardsQueryHookResult = ReturnType<typeof useSpaceChallengeCardsQuery>;
export type SpaceChallengeCardsLazyQueryHookResult = ReturnType<typeof useSpaceChallengeCardsLazyQuery>;
export type SpaceChallengeCardsQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceChallengeCardsQuery,
  SchemaTypes.SpaceChallengeCardsQueryVariables
>;
export function refetchSpaceChallengeCardsQuery(variables: SchemaTypes.SpaceChallengeCardsQueryVariables) {
  return { query: SpaceChallengeCardsDocument, variables: variables };
}

export const CreateSpaceDocument = gql`
  mutation createSpace($input: CreateSpaceInput!) {
    createSpace(spaceData: $input) {
      ...SpaceDetails
    }
  }
  ${SpaceDetailsFragmentDoc}
`;
export type CreateSpaceMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateSpaceMutation,
  SchemaTypes.CreateSpaceMutationVariables
>;

/**
 * __useCreateSpaceMutation__
 *
 * To run a mutation, you first call `useCreateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpaceMutation, { data, loading, error }] = useCreateSpaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.CreateSpaceMutation, SchemaTypes.CreateSpaceMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateSpaceMutation, SchemaTypes.CreateSpaceMutationVariables>(
    CreateSpaceDocument,
    options
  );
}

export type CreateSpaceMutationHookResult = ReturnType<typeof useCreateSpaceMutation>;
export type CreateSpaceMutationResult = Apollo.MutationResult<SchemaTypes.CreateSpaceMutation>;
export type CreateSpaceMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateSpaceMutation,
  SchemaTypes.CreateSpaceMutationVariables
>;
export const DeleteSpaceDocument = gql`
  mutation deleteSpace($input: DeleteSpaceInput!) {
    deleteSpace(deleteData: $input) {
      id
      nameID
    }
  }
`;
export type DeleteSpaceMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteSpaceMutation,
  SchemaTypes.DeleteSpaceMutationVariables
>;

/**
 * __useDeleteSpaceMutation__
 *
 * To run a mutation, you first call `useDeleteSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSpaceMutation, { data, loading, error }] = useDeleteSpaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.DeleteSpaceMutation, SchemaTypes.DeleteSpaceMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteSpaceMutation, SchemaTypes.DeleteSpaceMutationVariables>(
    DeleteSpaceDocument,
    options
  );
}

export type DeleteSpaceMutationHookResult = ReturnType<typeof useDeleteSpaceMutation>;
export type DeleteSpaceMutationResult = Apollo.MutationResult<SchemaTypes.DeleteSpaceMutation>;
export type DeleteSpaceMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteSpaceMutation,
  SchemaTypes.DeleteSpaceMutationVariables
>;
export const UpdateSpaceDocument = gql`
  mutation updateSpace($input: UpdateSpaceInput!) {
    updateSpace(spaceData: $input) {
      ...SpaceDetails
    }
  }
  ${SpaceDetailsFragmentDoc}
`;
export type UpdateSpaceMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateSpaceMutation,
  SchemaTypes.UpdateSpaceMutationVariables
>;

/**
 * __useUpdateSpaceMutation__
 *
 * To run a mutation, you first call `useUpdateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpaceMutation, { data, loading, error }] = useUpdateSpaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<SchemaTypes.UpdateSpaceMutation, SchemaTypes.UpdateSpaceMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateSpaceMutation, SchemaTypes.UpdateSpaceMutationVariables>(
    UpdateSpaceDocument,
    options
  );
}

export type UpdateSpaceMutationHookResult = ReturnType<typeof useUpdateSpaceMutation>;
export type UpdateSpaceMutationResult = Apollo.MutationResult<SchemaTypes.UpdateSpaceMutation>;
export type UpdateSpaceMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateSpaceMutation,
  SchemaTypes.UpdateSpaceMutationVariables
>;
export const SpaceApplicationTemplateDocument = gql`
  query spaceApplicationTemplate($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      community {
        id
        applicationForm {
          id
          description
          questions {
            required
            question
            explanation
            sortOrder
            maxLength
          }
        }
      }
    }
  }
`;

/**
 * __useSpaceApplicationTemplateQuery__
 *
 * To run a query within a React component, call `useSpaceApplicationTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceApplicationTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceApplicationTemplateQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceApplicationTemplateQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceApplicationTemplateQuery,
    SchemaTypes.SpaceApplicationTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceApplicationTemplateQuery, SchemaTypes.SpaceApplicationTemplateQueryVariables>(
    SpaceApplicationTemplateDocument,
    options
  );
}

export function useSpaceApplicationTemplateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceApplicationTemplateQuery,
    SchemaTypes.SpaceApplicationTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceApplicationTemplateQuery,
    SchemaTypes.SpaceApplicationTemplateQueryVariables
  >(SpaceApplicationTemplateDocument, options);
}

export type SpaceApplicationTemplateQueryHookResult = ReturnType<typeof useSpaceApplicationTemplateQuery>;
export type SpaceApplicationTemplateLazyQueryHookResult = ReturnType<typeof useSpaceApplicationTemplateLazyQuery>;
export type SpaceApplicationTemplateQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceApplicationTemplateQuery,
  SchemaTypes.SpaceApplicationTemplateQueryVariables
>;
export function refetchSpaceApplicationTemplateQuery(variables: SchemaTypes.SpaceApplicationTemplateQueryVariables) {
  return { query: SpaceApplicationTemplateDocument, variables: variables };
}

export const SpaceCardDocument = gql`
  query spaceCard($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      ...SpaceDetailsProvider
    }
  }
  ${SpaceDetailsProviderFragmentDoc}
`;

/**
 * __useSpaceCardQuery__
 *
 * To run a query within a React component, call `useSpaceCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceCardQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceCardQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceCardQuery, SchemaTypes.SpaceCardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceCardQuery, SchemaTypes.SpaceCardQueryVariables>(SpaceCardDocument, options);
}

export function useSpaceCardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpaceCardQuery, SchemaTypes.SpaceCardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceCardQuery, SchemaTypes.SpaceCardQueryVariables>(
    SpaceCardDocument,
    options
  );
}

export type SpaceCardQueryHookResult = ReturnType<typeof useSpaceCardQuery>;
export type SpaceCardLazyQueryHookResult = ReturnType<typeof useSpaceCardLazyQuery>;
export type SpaceCardQueryResult = Apollo.QueryResult<SchemaTypes.SpaceCardQuery, SchemaTypes.SpaceCardQueryVariables>;
export function refetchSpaceCardQuery(variables: SchemaTypes.SpaceCardQueryVariables) {
  return { query: SpaceCardDocument, variables: variables };
}

export const SpaceGroupDocument = gql`
  query spaceGroup($spaceId: UUID_NAMEID!, $groupId: UUID!) {
    space(ID: $spaceId) {
      id
      group(ID: $groupId) {
        ...GroupInfo
      }
    }
  }
  ${GroupInfoFragmentDoc}
`;

/**
 * __useSpaceGroupQuery__
 *
 * To run a query within a React component, call `useSpaceGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceGroupQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useSpaceGroupQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceGroupQuery, SchemaTypes.SpaceGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceGroupQuery, SchemaTypes.SpaceGroupQueryVariables>(
    SpaceGroupDocument,
    options
  );
}

export function useSpaceGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpaceGroupQuery, SchemaTypes.SpaceGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceGroupQuery, SchemaTypes.SpaceGroupQueryVariables>(
    SpaceGroupDocument,
    options
  );
}

export type SpaceGroupQueryHookResult = ReturnType<typeof useSpaceGroupQuery>;
export type SpaceGroupLazyQueryHookResult = ReturnType<typeof useSpaceGroupLazyQuery>;
export type SpaceGroupQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceGroupQuery,
  SchemaTypes.SpaceGroupQueryVariables
>;
export function refetchSpaceGroupQuery(variables: SchemaTypes.SpaceGroupQueryVariables) {
  return { query: SpaceGroupDocument, variables: variables };
}

export const SpaceInnovationFlowTemplatesDocument = gql`
  query spaceInnovationFlowTemplates($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        innovationFlowTemplates {
          definition
          id
          type
          profile {
            id
            displayName
          }
        }
      }
    }
  }
`;

/**
 * __useSpaceInnovationFlowTemplatesQuery__
 *
 * To run a query within a React component, call `useSpaceInnovationFlowTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceInnovationFlowTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceInnovationFlowTemplatesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceInnovationFlowTemplatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceInnovationFlowTemplatesQuery,
    SchemaTypes.SpaceInnovationFlowTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpaceInnovationFlowTemplatesQuery,
    SchemaTypes.SpaceInnovationFlowTemplatesQueryVariables
  >(SpaceInnovationFlowTemplatesDocument, options);
}

export function useSpaceInnovationFlowTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceInnovationFlowTemplatesQuery,
    SchemaTypes.SpaceInnovationFlowTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceInnovationFlowTemplatesQuery,
    SchemaTypes.SpaceInnovationFlowTemplatesQueryVariables
  >(SpaceInnovationFlowTemplatesDocument, options);
}

export type SpaceInnovationFlowTemplatesQueryHookResult = ReturnType<typeof useSpaceInnovationFlowTemplatesQuery>;
export type SpaceInnovationFlowTemplatesLazyQueryHookResult = ReturnType<
  typeof useSpaceInnovationFlowTemplatesLazyQuery
>;
export type SpaceInnovationFlowTemplatesQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceInnovationFlowTemplatesQuery,
  SchemaTypes.SpaceInnovationFlowTemplatesQueryVariables
>;
export function refetchSpaceInnovationFlowTemplatesQuery(
  variables: SchemaTypes.SpaceInnovationFlowTemplatesQueryVariables
) {
  return { query: SpaceInnovationFlowTemplatesDocument, variables: variables };
}

export const SpaceNameDocument = gql`
  query spaceName($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      ...SpaceName
    }
  }
  ${SpaceNameFragmentDoc}
`;

/**
 * __useSpaceNameQuery__
 *
 * To run a query within a React component, call `useSpaceNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceNameQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceNameQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceNameQuery, SchemaTypes.SpaceNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceNameQuery, SchemaTypes.SpaceNameQueryVariables>(SpaceNameDocument, options);
}

export function useSpaceNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SpaceNameQuery, SchemaTypes.SpaceNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceNameQuery, SchemaTypes.SpaceNameQueryVariables>(
    SpaceNameDocument,
    options
  );
}

export type SpaceNameQueryHookResult = ReturnType<typeof useSpaceNameQuery>;
export type SpaceNameLazyQueryHookResult = ReturnType<typeof useSpaceNameLazyQuery>;
export type SpaceNameQueryResult = Apollo.QueryResult<SchemaTypes.SpaceNameQuery, SchemaTypes.SpaceNameQueryVariables>;
export function refetchSpaceNameQuery(variables: SchemaTypes.SpaceNameQueryVariables) {
  return { query: SpaceNameDocument, variables: variables };
}

export const ChallengeCreatedDocument = gql`
  subscription ChallengeCreated($spaceID: UUID_NAMEID!) {
    challengeCreated(spaceID: $spaceID) {
      challenge {
        ...ChallengeCard
      }
    }
  }
  ${ChallengeCardFragmentDoc}
`;

/**
 * __useChallengeCreatedSubscription__
 *
 * To run a query within a React component, call `useChallengeCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChallengeCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeCreatedSubscription({
 *   variables: {
 *      spaceID: // value for 'spaceID'
 *   },
 * });
 */
export function useChallengeCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SchemaTypes.ChallengeCreatedSubscription,
    SchemaTypes.ChallengeCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SchemaTypes.ChallengeCreatedSubscription,
    SchemaTypes.ChallengeCreatedSubscriptionVariables
  >(ChallengeCreatedDocument, options);
}

export type ChallengeCreatedSubscriptionHookResult = ReturnType<typeof useChallengeCreatedSubscription>;
export type ChallengeCreatedSubscriptionResult = Apollo.SubscriptionResult<SchemaTypes.ChallengeCreatedSubscription>;
export const BannerInnovationHubDocument = gql`
  query BannerInnovationHub($subdomain: String) {
    platform {
      id
      innovationHub(subdomain: $subdomain) {
        id
        profile {
          id
          displayName
        }
        spaceListFilter {
          id
        }
      }
    }
  }
`;

/**
 * __useBannerInnovationHubQuery__
 *
 * To run a query within a React component, call `useBannerInnovationHubQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannerInnovationHubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannerInnovationHubQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useBannerInnovationHubQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.BannerInnovationHubQuery,
    SchemaTypes.BannerInnovationHubQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.BannerInnovationHubQuery, SchemaTypes.BannerInnovationHubQueryVariables>(
    BannerInnovationHubDocument,
    options
  );
}

export function useBannerInnovationHubLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.BannerInnovationHubQuery,
    SchemaTypes.BannerInnovationHubQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.BannerInnovationHubQuery, SchemaTypes.BannerInnovationHubQueryVariables>(
    BannerInnovationHubDocument,
    options
  );
}

export type BannerInnovationHubQueryHookResult = ReturnType<typeof useBannerInnovationHubQuery>;
export type BannerInnovationHubLazyQueryHookResult = ReturnType<typeof useBannerInnovationHubLazyQuery>;
export type BannerInnovationHubQueryResult = Apollo.QueryResult<
  SchemaTypes.BannerInnovationHubQuery,
  SchemaTypes.BannerInnovationHubQueryVariables
>;
export function refetchBannerInnovationHubQuery(variables?: SchemaTypes.BannerInnovationHubQueryVariables) {
  return { query: BannerInnovationHubDocument, variables: variables };
}

export const AdminGlobalOrganizationsListDocument = gql`
  query adminGlobalOrganizationsList($first: Int!, $after: UUID, $filter: OrganizationFilterInput) {
    organizationsPaginated(first: $first, after: $after, filter: $filter) {
      organization {
        id
        nameID
        profile {
          id
          displayName
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

/**
 * __useAdminGlobalOrganizationsListQuery__
 *
 * To run a query within a React component, call `useAdminGlobalOrganizationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGlobalOrganizationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGlobalOrganizationsListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminGlobalOrganizationsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AdminGlobalOrganizationsListQuery,
    SchemaTypes.AdminGlobalOrganizationsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.AdminGlobalOrganizationsListQuery,
    SchemaTypes.AdminGlobalOrganizationsListQueryVariables
  >(AdminGlobalOrganizationsListDocument, options);
}

export function useAdminGlobalOrganizationsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AdminGlobalOrganizationsListQuery,
    SchemaTypes.AdminGlobalOrganizationsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.AdminGlobalOrganizationsListQuery,
    SchemaTypes.AdminGlobalOrganizationsListQueryVariables
  >(AdminGlobalOrganizationsListDocument, options);
}

export type AdminGlobalOrganizationsListQueryHookResult = ReturnType<typeof useAdminGlobalOrganizationsListQuery>;
export type AdminGlobalOrganizationsListLazyQueryHookResult = ReturnType<
  typeof useAdminGlobalOrganizationsListLazyQuery
>;
export type AdminGlobalOrganizationsListQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminGlobalOrganizationsListQuery,
  SchemaTypes.AdminGlobalOrganizationsListQueryVariables
>;
export function refetchAdminGlobalOrganizationsListQuery(
  variables: SchemaTypes.AdminGlobalOrganizationsListQueryVariables
) {
  return { query: AdminGlobalOrganizationsListDocument, variables: variables };
}

export const UpdateSpacePlatformSettingsDocument = gql`
  mutation UpdateSpacePlatformSettings(
    $spaceID: String!
    $hostID: UUID_NAMEID
    $nameID: NameID
    $visibility: SpaceVisibility
  ) {
    updateSpacePlatformSettings(
      updateData: { spaceID: $spaceID, hostID: $hostID, nameID: $nameID, visibility: $visibility }
    ) {
      id
      visibility
      nameID
      host {
        id
      }
    }
  }
`;
export type UpdateSpacePlatformSettingsMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateSpacePlatformSettingsMutation,
  SchemaTypes.UpdateSpacePlatformSettingsMutationVariables
>;

/**
 * __useUpdateSpacePlatformSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSpacePlatformSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpacePlatformSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpacePlatformSettingsMutation, { data, loading, error }] = useUpdateSpacePlatformSettingsMutation({
 *   variables: {
 *      spaceID: // value for 'spaceID'
 *      hostID: // value for 'hostID'
 *      nameID: // value for 'nameID'
 *      visibility: // value for 'visibility'
 *   },
 * });
 */
export function useUpdateSpacePlatformSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateSpacePlatformSettingsMutation,
    SchemaTypes.UpdateSpacePlatformSettingsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateSpacePlatformSettingsMutation,
    SchemaTypes.UpdateSpacePlatformSettingsMutationVariables
  >(UpdateSpacePlatformSettingsDocument, options);
}

export type UpdateSpacePlatformSettingsMutationHookResult = ReturnType<typeof useUpdateSpacePlatformSettingsMutation>;
export type UpdateSpacePlatformSettingsMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateSpacePlatformSettingsMutation>;
export type UpdateSpacePlatformSettingsMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateSpacePlatformSettingsMutation,
  SchemaTypes.UpdateSpacePlatformSettingsMutationVariables
>;
export const AdminSpacesListDocument = gql`
  query adminSpacesList {
    spaces(filter: { visibilities: [ARCHIVED, ACTIVE, DEMO] }) {
      ...AdminSpace
      visibility
    }
  }
  ${AdminSpaceFragmentDoc}
`;

/**
 * __useAdminSpacesListQuery__
 *
 * To run a query within a React component, call `useAdminSpacesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSpacesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSpacesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminSpacesListQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.AdminSpacesListQuery, SchemaTypes.AdminSpacesListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AdminSpacesListQuery, SchemaTypes.AdminSpacesListQueryVariables>(
    AdminSpacesListDocument,
    options
  );
}

export function useAdminSpacesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.AdminSpacesListQuery, SchemaTypes.AdminSpacesListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AdminSpacesListQuery, SchemaTypes.AdminSpacesListQueryVariables>(
    AdminSpacesListDocument,
    options
  );
}

export type AdminSpacesListQueryHookResult = ReturnType<typeof useAdminSpacesListQuery>;
export type AdminSpacesListLazyQueryHookResult = ReturnType<typeof useAdminSpacesListLazyQuery>;
export type AdminSpacesListQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminSpacesListQuery,
  SchemaTypes.AdminSpacesListQueryVariables
>;
export function refetchAdminSpacesListQuery(variables?: SchemaTypes.AdminSpacesListQueryVariables) {
  return { query: AdminSpacesListDocument, variables: variables };
}

export const SpaceStorageAdminDocument = gql`
  query SpaceStorageAdmin($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      profile {
        id
        displayName
      }
      storageBucket {
        id
        size
        documents {
          ...DocumentData
        }
      }
      challenges {
        id
        nameID
        profile {
          id
          displayName
        }
        storageBucket {
          id
          documents {
            ...DocumentData
          }
        }
      }
    }
  }
  ${DocumentDataFragmentDoc}
`;

/**
 * __useSpaceStorageAdminQuery__
 *
 * To run a query within a React component, call `useSpaceStorageAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceStorageAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceStorageAdminQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useSpaceStorageAdminQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SpaceStorageAdminQuery, SchemaTypes.SpaceStorageAdminQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceStorageAdminQuery, SchemaTypes.SpaceStorageAdminQueryVariables>(
    SpaceStorageAdminDocument,
    options
  );
}

export function useSpaceStorageAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceStorageAdminQuery,
    SchemaTypes.SpaceStorageAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceStorageAdminQuery, SchemaTypes.SpaceStorageAdminQueryVariables>(
    SpaceStorageAdminDocument,
    options
  );
}

export type SpaceStorageAdminQueryHookResult = ReturnType<typeof useSpaceStorageAdminQuery>;
export type SpaceStorageAdminLazyQueryHookResult = ReturnType<typeof useSpaceStorageAdminLazyQuery>;
export type SpaceStorageAdminQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceStorageAdminQuery,
  SchemaTypes.SpaceStorageAdminQueryVariables
>;
export function refetchSpaceStorageAdminQuery(variables: SchemaTypes.SpaceStorageAdminQueryVariables) {
  return { query: SpaceStorageAdminDocument, variables: variables };
}

export const DeleteDocumentDocument = gql`
  mutation DeleteDocument($documentId: UUID!) {
    deleteDocument(deleteData: { ID: $documentId }) {
      id
    }
  }
`;
export type DeleteDocumentMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteDocumentMutation,
  SchemaTypes.DeleteDocumentMutationVariables
>;

/**
 * __useDeleteDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocumentMutation, { data, loading, error }] = useDeleteDocumentMutation({
 *   variables: {
 *      documentId: // value for 'documentId'
 *   },
 * });
 */
export function useDeleteDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteDocumentMutation,
    SchemaTypes.DeleteDocumentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteDocumentMutation, SchemaTypes.DeleteDocumentMutationVariables>(
    DeleteDocumentDocument,
    options
  );
}

export type DeleteDocumentMutationHookResult = ReturnType<typeof useDeleteDocumentMutation>;
export type DeleteDocumentMutationResult = Apollo.MutationResult<SchemaTypes.DeleteDocumentMutation>;
export type DeleteDocumentMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteDocumentMutation,
  SchemaTypes.DeleteDocumentMutationVariables
>;
export const AdminSpaceTemplatesDocument = gql`
  query AdminSpaceTemplates($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      templates {
        id
        authorization {
          id
          myPrivileges
        }
        postTemplates {
          ...AdminPostTemplate
        }
        whiteboardTemplates {
          ...AdminWhiteboardTemplate
        }
        innovationFlowTemplates {
          ...AdminInnovationFlowTemplate
        }
      }
    }
  }
  ${AdminPostTemplateFragmentDoc}
  ${AdminWhiteboardTemplateFragmentDoc}
  ${AdminInnovationFlowTemplateFragmentDoc}
`;

/**
 * __useAdminSpaceTemplatesQuery__
 *
 * To run a query within a React component, call `useAdminSpaceTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSpaceTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSpaceTemplatesQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useAdminSpaceTemplatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AdminSpaceTemplatesQuery,
    SchemaTypes.AdminSpaceTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AdminSpaceTemplatesQuery, SchemaTypes.AdminSpaceTemplatesQueryVariables>(
    AdminSpaceTemplatesDocument,
    options
  );
}

export function useAdminSpaceTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AdminSpaceTemplatesQuery,
    SchemaTypes.AdminSpaceTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AdminSpaceTemplatesQuery, SchemaTypes.AdminSpaceTemplatesQueryVariables>(
    AdminSpaceTemplatesDocument,
    options
  );
}

export type AdminSpaceTemplatesQueryHookResult = ReturnType<typeof useAdminSpaceTemplatesQuery>;
export type AdminSpaceTemplatesLazyQueryHookResult = ReturnType<typeof useAdminSpaceTemplatesLazyQuery>;
export type AdminSpaceTemplatesQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminSpaceTemplatesQuery,
  SchemaTypes.AdminSpaceTemplatesQueryVariables
>;
export function refetchAdminSpaceTemplatesQuery(variables: SchemaTypes.AdminSpaceTemplatesQueryVariables) {
  return { query: AdminSpaceTemplatesDocument, variables: variables };
}

export const InnovationPacksDocument = gql`
  query InnovationPacks {
    platform {
      id
      library {
        id
        innovationPacks {
          id
          nameID
          provider {
            ...InnovationPackProviderProfileWithAvatar
          }
          profile {
            id
            displayName
          }
          templates {
            id
            postTemplates {
              ...AdminPostTemplate
            }
            whiteboardTemplates {
              ...AdminWhiteboardTemplate
            }
            innovationFlowTemplates {
              ...AdminInnovationFlowTemplate
            }
          }
        }
      }
    }
  }
  ${InnovationPackProviderProfileWithAvatarFragmentDoc}
  ${AdminPostTemplateFragmentDoc}
  ${AdminWhiteboardTemplateFragmentDoc}
  ${AdminInnovationFlowTemplateFragmentDoc}
`;

/**
 * __useInnovationPacksQuery__
 *
 * To run a query within a React component, call `useInnovationPacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationPacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationPacksQuery({
 *   variables: {
 *   },
 * });
 */
export function useInnovationPacksQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.InnovationPacksQuery, SchemaTypes.InnovationPacksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.InnovationPacksQuery, SchemaTypes.InnovationPacksQueryVariables>(
    InnovationPacksDocument,
    options
  );
}

export function useInnovationPacksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.InnovationPacksQuery, SchemaTypes.InnovationPacksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.InnovationPacksQuery, SchemaTypes.InnovationPacksQueryVariables>(
    InnovationPacksDocument,
    options
  );
}

export type InnovationPacksQueryHookResult = ReturnType<typeof useInnovationPacksQuery>;
export type InnovationPacksLazyQueryHookResult = ReturnType<typeof useInnovationPacksLazyQuery>;
export type InnovationPacksQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationPacksQuery,
  SchemaTypes.InnovationPacksQueryVariables
>;
export function refetchInnovationPacksQuery(variables?: SchemaTypes.InnovationPacksQueryVariables) {
  return { query: InnovationPacksDocument, variables: variables };
}

export const AdminInnovationPacksListDocument = gql`
  query AdminInnovationPacksList {
    platform {
      id
      library {
        id
        innovationPacks {
          id
          nameID
          profile {
            id
            displayName
          }
        }
      }
    }
  }
`;

/**
 * __useAdminInnovationPacksListQuery__
 *
 * To run a query within a React component, call `useAdminInnovationPacksListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminInnovationPacksListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminInnovationPacksListQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminInnovationPacksListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.AdminInnovationPacksListQuery,
    SchemaTypes.AdminInnovationPacksListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AdminInnovationPacksListQuery, SchemaTypes.AdminInnovationPacksListQueryVariables>(
    AdminInnovationPacksListDocument,
    options
  );
}

export function useAdminInnovationPacksListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AdminInnovationPacksListQuery,
    SchemaTypes.AdminInnovationPacksListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.AdminInnovationPacksListQuery,
    SchemaTypes.AdminInnovationPacksListQueryVariables
  >(AdminInnovationPacksListDocument, options);
}

export type AdminInnovationPacksListQueryHookResult = ReturnType<typeof useAdminInnovationPacksListQuery>;
export type AdminInnovationPacksListLazyQueryHookResult = ReturnType<typeof useAdminInnovationPacksListLazyQuery>;
export type AdminInnovationPacksListQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminInnovationPacksListQuery,
  SchemaTypes.AdminInnovationPacksListQueryVariables
>;
export function refetchAdminInnovationPacksListQuery(variables?: SchemaTypes.AdminInnovationPacksListQueryVariables) {
  return { query: AdminInnovationPacksListDocument, variables: variables };
}

export const DeleteInnovationPackDocument = gql`
  mutation deleteInnovationPack($innovationPackId: UUID_NAMEID!) {
    deleteInnovationPack(deleteData: { ID: $innovationPackId }) {
      id
    }
  }
`;
export type DeleteInnovationPackMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteInnovationPackMutation,
  SchemaTypes.DeleteInnovationPackMutationVariables
>;

/**
 * __useDeleteInnovationPackMutation__
 *
 * To run a mutation, you first call `useDeleteInnovationPackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInnovationPackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInnovationPackMutation, { data, loading, error }] = useDeleteInnovationPackMutation({
 *   variables: {
 *      innovationPackId: // value for 'innovationPackId'
 *   },
 * });
 */
export function useDeleteInnovationPackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteInnovationPackMutation,
    SchemaTypes.DeleteInnovationPackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.DeleteInnovationPackMutation,
    SchemaTypes.DeleteInnovationPackMutationVariables
  >(DeleteInnovationPackDocument, options);
}

export type DeleteInnovationPackMutationHookResult = ReturnType<typeof useDeleteInnovationPackMutation>;
export type DeleteInnovationPackMutationResult = Apollo.MutationResult<SchemaTypes.DeleteInnovationPackMutation>;
export type DeleteInnovationPackMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteInnovationPackMutation,
  SchemaTypes.DeleteInnovationPackMutationVariables
>;
export const AdminInnovationPackDocument = gql`
  query AdminInnovationPack($innovationPackId: UUID_NAMEID!) {
    platform {
      id
      library {
        id
        innovationPack(ID: $innovationPackId) {
          id
          nameID
          provider {
            ...InnovationPackProviderProfileWithAvatar
          }
          profile {
            ...InnovationPackProfile
          }
          templates {
            ...AdminInnovationPackTemplates
          }
        }
      }
    }
    organizations {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
  ${InnovationPackProviderProfileWithAvatarFragmentDoc}
  ${InnovationPackProfileFragmentDoc}
  ${AdminInnovationPackTemplatesFragmentDoc}
`;

/**
 * __useAdminInnovationPackQuery__
 *
 * To run a query within a React component, call `useAdminInnovationPackQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminInnovationPackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminInnovationPackQuery({
 *   variables: {
 *      innovationPackId: // value for 'innovationPackId'
 *   },
 * });
 */
export function useAdminInnovationPackQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AdminInnovationPackQuery,
    SchemaTypes.AdminInnovationPackQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AdminInnovationPackQuery, SchemaTypes.AdminInnovationPackQueryVariables>(
    AdminInnovationPackDocument,
    options
  );
}

export function useAdminInnovationPackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AdminInnovationPackQuery,
    SchemaTypes.AdminInnovationPackQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.AdminInnovationPackQuery, SchemaTypes.AdminInnovationPackQueryVariables>(
    AdminInnovationPackDocument,
    options
  );
}

export type AdminInnovationPackQueryHookResult = ReturnType<typeof useAdminInnovationPackQuery>;
export type AdminInnovationPackLazyQueryHookResult = ReturnType<typeof useAdminInnovationPackLazyQuery>;
export type AdminInnovationPackQueryResult = Apollo.QueryResult<
  SchemaTypes.AdminInnovationPackQuery,
  SchemaTypes.AdminInnovationPackQueryVariables
>;
export function refetchAdminInnovationPackQuery(variables: SchemaTypes.AdminInnovationPackQueryVariables) {
  return { query: AdminInnovationPackDocument, variables: variables };
}

export const CreateInnovationPackDocument = gql`
  mutation createInnovationPack($packData: CreateInnovationPackOnLibraryInput!) {
    createInnovationPackOnLibrary(packData: $packData) {
      id
      nameID
    }
  }
`;
export type CreateInnovationPackMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateInnovationPackMutation,
  SchemaTypes.CreateInnovationPackMutationVariables
>;

/**
 * __useCreateInnovationPackMutation__
 *
 * To run a mutation, you first call `useCreateInnovationPackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInnovationPackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInnovationPackMutation, { data, loading, error }] = useCreateInnovationPackMutation({
 *   variables: {
 *      packData: // value for 'packData'
 *   },
 * });
 */
export function useCreateInnovationPackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateInnovationPackMutation,
    SchemaTypes.CreateInnovationPackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateInnovationPackMutation,
    SchemaTypes.CreateInnovationPackMutationVariables
  >(CreateInnovationPackDocument, options);
}

export type CreateInnovationPackMutationHookResult = ReturnType<typeof useCreateInnovationPackMutation>;
export type CreateInnovationPackMutationResult = Apollo.MutationResult<SchemaTypes.CreateInnovationPackMutation>;
export type CreateInnovationPackMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateInnovationPackMutation,
  SchemaTypes.CreateInnovationPackMutationVariables
>;
export const UpdateInnovationPackDocument = gql`
  mutation updateInnovationPack($packData: UpdateInnovationPackInput!) {
    updateInnovationPack(innovationPackData: $packData) {
      id
      nameID
    }
  }
`;
export type UpdateInnovationPackMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateInnovationPackMutation,
  SchemaTypes.UpdateInnovationPackMutationVariables
>;

/**
 * __useUpdateInnovationPackMutation__
 *
 * To run a mutation, you first call `useUpdateInnovationPackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInnovationPackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInnovationPackMutation, { data, loading, error }] = useUpdateInnovationPackMutation({
 *   variables: {
 *      packData: // value for 'packData'
 *   },
 * });
 */
export function useUpdateInnovationPackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateInnovationPackMutation,
    SchemaTypes.UpdateInnovationPackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateInnovationPackMutation,
    SchemaTypes.UpdateInnovationPackMutationVariables
  >(UpdateInnovationPackDocument, options);
}

export type UpdateInnovationPackMutationHookResult = ReturnType<typeof useUpdateInnovationPackMutation>;
export type UpdateInnovationPackMutationResult = Apollo.MutationResult<SchemaTypes.UpdateInnovationPackMutation>;
export type UpdateInnovationPackMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateInnovationPackMutation,
  SchemaTypes.UpdateInnovationPackMutationVariables
>;
export const UpdateInnovationFlowTemplateDocument = gql`
  mutation updateInnovationFlowTemplate(
    $templateId: UUID!
    $profile: UpdateProfileInput!
    $definition: LifecycleDefinition!
  ) {
    updateInnovationFlowTemplate(
      innovationFlowTemplateInput: { ID: $templateId, profile: $profile, definition: $definition }
    ) {
      id
    }
  }
`;
export type UpdateInnovationFlowTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateInnovationFlowTemplateMutation,
  SchemaTypes.UpdateInnovationFlowTemplateMutationVariables
>;

/**
 * __useUpdateInnovationFlowTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateInnovationFlowTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInnovationFlowTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInnovationFlowTemplateMutation, { data, loading, error }] = useUpdateInnovationFlowTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      profile: // value for 'profile'
 *      definition: // value for 'definition'
 *   },
 * });
 */
export function useUpdateInnovationFlowTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateInnovationFlowTemplateMutation,
    SchemaTypes.UpdateInnovationFlowTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateInnovationFlowTemplateMutation,
    SchemaTypes.UpdateInnovationFlowTemplateMutationVariables
  >(UpdateInnovationFlowTemplateDocument, options);
}

export type UpdateInnovationFlowTemplateMutationHookResult = ReturnType<typeof useUpdateInnovationFlowTemplateMutation>;
export type UpdateInnovationFlowTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateInnovationFlowTemplateMutation>;
export type UpdateInnovationFlowTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateInnovationFlowTemplateMutation,
  SchemaTypes.UpdateInnovationFlowTemplateMutationVariables
>;
export const CreateInnovationFlowTemplateDocument = gql`
  mutation createInnovationFlowTemplate(
    $templatesSetId: UUID!
    $profile: CreateProfileInput!
    $definition: LifecycleDefinition!
    $type: InnovationFlowType!
    $tags: [String!]
  ) {
    createInnovationFlowTemplate(
      innovationFlowTemplateInput: {
        templatesSetID: $templatesSetId
        profile: $profile
        type: $type
        definition: $definition
        tags: $tags
      }
    ) {
      id
    }
  }
`;
export type CreateInnovationFlowTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateInnovationFlowTemplateMutation,
  SchemaTypes.CreateInnovationFlowTemplateMutationVariables
>;

/**
 * __useCreateInnovationFlowTemplateMutation__
 *
 * To run a mutation, you first call `useCreateInnovationFlowTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInnovationFlowTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInnovationFlowTemplateMutation, { data, loading, error }] = useCreateInnovationFlowTemplateMutation({
 *   variables: {
 *      templatesSetId: // value for 'templatesSetId'
 *      profile: // value for 'profile'
 *      definition: // value for 'definition'
 *      type: // value for 'type'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreateInnovationFlowTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateInnovationFlowTemplateMutation,
    SchemaTypes.CreateInnovationFlowTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateInnovationFlowTemplateMutation,
    SchemaTypes.CreateInnovationFlowTemplateMutationVariables
  >(CreateInnovationFlowTemplateDocument, options);
}

export type CreateInnovationFlowTemplateMutationHookResult = ReturnType<typeof useCreateInnovationFlowTemplateMutation>;
export type CreateInnovationFlowTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateInnovationFlowTemplateMutation>;
export type CreateInnovationFlowTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateInnovationFlowTemplateMutation,
  SchemaTypes.CreateInnovationFlowTemplateMutationVariables
>;
export const DeleteInnovationFlowTemplateDocument = gql`
  mutation deleteInnovationFlowTemplate($templateId: UUID!) {
    deleteInnovationFlowTemplate(deleteData: { ID: $templateId }) {
      id
    }
  }
`;
export type DeleteInnovationFlowTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteInnovationFlowTemplateMutation,
  SchemaTypes.DeleteInnovationFlowTemplateMutationVariables
>;

/**
 * __useDeleteInnovationFlowTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteInnovationFlowTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInnovationFlowTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInnovationFlowTemplateMutation, { data, loading, error }] = useDeleteInnovationFlowTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useDeleteInnovationFlowTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteInnovationFlowTemplateMutation,
    SchemaTypes.DeleteInnovationFlowTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.DeleteInnovationFlowTemplateMutation,
    SchemaTypes.DeleteInnovationFlowTemplateMutationVariables
  >(DeleteInnovationFlowTemplateDocument, options);
}

export type DeleteInnovationFlowTemplateMutationHookResult = ReturnType<typeof useDeleteInnovationFlowTemplateMutation>;
export type DeleteInnovationFlowTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.DeleteInnovationFlowTemplateMutation>;
export type DeleteInnovationFlowTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteInnovationFlowTemplateMutation,
  SchemaTypes.DeleteInnovationFlowTemplateMutationVariables
>;
export const InnovationFlowAuthorizationDocument = gql`
  query innovationFlowAuthorization($innovationFlowId: UUID!) {
    lookup {
      innovationFlow(ID: $innovationFlowId) {
        id
        authorization {
          myPrivileges
        }
      }
    }
  }
`;

/**
 * __useInnovationFlowAuthorizationQuery__
 *
 * To run a query within a React component, call `useInnovationFlowAuthorizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationFlowAuthorizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationFlowAuthorizationQuery({
 *   variables: {
 *      innovationFlowId: // value for 'innovationFlowId'
 *   },
 * });
 */
export function useInnovationFlowAuthorizationQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationFlowAuthorizationQuery,
    SchemaTypes.InnovationFlowAuthorizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.InnovationFlowAuthorizationQuery,
    SchemaTypes.InnovationFlowAuthorizationQueryVariables
  >(InnovationFlowAuthorizationDocument, options);
}

export function useInnovationFlowAuthorizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationFlowAuthorizationQuery,
    SchemaTypes.InnovationFlowAuthorizationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.InnovationFlowAuthorizationQuery,
    SchemaTypes.InnovationFlowAuthorizationQueryVariables
  >(InnovationFlowAuthorizationDocument, options);
}

export type InnovationFlowAuthorizationQueryHookResult = ReturnType<typeof useInnovationFlowAuthorizationQuery>;
export type InnovationFlowAuthorizationLazyQueryHookResult = ReturnType<typeof useInnovationFlowAuthorizationLazyQuery>;
export type InnovationFlowAuthorizationQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationFlowAuthorizationQuery,
  SchemaTypes.InnovationFlowAuthorizationQueryVariables
>;
export function refetchInnovationFlowAuthorizationQuery(
  variables: SchemaTypes.InnovationFlowAuthorizationQueryVariables
) {
  return { query: InnovationFlowAuthorizationDocument, variables: variables };
}

export const UpdatePostTemplateDocument = gql`
  mutation updatePostTemplate(
    $templateId: UUID!
    $defaultDescription: Markdown
    $profile: UpdateProfileInput
    $type: String
  ) {
    updatePostTemplate(
      postTemplateInput: { ID: $templateId, defaultDescription: $defaultDescription, profile: $profile, type: $type }
    ) {
      id
    }
  }
`;
export type UpdatePostTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdatePostTemplateMutation,
  SchemaTypes.UpdatePostTemplateMutationVariables
>;

/**
 * __useUpdatePostTemplateMutation__
 *
 * To run a mutation, you first call `useUpdatePostTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostTemplateMutation, { data, loading, error }] = useUpdatePostTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      defaultDescription: // value for 'defaultDescription'
 *      profile: // value for 'profile'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdatePostTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdatePostTemplateMutation,
    SchemaTypes.UpdatePostTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdatePostTemplateMutation, SchemaTypes.UpdatePostTemplateMutationVariables>(
    UpdatePostTemplateDocument,
    options
  );
}

export type UpdatePostTemplateMutationHookResult = ReturnType<typeof useUpdatePostTemplateMutation>;
export type UpdatePostTemplateMutationResult = Apollo.MutationResult<SchemaTypes.UpdatePostTemplateMutation>;
export type UpdatePostTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdatePostTemplateMutation,
  SchemaTypes.UpdatePostTemplateMutationVariables
>;
export const CreatePostTemplateDocument = gql`
  mutation createPostTemplate(
    $templatesSetId: UUID!
    $defaultDescription: Markdown!
    $profile: CreateProfileInput!
    $type: String!
    $tags: [String!]
  ) {
    createPostTemplate(
      postTemplateInput: {
        templatesSetID: $templatesSetId
        defaultDescription: $defaultDescription
        profile: $profile
        type: $type
        tags: $tags
      }
    ) {
      id
    }
  }
`;
export type CreatePostTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreatePostTemplateMutation,
  SchemaTypes.CreatePostTemplateMutationVariables
>;

/**
 * __useCreatePostTemplateMutation__
 *
 * To run a mutation, you first call `useCreatePostTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostTemplateMutation, { data, loading, error }] = useCreatePostTemplateMutation({
 *   variables: {
 *      templatesSetId: // value for 'templatesSetId'
 *      defaultDescription: // value for 'defaultDescription'
 *      profile: // value for 'profile'
 *      type: // value for 'type'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreatePostTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreatePostTemplateMutation,
    SchemaTypes.CreatePostTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreatePostTemplateMutation, SchemaTypes.CreatePostTemplateMutationVariables>(
    CreatePostTemplateDocument,
    options
  );
}

export type CreatePostTemplateMutationHookResult = ReturnType<typeof useCreatePostTemplateMutation>;
export type CreatePostTemplateMutationResult = Apollo.MutationResult<SchemaTypes.CreatePostTemplateMutation>;
export type CreatePostTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreatePostTemplateMutation,
  SchemaTypes.CreatePostTemplateMutationVariables
>;
export const DeletePostTemplateDocument = gql`
  mutation deletePostTemplate($templateId: UUID!) {
    deletePostTemplate(deleteData: { ID: $templateId }) {
      id
    }
  }
`;
export type DeletePostTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeletePostTemplateMutation,
  SchemaTypes.DeletePostTemplateMutationVariables
>;

/**
 * __useDeletePostTemplateMutation__
 *
 * To run a mutation, you first call `useDeletePostTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostTemplateMutation, { data, loading, error }] = useDeletePostTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useDeletePostTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeletePostTemplateMutation,
    SchemaTypes.DeletePostTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeletePostTemplateMutation, SchemaTypes.DeletePostTemplateMutationVariables>(
    DeletePostTemplateDocument,
    options
  );
}

export type DeletePostTemplateMutationHookResult = ReturnType<typeof useDeletePostTemplateMutation>;
export type DeletePostTemplateMutationResult = Apollo.MutationResult<SchemaTypes.DeletePostTemplateMutation>;
export type DeletePostTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeletePostTemplateMutation,
  SchemaTypes.DeletePostTemplateMutationVariables
>;
export const UpdateWhiteboardTemplateDocument = gql`
  mutation updateWhiteboardTemplate($templateId: UUID!, $content: WhiteboardContent, $profile: UpdateProfileInput!) {
    updateWhiteboardTemplate(whiteboardTemplateInput: { ID: $templateId, content: $content, profile: $profile }) {
      id
      profile {
        id
        visual(type: CARD) {
          id
        }
      }
    }
  }
`;
export type UpdateWhiteboardTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateWhiteboardTemplateMutation,
  SchemaTypes.UpdateWhiteboardTemplateMutationVariables
>;

/**
 * __useUpdateWhiteboardTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateWhiteboardTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWhiteboardTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWhiteboardTemplateMutation, { data, loading, error }] = useUpdateWhiteboardTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      content: // value for 'content'
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useUpdateWhiteboardTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateWhiteboardTemplateMutation,
    SchemaTypes.UpdateWhiteboardTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.UpdateWhiteboardTemplateMutation,
    SchemaTypes.UpdateWhiteboardTemplateMutationVariables
  >(UpdateWhiteboardTemplateDocument, options);
}

export type UpdateWhiteboardTemplateMutationHookResult = ReturnType<typeof useUpdateWhiteboardTemplateMutation>;
export type UpdateWhiteboardTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.UpdateWhiteboardTemplateMutation>;
export type UpdateWhiteboardTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateWhiteboardTemplateMutation,
  SchemaTypes.UpdateWhiteboardTemplateMutationVariables
>;
export const CreateWhiteboardTemplateDocument = gql`
  mutation createWhiteboardTemplate(
    $templatesSetId: UUID!
    $content: WhiteboardContent!
    $profile: CreateProfileInput!
    $tags: [String!]
  ) {
    createWhiteboardTemplate(
      whiteboardTemplateInput: { templatesSetID: $templatesSetId, content: $content, profile: $profile, tags: $tags }
    ) {
      id
      profile {
        id
        visual(type: CARD) {
          id
        }
      }
    }
  }
`;
export type CreateWhiteboardTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateWhiteboardTemplateMutation,
  SchemaTypes.CreateWhiteboardTemplateMutationVariables
>;

/**
 * __useCreateWhiteboardTemplateMutation__
 *
 * To run a mutation, you first call `useCreateWhiteboardTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWhiteboardTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWhiteboardTemplateMutation, { data, loading, error }] = useCreateWhiteboardTemplateMutation({
 *   variables: {
 *      templatesSetId: // value for 'templatesSetId'
 *      content: // value for 'content'
 *      profile: // value for 'profile'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreateWhiteboardTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateWhiteboardTemplateMutation,
    SchemaTypes.CreateWhiteboardTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.CreateWhiteboardTemplateMutation,
    SchemaTypes.CreateWhiteboardTemplateMutationVariables
  >(CreateWhiteboardTemplateDocument, options);
}

export type CreateWhiteboardTemplateMutationHookResult = ReturnType<typeof useCreateWhiteboardTemplateMutation>;
export type CreateWhiteboardTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.CreateWhiteboardTemplateMutation>;
export type CreateWhiteboardTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateWhiteboardTemplateMutation,
  SchemaTypes.CreateWhiteboardTemplateMutationVariables
>;
export const DeleteWhiteboardTemplateDocument = gql`
  mutation deleteWhiteboardTemplate($templateId: UUID!) {
    deleteWhiteboardTemplate(deleteData: { ID: $templateId }) {
      id
    }
  }
`;
export type DeleteWhiteboardTemplateMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteWhiteboardTemplateMutation,
  SchemaTypes.DeleteWhiteboardTemplateMutationVariables
>;

/**
 * __useDeleteWhiteboardTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteWhiteboardTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWhiteboardTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWhiteboardTemplateMutation, { data, loading, error }] = useDeleteWhiteboardTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useDeleteWhiteboardTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteWhiteboardTemplateMutation,
    SchemaTypes.DeleteWhiteboardTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SchemaTypes.DeleteWhiteboardTemplateMutation,
    SchemaTypes.DeleteWhiteboardTemplateMutationVariables
  >(DeleteWhiteboardTemplateDocument, options);
}

export type DeleteWhiteboardTemplateMutationHookResult = ReturnType<typeof useDeleteWhiteboardTemplateMutation>;
export type DeleteWhiteboardTemplateMutationResult =
  Apollo.MutationResult<SchemaTypes.DeleteWhiteboardTemplateMutation>;
export type DeleteWhiteboardTemplateMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteWhiteboardTemplateMutation,
  SchemaTypes.DeleteWhiteboardTemplateMutationVariables
>;
export const ConfigurationDocument = gql`
  query configuration {
    platform {
      configuration {
        ...Configuration
      }
    }
  }
  ${ConfigurationFragmentDoc}
`;

/**
 * __useConfigurationQuery__
 *
 * To run a query within a React component, call `useConfigurationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigurationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigurationQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigurationQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.ConfigurationQuery, SchemaTypes.ConfigurationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ConfigurationQuery, SchemaTypes.ConfigurationQueryVariables>(
    ConfigurationDocument,
    options
  );
}

export function useConfigurationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.ConfigurationQuery, SchemaTypes.ConfigurationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ConfigurationQuery, SchemaTypes.ConfigurationQueryVariables>(
    ConfigurationDocument,
    options
  );
}

export type ConfigurationQueryHookResult = ReturnType<typeof useConfigurationQuery>;
export type ConfigurationLazyQueryHookResult = ReturnType<typeof useConfigurationLazyQuery>;
export type ConfigurationQueryResult = Apollo.QueryResult<
  SchemaTypes.ConfigurationQuery,
  SchemaTypes.ConfigurationQueryVariables
>;
export function refetchConfigurationQuery(variables?: SchemaTypes.ConfigurationQueryVariables) {
  return { query: ConfigurationDocument, variables: variables };
}

export const ServerMetadataDocument = gql`
  query serverMetadata {
    platform {
      metadata {
        metrics {
          id
          name
          value
        }
        services {
          name
          version
        }
      }
    }
  }
`;

/**
 * __useServerMetadataQuery__
 *
 * To run a query within a React component, call `useServerMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerMetadataQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerMetadataQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.ServerMetadataQuery, SchemaTypes.ServerMetadataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ServerMetadataQuery, SchemaTypes.ServerMetadataQueryVariables>(
    ServerMetadataDocument,
    options
  );
}

export function useServerMetadataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.ServerMetadataQuery, SchemaTypes.ServerMetadataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ServerMetadataQuery, SchemaTypes.ServerMetadataQueryVariables>(
    ServerMetadataDocument,
    options
  );
}

export type ServerMetadataQueryHookResult = ReturnType<typeof useServerMetadataQuery>;
export type ServerMetadataLazyQueryHookResult = ReturnType<typeof useServerMetadataLazyQuery>;
export type ServerMetadataQueryResult = Apollo.QueryResult<
  SchemaTypes.ServerMetadataQuery,
  SchemaTypes.ServerMetadataQueryVariables
>;
export function refetchServerMetadataQuery(variables?: SchemaTypes.ServerMetadataQueryVariables) {
  return { query: ServerMetadataDocument, variables: variables };
}

export const SearchDocument = gql`
  query search($searchData: SearchInput!) {
    search(searchData: $searchData) {
      journeyResults {
        id
        score
        terms
        type
        ... on SearchResultSpace {
          ...SearchResultSpace
        }
        ... on SearchResultChallenge {
          ...SearchResultChallenge
        }
        ... on SearchResultOpportunity {
          ...SearchResultOpportunity
        }
      }
      journeyResultsCount
      contributorResults {
        id
        score
        terms
        type
        ... on SearchResultUser {
          ...SearchResultUser
        }
        ... on SearchResultOrganization {
          ...SearchResultOrganization
        }
      }
      contributorResultsCount
      contributionResults {
        id
        score
        terms
        type
        ... on SearchResultPost {
          ...SearchResultPost
        }
      }
      contributionResultsCount
    }
  }
  ${SearchResultSpaceFragmentDoc}
  ${SearchResultChallengeFragmentDoc}
  ${SearchResultOpportunityFragmentDoc}
  ${SearchResultUserFragmentDoc}
  ${SearchResultOrganizationFragmentDoc}
  ${SearchResultPostFragmentDoc}
`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      searchData: // value for 'searchData'
 *   },
 * });
 */
export function useSearchQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.SearchQuery, SchemaTypes.SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SearchQuery, SchemaTypes.SearchQueryVariables>(SearchDocument, options);
}

export function useSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SchemaTypes.SearchQuery, SchemaTypes.SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SearchQuery, SchemaTypes.SearchQueryVariables>(SearchDocument, options);
}

export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SchemaTypes.SearchQuery, SchemaTypes.SearchQueryVariables>;
export function refetchSearchQuery(variables: SchemaTypes.SearchQueryVariables) {
  return { query: SearchDocument, variables: variables };
}

export const UserRolesSearchCardsDocument = gql`
  query userRolesSearchCards($userId: UUID_NAMEID_EMAIL!) {
    rolesUser(rolesData: { userID: $userId, filter: { visibilities: [ACTIVE, DEMO] } }) {
      spaces {
        id
        roles
        challenges {
          id
          nameID
          roles
        }
        opportunities {
          id
          roles
        }
      }
      organizations {
        id
        roles
      }
    }
  }
`;

/**
 * __useUserRolesSearchCardsQuery__
 *
 * To run a query within a React component, call `useUserRolesSearchCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesSearchCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesSearchCardsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserRolesSearchCardsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.UserRolesSearchCardsQuery,
    SchemaTypes.UserRolesSearchCardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserRolesSearchCardsQuery, SchemaTypes.UserRolesSearchCardsQueryVariables>(
    UserRolesSearchCardsDocument,
    options
  );
}

export function useUserRolesSearchCardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserRolesSearchCardsQuery,
    SchemaTypes.UserRolesSearchCardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserRolesSearchCardsQuery, SchemaTypes.UserRolesSearchCardsQueryVariables>(
    UserRolesSearchCardsDocument,
    options
  );
}

export type UserRolesSearchCardsQueryHookResult = ReturnType<typeof useUserRolesSearchCardsQuery>;
export type UserRolesSearchCardsLazyQueryHookResult = ReturnType<typeof useUserRolesSearchCardsLazyQuery>;
export type UserRolesSearchCardsQueryResult = Apollo.QueryResult<
  SchemaTypes.UserRolesSearchCardsQuery,
  SchemaTypes.UserRolesSearchCardsQueryVariables
>;
export function refetchUserRolesSearchCardsQuery(variables: SchemaTypes.UserRolesSearchCardsQueryVariables) {
  return { query: UserRolesSearchCardsDocument, variables: variables };
}

export const ShareLinkWithUserDocument = gql`
  mutation shareLinkWithUser($messageData: CommunicationSendMessageToUserInput!) {
    sendMessageToUser(messageData: $messageData)
  }
`;
export type ShareLinkWithUserMutationFn = Apollo.MutationFunction<
  SchemaTypes.ShareLinkWithUserMutation,
  SchemaTypes.ShareLinkWithUserMutationVariables
>;

/**
 * __useShareLinkWithUserMutation__
 *
 * To run a mutation, you first call `useShareLinkWithUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareLinkWithUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareLinkWithUserMutation, { data, loading, error }] = useShareLinkWithUserMutation({
 *   variables: {
 *      messageData: // value for 'messageData'
 *   },
 * });
 */
export function useShareLinkWithUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.ShareLinkWithUserMutation,
    SchemaTypes.ShareLinkWithUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.ShareLinkWithUserMutation, SchemaTypes.ShareLinkWithUserMutationVariables>(
    ShareLinkWithUserDocument,
    options
  );
}

export type ShareLinkWithUserMutationHookResult = ReturnType<typeof useShareLinkWithUserMutation>;
export type ShareLinkWithUserMutationResult = Apollo.MutationResult<SchemaTypes.ShareLinkWithUserMutation>;
export type ShareLinkWithUserMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.ShareLinkWithUserMutation,
  SchemaTypes.ShareLinkWithUserMutationVariables
>;
export const JourneyStorageConfigDocument = gql`
  query JourneyStorageConfig(
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        profile {
          ...ProfileStorageConfig
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        profile {
          ...ProfileStorageConfig
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        profile {
          ...ProfileStorageConfig
        }
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;

/**
 * __useJourneyStorageConfigQuery__
 *
 * To run a query within a React component, call `useJourneyStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useJourneyStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJourneyStorageConfigQuery({
 *   variables: {
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *   },
 * });
 */
export function useJourneyStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.JourneyStorageConfigQuery,
    SchemaTypes.JourneyStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.JourneyStorageConfigQuery, SchemaTypes.JourneyStorageConfigQueryVariables>(
    JourneyStorageConfigDocument,
    options
  );
}

export function useJourneyStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.JourneyStorageConfigQuery,
    SchemaTypes.JourneyStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.JourneyStorageConfigQuery, SchemaTypes.JourneyStorageConfigQueryVariables>(
    JourneyStorageConfigDocument,
    options
  );
}

export type JourneyStorageConfigQueryHookResult = ReturnType<typeof useJourneyStorageConfigQuery>;
export type JourneyStorageConfigLazyQueryHookResult = ReturnType<typeof useJourneyStorageConfigLazyQuery>;
export type JourneyStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.JourneyStorageConfigQuery,
  SchemaTypes.JourneyStorageConfigQueryVariables
>;
export function refetchJourneyStorageConfigQuery(variables: SchemaTypes.JourneyStorageConfigQueryVariables) {
  return { query: JourneyStorageConfigDocument, variables: variables };
}

export const CalloutStorageConfigDocument = gql`
  query CalloutStorageConfig(
    $calloutId: UUID_NAMEID!
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        collaboration {
          ...CalloutOnCollaborationWithStorageConfig
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        collaboration {
          ...CalloutOnCollaborationWithStorageConfig
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        collaboration {
          ...CalloutOnCollaborationWithStorageConfig
        }
      }
    }
  }
  ${CalloutOnCollaborationWithStorageConfigFragmentDoc}
`;

/**
 * __useCalloutStorageConfigQuery__
 *
 * To run a query within a React component, call `useCalloutStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutStorageConfigQuery({
 *   variables: {
 *      calloutId: // value for 'calloutId'
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *   },
 * });
 */
export function useCalloutStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CalloutStorageConfigQuery,
    SchemaTypes.CalloutStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalloutStorageConfigQuery, SchemaTypes.CalloutStorageConfigQueryVariables>(
    CalloutStorageConfigDocument,
    options
  );
}

export function useCalloutStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CalloutStorageConfigQuery,
    SchemaTypes.CalloutStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CalloutStorageConfigQuery, SchemaTypes.CalloutStorageConfigQueryVariables>(
    CalloutStorageConfigDocument,
    options
  );
}

export type CalloutStorageConfigQueryHookResult = ReturnType<typeof useCalloutStorageConfigQuery>;
export type CalloutStorageConfigLazyQueryHookResult = ReturnType<typeof useCalloutStorageConfigLazyQuery>;
export type CalloutStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.CalloutStorageConfigQuery,
  SchemaTypes.CalloutStorageConfigQueryVariables
>;
export function refetchCalloutStorageConfigQuery(variables: SchemaTypes.CalloutStorageConfigQueryVariables) {
  return { query: CalloutStorageConfigDocument, variables: variables };
}

export const CalloutPostStorageConfigDocument = gql`
  query CalloutPostStorageConfig(
    $postId: UUID_NAMEID!
    $calloutId: UUID_NAMEID!
    $spaceNameId: UUID_NAMEID!
    $challengeNameId: UUID_NAMEID = "mockid"
    $opportunityNameId: UUID_NAMEID = "mockid"
    $includeSpace: Boolean = false
    $includeChallenge: Boolean = false
    $includeOpportunity: Boolean = false
  ) {
    space(ID: $spaceNameId) {
      id
      ... on Space @include(if: $includeSpace) {
        collaboration {
          ...PostInCalloutOnCollaborationWithStorageConfig
        }
      }
      challenge(ID: $challengeNameId) @include(if: $includeChallenge) {
        id
        collaboration {
          ...PostInCalloutOnCollaborationWithStorageConfig
        }
      }
      opportunity(ID: $opportunityNameId) @include(if: $includeOpportunity) {
        id
        collaboration {
          ...PostInCalloutOnCollaborationWithStorageConfig
        }
      }
    }
  }
  ${PostInCalloutOnCollaborationWithStorageConfigFragmentDoc}
`;

/**
 * __useCalloutPostStorageConfigQuery__
 *
 * To run a query within a React component, call `useCalloutPostStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalloutPostStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalloutPostStorageConfigQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      calloutId: // value for 'calloutId'
 *      spaceNameId: // value for 'spaceNameId'
 *      challengeNameId: // value for 'challengeNameId'
 *      opportunityNameId: // value for 'opportunityNameId'
 *      includeSpace: // value for 'includeSpace'
 *      includeChallenge: // value for 'includeChallenge'
 *      includeOpportunity: // value for 'includeOpportunity'
 *   },
 * });
 */
export function useCalloutPostStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CalloutPostStorageConfigQuery,
    SchemaTypes.CalloutPostStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalloutPostStorageConfigQuery, SchemaTypes.CalloutPostStorageConfigQueryVariables>(
    CalloutPostStorageConfigDocument,
    options
  );
}

export function useCalloutPostStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CalloutPostStorageConfigQuery,
    SchemaTypes.CalloutPostStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.CalloutPostStorageConfigQuery,
    SchemaTypes.CalloutPostStorageConfigQueryVariables
  >(CalloutPostStorageConfigDocument, options);
}

export type CalloutPostStorageConfigQueryHookResult = ReturnType<typeof useCalloutPostStorageConfigQuery>;
export type CalloutPostStorageConfigLazyQueryHookResult = ReturnType<typeof useCalloutPostStorageConfigLazyQuery>;
export type CalloutPostStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.CalloutPostStorageConfigQuery,
  SchemaTypes.CalloutPostStorageConfigQueryVariables
>;
export function refetchCalloutPostStorageConfigQuery(variables: SchemaTypes.CalloutPostStorageConfigQueryVariables) {
  return { query: CalloutPostStorageConfigDocument, variables: variables };
}

export const UserStorageConfigDocument = gql`
  query UserStorageConfig($userId: UUID_NAMEID_EMAIL!) {
    user(ID: $userId) {
      id
      profile {
        ...ProfileStorageConfig
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;

/**
 * __useUserStorageConfigQuery__
 *
 * To run a query within a React component, call `useUserStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStorageConfigQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<SchemaTypes.UserStorageConfigQuery, SchemaTypes.UserStorageConfigQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.UserStorageConfigQuery, SchemaTypes.UserStorageConfigQueryVariables>(
    UserStorageConfigDocument,
    options
  );
}

export function useUserStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.UserStorageConfigQuery,
    SchemaTypes.UserStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.UserStorageConfigQuery, SchemaTypes.UserStorageConfigQueryVariables>(
    UserStorageConfigDocument,
    options
  );
}

export type UserStorageConfigQueryHookResult = ReturnType<typeof useUserStorageConfigQuery>;
export type UserStorageConfigLazyQueryHookResult = ReturnType<typeof useUserStorageConfigLazyQuery>;
export type UserStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.UserStorageConfigQuery,
  SchemaTypes.UserStorageConfigQueryVariables
>;
export function refetchUserStorageConfigQuery(variables: SchemaTypes.UserStorageConfigQueryVariables) {
  return { query: UserStorageConfigDocument, variables: variables };
}

export const OrganizationStorageConfigDocument = gql`
  query OrganizationStorageConfig($organizationId: UUID_NAMEID!) {
    organization(ID: $organizationId) {
      id
      profile {
        ...ProfileStorageConfig
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;

/**
 * __useOrganizationStorageConfigQuery__
 *
 * To run a query within a React component, call `useOrganizationStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationStorageConfigQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useOrganizationStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OrganizationStorageConfigQuery,
    SchemaTypes.OrganizationStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OrganizationStorageConfigQuery,
    SchemaTypes.OrganizationStorageConfigQueryVariables
  >(OrganizationStorageConfigDocument, options);
}

export function useOrganizationStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OrganizationStorageConfigQuery,
    SchemaTypes.OrganizationStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OrganizationStorageConfigQuery,
    SchemaTypes.OrganizationStorageConfigQueryVariables
  >(OrganizationStorageConfigDocument, options);
}

export type OrganizationStorageConfigQueryHookResult = ReturnType<typeof useOrganizationStorageConfigQuery>;
export type OrganizationStorageConfigLazyQueryHookResult = ReturnType<typeof useOrganizationStorageConfigLazyQuery>;
export type OrganizationStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.OrganizationStorageConfigQuery,
  SchemaTypes.OrganizationStorageConfigQueryVariables
>;
export function refetchOrganizationStorageConfigQuery(variables: SchemaTypes.OrganizationStorageConfigQueryVariables) {
  return { query: OrganizationStorageConfigDocument, variables: variables };
}

export const InnovationPackStorageConfigDocument = gql`
  query InnovationPackStorageConfig($innovationPackId: UUID_NAMEID!) {
    platform {
      id
      library {
        id
        innovationPack(ID: $innovationPackId) {
          id
          profile {
            ...ProfileStorageConfig
          }
        }
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;

/**
 * __useInnovationPackStorageConfigQuery__
 *
 * To run a query within a React component, call `useInnovationPackStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationPackStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationPackStorageConfigQuery({
 *   variables: {
 *      innovationPackId: // value for 'innovationPackId'
 *   },
 * });
 */
export function useInnovationPackStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationPackStorageConfigQuery,
    SchemaTypes.InnovationPackStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.InnovationPackStorageConfigQuery,
    SchemaTypes.InnovationPackStorageConfigQueryVariables
  >(InnovationPackStorageConfigDocument, options);
}

export function useInnovationPackStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationPackStorageConfigQuery,
    SchemaTypes.InnovationPackStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.InnovationPackStorageConfigQuery,
    SchemaTypes.InnovationPackStorageConfigQueryVariables
  >(InnovationPackStorageConfigDocument, options);
}

export type InnovationPackStorageConfigQueryHookResult = ReturnType<typeof useInnovationPackStorageConfigQuery>;
export type InnovationPackStorageConfigLazyQueryHookResult = ReturnType<typeof useInnovationPackStorageConfigLazyQuery>;
export type InnovationPackStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationPackStorageConfigQuery,
  SchemaTypes.InnovationPackStorageConfigQueryVariables
>;
export function refetchInnovationPackStorageConfigQuery(
  variables: SchemaTypes.InnovationPackStorageConfigQueryVariables
) {
  return { query: InnovationPackStorageConfigDocument, variables: variables };
}

export const InnovationHubStorageConfigDocument = gql`
  query InnovationHubStorageConfig($innovationHubId: UUID_NAMEID!) {
    platform {
      id
      innovationHub(id: $innovationHubId) {
        profile {
          ...ProfileStorageConfig
        }
      }
    }
  }
  ${ProfileStorageConfigFragmentDoc}
`;

/**
 * __useInnovationHubStorageConfigQuery__
 *
 * To run a query within a React component, call `useInnovationHubStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationHubStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationHubStorageConfigQuery({
 *   variables: {
 *      innovationHubId: // value for 'innovationHubId'
 *   },
 * });
 */
export function useInnovationHubStorageConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.InnovationHubStorageConfigQuery,
    SchemaTypes.InnovationHubStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.InnovationHubStorageConfigQuery,
    SchemaTypes.InnovationHubStorageConfigQueryVariables
  >(InnovationHubStorageConfigDocument, options);
}

export function useInnovationHubStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationHubStorageConfigQuery,
    SchemaTypes.InnovationHubStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.InnovationHubStorageConfigQuery,
    SchemaTypes.InnovationHubStorageConfigQueryVariables
  >(InnovationHubStorageConfigDocument, options);
}

export type InnovationHubStorageConfigQueryHookResult = ReturnType<typeof useInnovationHubStorageConfigQuery>;
export type InnovationHubStorageConfigLazyQueryHookResult = ReturnType<typeof useInnovationHubStorageConfigLazyQuery>;
export type InnovationHubStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationHubStorageConfigQuery,
  SchemaTypes.InnovationHubStorageConfigQueryVariables
>;
export function refetchInnovationHubStorageConfigQuery(
  variables: SchemaTypes.InnovationHubStorageConfigQueryVariables
) {
  return { query: InnovationHubStorageConfigDocument, variables: variables };
}

export const PlatformStorageConfigDocument = gql`
  query PlatformStorageConfig {
    platform {
      id
      storageBucket {
        id
        allowedMimeTypes
        maxFileSize
        authorization {
          id
          myPrivileges
        }
      }
    }
  }
`;

/**
 * __usePlatformStorageConfigQuery__
 *
 * To run a query within a React component, call `usePlatformStorageConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformStorageConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformStorageConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlatformStorageConfigQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.PlatformStorageConfigQuery,
    SchemaTypes.PlatformStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.PlatformStorageConfigQuery, SchemaTypes.PlatformStorageConfigQueryVariables>(
    PlatformStorageConfigDocument,
    options
  );
}

export function usePlatformStorageConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.PlatformStorageConfigQuery,
    SchemaTypes.PlatformStorageConfigQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.PlatformStorageConfigQuery, SchemaTypes.PlatformStorageConfigQueryVariables>(
    PlatformStorageConfigDocument,
    options
  );
}

export type PlatformStorageConfigQueryHookResult = ReturnType<typeof usePlatformStorageConfigQuery>;
export type PlatformStorageConfigLazyQueryHookResult = ReturnType<typeof usePlatformStorageConfigLazyQuery>;
export type PlatformStorageConfigQueryResult = Apollo.QueryResult<
  SchemaTypes.PlatformStorageConfigQuery,
  SchemaTypes.PlatformStorageConfigQueryVariables
>;
export function refetchPlatformStorageConfigQuery(variables?: SchemaTypes.PlatformStorageConfigQueryVariables) {
  return { query: PlatformStorageConfigDocument, variables: variables };
}

export const WhiteboardTemplateContentDocument = gql`
  query whiteboardTemplateContent($whiteboardTemplateId: UUID!) {
    lookup {
      whiteboardTemplate(ID: $whiteboardTemplateId) {
        id
        profile {
          ...WhiteboardProfile
        }
        content
      }
    }
  }
  ${WhiteboardProfileFragmentDoc}
`;

/**
 * __useWhiteboardTemplateContentQuery__
 *
 * To run a query within a React component, call `useWhiteboardTemplateContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhiteboardTemplateContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhiteboardTemplateContentQuery({
 *   variables: {
 *      whiteboardTemplateId: // value for 'whiteboardTemplateId'
 *   },
 * });
 */
export function useWhiteboardTemplateContentQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.WhiteboardTemplateContentQuery,
    SchemaTypes.WhiteboardTemplateContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.WhiteboardTemplateContentQuery,
    SchemaTypes.WhiteboardTemplateContentQueryVariables
  >(WhiteboardTemplateContentDocument, options);
}

export function useWhiteboardTemplateContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.WhiteboardTemplateContentQuery,
    SchemaTypes.WhiteboardTemplateContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.WhiteboardTemplateContentQuery,
    SchemaTypes.WhiteboardTemplateContentQueryVariables
  >(WhiteboardTemplateContentDocument, options);
}

export type WhiteboardTemplateContentQueryHookResult = ReturnType<typeof useWhiteboardTemplateContentQuery>;
export type WhiteboardTemplateContentLazyQueryHookResult = ReturnType<typeof useWhiteboardTemplateContentLazyQuery>;
export type WhiteboardTemplateContentQueryResult = Apollo.QueryResult<
  SchemaTypes.WhiteboardTemplateContentQuery,
  SchemaTypes.WhiteboardTemplateContentQueryVariables
>;
export function refetchWhiteboardTemplateContentQuery(variables: SchemaTypes.WhiteboardTemplateContentQueryVariables) {
  return { query: WhiteboardTemplateContentDocument, variables: variables };
}

export const SpaceDashboardCalendarEventsDocument = gql`
  query spaceDashboardCalendarEvents($spaceId: UUID_NAMEID!, $limit: Float) {
    space(ID: $spaceId) {
      id
      collaboration {
        ...CollaborationTimelineInfo
      }
    }
  }
  ${CollaborationTimelineInfoFragmentDoc}
`;

/**
 * __useSpaceDashboardCalendarEventsQuery__
 *
 * To run a query within a React component, call `useSpaceDashboardCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceDashboardCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceDashboardCalendarEventsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSpaceDashboardCalendarEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceDashboardCalendarEventsQuery,
    SchemaTypes.SpaceDashboardCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.SpaceDashboardCalendarEventsQuery,
    SchemaTypes.SpaceDashboardCalendarEventsQueryVariables
  >(SpaceDashboardCalendarEventsDocument, options);
}

export function useSpaceDashboardCalendarEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceDashboardCalendarEventsQuery,
    SchemaTypes.SpaceDashboardCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.SpaceDashboardCalendarEventsQuery,
    SchemaTypes.SpaceDashboardCalendarEventsQueryVariables
  >(SpaceDashboardCalendarEventsDocument, options);
}

export type SpaceDashboardCalendarEventsQueryHookResult = ReturnType<typeof useSpaceDashboardCalendarEventsQuery>;
export type SpaceDashboardCalendarEventsLazyQueryHookResult = ReturnType<
  typeof useSpaceDashboardCalendarEventsLazyQuery
>;
export type SpaceDashboardCalendarEventsQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceDashboardCalendarEventsQuery,
  SchemaTypes.SpaceDashboardCalendarEventsQueryVariables
>;
export function refetchSpaceDashboardCalendarEventsQuery(
  variables: SchemaTypes.SpaceDashboardCalendarEventsQueryVariables
) {
  return { query: SpaceDashboardCalendarEventsDocument, variables: variables };
}

export const ChallengeDashboardCalendarEventsDocument = gql`
  query challengeDashboardCalendarEvents($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!, $limit: Float) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        collaboration {
          ...CollaborationTimelineInfo
        }
      }
    }
  }
  ${CollaborationTimelineInfoFragmentDoc}
`;

/**
 * __useChallengeDashboardCalendarEventsQuery__
 *
 * To run a query within a React component, call `useChallengeDashboardCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeDashboardCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeDashboardCalendarEventsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useChallengeDashboardCalendarEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeDashboardCalendarEventsQuery,
    SchemaTypes.ChallengeDashboardCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.ChallengeDashboardCalendarEventsQuery,
    SchemaTypes.ChallengeDashboardCalendarEventsQueryVariables
  >(ChallengeDashboardCalendarEventsDocument, options);
}

export function useChallengeDashboardCalendarEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeDashboardCalendarEventsQuery,
    SchemaTypes.ChallengeDashboardCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeDashboardCalendarEventsQuery,
    SchemaTypes.ChallengeDashboardCalendarEventsQueryVariables
  >(ChallengeDashboardCalendarEventsDocument, options);
}

export type ChallengeDashboardCalendarEventsQueryHookResult = ReturnType<
  typeof useChallengeDashboardCalendarEventsQuery
>;
export type ChallengeDashboardCalendarEventsLazyQueryHookResult = ReturnType<
  typeof useChallengeDashboardCalendarEventsLazyQuery
>;
export type ChallengeDashboardCalendarEventsQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeDashboardCalendarEventsQuery,
  SchemaTypes.ChallengeDashboardCalendarEventsQueryVariables
>;
export function refetchChallengeDashboardCalendarEventsQuery(
  variables: SchemaTypes.ChallengeDashboardCalendarEventsQueryVariables
) {
  return { query: ChallengeDashboardCalendarEventsDocument, variables: variables };
}

export const OpportunityDashboardCalendarEventsDocument = gql`
  query opportunityDashboardCalendarEvents($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!, $limit: Float) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        collaboration {
          ...CollaborationTimelineInfo
        }
      }
    }
  }
  ${CollaborationTimelineInfoFragmentDoc}
`;

/**
 * __useOpportunityDashboardCalendarEventsQuery__
 *
 * To run a query within a React component, call `useOpportunityDashboardCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityDashboardCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityDashboardCalendarEventsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useOpportunityDashboardCalendarEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityDashboardCalendarEventsQuery,
    SchemaTypes.OpportunityDashboardCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityDashboardCalendarEventsQuery,
    SchemaTypes.OpportunityDashboardCalendarEventsQueryVariables
  >(OpportunityDashboardCalendarEventsDocument, options);
}

export function useOpportunityDashboardCalendarEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityDashboardCalendarEventsQuery,
    SchemaTypes.OpportunityDashboardCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityDashboardCalendarEventsQuery,
    SchemaTypes.OpportunityDashboardCalendarEventsQueryVariables
  >(OpportunityDashboardCalendarEventsDocument, options);
}

export type OpportunityDashboardCalendarEventsQueryHookResult = ReturnType<
  typeof useOpportunityDashboardCalendarEventsQuery
>;
export type OpportunityDashboardCalendarEventsLazyQueryHookResult = ReturnType<
  typeof useOpportunityDashboardCalendarEventsLazyQuery
>;
export type OpportunityDashboardCalendarEventsQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityDashboardCalendarEventsQuery,
  SchemaTypes.OpportunityDashboardCalendarEventsQueryVariables
>;
export function refetchOpportunityDashboardCalendarEventsQuery(
  variables: SchemaTypes.OpportunityDashboardCalendarEventsQueryVariables
) {
  return { query: OpportunityDashboardCalendarEventsDocument, variables: variables };
}

export const SpaceCalendarEventsDocument = gql`
  query spaceCalendarEvents($spaceId: UUID_NAMEID!, $limit: Float) {
    space(ID: $spaceId) {
      id
      collaboration {
        ...CollaborationTimelineInfo
      }
    }
  }
  ${CollaborationTimelineInfoFragmentDoc}
`;

/**
 * __useSpaceCalendarEventsQuery__
 *
 * To run a query within a React component, call `useSpaceCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceCalendarEventsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSpaceCalendarEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.SpaceCalendarEventsQuery,
    SchemaTypes.SpaceCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.SpaceCalendarEventsQuery, SchemaTypes.SpaceCalendarEventsQueryVariables>(
    SpaceCalendarEventsDocument,
    options
  );
}

export function useSpaceCalendarEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.SpaceCalendarEventsQuery,
    SchemaTypes.SpaceCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.SpaceCalendarEventsQuery, SchemaTypes.SpaceCalendarEventsQueryVariables>(
    SpaceCalendarEventsDocument,
    options
  );
}

export type SpaceCalendarEventsQueryHookResult = ReturnType<typeof useSpaceCalendarEventsQuery>;
export type SpaceCalendarEventsLazyQueryHookResult = ReturnType<typeof useSpaceCalendarEventsLazyQuery>;
export type SpaceCalendarEventsQueryResult = Apollo.QueryResult<
  SchemaTypes.SpaceCalendarEventsQuery,
  SchemaTypes.SpaceCalendarEventsQueryVariables
>;
export function refetchSpaceCalendarEventsQuery(variables: SchemaTypes.SpaceCalendarEventsQueryVariables) {
  return { query: SpaceCalendarEventsDocument, variables: variables };
}

export const ChallengeCalendarEventsDocument = gql`
  query challengeCalendarEvents($spaceId: UUID_NAMEID!, $challengeId: UUID_NAMEID!, $limit: Float) {
    space(ID: $spaceId) {
      id
      challenge(ID: $challengeId) {
        id
        collaboration {
          ...CollaborationTimelineInfo
        }
      }
    }
  }
  ${CollaborationTimelineInfoFragmentDoc}
`;

/**
 * __useChallengeCalendarEventsQuery__
 *
 * To run a query within a React component, call `useChallengeCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeCalendarEventsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      challengeId: // value for 'challengeId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useChallengeCalendarEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeCalendarEventsQuery,
    SchemaTypes.ChallengeCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeCalendarEventsQuery, SchemaTypes.ChallengeCalendarEventsQueryVariables>(
    ChallengeCalendarEventsDocument,
    options
  );
}

export function useChallengeCalendarEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeCalendarEventsQuery,
    SchemaTypes.ChallengeCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeCalendarEventsQuery,
    SchemaTypes.ChallengeCalendarEventsQueryVariables
  >(ChallengeCalendarEventsDocument, options);
}

export type ChallengeCalendarEventsQueryHookResult = ReturnType<typeof useChallengeCalendarEventsQuery>;
export type ChallengeCalendarEventsLazyQueryHookResult = ReturnType<typeof useChallengeCalendarEventsLazyQuery>;
export type ChallengeCalendarEventsQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeCalendarEventsQuery,
  SchemaTypes.ChallengeCalendarEventsQueryVariables
>;
export function refetchChallengeCalendarEventsQuery(variables: SchemaTypes.ChallengeCalendarEventsQueryVariables) {
  return { query: ChallengeCalendarEventsDocument, variables: variables };
}

export const OpportunityCalendarEventsDocument = gql`
  query opportunityCalendarEvents($spaceId: UUID_NAMEID!, $opportunityId: UUID_NAMEID!, $limit: Float) {
    space(ID: $spaceId) {
      id
      opportunity(ID: $opportunityId) {
        id
        collaboration {
          ...CollaborationTimelineInfo
        }
      }
    }
  }
  ${CollaborationTimelineInfoFragmentDoc}
`;

/**
 * __useOpportunityCalendarEventsQuery__
 *
 * To run a query within a React component, call `useOpportunityCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityCalendarEventsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      opportunityId: // value for 'opportunityId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useOpportunityCalendarEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.OpportunityCalendarEventsQuery,
    SchemaTypes.OpportunityCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemaTypes.OpportunityCalendarEventsQuery,
    SchemaTypes.OpportunityCalendarEventsQueryVariables
  >(OpportunityCalendarEventsDocument, options);
}

export function useOpportunityCalendarEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.OpportunityCalendarEventsQuery,
    SchemaTypes.OpportunityCalendarEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.OpportunityCalendarEventsQuery,
    SchemaTypes.OpportunityCalendarEventsQueryVariables
  >(OpportunityCalendarEventsDocument, options);
}

export type OpportunityCalendarEventsQueryHookResult = ReturnType<typeof useOpportunityCalendarEventsQuery>;
export type OpportunityCalendarEventsLazyQueryHookResult = ReturnType<typeof useOpportunityCalendarEventsLazyQuery>;
export type OpportunityCalendarEventsQueryResult = Apollo.QueryResult<
  SchemaTypes.OpportunityCalendarEventsQuery,
  SchemaTypes.OpportunityCalendarEventsQueryVariables
>;
export function refetchOpportunityCalendarEventsQuery(variables: SchemaTypes.OpportunityCalendarEventsQueryVariables) {
  return { query: OpportunityCalendarEventsDocument, variables: variables };
}

export const CalendarEventDetailsDocument = gql`
  query calendarEventDetails($eventId: UUID!) {
    lookup {
      calendarEvent(ID: $eventId) {
        ...CalendarEventDetails
      }
    }
  }
  ${CalendarEventDetailsFragmentDoc}
`;

/**
 * __useCalendarEventDetailsQuery__
 *
 * To run a query within a React component, call `useCalendarEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalendarEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalendarEventDetailsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useCalendarEventDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.CalendarEventDetailsQuery,
    SchemaTypes.CalendarEventDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.CalendarEventDetailsQuery, SchemaTypes.CalendarEventDetailsQueryVariables>(
    CalendarEventDetailsDocument,
    options
  );
}

export function useCalendarEventDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.CalendarEventDetailsQuery,
    SchemaTypes.CalendarEventDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.CalendarEventDetailsQuery, SchemaTypes.CalendarEventDetailsQueryVariables>(
    CalendarEventDetailsDocument,
    options
  );
}

export type CalendarEventDetailsQueryHookResult = ReturnType<typeof useCalendarEventDetailsQuery>;
export type CalendarEventDetailsLazyQueryHookResult = ReturnType<typeof useCalendarEventDetailsLazyQuery>;
export type CalendarEventDetailsQueryResult = Apollo.QueryResult<
  SchemaTypes.CalendarEventDetailsQuery,
  SchemaTypes.CalendarEventDetailsQueryVariables
>;
export function refetchCalendarEventDetailsQuery(variables: SchemaTypes.CalendarEventDetailsQueryVariables) {
  return { query: CalendarEventDetailsDocument, variables: variables };
}

export const CreateCalendarEventDocument = gql`
  mutation createCalendarEvent($eventData: CreateCalendarEventOnCalendarInput!) {
    createEventOnCalendar(eventData: $eventData) {
      ...CalendarEventDetails
    }
  }
  ${CalendarEventDetailsFragmentDoc}
`;
export type CreateCalendarEventMutationFn = Apollo.MutationFunction<
  SchemaTypes.CreateCalendarEventMutation,
  SchemaTypes.CreateCalendarEventMutationVariables
>;

/**
 * __useCreateCalendarEventMutation__
 *
 * To run a mutation, you first call `useCreateCalendarEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCalendarEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCalendarEventMutation, { data, loading, error }] = useCreateCalendarEventMutation({
 *   variables: {
 *      eventData: // value for 'eventData'
 *   },
 * });
 */
export function useCreateCalendarEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.CreateCalendarEventMutation,
    SchemaTypes.CreateCalendarEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.CreateCalendarEventMutation, SchemaTypes.CreateCalendarEventMutationVariables>(
    CreateCalendarEventDocument,
    options
  );
}

export type CreateCalendarEventMutationHookResult = ReturnType<typeof useCreateCalendarEventMutation>;
export type CreateCalendarEventMutationResult = Apollo.MutationResult<SchemaTypes.CreateCalendarEventMutation>;
export type CreateCalendarEventMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.CreateCalendarEventMutation,
  SchemaTypes.CreateCalendarEventMutationVariables
>;
export const UpdateCalendarEventDocument = gql`
  mutation updateCalendarEvent($eventData: UpdateCalendarEventInput!) {
    updateCalendarEvent(eventData: $eventData) {
      ...CalendarEventDetails
    }
  }
  ${CalendarEventDetailsFragmentDoc}
`;
export type UpdateCalendarEventMutationFn = Apollo.MutationFunction<
  SchemaTypes.UpdateCalendarEventMutation,
  SchemaTypes.UpdateCalendarEventMutationVariables
>;

/**
 * __useUpdateCalendarEventMutation__
 *
 * To run a mutation, you first call `useUpdateCalendarEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalendarEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalendarEventMutation, { data, loading, error }] = useUpdateCalendarEventMutation({
 *   variables: {
 *      eventData: // value for 'eventData'
 *   },
 * });
 */
export function useUpdateCalendarEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.UpdateCalendarEventMutation,
    SchemaTypes.UpdateCalendarEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.UpdateCalendarEventMutation, SchemaTypes.UpdateCalendarEventMutationVariables>(
    UpdateCalendarEventDocument,
    options
  );
}

export type UpdateCalendarEventMutationHookResult = ReturnType<typeof useUpdateCalendarEventMutation>;
export type UpdateCalendarEventMutationResult = Apollo.MutationResult<SchemaTypes.UpdateCalendarEventMutation>;
export type UpdateCalendarEventMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.UpdateCalendarEventMutation,
  SchemaTypes.UpdateCalendarEventMutationVariables
>;
export const DeleteCalendarEventDocument = gql`
  mutation deleteCalendarEvent($deleteData: DeleteCalendarEventInput!) {
    deleteCalendarEvent(deleteData: $deleteData) {
      id
      nameID
    }
  }
`;
export type DeleteCalendarEventMutationFn = Apollo.MutationFunction<
  SchemaTypes.DeleteCalendarEventMutation,
  SchemaTypes.DeleteCalendarEventMutationVariables
>;

/**
 * __useDeleteCalendarEventMutation__
 *
 * To run a mutation, you first call `useDeleteCalendarEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCalendarEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCalendarEventMutation, { data, loading, error }] = useDeleteCalendarEventMutation({
 *   variables: {
 *      deleteData: // value for 'deleteData'
 *   },
 * });
 */
export function useDeleteCalendarEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SchemaTypes.DeleteCalendarEventMutation,
    SchemaTypes.DeleteCalendarEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SchemaTypes.DeleteCalendarEventMutation, SchemaTypes.DeleteCalendarEventMutationVariables>(
    DeleteCalendarEventDocument,
    options
  );
}

export type DeleteCalendarEventMutationHookResult = ReturnType<typeof useDeleteCalendarEventMutation>;
export type DeleteCalendarEventMutationResult = Apollo.MutationResult<SchemaTypes.DeleteCalendarEventMutation>;
export type DeleteCalendarEventMutationOptions = Apollo.BaseMutationOptions<
  SchemaTypes.DeleteCalendarEventMutation,
  SchemaTypes.DeleteCalendarEventMutationVariables
>;
export const AskChatGuidanceQuestionDocument = gql`
  query askChatGuidanceQuestion($chatData: ChatGuidanceInput!) {
    askChatGuidanceQuestion(chatData: $chatData) {
      answer
      question
      sources {
        uri
      }
    }
  }
`;

/**
 * __useAskChatGuidanceQuestionQuery__
 *
 * To run a query within a React component, call `useAskChatGuidanceQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAskChatGuidanceQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAskChatGuidanceQuestionQuery({
 *   variables: {
 *      chatData: // value for 'chatData'
 *   },
 * });
 */
export function useAskChatGuidanceQuestionQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.AskChatGuidanceQuestionQuery,
    SchemaTypes.AskChatGuidanceQuestionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.AskChatGuidanceQuestionQuery, SchemaTypes.AskChatGuidanceQuestionQueryVariables>(
    AskChatGuidanceQuestionDocument,
    options
  );
}

export function useAskChatGuidanceQuestionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.AskChatGuidanceQuestionQuery,
    SchemaTypes.AskChatGuidanceQuestionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.AskChatGuidanceQuestionQuery,
    SchemaTypes.AskChatGuidanceQuestionQueryVariables
  >(AskChatGuidanceQuestionDocument, options);
}

export type AskChatGuidanceQuestionQueryHookResult = ReturnType<typeof useAskChatGuidanceQuestionQuery>;
export type AskChatGuidanceQuestionLazyQueryHookResult = ReturnType<typeof useAskChatGuidanceQuestionLazyQuery>;
export type AskChatGuidanceQuestionQueryResult = Apollo.QueryResult<
  SchemaTypes.AskChatGuidanceQuestionQuery,
  SchemaTypes.AskChatGuidanceQuestionQueryVariables
>;
export function refetchAskChatGuidanceQuestionQuery(variables: SchemaTypes.AskChatGuidanceQuestionQueryVariables) {
  return { query: AskChatGuidanceQuestionDocument, variables: variables };
}

export const InnovationLibraryDocument = gql`
  query InnovationLibrary {
    platform {
      id
      library {
        id
        innovationPacks {
          ...InnovationPackCard
        }
      }
    }
  }
  ${InnovationPackCardFragmentDoc}
`;

/**
 * __useInnovationLibraryQuery__
 *
 * To run a query within a React component, call `useInnovationLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useInnovationLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInnovationLibraryQuery({
 *   variables: {
 *   },
 * });
 */
export function useInnovationLibraryQuery(
  baseOptions?: Apollo.QueryHookOptions<SchemaTypes.InnovationLibraryQuery, SchemaTypes.InnovationLibraryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.InnovationLibraryQuery, SchemaTypes.InnovationLibraryQueryVariables>(
    InnovationLibraryDocument,
    options
  );
}

export function useInnovationLibraryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.InnovationLibraryQuery,
    SchemaTypes.InnovationLibraryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.InnovationLibraryQuery, SchemaTypes.InnovationLibraryQueryVariables>(
    InnovationLibraryDocument,
    options
  );
}

export type InnovationLibraryQueryHookResult = ReturnType<typeof useInnovationLibraryQuery>;
export type InnovationLibraryLazyQueryHookResult = ReturnType<typeof useInnovationLibraryLazyQuery>;
export type InnovationLibraryQueryResult = Apollo.QueryResult<
  SchemaTypes.InnovationLibraryQuery,
  SchemaTypes.InnovationLibraryQueryVariables
>;
export function refetchInnovationLibraryQuery(variables?: SchemaTypes.InnovationLibraryQueryVariables) {
  return { query: InnovationLibraryDocument, variables: variables };
}

export const ChallengeExplorerPageDocument = gql`
  query ChallengeExplorerPage {
    me {
      spaceMemberships(visibilities: [ACTIVE, DEMO]) {
        id
      }
    }
  }
`;

/**
 * __useChallengeExplorerPageQuery__
 *
 * To run a query within a React component, call `useChallengeExplorerPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeExplorerPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeExplorerPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useChallengeExplorerPageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeExplorerPageQuery,
    SchemaTypes.ChallengeExplorerPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeExplorerPageQuery, SchemaTypes.ChallengeExplorerPageQueryVariables>(
    ChallengeExplorerPageDocument,
    options
  );
}

export function useChallengeExplorerPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeExplorerPageQuery,
    SchemaTypes.ChallengeExplorerPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeExplorerPageQuery, SchemaTypes.ChallengeExplorerPageQueryVariables>(
    ChallengeExplorerPageDocument,
    options
  );
}

export type ChallengeExplorerPageQueryHookResult = ReturnType<typeof useChallengeExplorerPageQuery>;
export type ChallengeExplorerPageLazyQueryHookResult = ReturnType<typeof useChallengeExplorerPageLazyQuery>;
export type ChallengeExplorerPageQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeExplorerPageQuery,
  SchemaTypes.ChallengeExplorerPageQueryVariables
>;
export function refetchChallengeExplorerPageQuery(variables?: SchemaTypes.ChallengeExplorerPageQueryVariables) {
  return { query: ChallengeExplorerPageDocument, variables: variables };
}

export const ChallengeExplorerSearchDocument = gql`
  query ChallengeExplorerSearch($searchData: SearchInput!) {
    search(searchData: $searchData) {
      journeyResults {
        id
        type
        terms
        ... on SearchResultChallenge {
          ...SearchResultChallenge
        }
      }
    }
  }
  ${SearchResultChallengeFragmentDoc}
`;

/**
 * __useChallengeExplorerSearchQuery__
 *
 * To run a query within a React component, call `useChallengeExplorerSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeExplorerSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeExplorerSearchQuery({
 *   variables: {
 *      searchData: // value for 'searchData'
 *   },
 * });
 */
export function useChallengeExplorerSearchQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeExplorerSearchQuery,
    SchemaTypes.ChallengeExplorerSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeExplorerSearchQuery, SchemaTypes.ChallengeExplorerSearchQueryVariables>(
    ChallengeExplorerSearchDocument,
    options
  );
}

export function useChallengeExplorerSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeExplorerSearchQuery,
    SchemaTypes.ChallengeExplorerSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemaTypes.ChallengeExplorerSearchQuery,
    SchemaTypes.ChallengeExplorerSearchQueryVariables
  >(ChallengeExplorerSearchDocument, options);
}

export type ChallengeExplorerSearchQueryHookResult = ReturnType<typeof useChallengeExplorerSearchQuery>;
export type ChallengeExplorerSearchLazyQueryHookResult = ReturnType<typeof useChallengeExplorerSearchLazyQuery>;
export type ChallengeExplorerSearchQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeExplorerSearchQuery,
  SchemaTypes.ChallengeExplorerSearchQueryVariables
>;
export function refetchChallengeExplorerSearchQuery(variables: SchemaTypes.ChallengeExplorerSearchQueryVariables) {
  return { query: ChallengeExplorerSearchDocument, variables: variables };
}

export const ChallengeExplorerDataDocument = gql`
  query ChallengeExplorerData($spaceIDs: [UUID!]) {
    spaces(IDs: $spaceIDs) {
      id
      nameID
      profile {
        id
        tagline
        displayName
      }
      visibility
      challenges {
        id
        nameID
        profile {
          id
          tagline
          displayName
          description
          cardBanner: visual(type: CARD) {
            ...VisualUri
          }
          tagset {
            ...TagsetDetails
          }
        }
        context {
          id
          vision
        }
        community {
          id
          myMembershipStatus
        }
      }
    }
  }
  ${VisualUriFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;

/**
 * __useChallengeExplorerDataQuery__
 *
 * To run a query within a React component, call `useChallengeExplorerDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeExplorerDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeExplorerDataQuery({
 *   variables: {
 *      spaceIDs: // value for 'spaceIDs'
 *   },
 * });
 */
export function useChallengeExplorerDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemaTypes.ChallengeExplorerDataQuery,
    SchemaTypes.ChallengeExplorerDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemaTypes.ChallengeExplorerDataQuery, SchemaTypes.ChallengeExplorerDataQueryVariables>(
    ChallengeExplorerDataDocument,
    options
  );
}

export function useChallengeExplorerDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemaTypes.ChallengeExplorerDataQuery,
    SchemaTypes.ChallengeExplorerDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemaTypes.ChallengeExplorerDataQuery, SchemaTypes.ChallengeExplorerDataQueryVariables>(
    ChallengeExplorerDataDocument,
    options
  );
}

export type ChallengeExplorerDataQueryHookResult = ReturnType<typeof useChallengeExplorerDataQuery>;
export type ChallengeExplorerDataLazyQueryHookResult = ReturnType<typeof useChallengeExplorerDataLazyQuery>;
export type ChallengeExplorerDataQueryResult = Apollo.QueryResult<
  SchemaTypes.ChallengeExplorerDataQuery,
  SchemaTypes.ChallengeExplorerDataQueryVariables
>;
export function refetchChallengeExplorerDataQuery(variables?: SchemaTypes.ChallengeExplorerDataQueryVariables) {
  return { query: ChallengeExplorerDataDocument, variables: variables };
}
