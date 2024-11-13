import React, { FC } from 'react';
import { Tabs } from '@mui/material';
import { DashboardOutlined, SettingsOutlined, ShareOutlined } from '@mui/icons-material';
import NavigationTab from '@core/ui/tabs/NavigationTab';
import { usePost } from '../context/PostProvider';
import { PostDialogSection } from './PostDialogSection';
import { styled } from '@mui/styles';
import { gutters } from '@core/ui/grid/utils';
import { useTranslation } from 'react-i18next';

export interface PostTabsProps {
  currentTab: PostDialogSection;
}

const DialogHeaderTabs = styled(Tabs)(({ theme }) => ({
  marginTop: theme.spacing(-0.4),
  marginBottom: theme.spacing(-0.8),
  marginRight: theme.spacing(1),
  '& .MuiTabs-flexContainer': { justifyContent: 'end', gap: gutters(1)(theme) },
}));

const PostTabs: FC<PostTabsProps> = ({ currentTab }) => {
  const { t } = useTranslation();
  const { permissions } = usePost();

  return (
    <DialogHeaderTabs value={currentTab} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
      <NavigationTab
        icon={<DashboardOutlined />}
        value={PostDialogSection.Dashboard}
        to={PostDialogSection.Dashboard}
        state={{ keepScroll: true }}
        aria-label={t('common.dashboard')}
      />
      <NavigationTab
        icon={<ShareOutlined />}
        value={PostDialogSection.Share}
        to={PostDialogSection.Share}
        state={{ keepScroll: true }}
        aria-label={t('buttons.share')}
      />
      {permissions.canUpdate && (
        <NavigationTab
          icon={<SettingsOutlined />}
          value={PostDialogSection.Settings}
          to={PostDialogSection.Settings}
          state={{ keepScroll: true }}
          aria-label={t('common.settings')}
        />
      )}
    </DialogHeaderTabs>
  );
};

export default PostTabs;
