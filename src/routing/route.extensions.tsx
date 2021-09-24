import React, { FC } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import Loading from '../components/core/Loading/Loading';
import { useAuthenticationContext, useUserContext } from '../hooks';
import { AuthorizationCredential } from '../models/graphql-schema';

// those roles have unconditional access to every restricted resource
const adminCredentials = [AuthorizationCredential.GlobalAdmin, AuthorizationCredential.GlobalAdminCommunity];

export interface CredentialForResource {
  credential: AuthorizationCredential;
  resourceId?: string;
}

type RequiredCredential = AuthorizationCredential | CredentialForResource;

interface RestrictedRoutePros extends RouteProps {
  requiredCredentials?: RequiredCredential[];
}

const RestrictedRoute: FC<RestrictedRoutePros> = ({ children, requiredCredentials = [], ...rest }) => {
  const { pathname } = useLocation();
  const { user, loading: userLoading } = useUserContext();
  const { isAuthenticated, loading: loadingAuthContext } = useAuthenticationContext();

  requiredCredentials.push(...adminCredentials);

  if (userLoading || loadingAuthContext) {
    return <Loading text="Loading user configuration" />;
  }

  if (!isAuthenticated) {
    return <Redirect to={`/identity/required?returnUrl=${encodeURI(pathname)}`} />;
  }

  const toCredentialForResource = (x: RequiredCredential): CredentialForResource =>
    typeof x === 'string' ? { credential: x } : x;

  if (
    !user ||
    (requiredCredentials.map(toCredentialForResource).every(x => !user.hasCredentials(x.credential, x.resourceId)) &&
      requiredCredentials.length !== 0)
  ) {
    return <Redirect to={`/restricted?origin=${encodeURI(pathname)}`} />;
  }

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest}>{children}</Route>
  );
};

export const NotAuthenticatedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuthenticationContext();

  if (isAuthenticated) return <Redirect to={'/'} />;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest}>{children}</Route>
  );
};

export default RestrictedRoute;
