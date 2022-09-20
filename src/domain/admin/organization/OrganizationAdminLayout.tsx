import React, { FC } from 'react';
import { CommonTabs, SettingsSection } from '../layout/EntitySettings/constants';
import { useOrganization } from '../../../hooks';
import EntitySettingsLayout from '../layout/EntitySettings/EntitySettingsLayout';
import OrganizationPageBanner from '../../contributor/organization/layout/OrganizationPageBanner';
import OrganizationTabs from '../../contributor/organization/layout/OrganizationTabs';

const tabs = [SettingsSection.Profile, SettingsSection.Community, SettingsSection.Authorization].map(section => {
  return CommonTabs.find(tab => tab.section === section)!;
});

interface OrganizationAdminLayoutProps {
  currentTab: SettingsSection;
  tabRoutePrefix?: string;
}

const OrganizationAdminLayout: FC<OrganizationAdminLayoutProps> = props => {
  const entityAttrs = useOrganization();

  return (
    <EntitySettingsLayout
      entityTypeName="organization"
      tabs={tabs}
      pageBannerComponent={OrganizationPageBanner}
      tabsComponent={OrganizationTabs}
      {...entityAttrs}
      {...props}
    />
  );
};

export default OrganizationAdminLayout;
