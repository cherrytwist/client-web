import React, { FC, useEffect } from 'react';
import {
  refetchMeQuery,
  useCreateUserNewRegistrationMutation,
  useMeHasProfileQuery,
  useMembershipUserQuery,
  useMeQuery,
} from '../generated/graphql';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import { UserMetadata, useUserMetadataWrapper } from '../hooks/useUserMetadataWrapper';
import { Error } from '../pages/Error';
import { User } from '../types/graphql-schema';
export interface UserContextContract {
  user: UserMetadata | undefined;
  loading: boolean;
}
const UserContext = React.createContext<UserContextContract>({
  user: undefined,
  loading: true,
});

const UserProvider: FC<{}> = ({ children }) => {
  const wrapper = useUserMetadataWrapper();
  const { isAuthenticated, loading: loadingAuthentication } = useAuthenticationContext();
  const { data: meHasProfileData, loading: LoadingMeHasProfile } = useMeHasProfileQuery({ skip: !isAuthenticated });
  const { data: meData, loading: loadingMe } = useMeQuery({
    skip: !meHasProfileData?.meHasProfile,
  });
  const { data: membershipData, loading: loadingMembershipData } = useMembershipUserQuery({
    skip: !meData?.me.id,
    variables: {
      input: {
        userID: meData?.me.id || '',
      },
    },
  });

  const [createUserProfile, { loading: loadingCreateUser, error }] = useCreateUserNewRegistrationMutation({
    refetchQueries: [refetchMeQuery()],
    awaitRefetchQueries: true,
    onCompleted: () => {},
  });

  useEffect(() => {
    if (isAuthenticated && meHasProfileData && !meHasProfileData.meHasProfile) {
      createUserProfile();
    }
  }, [meHasProfileData]);

  const loading =
    loadingAuthentication || LoadingMeHasProfile || loadingCreateUser || loadingMe || loadingMembershipData;

  if (error) return <Error error={error} />;

  const wrappedMe = meData?.me ? wrapper(meData.me as User, membershipData?.membershipUser) : undefined;
  return (
    <UserContext.Provider
      value={{
        user: wrappedMe,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
