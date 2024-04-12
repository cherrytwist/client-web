import { TabDefinition } from './EntitySettingsTabs';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export enum SettingsSection {
  Profile = 'profile',
  Context = 'context',
  Community = 'community',
  Communications = 'communications',
  Authorization = 'authorization',
  Subspaces = 'subspaces',
  Subsubspaces = 'subsubspaces',
  Templates = 'templates',
  Storage = 'storage',
  SpaceSettings = 'space-settings',
  MyProfile = 'my-profile',
  Membership = 'membership',
  Organizations = 'organizations',
  Notifications = 'notifications',
  Credentials = 'credentials',
  InnovationFlow = 'innovation-flow',
}

export const UserProfileTabs: TabDefinition<SettingsSection>[] = [
  {
    section: SettingsSection.Membership,
    route: 'membership',
    icon: ContentPasteOutlinedIcon,
  },
  {
    section: SettingsSection.MyProfile,
    route: 'profile',
    icon: PeopleOutlinedIcon,
  },
  {
    section: SettingsSection.Organizations,
    route: 'organizations',
    icon: ForumOutlinedIcon,
  },
  {
    section: SettingsSection.Notifications,
    route: 'notifications',
    icon: NotificationsNoneOutlinedIcon,
  },
  {
    section: SettingsSection.Credentials,
    route: 'credentials',
    icon: VerifiedUserIcon,
  },
];
