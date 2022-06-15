import { OrganizationCardFragment, OrganizationVerificationEnum } from '../../../models/graphql-schema';
import { OrganizationCardProps } from '../../../components/composite/common/cards/Organization/OrganizationCard';
import getActivityCount from '../../../utils/get-activity-count';
import { getUserCardRoleNameKey, UserMetadata, useUserContext } from '../../../hooks';
import { buildOrganizationUrl } from '../../../utils/urlBuilders';
import { Identifiable } from '../../shared/types/Identifiable';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { TFunction } from 'i18next';

export const toOrganizationCardProps = (
  org: OrganizationCardFragment,
  user: UserMetadata['user'],
  t: TFunction
): OrganizationCardProps & Identifiable => {
  const roleName = getUserCardRoleNameKey(user, org.id);

  return {
    id: org.id,
    name: org.displayName,
    avatar: org.profile.avatar?.uri,
    information: org.profile.description,
    role: roleName && t(roleName),
    membersCount: getActivityCount(org.activity ?? [], 'members') ?? 0,
    verified: org.verification.status === OrganizationVerificationEnum.VerifiedManualAttestation,
    url: buildOrganizationUrl(org.nameID),
  };
};

const useOrganizationCardProps = (
  organizations: OrganizationCardFragment[] | undefined
): (OrganizationCardProps & Identifiable)[] | undefined => {
  const { t } = useTranslation();

  const { user: userMetadata } = useUserContext();
  const user = userMetadata?.user;

  return useMemo(() => user && organizations?.map(org => toOrganizationCardProps(org, user, t)), [user, organizations]);
};

export default useOrganizationCardProps;
