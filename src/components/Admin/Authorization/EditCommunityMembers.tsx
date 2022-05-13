import React, { FC } from 'react';
import {
  refetchUsersWithCredentialsSimpleListQuery,
  useAssignUserAsCommunityMemberMutation,
  useRemoveUserAsCommunityMemberMutation,
} from '../../../hooks/generated/graphql';
import { useApolloErrorHandler, useAvailableMembers } from '../../../hooks';
import { Member } from '../../../models/User';
import { AuthorizationCredential, UserDisplayNameFragment } from '../../../models/graphql-schema';
import EditMembers from '../Community/EditMembers';
import { WithCommunity } from '../Community/CommunityTypes';

interface EditCredentialsProps extends WithCommunity {
  resourceId: string;
  communityId: string;
  credential: CommunityCredentials;
}

export type CommunityCredentials =
  | AuthorizationCredential.HubMember
  | AuthorizationCredential.OpportunityMember
  | AuthorizationCredential.OrganizationMember
  | AuthorizationCredential.ChallengeMember;

export const EditCommunityMembers: FC<EditCredentialsProps> = ({
  credential,
  resourceId,
  communityId,
  parentCommunityId,
}) => {
  const handleError = useApolloErrorHandler();

  const [grant, { loading: addingMember }] = useAssignUserAsCommunityMemberMutation({
    onError: handleError,
  });

  const [revoke, { loading: removingMember }] = useRemoveUserAsCommunityMemberMutation({
    onError: handleError,
  });

  const handleAdd = (_member: UserDisplayNameFragment) => {
    grant({
      variables: {
        input: {
          communityID: communityId,
          userID: _member.id,
        },
      },
      refetchQueries: [
        refetchUsersWithCredentialsSimpleListQuery({
          input: { type: credential, resourceID: resourceId },
        }),
      ],
      awaitRefetchQueries: true,
    });
  };

  const handleRemove = (_member: Member) => {
    revoke({
      variables: {
        input: {
          userID: _member.id,
          communityID: communityId,
        },
      },
      refetchQueries: [
        refetchUsersWithCredentialsSimpleListQuery({
          input: { type: credential, resourceID: resourceId },
        }),
      ],
      awaitRefetchQueries: true,
    });
  };

  const { available, current, loading, fetchMore, hasMore } = useAvailableMembers({
    credential,
    resourceId,
    parentCommunityId,
  });

  return (
    <EditMembers
      members={current}
      availableMembers={available}
      onAdd={handleAdd}
      addingMember={addingMember}
      onRemove={handleRemove}
      removingMember={removingMember}
      loadingMembers={loading}
      loadingAvailableMembers={loading}
      onLoadMore={fetchMore}
      loadMore={2}
      hasMore={hasMore}
    />
  );
};
export default EditCommunityMembers;
