import React, { FC } from 'react';
import { useConfig } from '../../../config/useConfig';
import { FEATURE_SSI } from '../../../config/features.constants';
import { useUserContext } from '../../../../community/contributor/user';
import UserPageBanner from '../../../../community/contributor/user/layout/UserPageBanner';
import UserTabs from '../../../../community/contributor/user/layout/UserTabs';
import { UserProfileTabs, SettingsSection } from '../../layout/EntitySettings/constants';
import EntitySettingsLayout from '../../layout/EntitySettings/EntitySettingsLayout';

const tabs = [
  SettingsSection.MyProfile,
  SettingsSection.Membership,
  SettingsSection.Organizations,
  SettingsSection.Notifications,
].map(section => {
  return UserProfileTabs.find(tab => tab.section === section)!;
});

interface UserSettingsLayoutProps {
  currentTab: SettingsSection;
  tabRoutePrefix?: string;
}

const UserSettingsLayout: FC<UserSettingsLayoutProps> = props => {
  const { user } = useUserContext();

  // Add credentials tab is SSI is enabled:
  const { isFeatureEnabled } = useConfig();
  if (isFeatureEnabled(FEATURE_SSI)) {
    tabs.push(UserProfileTabs.find(tab => tab.section === SettingsSection.Credentials)!);
  }

  const entityAttrs = {
    displayName: user?.user.displayName || '',
    userNameId: user?.user.nameID || '',
  };

  return (
    <EntitySettingsLayout
      entityTypeName="user"
      tabs={tabs}
      pageBannerComponent={UserPageBanner}
      tabsComponent={UserTabs}
      {...entityAttrs}
      {...props}
    />
  );
};

export default UserSettingsLayout;
