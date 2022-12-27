import React, { FC, useCallback, useMemo } from 'react';
import {
  refetchRolesUserQuery,
  useChallengeContributionDetailsQuery,
  useHubContributionDetailsQuery,
  useOpportunityContributionDetailsQuery,
  useRemoveUserAsCommunityMemberMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import { ContainerChildProps } from '../../../../core/container/container';
import { ContributionItem } from '../../contributor/contribution';
import { buildChallengeUrl, buildHubUrl, buildOpportunityUrl } from '../../../../common/utils/urlBuilders';
import { getVisualBanner } from '../../../common/visual/utils/visuals.utils';
import { useUserContext } from '../../contributor/user/hooks/useUserContext';

export interface EntityDetailsContainerEntities {
  details?: ContributionDetails;
}

export interface EntityDetailsContainerState {
  loading: boolean;
  isLeavingCommunity: boolean;
}

export interface EntityDetailsContainerActions {
  leaveCommunity: () => void;
}

export interface EntityDetailsContainerProps
  extends ContainerChildProps<
    EntityDetailsContainerEntities,
    EntityDetailsContainerActions,
    EntityDetailsContainerState
  > {
  entities: ContributionItem;
}

const buildDomainObject = (communityID: string | undefined) => {
  return typeof communityID === 'undefined' ? undefined : { communityID };
};

interface ContributionDetails {
  headerText: string;
  type: string;
  mediaUrl: string | undefined;
  tags: string[];
  url: string;
  domain?: { communityID: string };
  descriptionText?: string;
}

const ContributionDetailsContainer: FC<EntityDetailsContainerProps> = ({ entities, children }) => {
  const { hubId, challengeId, opportunityId } = entities;
  const { user: userMetadata } = useUserContext();
  const userId = userMetadata?.user?.id;
  const { data: hubData, loading: hubLoading } = useHubContributionDetailsQuery({
    variables: {
      hubId: hubId,
    },
    skip: Boolean(challengeId) || Boolean(opportunityId),
  });

  const { data: challengeData, loading: challengeLoading } = useChallengeContributionDetailsQuery({
    variables: {
      hubId: hubId,
      challengeId: challengeId || '',
    },
    skip: !challengeId || Boolean(opportunityId),
  });

  const { data: opportunityData, loading: opportunityLoading } = useOpportunityContributionDetailsQuery({
    variables: {
      hubId: hubId,
      opportunityId: opportunityId || '',
    },
    skip: !opportunityId,
  });

  const [leaveCommunity, { loading: isLeavingCommunity }] = useRemoveUserAsCommunityMemberMutation();

  const details = useMemo<ContributionDetails | undefined>(() => {
    if (hubData) {
      return {
        headerText: hubData.hub.displayName,
        type: 'hub',
        mediaUrl: getVisualBanner(hubData.hub.context?.visuals),
        tags: hubData.hub.tagset?.tags ?? [],
        url: buildHubUrl(hubData.hub.nameID),
        domain: buildDomainObject(hubData.hub.community?.id),
        descriptionText: hubData.hub.context?.tagline,
      };
    }

    if (challengeData) {
      return {
        headerText: challengeData.hub.challenge.displayName,
        type: 'challenge',
        mediaUrl: getVisualBanner(challengeData.hub.challenge.context?.visuals),
        tags: challengeData.hub.challenge.tagset?.tags ?? [],
        url: buildChallengeUrl(challengeData.hub.nameID, challengeData.hub.challenge.nameID),
        domain: buildDomainObject(challengeData.hub.challenge.community?.id),
      };
    }

    if (opportunityData) {
      return {
        headerText: opportunityData.hub.opportunity.displayName,
        type: 'opportunity',
        mediaUrl: getVisualBanner(opportunityData.hub.opportunity.context?.visuals),
        tags: opportunityData.hub.opportunity.tagset?.tags ?? [],
        url: buildOpportunityUrl(
          opportunityData.hub.nameID,
          opportunityData.hub.opportunity.parentNameID || '',
          opportunityData.hub.opportunity.nameID
        ),
        domain: buildDomainObject(opportunityData.hub.opportunity.community?.id),
      };
    }
  }, [hubData, challengeData, opportunityData]);

  const handleLeaveCommunity = useCallback(async () => {
    if (details?.domain?.communityID && userId)
      await leaveCommunity({
        variables: {
          memberId: userId,
          communityId: details?.domain?.communityID,
        },
        refetchQueries: [refetchRolesUserQuery({ input: { userID: userId } })],
        awaitRefetchQueries: true,
      });
  }, [userId, details?.domain?.communityID, leaveCommunity]);

  return (
    <>
      {children(
        { details },
        {
          loading: hubLoading || challengeLoading || opportunityLoading,
          isLeavingCommunity,
        },
        { leaveCommunity: handleLeaveCommunity }
      )}
    </>
  );
};

export default ContributionDetailsContainer;
