import React, { useMemo } from 'react';
import { buildUserProfileSettingsUrl, buildUserProfileUrl } from '../../../common/utils/urlBuilders';
import HeaderNavigationTab from '../../shared/components/PageHeader/HeaderNavigationTab';
import { useTranslation } from 'react-i18next';
import HeaderNavigationTabs from '../../shared/components/PageHeader/HeaderNavigationTabs';
import { EntityTabsProps } from '../../shared/layout/PageLayout/EntityPageLayout';
import { useUserContext } from '../hooks/useUserContext';
import { useUserMetadata } from '../hooks/useUserMetadata';
import { useUrlParams } from '../../../hooks';

const routes = {
  profile: 'profile',
  settings: 'settings',
};

const UserTabs = (props: EntityTabsProps) => {
  const { t } = useTranslation();
  const { user, loading: loadingUserContext } = useUserContext();

  const { userNameId = '' } = useUrlParams();
  const { user: userMetadata, loading: loadingUserMetadata } = useUserMetadata(userNameId);

  const isCurrentUser = useMemo(
    () => user?.user.id === userMetadata?.user.id,
    [loadingUserContext, loadingUserMetadata, user, userMetadata]
  );

  return (
    <HeaderNavigationTabs
      value={props.currentTab}
      showSettings={isCurrentUser}
      settingsUrl={buildUserProfileSettingsUrl(userNameId)}
    >
      <HeaderNavigationTab label={t('common.profile')} value={routes.profile} to={buildUserProfileUrl(userNameId)} />
    </HeaderNavigationTabs>
  );
};

export default UserTabs;
