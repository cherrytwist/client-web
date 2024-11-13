import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Theme, Button, useMediaQuery } from '@mui/material';

import Avatar from '@core/ui/avatar/Avatar';
import Gutters from '@core/ui/grid/Gutters';
import GridItem from '@core/ui/grid/GridItem';
import RouterLink from '@core/ui/link/RouterLink';
import BadgeCardView from '@core/ui/list/BadgeCardView';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Caption, BlockTitle, BlockSectionTitle } from '@core/ui/typography';

import { gutters } from '@core/ui/grid/utils';
import { MembershipProps } from './MyMembershipsDialog.model';
import { useColumns } from '@core/ui/grid/GridContext';
import webkitLineClamp from '@core/ui/utils/webkitLineClamp';
import { SpaceLevel, CommunityRoleType } from '@core/apollo/generated/graphql-schema';

import defaultCardBanner from '@domain/journey/defaultVisuals/Card.jpg';

const VISIBLE_COMMUNITY_ROLES = [CommunityRoleType.Admin, CommunityRoleType.Lead];

export const ExpandableSpaceTree = ({ membership }: { membership: MembershipProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const columns = useColumns();

  const { t } = useTranslation();

  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const toggleExpanded = () => setIsExpanded(wasExpanded => !wasExpanded);

  const paddingLeftMap = {
    [SpaceLevel.Space]: 0,
    [SpaceLevel.Challenge]: 5,
    [SpaceLevel.Opportunity]: 10,
  };
  const {
    childMemberships,
    space: {
      level,
      community,
      profile: { url, tagline, cardBanner, displayName },
    },
  } = membership;
  const avatar = cardBanner?.uri;
  const roles = community?.roleSet?.myRoles;
  const paddingLeft = paddingLeftMap[level] ?? 0;
  const verticalOffset = level === SpaceLevel.Space ? 1 : 0.5;
  const communityRoles = roles?.filter(role => VISIBLE_COMMUNITY_ROLES.includes(role)).sort();

  return (
    <>
      <GridItem columns={columns}>
        <Gutters
          marginY={0}
          paddingRight={0}
          flexDirection="row"
          paddingLeft={paddingLeft}
          paddingY={gutters(verticalOffset)}
        >
          <BadgeCardView
            to={url}
            sx={{ flexGrow: 1 }}
            component={RouterLink}
            visual={
              <Avatar
                src={avatar || defaultCardBanner}
                alt={t('common.avatar-of', { space: displayName })}
                aria-label="Space avatar"
              >
                {displayName[0] ?? '?'}
              </Avatar>
            }
          >
            <BlockTitle sx={isMobile ? webkitLineClamp(2) : undefined}>{displayName}</BlockTitle>

            <BlockSectionTitle sx={isMobile ? webkitLineClamp(2) : undefined}>{tagline}</BlockSectionTitle>

            {isMobile && (
              <Caption color="primary">
                {communityRoles?.map(role => t(`common.enums.communityRole.${role}` as const)).join(', ')}
              </Caption>
            )}
          </BadgeCardView>

          <Gutters flexDirection="row" disableGap padding={0}>
            {!isMobile && (
              <Caption color="primary" display="flex" alignItems="center">
                {communityRoles?.map(role => t(`common.enums.communityRole.${role}` as const)).join(', ')}
              </Caption>
            )}

            <Button
              sx={{ visibility: childMemberships?.length ? 'visible' : 'hidden' }}
              endIcon={isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              onClick={toggleExpanded}
              aria-expanded={isExpanded}
              area-label={isExpanded ? t('buttons.collapse') : t('buttons.expand')}
            />
          </Gutters>
        </Gutters>
      </GridItem>

      {isExpanded &&
        childMemberships?.map((childMembership: MembershipProps) => (
          <ExpandableSpaceTree key={childMembership.space.id} membership={childMembership} />
        ))}
    </>
  );
};
