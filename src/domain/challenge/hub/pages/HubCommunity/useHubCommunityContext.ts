import { useMemo } from 'react';
import {
  useAllOrganizationsLazyQuery,
  useAssignOrganizationAsCommunityLeadMutation,
  useAssignOrganizationAsCommunityMemberMutation,
  useAssignUserAsCommunityLeadMutation,
  useAssignUserAsCommunityMemberMutation,
  useAssignUserAsHubAdminMutation,
  useEventOnApplicationMutation,
  useHubApplicationsQuery,
  useHubAvailableMemberUsersLazyQuery,
  useHubCommunityMembersQuery,
  useRemoveOrganizationAsCommunityLeadMutation,
  useRemoveOrganizationAsCommunityMemberMutation,
  useRemoveUserAsCommunityLeadMutation,
  useRemoveUserAsCommunityMemberMutation,
  useRemoveUserAsHubAdminMutation,
  useUsersWithCredentialsQuery,
} from '../../../../../core/apollo/generated/apollo-hooks';
import { AuthorizationCredential } from '../../../../../core/apollo/generated/graphql-schema';
import { OrganizationDetailsFragmentWithRoles } from '../../../../community/community/CommunityAdmin/CommunityOrganizations';
import { CommunityMemberUserFragmentWithRoles } from '../../../../community/community/CommunityAdmin/CommunityUsers';

const MAX_AVAILABLE_MEMBERS = 100;
const buildUserFilterObject = (filter: string | undefined) =>
  filter
    ? {
        firstName: filter,
        lastName: filter,
        email: filter,
      }
    : undefined;

const buildOrganizationFilterObject = (filter: string | undefined) =>
  filter
    ? {
        displayName: filter,
      }
    : undefined;

