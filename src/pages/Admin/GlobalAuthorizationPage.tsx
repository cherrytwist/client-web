import { Container } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useResolvedPath } from 'react-router-dom';
import EditMemberCredentials2 from '../../components/Admin/Authorization/EditMemberCredentials2';
import { useApolloErrorHandler, useUpdateNavigation, useUrlParams } from '../../hooks';
import {
  refetchUsersWithCredentialsQuery,
  useAssignUserAsGlobalAdminMutation,
  useRemoveUserAsGlobalAdminMutation,
} from '../../hooks/generated/graphql';
import { AuthorizationCredential, UserDisplayNameFragment } from '../../models/graphql-schema';
import { Member } from '../../models/User';
import AuthorizationPageProps from './AuthorizationPageProps';

const GlobalAuthorizationPage: FC<AuthorizationPageProps> = ({ paths }) => {
  const { t } = useTranslation();
  const { pathname: url } = useResolvedPath('.');
  // TODO Needs refactor. If credential is missing page should not be rendered or error should be shown.
  const { role: credential = AuthorizationCredential.GlobalRegistered } = useUrlParams();
  const currentPaths = useMemo(
    () => [
      ...paths,
      { value: url, name: t(`common.enums.authorization-credentials.${credential}.name` as const), real: true },
    ],
    [paths]
  );
  useUpdateNavigation({ currentPaths });

  const handleError = useApolloErrorHandler();

  const [grant, { loading: addingMember }] = useAssignUserAsGlobalAdminMutation({
    onError: handleError,
  });

  const [revoke, { loading: removingMember }] = useRemoveUserAsGlobalAdminMutation({
    onError: handleError,
  });

  const handleAdd = (member: UserDisplayNameFragment) => {
    grant({
      variables: {
        input: {
          userID: member.id,
        },
      },
      refetchQueries: [
        refetchUsersWithCredentialsQuery({
          input: { type: credential },
        }),
      ],
      awaitRefetchQueries: true,
    });
  };

  const handleRemove = (member: Member) => {
    revoke({
      variables: {
        input: {
          userID: member.id,
        },
      },
      refetchQueries: [
        refetchUsersWithCredentialsQuery({
          input: { type: credential },
        }),
      ],
      awaitRefetchQueries: true,
    });
  };

  return (
    <Container maxWidth="xl">
      <EditMemberCredentials2
        onAdd={handleAdd}
        onRemove={handleRemove}
        credential={credential}
        addingMember={addingMember}
        removingMember={removingMember}
      />
    </Container>
  );
};
export default GlobalAuthorizationPage;
