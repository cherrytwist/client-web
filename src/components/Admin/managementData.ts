import { AuthorizationCredential } from '../../models/graphql-schema';

export const managementData = {
  adminLvl: [
    {
      name: 'Hubs',
      buttons: [
        { description: 'Manage', url: 'hubs' },
        { description: 'New', url: 'hubs/new' },
      ],
    },
    {
      name: 'Users',
      buttons: [{ description: 'Manage', url: 'users' }],
    },
    {
      name: 'Organizations',
      buttons: [
        { description: 'Manage', url: 'organizations' },
        { description: 'New', url: 'organizations/new' },
      ],
    },
    {
      name: 'Authorization',
      buttons: [
        {
          description: 'Global admins',
          url: `authorization/${AuthorizationCredential.GlobalAdmin}`,
        },
        {
          description: 'Global community admins',
          url: `authorization/community/${AuthorizationCredential.GlobalAdminCommunity}`,
        },
      ],
    },
  ],
  ecoverseLvl: [
    {
      name: 'Info',
      buttons: [{ description: 'Edit', url: 'edit' }],
    },
    {
      name: 'Community',
      buttons: [
        { description: 'Members', url: 'community/members' },
        { description: 'Groups', url: 'community/groups' },
        { description: 'Applications', url: 'community/applications' },
        { description: 'Updates', url: 'community/updates' },
      ],
    },
    {
      name: 'Challenges',
      buttons: [
        { description: 'Manage', url: 'challenges' },
        { description: 'New', url: 'challenges/new' },
      ],
    },
    {
      name: 'Authorization',
      buttons: [
        {
          description: 'Hub admins',
          url: `authorization/${AuthorizationCredential.EcoverseAdmin}`,
        },
      ],
    },
  ],
  challengeLvl: [
    {
      name: 'Context',
      buttons: [
        { description: 'Edit', url: 'edit' },
        { description: 'Lifecycle', url: 'lifecycle' },
      ],
    },
    {
      name: 'Community',
      buttons: [
        { description: 'Members', url: 'community/members' },
        { description: 'Groups', url: 'community/groups' },
        { description: 'Applications', url: 'community/applications' },
        { description: 'Lead Organizations', url: 'community/lead' },
        { description: 'Updates', url: 'community/updates' },
      ],
    },
    {
      name: 'Opportunities',
      buttons: [
        { description: 'Manage', url: 'opportunities' },
        { description: 'New', url: 'opportunities/new' },
      ],
    },
    {
      name: 'Authorization',
      buttons: [
        {
          description: 'Challenge admins',
          url: `authorization/${AuthorizationCredential.ChallengeAdmin}`,
        },
      ],
    },
  ],
  opportunityLvl: [
    {
      name: 'Opportunity info',
      buttons: [
        { description: 'Edit', url: 'edit' },
        { description: 'Lifecycle', url: 'lifecycle' },
      ],
    },
    {
      name: 'Community',
      buttons: [
        { description: 'Members', url: 'community/members' },
        { description: 'Groups', url: 'community/groups' },
        // { description: 'Applications', url: 'community/applications' },
        { description: 'Updates', url: 'community/updates' },
      ],
    },
    {
      name: 'Authorization',
      buttons: [
        {
          description: 'Opportunity admins',
          url: 'authorization/admins',
        },
      ],
    },
  ],
  organizationLvl: [
    {
      name: 'Organization Context',
      buttons: [{ description: 'Edit', url: 'edit' }],
    },
    {
      name: 'Community',
      buttons: [
        { description: 'Members', url: 'community/members' },
        { description: 'Groups', url: 'community/groups' },
      ],
    },
    {
      name: 'Authorization',
      buttons: [
        { description: 'Admins', url: 'authorization/admins' },
        { description: 'Owners', url: 'authorization/owners' },
      ],
    },
  ],
};