const useHubCommunityContext = (hubId: string) => {
  if (!hubId) {
    throw new Error('Must be within a Hub route.');
  }

  const {
    data,
    loading: loadingMembers,
    refetch: refetchCommunityMembers,
  } = useHubCommunityMembersQuery({
    variables: {
      hubId,
    },
  });

  const communityId = data?.hub.community?.id;

  const {
    data: dataAdmins,
    loading: loadingAdmins,
    refetch: refetchAuthorization,
  } = useUsersWithCredentialsQuery({
    variables: {
      input: {
        type: AuthorizationCredential.HubAdmin,
        resourceID: hubId,
      },
    },
  });

  const { data: dataApplications, loading: loadingApplications } = useHubApplicationsQuery({
    variables: { hubId },
  });

  // Members:
  const users = useMemo(() => {
    const result = (data?.hub.community?.memberUsers ?? []).map<CommunityMemberUserFragmentWithRoles>(user => ({
      ...user,
      isMember: true,
      isLead: false,
      isAdmin: false,
    }));

    // Add Leads
    (data?.hub.community?.leadUsers ?? []).forEach(lead => {
      const member = result.find(user => user.id === lead.id);
      if (member) {
        // If already a member set the lead role
        member.isLead = true;
      } else {
        // If not, add the entire user to the list
        result.push({ ...lead, isMember: false, isLead: true, isAdmin: false });
      }
    });

    // Add Admins:
    (dataAdmins?.usersWithAuthorizationCredential ?? []).forEach(admin => {
      const member = result.find(user => user.id === admin.id);
      if (member) {
        // If already a member set the admin role
        member.isAdmin = true;
      } else {
        // If not, add the entire user to the list
        result.push({
          ...admin,
          isMember: false,
          isLead: false,
          isAdmin: true,
        });
      }
    });
    return result;
  }, [data, dataAdmins]);

  const organizations = useMemo(() => {
    // Members:
    const result = (data?.hub.community?.memberOrganizations ?? []).map<OrganizationDetailsFragmentWithRoles>(
      organization => ({
        ...organization,
        isMember: true,
        isLead: false,
        isFaicilitating: false,
      })
    );

    // Add Leads
    (data?.hub.community?.leadOrganizations ?? []).forEach(lead => {
      const member = result.find(organization => organization.id === lead.id);
      if (member) {
        // If already a member set the lead role
        member.isLead = true;
      } else {
        // If not, add the entire organization to the list
        result.push({ ...lead, isMember: false, isLead: true, isFaicilitating: false });
      }
    });

    // Add Facilitating:
    if (data?.hub.host) {
      const member = result.find(organization => organization.id === data.hub.host!.id);
      if (member) {
        // If already a member set the lead role
        member.isFaicilitating = true;
      } else {
        // If not, add the entire organization to the list
        result.push({ ...data.hub.host, isMember: false, isLead: false, isFaicilitating: true });
      }
    }
    return result;
  }, [data, dataAdmins]);

  // Available new members:
  const [fetchAvailableUsers, { refetch: refetchAvailableMemberUsers }] = useHubAvailableMemberUsersLazyQuery();
  const getAvailableUsers = async (filter: string | undefined) => {
    const { data } = await fetchAvailableUsers({
      variables: {
        hubId,
        first: MAX_AVAILABLE_MEMBERS,
        filter: buildUserFilterObject(filter),
      },
    });
    return data?.hub.community?.availableMemberUsers?.users;
  };

  const [fetchAllOrganizations, { refetch: refetchAvailableMemberOrganizations }] = useAllOrganizationsLazyQuery();
  const getAvailableOrganizations = async (filter: string | undefined) => {
    const { data } = await fetchAllOrganizations({
      variables: {
        first: MAX_AVAILABLE_MEMBERS,
        filter: buildOrganizationFilterObject(filter),
      },
    });
    // Filter out already member organizations
    return data?.organizationsPaginated.organization.filter(
      org => organizations.find(member => member.id === org.id) === undefined
    );
  };

  // Adding new members:
  const [addUserToCommunity] = useAssignUserAsCommunityMemberMutation();
  const handleAddUser = async (memberId: string) => {
    if (!communityId) {
      return;
    }
    await addUserToCommunity({
      variables: {
        communityId,
        memberId,
      },
    });
    await refetchAvailableMemberUsers();
    return refetchCommunityMembers();
  };

  const [addOrganizationToCommunity] = useAssignOrganizationAsCommunityMemberMutation();
  const handleAddOrganization = async (memberId: string) => {
    if (!communityId) {
      return;
    }
    await addOrganizationToCommunity({
      variables: {
        communityId,
        memberId,
      },
    });
    await refetchAvailableMemberOrganizations();
    return refetchCommunityMembers();
  };

  // Mutations:
  const [updateApplication] = useEventOnApplicationMutation({});
  const handleApplicationStateChange = async (applicationId: string, newState: string) => {
    await updateApplication({
      variables: {
        input: {
          applicationID: applicationId,
          eventName: newState,
        },
      },
    });
    return refetchCommunityMembers();
  };

  const [assignUserAsCommunityLead] = useAssignUserAsCommunityLeadMutation();
  const [removeUserAsCommunityLead] = useRemoveUserAsCommunityLeadMutation();
  const handleUserLeadChange = async (memberId: string, isLead: boolean) => {
    if (!communityId) {
      return;
    }
    if (isLead) {
      await assignUserAsCommunityLead({
        variables: {
          memberId,
          communityId,
        },
      });
    } else {
      await removeUserAsCommunityLead({
        variables: {
          memberId,
          communityId,
        },
      });
    }
    return refetchCommunityMembers();
  };

  const [assignUserAsHubAdmin] = useAssignUserAsHubAdminMutation();
  const [removeUserAsHubAdmin] = useRemoveUserAsHubAdminMutation();
  const handleUserAuthorizationChange = async (memberId: string, isAdmin: boolean) => {
    if (isAdmin) {
      await assignUserAsHubAdmin({
        variables: {
          input: {
            userID: memberId,
            hubID: hubId,
          },
        },
      });
    } else {
      await removeUserAsHubAdmin({
        variables: {
          input: {
            userID: memberId,
            hubID: hubId,
          },
        },
      });
    }
    return refetchAuthorization();
  };

  const [removeUserAsCommunityMember] = useRemoveUserAsCommunityMemberMutation();
  const handleRemoveUser = async (memberId: string) => {
    if (!communityId) {
      return;
    }
    await removeUserAsCommunityMember({
      variables: {
        memberId,
        communityId,
      },
    });
    return refetchCommunityMembers();
  };

  const [assignOrganizationAsCommunityLead] = useAssignOrganizationAsCommunityLeadMutation();
  const [removeOrganizationAsCommunityLeadMutation] = useRemoveOrganizationAsCommunityLeadMutation();
  const onOrganizationLeadChange = async (memberId: string, isLead: boolean) => {
    if (!communityId) {
      return;
    }
    if (isLead) {
      await assignOrganizationAsCommunityLead({
        variables: {
          memberId,
          communityId,
        },
      });
    } else {
      await removeOrganizationAsCommunityLeadMutation({
        variables: {
          memberId,
          communityId,
        },
      });
    }
    return refetchCommunityMembers();
  };

  const [removeOrganizationAsCommunityMember] = useRemoveOrganizationAsCommunityMemberMutation();
  const handleRemoveOrganization = async (memberId: string) => {
    if (!communityId) {
      return;
    }
    await removeOrganizationAsCommunityMember({
      variables: {
        memberId,
        communityId,
      },
    });
    return refetchCommunityMembers();
  };

  return {
    users,
    organizations,
    applications: dataApplications?.hub.community?.applications,
    onApplicationStateChange: handleApplicationStateChange,
    onUserLeadChange: handleUserLeadChange,
    onUserAuthorizationChange: handleUserAuthorizationChange,
    onOrganizationLeadChange: onOrganizationLeadChange,
    onAddUser: handleAddUser,
    onAddOrganization: handleAddOrganization,
    onRemoveUser: handleRemoveUser,
    onRemoveOrganization: handleRemoveOrganization,
    getAvailableUsers,
    getAvailableOrganizations,
    loading: loadingAdmins || loadingMembers || loadingApplications,
  };
};

export default useHubCommunityContext;
