import { useCallback } from 'react';
import { KEYWORDS_TAGSET, SKILLS_TAGSET } from '../../models/constants/tagset.constants';
import { ContributionItem } from '../../models/entities/contribution';
import {
  AuthorizationCredential,
  AuthorizationPrivilege,
  MyPrivilegesFragment,
  User,
  UserMembershipDetailsFragment,
} from '../../models/graphql-schema';
import { Role } from '../../models/Role';
import { useCredentialsResolver } from '../useCredentialsResolver';

export interface UserPermissions {
  canCreate: boolean;
  canGrant: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canReadUsers: boolean;
  canCreateHub: boolean;
  canCreateOrganization: boolean;
}
export interface UserMetadata {
  user: User;
  hasCredentials: (credential: AuthorizationCredential, resourceId?: string) => boolean;
  ofChallenge: (id: string) => boolean;
  ofEcoverse: (id: string) => boolean;
  ofOpportunity: (id: string) => boolean;
  isEcoverseAdmin: (ecoverseId: string) => boolean;
  isChallengeAdmin: (ecoverseId: string, challengeId: string) => boolean;
  isOpportunityAdmin: (ecoverseId: string, challengeId: string, opportunityId: string) => boolean;
  /** has any admin role */
  isAdmin: boolean;
  /** has an entity admin role, i.e. is admin of a community */
  isCommunityAdmin: boolean;
  isGlobalAdmin: boolean;
  isGlobalAdminCommunity: boolean;
  roles: Role[];
  groups: string[];
  organizations: string[];
  opportunities: string[];
  challenges: string[];
  ecoverses: string[];
  keywords: string[];
  skills: string[];
  communities: Record<string, string>;
  contributions: ContributionItem[];
  pendingApplications: ContributionItem[];
  organizationNameIDs: string[];
  permissions: UserPermissions;
}

const getDisplayName = (i: { displayName?: string }) => i.displayName || ';';

const getContributions = (membershipData?: UserMembershipDetailsFragment) => {
  if (!membershipData) return [];

  const ecoverses = membershipData.ecoverses.map<ContributionItem>(e => ({
    ecoverseId: e.ecoverseID,
  }));

  const challenges = membershipData.ecoverses.flatMap<ContributionItem>(e =>
    e.challenges.map(c => ({
      ecoverseId: e.nameID,
      challengeId: c.nameID,
    }))
  );

  const opportunities = membershipData.ecoverses.flatMap<ContributionItem>(e =>
    e.opportunities.map(o => ({
      ecoverseId: e.nameID,
      opportunityId: o.nameID,
    }))
  );
  return [...ecoverses, ...challenges, ...opportunities];
};

const getPendingApplications = (membershipData?: UserMembershipDetailsFragment) => {
  if (!membershipData) return [];

  return (
    membershipData.applications?.map<ContributionItem>(a => ({
      ecoverseId: a.ecoverseID,
      challengeId: a.challengeID,
      opportunityId: a.opportunityID,
    })) || []
  );
};

