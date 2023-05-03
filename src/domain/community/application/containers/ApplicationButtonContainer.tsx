import React, { FC } from 'react';
import { ApplicationButtonProps } from '../../../../common/components/composite/common/ApplicationButton/ApplicationButton';
import { useUserContext } from '../../contributor/user';
import { useHub } from '../../../challenge/hub/HubContext/useHub';
import {
  useCommunityUserPrivilegesQuery,
  useJoinCommunityMutation,
  useUserApplicationsQuery,
  useUserProfileLazyQuery,
} from '../../../../core/apollo/generated/apollo-hooks';
import { ContainerChildProps } from '../../../../core/container/container';
import { buildChallengeApplyUrl, buildHubApplyUrl, buildHubUrl } from '../../../../common/utils/urlBuilders';
import { AuthorizationPrivilege, CommunityMembershipStatus } from '../../../../core/apollo/generated/graphql-schema';
import { useCommunityContext } from '../../community/CommunityContext';
import clearCacheForType from '../../../shared/utils/apollo-cache/clearCacheForType';
import { useAuthenticationContext } from '../../../../core/auth/authentication/hooks/useAuthenticationContext';

interface ApplicationContainerEntities {
  applicationButtonProps: ApplicationButtonProps;
}
interface ApplicationContainerActions {}
interface ApplicationContainerState {
  loading: boolean;
}

export interface ApplicationButtonContainerProps
  extends ContainerChildProps<ApplicationContainerEntities, ApplicationContainerActions, ApplicationContainerState> {
  challengeId?: string;
  challengeNameId?: string;
  challengeName?: string;
}

export const ApplicationButtonContainer: FC<ApplicationButtonContainerProps> = ({
  challengeId,
  challengeNameId,
  challengeName,
  children,
}) => {
  const { isAuthenticated } = useAuthenticationContext();
  const { user } = useUserContext();
  const userId = user?.user?.id ?? '';

  const [getUserProfile, { loading: gettingUserProfile }] = useUserProfileLazyQuery({ variables: { input: userId } });

  const { hubId, hubNameId, profile: hubProfile, refetchHub } = useHub();

  const { communityId, myMembershipStatus } = useCommunityContext();
  const { data: memberShip, loading: membershipLoading } = useUserApplicationsQuery({
    variables: { input: userId },
    skip: !userId,
  });

  const { data: _communityPrivileges, loading: communityPrivilegesLoading } = useCommunityUserPrivilegesQuery({
    variables: { hubNameId, communityId },
    skip: !communityId,
  });
  const hasCommunityParent = _communityPrivileges?.hub?.hubCommunity?.id !== communityId;

  const [joinCommunity, { loading: joiningCommunity }] = useJoinCommunityMutation({
    update: cache => clearCacheForType(cache, 'Authorization'),
  });

  // todo: refactor logic or use entity privileges
  const userApplication = memberShip?.rolesUser.applications?.find(
    x => x.hubID === hubId && (challengeId ? x.challengeID === challengeId : true) && !x.opportunityID
  );

  // find an application which does not have a challengeID, meaning it's on hub level,
  // but you are at least at challenge level to have a parent application
  const parentApplication = memberShip?.rolesUser.applications?.find(
    x => x.hubID === hubId && !x.challengeID && !x.opportunityID && challengeId
  );

  const isMember = myMembershipStatus === CommunityMembershipStatus.Member;

  const applyUrl =
    challengeId && challengeNameId ? buildChallengeApplyUrl(hubNameId, challengeNameId) : buildHubApplyUrl(hubNameId);
  const joinParentUrl = challengeNameId && buildHubUrl(hubNameId);

  const communityPrivileges = _communityPrivileges?.hub?.community?.authorization?.myPrivileges ?? [];
  const canJoinCommunity = communityPrivileges.includes(AuthorizationPrivilege.CommunityJoin);
  const canApplyToCommunity = communityPrivileges.includes(AuthorizationPrivilege.CommunityApply);

  const parentCommunityPrivileges = hasCommunityParent
    ? _communityPrivileges?.hub?.hubCommunity?.authorization?.myPrivileges ?? []
    : [];
  const canJoinParentCommunity = parentCommunityPrivileges.includes(AuthorizationPrivilege.CommunityJoin);
  const canApplyToParentCommunity = parentCommunityPrivileges.includes(AuthorizationPrivilege.CommunityApply);

  const loading = membershipLoading || communityPrivilegesLoading || joiningCommunity || gettingUserProfile;

  const onJoin = async () => {
    await joinCommunity({
      variables: { joiningData: { communityID: communityId } },
    });
    getUserProfile();
    refetchHub();
  };

  const applicationButtonProps: ApplicationButtonProps = {
    isAuthenticated,
    isMember,
    isParentMember: Boolean(challengeId) && user?.ofHub(hubId),
    applyUrl,
    parentApplyUrl: buildHubApplyUrl(hubNameId),
    joinParentUrl,
    applicationState: userApplication?.state,
    parentApplicationState: parentApplication?.state,
    hubName: hubProfile.displayName,
    challengeName,
    canJoinCommunity,
    canApplyToCommunity,
    canJoinParentCommunity,
    canApplyToParentCommunity,
    onJoin,
    loading,
  };

  return (
    <>
      {children(
        {
          applicationButtonProps,
        },
        { loading },
        {}
      )}
    </>
  );
};

export default ApplicationButtonContainer;
