import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsSection } from '../layout/EntitySettingsLayout/constants';
import { TabDefinition } from '../layout/EntitySettingsLayout/EntitySettingsTabs';
import { useSubSpace } from '../../../journey/subspace/hooks/useChallenge';
import { Link } from '@mui/material';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import EntitySettingsLayout from '../layout/EntitySettingsLayout/EntitySettingsLayout';
import ChildJourneyPageBanner from '../../../journey/common/childJourneyPageBanner/ChildJourneyPageBanner';
import SubspaceTabs from '../../../journey/subspace/layout/SubspaceTabs';
import JourneyBreadcrumbs from '../../../journey/common/journeyBreadcrumbs/JourneyBreadcrumbs';
import BackButton from '../../../../core/ui/actions/BackButton';
import { EntityPageSection } from '../../../shared/layout/EntityPageSection';

interface SubspaceSettingsLayoutProps {
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
    section: SettingsSection.Subsubspaces,
    route: 'opportunities',
    icon: FlagOutlinedIcon,
  },
  {
    section: SettingsSection.SpaceSettings,
    route: 'settings',
    icon: GppGoodOutlinedIcon,
  },
];

const SubspaceSettingsLayout: FC<SubspaceSettingsLayoutProps> = props => {
  const entityAttrs = useSubSpace();
  const { t } = useTranslation();

  return (
    <EntitySettingsLayout
      entityTypeName="subspace"
      subheaderTabs={tabs}
      pageBannerComponent={ChildJourneyPageBanner}
      tabsComponent={SubspaceTabs}
      breadcrumbs={<JourneyBreadcrumbs settings />}
      backButton={
        <Link
          href={`${entityAttrs.profile.url}/${EntityPageSection.Dashboard}`}
          sx={{ alignSelf: 'center', marginLeft: 'auto' }}
        >
          <BackButton variant="outlined" sx={{ textTransform: 'capitalize' }}>
            {t('navigation.admin.settingsMenu.quit')}
          </BackButton>
        </Link>
      }
      {...entityAttrs}
      {...props}
    />
  );
};

export default SubspaceSettingsLayout;
