import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { buildEcoverseUrl } from '../../../../../utils/urlBuilders';
import getActivityCount from '../../../../../utils/get-activity-count';
import { Ecoverse, Nvp, VisualUriFragment } from '../../../../../models/graphql-schema';
import EntityContributionCard from '../ContributionCard/EntityContributionCard';
import { useUserContext } from '../../../../../hooks';
import { getVisualBannerNarrow } from '../../../../../utils/visuals.utils';

type NeededFields = 'displayName' | 'tagset' | 'nameID' | 'authorization' | 'id';
export interface HubCardProps {
  hub: Pick<Ecoverse, NeededFields> & { activity?: (Pick<Nvp, 'name' | 'value'> | Nvp)[] } & {
    context?: { tagline?: string; visuals?: VisualUriFragment[] };
  };
  loading?: boolean;
}

const HubCard: FC<HubCardProps> = ({ hub, loading = false }) => {
  const { t } = useTranslation();
  const { user } = useUserContext();

  const isMember = useCallback(
    (hubId: string) => {
      return user?.ofEcoverse(hubId) ?? false;
    },
    [user]
  );

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
        url: buildEcoverseUrl(hub.nameID),
      }}
      isMember={isMember(hub.id)}
      isAnonymous={hub.authorization?.anonymousReadAccess}
      loading={loading}
      activities={[
        {
          name: t('pages.activity.challenges'),
          digit: getActivityCount(activity, 'challenges') ?? 0,
          color: 'primary',
        },
        {
          name: t('pages.activity.opportunities'),
          digit: getActivityCount(activity, 'opportunities') ?? 0,
          color: 'primary',
        },
        {
          name: t('pages.activity.members'),
          digit: getActivityCount(activity, 'members') ?? 0,
          color: 'positive',
        },
      ]}
    />
  );
};
export default HubCard;
