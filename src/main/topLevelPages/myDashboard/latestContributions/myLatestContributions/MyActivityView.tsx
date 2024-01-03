import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { BlockSectionTitle, Caption, CardText } from '../../../../../core/ui/typography';
import BadgeCardView from '../../../../../core/ui/list/BadgeCardView';
import RouterLink from '../../../../../core/ui/link/RouterLink';
import { Visual } from '../../../../../domain/common/visual/Visual';
import Avatar from '../../../../../core/ui/avatar/Avatar';
import SwapColors from '../../../../../core/ui/palette/SwapColors';
import { getJourneyTypeName } from '../../../../../domain/journey/JourneyTypeName';
import JourneyIcon from '../../../../../domain/shared/components/JourneyIcon/JourneyIcon';
import { formatTimeElapsed } from '../../../../../domain/shared/utils/formatTimeElapsed';
import { Trans, useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import calloutIcons from '../../../../../domain/collaboration/callout/utils/calloutIcons';
import { CalloutType, ProfileType } from '../../../../../core/apollo/generated/graphql-schema';
import { gutters } from '../../../../../core/ui/grid/utils';

export interface MyActivityViewProps {
  activity:
    | undefined
    | {
        createdDate: Date | string;
        callout: {
          type: CalloutType;
          framing: {
            profile: {
              url: string;
              displayName: string;
            };
          };
        };
        journey?: {
          profile: {
            displayName: string;
            url: string;
            type: ProfileType;
            avatar?: Visual;
          };
        };
      };
  loading?: boolean;
}

const MyActivityView = ({ activity, loading = false }: MyActivityViewProps) => {
  const { t } = useTranslation();

  const timeElapsed = activity && formatTimeElapsed(activity.createdDate, t);

  const CalloutIcon = activity && calloutIcons[activity.callout.type];

  const journeyTypeName = getJourneyTypeName(activity?.journey?.profile.type);

  const JourneyIconComponent = journeyTypeName && JourneyIcon[journeyTypeName];

  const handleJourneyLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <RouterLink to={activity?.callout.framing.profile.url ?? ''} loose>
      <BadgeCardView
        visual={
          loading ? (
            <Skeleton>
              <Avatar src="" />
            </Skeleton>
          ) : (
            <Avatar src={activity?.journey?.profile.avatar?.uri} sx={{ backgroundColor: 'transparent' }}>
              <SwapColors>
                <Avatar
                  sx={{
                    width: gutters(1.5),
                    height: gutters(1.5),
                    borderRadius: '50%',
                    backgroundColor: theme => theme.palette.background.paper,
                  }}
                >
                  {CalloutIcon && <CalloutIcon color="primary" fontSize="small" />}
                </Avatar>
              </SwapColors>
            </Avatar>
          )
        }
      >
        <Box display="flex" justifyContent="space-between">
          <BlockSectionTitle component="span">
            {loading ? <Skeleton width="60%" /> : activity?.callout.framing.profile.displayName}
          </BlockSectionTitle>
          <Caption>{loading ? <Skeleton width="60%" /> : timeElapsed}</Caption>
        </Box>
        {loading ? (
          <Skeleton />
        ) : (
          <RouterLink to={activity?.journey?.profile.url ?? ''} loose onClick={handleJourneyLinkClick}>
            <CardText whiteSpace="pre">
              <Trans
                t={t}
                i18nKey="pages.home.sections.myLatestContributions.card.journey"
                components={{
                  journeyicon: JourneyIconComponent ? <JourneyIconComponent fontSize="inherit" /> : <span />,
                }}
                values={{
                  journey: activity?.journey?.profile.displayName,
                }}
              />
            </CardText>
          </RouterLink>
        )}
      </BadgeCardView>
    </RouterLink>
  );
};

export default MyActivityView;
