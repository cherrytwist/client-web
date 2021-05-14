import React, { FC, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import {
  useGrantCredentialsMutation,
  useRevokeCredentialsMutation,
  UsersWithCredentialsDocument,
  useUsersWithCredentialsQuery,
} from '../../../generated/graphql';
import { useApolloErrorHandler } from '../../../hooks/useApolloErrorHandler';
import { useCredentialsResolver } from '../../../hooks/useCredentialsResolver';
import { useUpdateNavigation } from '../../../hooks/useNavigation';
import { Member } from '../../../models/User';
import { PageProps } from '../../../pages';
import Loading from '../../core/Loading';
import { EditMembers } from '../Community/EditMembers';

interface EditCredentialsProps extends PageProps {
  credential: string;
  resourceId?: number;
  parentMembers: Member[];
}

export const EditCredentials: FC<EditCredentialsProps> = ({ paths, credential, parentMembers, resourceId }) => {
  useUpdateNavigation({ currentPaths: paths });
  const { toAuthenticationCredentials } = useCredentialsResolver();

  const { data, loading: loadingMembers } = useUsersWithCredentialsQuery({
    variables: {
      input: {
        type: toAuthenticationCredentials(credential),
        resourceID: resourceId,
      },
    },
  });

  const members = useMemo(() => data?.usersWithAuthorizationCredential || [], [data]);
  const handleError = useApolloErrorHandler();

  const [grant] = useGrantCredentialsMutation({
    onError: handleError,
  });

  const [revoke] = useRevokeCredentialsMutation({
    onError: handleError,
  });

  const handleAdd = (_member: Member) => {
    grant({
      variables: {
        input: {
          userID: Number(_member.id),
          type: toAuthenticationCredentials(credential),
          resourceID: resourceId,
        },
      },
      refetchQueries: [
        {
          query: UsersWithCredentialsDocument,
          variables: { input: { type: toAuthenticationCredentials(credential), resourceID: resourceId } },
        },
      ],
      awaitRefetchQueries: true,
    });
  };

  const handleRemove = (_member: Member) => {
    revoke({
      variables: {
        input: {
          userID: Number(_member.id),
          type: toAuthenticationCredentials(credential),
          resourceID: resourceId,
        },
      },
      refetchQueries: [
        {
          query: UsersWithCredentialsDocument,
          variables: { input: { type: toAuthenticationCredentials(credential), resourceID: resourceId } },
        },
      ],
      awaitRefetchQueries: true,
    });
  };

  const availableMembers = useMemo(() => {
    return parentMembers.filter(p => members.findIndex(m => m.id === p.id) < 0);
  }, [parentMembers, members]);

  if (loadingMembers) {
    return <Loading />;
  }

  return (
    <Container>
      <EditMembers members={members} availableMembers={availableMembers} onAdd={handleAdd} onRemove={handleRemove} />
    </Container>
  );
};
export default EditCredentials;
