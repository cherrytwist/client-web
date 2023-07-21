import {
  refetchInnovationFlowSettingsQuery,
  useChallengeInnovationFlowEventMutation,
  useInnovationFlowSettingsQuery,
  useOpportunityInnovationFlowEventMutation,
  useUpdateCalloutFlowStateMutation,
  useUpdateInnovationFlowMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import { CoreEntityIdTypes } from '../../../shared/types/CoreEntityIds';
import { INNOVATION_FLOW_STATES_TAGSET_NAME } from '../InnovationFlowStates/useInnovationFlowStates';
import { CalloutType, Tagset, UpdateProfileInput } from '../../../../core/apollo/generated/graphql-schema';
import { compact, uniq } from 'lodash';

interface useInnovationFlowSettingsProps extends CoreEntityIdTypes {}

const findFlowStateTagset = (tagsets: Tagset[] | undefined) =>
  tagsets?.find(tagset => tagset.name === INNOVATION_FLOW_STATES_TAGSET_NAME);

const findFlowState = (tagsets: Tagset[] | undefined) => {
  const tagset = findFlowStateTagset(tagsets);
  return tagset
    ? {
        tagsetId: tagset.id,
        currentState: tagset.tags[0],
        allowedValues: tagset.allowedValues,
      }
    : undefined;
};

export interface GrouppedCallout {
  id: string;
  nameID: string;
  type: CalloutType;
  activity: number;
  profile: {
    displayName: string;
  };
  flowState:
    | {
        tagsetId: string;
        currentState: string | undefined;
        allowedValues: string[];
      }
    | undefined;
}

const useInnovationFlowSettings = ({
  spaceNameId,
  challengeNameId,
  opportunityNameId,
}: useInnovationFlowSettingsProps) => {
  const isChallenge = !opportunityNameId;

  const { data, loading: loadingData } = useInnovationFlowSettingsQuery({
    variables: {
      spaceNameId,
      challengeNameId,
      opportunityNameId,
      includeChallenge: isChallenge,
      includeOpportunity: !isChallenge,
    },
    skip: !spaceNameId || (!challengeNameId && !opportunityNameId),
  });

  const innovationFlow = data?.space.challenge?.innovationFlow ?? data?.space.opportunity?.innovationFlow;

  // Collaboration
  const collaboration = data?.space.challenge?.collaboration ?? data?.space.opportunity?.collaboration;
  const callouts =
    collaboration?.callouts?.map<GrouppedCallout>(callout => ({
      id: callout.id,
      nameID: callout.nameID,
      profile: {
        displayName: callout.profile.displayName,
      },
      type: callout.type,
      activity: callout.activity,
      flowState: findFlowState(callout.profile.tagsets),
    })) ?? [];

  const flowStateAllowedValues = uniq(compact(callouts?.flatMap(callout => callout.flowState?.allowedValues))) ?? [];

  const [challengeEvent, { loading: loadingChallengeEvent }] = useChallengeInnovationFlowEventMutation({
    refetchQueries: [
      refetchInnovationFlowSettingsQuery({
        spaceNameId,
        challengeNameId,
        opportunityNameId,
        includeChallenge: isChallenge,
        includeOpportunity: !isChallenge,
      }),
    ],
  });

  const [opportunityEvent, { loading: loadingOpportunityEvent }] = useOpportunityInnovationFlowEventMutation({
    refetchQueries: [
      refetchInnovationFlowSettingsQuery({
        spaceNameId,
        challengeNameId,
        opportunityNameId,
        includeChallenge: isChallenge,
        includeOpportunity: !isChallenge,
      }),
    ],
  });

  const handleLifecycleNextEvent = async (nextEvent: string) => {
    if (!innovationFlow?.id) {
      return;
    }
    if (isChallenge) {
      await challengeEvent({
        variables: {
          eventName: nextEvent,
          innovationFlowID: innovationFlow?.id,
        },
      });
    } else {
      await opportunityEvent({
        variables: {
          eventName: nextEvent,
          innovationFlowID: innovationFlow?.id,
        },
      });
    }
  };

  const [updateInnovationFlow, { loading: loadingUpdateInnovationFlow }] = useUpdateInnovationFlowMutation();
  const handleUpdateInnovationFlowProfile = async (innovationFlowID: string, profileData: UpdateProfileInput) =>
    updateInnovationFlow({
      variables: {
        updateInnovationFlowData: {
          innovationFlowID,
          profileData,
        },
      },
      refetchQueries: [
        refetchInnovationFlowSettingsQuery({
          spaceNameId,
          challengeNameId,
          opportunityNameId,
          includeChallenge: isChallenge,
          includeOpportunity: !isChallenge,
        }),
      ],
    });

  const [updateCalloutFlowState, { loading: loadingUpdateCallout }] = useUpdateCalloutFlowStateMutation();
  const handleUpdateCalloutFlowState = async (calloutId: string, flowStateTagsetId: string, value: string) => {
    const callout = collaboration?.callouts?.find(({ id }) => id === calloutId);
    const flowStateTagset = callout && findFlowStateTagset(callout.profile.tagsets);

    await updateCalloutFlowState({
      variables: {
        calloutId,
        flowStateTagsetId,
        value,
      },
      optimisticResponse: callout &&
        flowStateTagset && {
          updateCallout: {
            ...callout,
            profile: {
              ...callout.profile,
              tagsets: [
                {
                  ...flowStateTagset,
                  tags: [value],
                },
              ],
            },
          },
        },
      refetchQueries: [
        refetchInnovationFlowSettingsQuery({
          spaceNameId,
          challengeNameId,
          opportunityNameId,
          includeChallenge: isChallenge,
          includeOpportunity: !isChallenge,
        }),
      ],
    });
  };

  return {
    data: {
      innovationFlow,
      callouts,
      flowStateAllowedValues,
    },
    actions: {
      nextEvent: handleLifecycleNextEvent,
      updateInnovationFlowProfile: handleUpdateInnovationFlowProfile,
      updateCalloutFlowState: handleUpdateCalloutFlowState,
    },
    state: {
      loading: loadingData || loadingUpdateInnovationFlow || loadingUpdateCallout,
      loadingLifecycleEvents: loadingChallengeEvent || loadingOpportunityEvent,
    },
  };
};

export default useInnovationFlowSettings;
