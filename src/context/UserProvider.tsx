import React, { FC } from 'react';
import { User, useMyProfileQuery } from '../generated/graphql';
import { useAuthentication, UseAuthenticationResult } from '../hooks';

export interface UserContextContract {
  user: UserMetadata | undefined;
  loading: boolean;
}

export interface UserMetadata {
  user: User;
  ofGroup: (name: string, strict: boolean) => boolean;
  ofChallenge: (id: string) => boolean;
  isAdmin: boolean;
  roles: string[];
}

const wrapUser = (user: User | undefined): UserMetadata | undefined => {
  if (!user) {
    return;
  }

  const metadata = {
    user,
    ofGroup: (name, strict = true) =>
      Boolean(user.memberof?.groups.find(x => (strict ? x.name === name : x.name.includes(name)))),
    ofChallenge: id => Boolean(user.memberof?.challenges.find(x => x.id === id)),
    isAdmin: false,
    roles: user?.memberof?.groups.map(x => x.name) || [],
  };

  metadata.isAdmin = metadata.ofGroup('admin', false);

  return metadata;
};

const UserContext = React.createContext<UserContextContract>({
  user: undefined,
  loading: true,
});

const UserProvider: FC<{}> = ({ children }) => {
  const { data, loading: profileLoading } = useMyProfileQuery({ errorPolicy: 'all' });

  const { me } = data || {};
  const loading = profileLoading;

  return (
    <UserContext.Provider
      value={{
        user: wrapUser(me as User),
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
