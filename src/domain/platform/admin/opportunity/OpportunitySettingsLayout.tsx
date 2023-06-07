import React, { FC } from 'react';
import { SettingsSection } from '../layout/EntitySettingsLayout/constants';
import { useOpportunity } from '../../../challenge/opportunity/hooks/useOpportunity';
import EntitySettingsLayout from '../layout/EntitySettingsLayout/EntitySettingsLayout';
import OpportunityPageBanner from '../../../challenge/opportunity/layout/OpportunityPageBanner';
import OpportunityTabs from '../../../challenge/opportunity/layout/OpportunityTabs';
import { TabDefinition } from '../layout/EntitySettingsLayout/EntitySettingsTabs';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';

interface OpportunitySettingsLayoutProps {
  currentTab: SettingsSection;
  tabRoutePrefix?: string;
}

const tabs: TabDefinition<SettingsSection>[] = [
  {
    section: SettingsSection.Profile,
    route: 'profile',
    icon: PeopleOutlinedIcon,
  },
  {
    section: SettingsSection.Context,
    route: 'context',
    icon: ListOutlinedIcon,
  },
  {
    section: SettingsSection.Community,
    route: 'community',
    icon: PeopleOutlinedIcon,
  },
  {
    section: SettingsSection.Communications,
    route: 'communications',
    icon: ForumOutlinedIcon,
  },
  {
    section: SettingsSection.Authorization,
    route: 'authorization',
    icon: GppGoodOutlinedIcon,
  },
  {
    section: SettingsSection.InnovationFlow,
    route: 'innovation-flow',
    icon: PolylineOutlinedIcon,
  },
];

const OpportunitySettingsLayout: FC<OpportunitySettingsLayoutProps> = props => {
  const entityAttrs = useOpportunity();

  return (
    <EntitySettingsLayout
      entityTypeName="opportunity"
      tabs={tabs}
      pageBannerComponent={OpportunityPageBanner}
      tabsComponent={OpportunityTabs}
      {...entityAttrs}
      {...props}
    />
  );
};

export default OpportunitySettingsLayout;