export const useUserMetadataWrapper = () => {
  const resolver = useCredentialsResolver();

  const toUserMetadata = useCallback(
    (
      user: User | undefined,
      membershipData?: UserMembershipDetailsFragment,
      authorization?: MyPrivilegesFragment
    ): UserMetadata | undefined => {
      if (!user) {
        return;
      }

      const ecoverses = membershipData?.ecoverses.map(getDisplayName) || [];
      const challenges = membershipData?.ecoverses.flatMap(e => e.challenges.map(getDisplayName)) || [];
      const opportunities = membershipData?.ecoverses.flatMap(e => e.opportunities.map(getDisplayName)) || [];
      const organizations = membershipData?.organizations.map(getDisplayName) || [];
      const organizationNameIDs: UserMetadata['organizationNameIDs'] =
        membershipData?.organizations.map(o => o.nameID) || [];
      const groups = membershipData?.ecoverses.flatMap(e => e.userGroups.map(getDisplayName)) || [];
      const communities =
        membershipData?.communities.reduce((aggr, value) => {
          aggr[value.id] = value.displayName;
          return aggr;
        }, {}) || {};

      const roles =
        user?.agent?.credentials
          ?.map(c => {
            return {
              type: c.type,
              name: resolver.toRoleName(c.type),
              order: resolver.toRoleOrder(c.type),
              hidden: resolver.isHidden(c.type),
              resourceId: c.resourceID,
            } as Role;
          })
          .sort((a, b) => a.order - b.order) || [];

      const hasCredentials = (credential: AuthorizationCredential, resourceId?: string) =>
        Boolean(
          user?.agent?.credentials?.findIndex(
            c => c.type === credential && (!resourceId || c.resourceID === resourceId)
          ) !== -1
        );

      const isEcoverseAdmin = (id: string) =>
        hasCredentials(AuthorizationCredential.GlobalAdmin) ||
        hasCredentials(AuthorizationCredential.EcoverseAdmin, id);

      const isChallengeAdmin = (ecoverseId: string, challengeId: string) =>
        isEcoverseAdmin(ecoverseId) || hasCredentials(AuthorizationCredential.ChallengeAdmin, challengeId);

      const isOpportunityAdmin = (ecoverseId: string, challengeId: string, opportunityId) =>
        isChallengeAdmin(ecoverseId, challengeId) ||
        hasCredentials(AuthorizationCredential.OpportunityAdmin, opportunityId);

      const myPrivileges = authorization?.myPrivileges ?? [];
      const permissions: UserPermissions = {
        canRead: myPrivileges.includes(AuthorizationPrivilege.Read),
        canCreate: myPrivileges.includes(AuthorizationPrivilege.Create),
        canGrant: myPrivileges.includes(AuthorizationPrivilege.Grant),
        canDelete: myPrivileges.includes(AuthorizationPrivilege.Delete),
        canUpdate: myPrivileges.includes(AuthorizationPrivilege.Update),
        canCreateHub: myPrivileges.includes(AuthorizationPrivilege.CreateHub),
        canCreateOrganization: myPrivileges.includes(AuthorizationPrivilege.CreateOrganization),
        canReadUsers: myPrivileges.includes(AuthorizationPrivilege.ReadUsers),
      };

      const metadata: UserMetadata = {
        user,
        hasCredentials,
        ofChallenge: (id: string) => hasCredentials(AuthorizationCredential.ChallengeMember, id),
        ofEcoverse: (id: string) => hasCredentials(AuthorizationCredential.EcoverseMember, id),
        ofOpportunity: (id: string) => hasCredentials(AuthorizationCredential.OpportunityMember, id),
        isEcoverseAdmin,
        isChallengeAdmin,
        isOpportunityAdmin,
        isAdmin: false,
        isCommunityAdmin: false,
        isGlobalAdmin: hasCredentials(AuthorizationCredential.GlobalAdmin),
        isGlobalAdminCommunity: hasCredentials(AuthorizationCredential.GlobalAdminCommunity),
        roles,
        groups,
        challenges,
        opportunities,
        organizations,
        ecoverses,
        communities,
        keywords: user.profile?.tagsets?.find(t => t.name.toLowerCase() === KEYWORDS_TAGSET)?.tags || [],
        skills: user.profile?.tagsets?.find(t => t.name.toLowerCase() === SKILLS_TAGSET)?.tags || [],
        contributions: getContributions(membershipData),
        pendingApplications: getPendingApplications(membershipData),
        organizationNameIDs: organizationNameIDs,
        permissions: permissions,
      };

      metadata.isAdmin = hasAdminRole(metadata.roles);
      metadata.isCommunityAdmin = hasCommunityAdminRole(metadata.roles);

      return metadata;
    },
    [resolver]
  );
  return toUserMetadata;
};

export const hasAdminRole = (roles: Role[]) => {
  for (const role of roles) {
    if (AdminRoles.includes(role.type)) return true;
  }
  return false;
};

export const hasCommunityAdminRole = (roles: Role[]) => roles.some(({ type }) => CommunityAdminRoles.includes(type));

export const AdminRoles = [
  AuthorizationCredential.GlobalAdmin,
  AuthorizationCredential.GlobalAdminCommunity,
  AuthorizationCredential.ChallengeAdmin,
  AuthorizationCredential.EcoverseAdmin,
  AuthorizationCredential.OpportunityAdmin,
  AuthorizationCredential.OrganizationAdmin,
];

const CommunityAdminRoles = [
  AuthorizationCredential.ChallengeAdmin,
  AuthorizationCredential.EcoverseAdmin,
  AuthorizationCredential.OpportunityAdmin,
];
