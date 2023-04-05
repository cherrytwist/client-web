import { OptionalCoreEntityIds } from '../../../shared/types/CoreEntityIds';
import {
  useCalloutsLazyQuery,
  useCalloutsQuery,
  useUpdateCalloutsSortOrderMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import {
  AuthorizationPrivilege,
  Callout,
  CalloutType,
  CalloutVisibility,
  CanvasDetailsFragment,
  WhiteboardTemplate,
  CommentsWithMessagesFragment,
  ContributeTabAspectFragment,
  CalloutsQueryVariables,
  CalloutsQuery,
} from '../../../../core/apollo/generated/graphql-schema';
import useSubscribeOnCommentCallouts from '../useSubscribeOnCommentCallouts';
import { CalloutPostTemplate } from '../creation-dialog/CalloutCreationDialog';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { CalloutsGroup } from '../CalloutsInContext/CalloutsGroup';
import { compact, groupBy, sortBy } from 'lodash';
import { LazyQueryHookOptions } from '@apollo/client/react/types/types';
import { OrderUpdate } from '../../../../core/utils/UpdateOrder';

interface CalloutChildTypePropName {
  [CalloutType.Card]: 'aspects';
  [CalloutType.Canvas]: 'canvases';
  [CalloutType.Comments]: 'comments';
}

export type AspectFragmentWithCallout = ContributeTabAspectFragment & { calloutNameId: string };

export type CanvasFragmentWithCallout = CanvasDetailsFragment & { calloutNameId: string };

export type CommentsWithMessagesFragmentWithCallout = CommentsWithMessagesFragment & { calloutNameId: string };

interface CalloutChildPropValue {
  aspects: never;
  canvases: CanvasFragmentWithCallout[];
  comments: CommentsWithMessagesFragmentWithCallout;
}

type CalloutCardTemplateType = {
  [CalloutType.Card]: { postTemplate: CalloutPostTemplate };
  [CalloutType.Canvas]: { whiteboardTemplate: WhiteboardTemplate };
  [CalloutType.Comments]: {};
};

type CalloutWithChildType<PropName extends keyof CalloutChildPropValue> = {
  [P in PropName]: CalloutChildPropValue[P];
};

type CalloutTypesWithChildTypes = {
  [Type in keyof CalloutChildTypePropName]: { type: Type } & CalloutWithChildType<CalloutChildTypePropName[Type]> &
    CalloutCardTemplateType[Type];
};

export type TypedCallout = Pick<
  Callout,
  'id' | 'nameID' | 'state' | 'activity' | 'authorization' | 'sortOrder' | 'group'
> &
  (
    | CalloutTypesWithChildTypes[CalloutType.Card]
    | CalloutTypesWithChildTypes[CalloutType.Canvas]
    | CalloutTypesWithChildTypes[CalloutType.Comments]
  ) & {
    profile: {
      id: string;
      displayName: string;
      description?: string;
    };
    draft: boolean;
    editable: boolean;
    isSubscribedToComments: boolean;
    // url: string;
  };

interface UseCalloutsParams extends OptionalCoreEntityIds {
  calloutGroups?: CalloutsGroup[];
}

interface UseCalloutsProvided {
  callouts: TypedCallout[] | undefined;
  groupedCallouts: Record<CalloutsGroup, TypedCallout[] | undefined>;
  ungroupedCallouts: TypedCallout[] | undefined;
  canCreateCallout: boolean;
  calloutNames: string[];
  loading: boolean;
  reloadCallouts: (options?: Partial<LazyQueryHookOptions<CalloutsQuery, CalloutsQueryVariables>>) => void;
  calloutsSortOrder: string[];
  onCalloutsSortOrderUpdate: (update: OrderUpdate) => void;
}

const getSortedCalloutIds = (callouts?: TypedCallout[]) => sortBy(callouts, c => c.sortOrder).map(c => c.id);

const UNGROUPED_CALLOUTS_GROUP = Symbol('undefined');

/**
 * If you need Callouts without a group, don't specify calloutGroups at all.
 */
const useCallouts = (params: UseCalloutsParams): UseCalloutsProvided => {
  const includeHub = !params.challengeNameId && !params.opportunityNameId;
  const includeChallenge = !!params.challengeNameId;
  const includeOpportunity = !!params.opportunityNameId;

  const variables = {
    hubNameId: params.hubNameId!,
    challengeNameId: params.challengeNameId,
    opportunityNameId: params.opportunityNameId,
    includeHub,
    includeChallenge,
    includeOpportunity,
    calloutGroups: params.calloutGroups,
  };

  const { data: calloutsData, loading: calloutsLoading } = useCalloutsQuery({
    variables,
    fetchPolicy: 'cache-and-network',
    skip: !params.hubNameId,
  });

  const [getCallouts] = useCalloutsLazyQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const collaboration = (calloutsData?.hub.opportunity ?? calloutsData?.hub.challenge ?? calloutsData?.hub)
    ?.collaboration;

  const reloadCallouts = getCallouts;

  const commentCalloutIds = collaboration?.callouts?.filter(x => x.type === CalloutType.Comments).map(x => x.id) ?? [];

  const subscribedToComments = useSubscribeOnCommentCallouts(commentCalloutIds);

  const canCreateCallout =
    collaboration?.authorization?.myPrivileges?.includes(AuthorizationPrivilege.CreateCallout) ?? false;

  const callouts = useMemo(
    () =>
      collaboration?.callouts?.map(({ authorization, ...callout }) => {
        const draft = callout?.visibility === CalloutVisibility.Draft;
        const editable = authorization?.myPrivileges?.includes(AuthorizationPrivilege.Update);
        const isSubscribedToComments = commentCalloutIds.includes(callout.id) && subscribedToComments;
        return {
          ...callout,
          // Add calloutNameId to all canvases
          canvases: callout.canvases?.map(canvas => ({ ...canvas, calloutNameId: callout.nameID })),
          comments: { ...callout.comments, calloutNameId: callout.nameID },
          authorization,
          draft,
          editable,
          isSubscribedToComments,
        } as TypedCallout;
      }),
    [collaboration]
  );

  const submitCalloutsSortOrder = useCallback(
    (calloutIds: string[]) => {
      if (!collaboration) {
        throw new Error('Collaboration is not loaded yet.');
      }
      return runUpdateCalloutsSortOrderMutation({
        variables: {
          collaborationId: collaboration.id,
          calloutIds,
        },
      });
    },
    [collaboration]
  );

  const calloutNames = useMemo(() => callouts?.map(c => c.profile.displayName) ?? [], [callouts]);

  const [calloutsSortOrder, setCalloutsSortOrder] = useState(getSortedCalloutIds(callouts));

  useLayoutEffect(() => {
    setCalloutsSortOrder(getSortedCalloutIds(callouts));
  }, [callouts]);

  const sortedCallouts = useMemo(
    () => compact(calloutsSortOrder.map(id => callouts?.find(c => c.id === id))),
    [calloutsSortOrder, callouts]
  );

  const onCalloutsSortOrderUpdate = useCallback(
    (update: OrderUpdate) => {
      setCalloutsSortOrder(ids => {
        const nextIds = update(ids);
        submitCalloutsSortOrder(nextIds);
        return nextIds;
      });
    },
    [submitCalloutsSortOrder]
  );

  const { groupedCallouts, ungroupedCallouts } = useMemo(() => {
    const { [UNGROUPED_CALLOUTS_GROUP]: ungroupedCallouts, ...groupedCallouts } = groupBy(
      sortedCallouts,
      callout => callout.group ?? UNGROUPED_CALLOUTS_GROUP
    ) as Record<CalloutsGroup | typeof UNGROUPED_CALLOUTS_GROUP, TypedCallout[] | undefined>;

    return { groupedCallouts, ungroupedCallouts };
  }, [sortedCallouts]);

  const [runUpdateCalloutsSortOrderMutation] = useUpdateCalloutsSortOrderMutation();

  return {
    callouts,
    groupedCallouts,
    ungroupedCallouts,
    canCreateCallout,
    calloutNames,
    loading: calloutsLoading,
    reloadCallouts,
    calloutsSortOrder,
    onCalloutsSortOrderUpdate,
  };
};

export default useCallouts;
