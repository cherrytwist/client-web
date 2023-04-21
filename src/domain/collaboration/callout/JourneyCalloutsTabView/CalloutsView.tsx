import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import useScrollToElement from '../../../shared/utils/scroll/useScrollToElement';
import { useCalloutEdit } from '../edit/useCalloutEdit/useCalloutEdit';
import { TypedCallout } from '../useCallouts/useCallouts';
import { Loading } from '../../../../common/components/core';
import PageContentBlockSeamless from '../../../../core/ui/content/PageContentBlockSeamless';
import { Caption } from '../../../../core/ui/typography';
import { EntityTypeName } from '../../../platform/constants/EntityTypeName';
import { compact } from 'lodash';
import { CalloutSortEvents, CalloutSortProps } from '../CalloutViewTypes';
import UpdateOrder, { findTargetItemIndex, OrderUpdate } from '../../../../core/utils/UpdateOrder';
import CalloutView from '../CalloutView/CalloutView';
import { useNavigate } from 'react-router-dom';
import { buildCalloutUrl } from '../../../../common/utils/urlBuilders';
import { LocationStateCachedCallout, LocationStateKeyCachedCallout } from '../../CalloutPage/CalloutPage';

export interface CalloutsViewProps {
  callouts: TypedCallout[] | undefined;
  entityTypeName: EntityTypeName;
  scrollToCallout?: boolean;
  sortOrder: string[];
  onSortOrderUpdate?: (update: OrderUpdate) => void;
  loading?: boolean;
  calloutNames: string[];
}

const CalloutsView = ({
  callouts,
  entityTypeName,
  calloutNames,
  scrollToCallout = false,
  loading = false,
  sortOrder,
  onSortOrderUpdate,
}: CalloutsViewProps) => {
  const { hubNameId, challengeNameId, opportunityNameId, calloutNameId } = useUrlParams();

  if (!hubNameId) {
    throw new Error('Must be within a Hub');
  }

  const { t } = useTranslation();

  const { handleEdit, handleVisibilityChange, handleDelete } = useCalloutEdit();

  // Scroll to Callout handler:
  const { scrollable } = useScrollToElement(calloutNameId, { enabled: scrollToCallout });

  const sortedCallouts = useMemo(
    () => compact(sortOrder.map(id => callouts?.find(c => c.id === id))),
    [sortOrder, callouts]
  );

  const updateOrder = onSortOrderUpdate && UpdateOrder(onSortOrderUpdate);

  const sortEvents: CalloutSortEvents | undefined = updateOrder && {
    onMoveToTop: updateOrder((ids, id) => ids.unshift(id)),
    onMoveToBottom: updateOrder((ids, id) => ids.push(id)),
    // We can't rely on just shifting callout ids "up" and "down" cause a callout just above
    // the moved one can be from another group. Such "moving" would not result in anything visible,
    // therefore on move up we must find the closest callout above that is from the same group.
    onMoveUp: updateOrder((nextIds, id) => {
      const prevCalloutIndex = findTargetItemIndex('prev', callouts!, id);
      return nextIds.splice(prevCalloutIndex, 0, id);
    }),
    onMoveDown: updateOrder((nextIds, id) => {
      const nextCalloutIndex = findTargetItemIndex('next', callouts!, id);
      return nextIds.splice(nextCalloutIndex + 1, 0, id);
    }),
  };

  const navigate = useNavigate();

  const handleExpand = (callout: TypedCallout) => {
    const uri = buildCalloutUrl(callout.nameID, {
      hubNameId,
      challengeNameId,
      opportunityNameId,
    });
    const state: LocationStateCachedCallout = {
      [LocationStateKeyCachedCallout]: callout,
    };
    return navigate(uri, { state });
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && callouts?.length === 0 && (
        <PageContentBlockSeamless textAlign="center">
          <Caption>
            {t('pages.generic.sections.subentities.empty', {
              entities: t('common.callouts'),
              parentEntity: t(`common.${entityTypeName}` as const),
            })}
          </Caption>
        </PageContentBlockSeamless>
      )}
      {!loading &&
        sortedCallouts?.map((callout, index) => {
          const sortProps: CalloutSortProps = {
            topCallout: index === 0,
            bottomCallout: index === sortedCallouts.length - 1,
          };

          const calloutUri = buildCalloutUrl(callout.nameID, {
            hubNameId,
            challengeNameId,
            opportunityNameId,
          });

          return (
            <CalloutView
              key={callout.id}
              ref={scrollable(callout.nameID)}
              callout={callout}
              calloutNames={calloutNames}
              contributionsCount={callout.activity}
              hubNameId={hubNameId}
              challengeNameId={challengeNameId}
              opportunityNameId={opportunityNameId}
              onCalloutEdit={handleEdit}
              onVisibilityChange={handleVisibilityChange}
              onCalloutDelete={handleDelete}
              isSubscribedToComments={callout.isSubscribedToComments}
              calloutUri={calloutUri}
              onExpand={() => handleExpand(callout)}
              {...sortEvents}
              {...sortProps}
            />
          );
        })}
    </>
  );
};

export default CalloutsView;
