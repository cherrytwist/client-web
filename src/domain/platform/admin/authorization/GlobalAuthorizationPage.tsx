import { Container } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useResolvedPath } from 'react-router-dom';
import EditMemberCredentials from '../components/Authorization/EditMemberCredentials';
import AdminLayout from '../toplevel/AdminLayout';
import { AdminSection } from '../toplevel/constants';
import { useUrlParams } from '../../../../core/routing/useUrlParams';
import { useUpdateNavigation } from '../../../../core/routing/useNavigation';
import { useApolloErrorHandler } from '../../../../core/apollo/hooks/useApolloErrorHandler';
import {
  refetchUsersWithCredentialsQuery,
  useAssignUserAsGlobalAdminMutation,
  useRemoveUserAsGlobalAdminMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import { AuthorizationCredential } from '../../../../core/apollo/generated/graphql-schema';
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
    [paths, url, t, credential]
  );
  useUpdateNavigation({ currentPaths });

  const handleError = useApolloErrorHandler();

  const [grant, { loading: addingMember }] = useAssignUserAsGlobalAdminMutation({
    onError: handleError,
  });

  const [revoke, { loading: removingMember }] = useRemoveUserAsGlobalAdminMutation({
    onError: handleError,
  });

  const handleAdd = (memberId: string) => {
    grant({
      variables: {
        input: {
          userID: memberId,
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

  const handleRemove = (memberId: string) => {
    revoke({
      variables: {
        input: {
          userID: memberId,
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
    <AdminLayout currentTab={AdminSection.Authorization}>
      <Container maxWidth="xl">
        <EditMemberCredentials
          onAdd={handleAdd}
          onRemove={handleRemove}
          credential={credential}
          updating={addingMember || removingMember}
        />
      </Container>
    </AdminLayout>
  );
};
export default GlobalAuthorizationPage;
