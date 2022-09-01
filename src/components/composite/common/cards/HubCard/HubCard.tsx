import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { buildHubUrl } from '../../../../../common/utils/urlBuilders';
import getActivityCount from '../../../../../domain/activity/utils/getActivityCount';
import { Hub, Nvp, VisualUriFragment } from '../../../../../models/graphql-schema';
import EntityContributionCard, { EntityContributionCardLabel } from '../ContributionCard/EntityContributionCard';
import { getVisualBannerNarrow } from '../../../../../common/utils/visuals.utils';

type NeededFields = 'displayName' | 'tagset' | 'nameID' | 'authorization' | 'id';

type HubAttrs = Pick<Hub, NeededFields> & { activity?: (Pick<Nvp, 'name' | 'value'> | Nvp)[] } & {
  context?: { tagline?: string; visuals?: VisualUriFragment[] };
};

export interface HubCardProps {
  hub: HubAttrs;
  loading?: boolean;
  getLabel?: (hub: HubAttrs) => EntityContributionCardLabel | undefined;
}

const HubCard: FC<HubCardProps> = ({ hub, loading = false, getLabel }) => {
  const { t } = useTranslation();

  const bannerNarrow = getVisualBannerNarrow(hub?.context?.visuals);

  const { activity = [] } = hub;

  return (
    <EntityContributionCard
      details={{
        headerText: hub.displayName,
        descriptionText: hub?.context?.tagline,
        mediaUrl: bannerNarrow,
        tags: hub.tagset?.tags || [],
        tagsFor: 'hub',
        url: buildHubUrl(hub.nameID),
      }}
      label={getLabel?.(hub)}
      loading={loading}
      activities={[
        {
          name: t('common.challenges'),
          count: getActivityCount(activity, 'challenges'),
          color: 'primary',
        },
        {
          name: t('common.opportunities'),
          count: getActivityCount(activity, 'opportunities'),
          color: 'primary',
        },
        {
          name: t('common.members'),
          count: getActivityCount(activity, 'members'),
          color: 'positive',
        },
      ]}
    />
  );
};
export default HubCard;
