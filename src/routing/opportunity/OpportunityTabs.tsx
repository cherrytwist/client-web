import {
  ContentPasteOutlined,
  DashboardOutlined,
  ForumOutlined,
  GroupOutlined,
  SettingsOutlined,
  TocOutlined,
  WbIncandescentOutlined,
} from '@mui/icons-material';
import { Tabs } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, resolvePath, useResolvedPath } from 'react-router-dom';
import NavigationTab from '../../components/core/NavigationTab/NavigationTab';
import { useConfig } from '../../hooks';
import useRouteMatch from '../../hooks/routing/useRouteMatch';
import { FEATURE_COLLABORATION_CANVASES } from '../../models/constants';
import { buildAdminOpportunityUrl } from '../../utils/urlBuilders';

const routes = {
  community: 'community',
  dashboard: 'dashboard',
  projects: 'projects',
  canvases: 'canvases',
  settings: 'settings',
  context: 'context',
  contribute: 'contribute',
} as const;

type OpportunityRoutesType = keyof typeof routes;

export interface OpportunityTabsProps {
  communityReadAccess: boolean;
  viewerCanUpdate: boolean;
  hubNameId: string;
  challengeNameId: string;
  opportunityNameId: string;
}
// todo unify in one tab config component
const OpportunityTabs: FC<OpportunityTabsProps> = ({
  viewerCanUpdate,
  communityReadAccess,
  hubNameId,
  challengeNameId,
  opportunityNameId,
}) => {
  const { t } = useTranslation();
  const { isFeatureEnabled } = useConfig();
  const resolved = useResolvedPath('.');
  const matchPatterns = useMemo(
    () => Object.values(routes).map(x => resolvePath(x, resolved.pathname)?.pathname),
    [routes, resolved, resolvePath]
  );
  const tabValue = (route: OpportunityRoutesType) => resolvePath(route, resolved.pathname)?.pathname;

  const routeMatch = useRouteMatch(matchPatterns);
  const currentTab = useMemo(() => {
    return routeMatch?.pattern?.path ?? tabValue('dashboard');
  }, [routeMatch, routes]);

  return (
    <>
      <Tabs
        value={currentTab}
        aria-label="Opportunity tabs"
        variant="scrollable"
        scrollButtons={'auto'}
        allowScrollButtonsMobile
      >
        <NavigationTab
          icon={<DashboardOutlined />}
          label={t('common.opportunity')}
          value={tabValue('dashboard')}
          to={routes['dashboard']}
        />
        <NavigationTab
          icon={<TocOutlined />}
          label={t('common.context')}
          value={tabValue('context')}
          to={routes['context']}
        />
        <NavigationTab
          disabled={!communityReadAccess}
          icon={<GroupOutlined />}
          label={t('common.community')}
          value={tabValue('community')}
          to={routes['community']}
        />
        <NavigationTab
          icon={<ForumOutlined />}
          label={t('common.contribute')}
          value={tabValue('contribute')}
          to={routes.contribute}
        />
        <NavigationTab
          icon={<ContentPasteOutlined />}
          label={t('common.projects')}
          value={tabValue('projects')}
          to={routes['projects']}
        />
        <NavigationTab
          disabled={!communityReadAccess || !isFeatureEnabled(FEATURE_COLLABORATION_CANVASES)}
          icon={<WbIncandescentOutlined />}
          label={t('common.canvases')}
          value={tabValue('canvases')}
          to={routes['canvases']}
        />
        {viewerCanUpdate && (
          <NavigationTab
            icon={<SettingsOutlined />}
            label={t('common.settings')}
            value={tabValue('settings')}
            /* can be provided with the tab config */
            to={buildAdminOpportunityUrl(hubNameId, challengeNameId, opportunityNameId)}
          />
        )}
      </Tabs>
      <Outlet />
    </>
  );
};

export default OpportunityTabs;
