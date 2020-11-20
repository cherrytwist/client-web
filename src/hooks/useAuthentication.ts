import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import {
  AccountInfo,
  AuthenticationResult,
  AuthorizationUrlRequest,
  PublicClientApplication,
  SilentRequest,
} from '@azure/msal-browser';
import { useCallback, useContext, useMemo } from 'react';
import { configContext } from '../context/ConfigProvider';
import { AadClientConfig } from '../generated/graphql';

export const TOKEN_STORAGE_KEY = 'accessToken';

export interface UseAuthenticationResult {
  signIn: () => Promise<AuthenticationResult | undefined>;
  signOut: (username: string) => Promise<void>;
  acquireToken: (username: string) => Promise<AuthenticationResult | undefined>;
  getAccounts: () => AccountInfo[];
  resetCache: () => Promise<ApolloQueryResult<unknown>[] | null>;
  resetStore: () => Promise<ApolloQueryResult<unknown>[] | null>;
  loading: boolean;
}

const signIn = async (msalApp?: PublicClientApplication, aadConfig?: AadClientConfig) => {
  if (!msalApp || !aadConfig) return;

  return await msalApp.loginPopup(aadConfig.loginRequest);
};

const signOut = async (msalApp?: PublicClientApplication, userName?: string) => {
  if (!msalApp || !userName) return;

  return msalApp.logout({ account: msalApp.getAccountByUsername(userName) || undefined });
};

const acquireTokenSilent = async (
  msalApp?: PublicClientApplication,
  aadConfig?: AadClientConfig,
  userName?: string
) => {
  if (!msalApp || !aadConfig || !userName) return;

  const silentRequest = {
    scopes: [...aadConfig.silentRequest.scopes],
    account: msalApp.getAccountByUsername(userName),
  } as SilentRequest;

  return msalApp.acquireTokenSilent(silentRequest);
};

const acquireTokenPopup = async (msalApp?: PublicClientApplication, aadConfig?: AadClientConfig, userName?: string) => {
  if (!msalApp || !aadConfig || !userName) return;

  const tokenRequest = {
    scopes: [...aadConfig.tokenRequest.scopes],
    account: msalApp.getAccountByUsername(userName),
  } as AuthorizationUrlRequest;

  return msalApp.acquireTokenPopup(tokenRequest);
};

const acquireToken = async (msalApp?: PublicClientApplication, aadConfig?: AadClientConfig, userName?: string) => {
  return await acquireTokenSilent(msalApp, aadConfig, userName).catch(async _err => {
    return await acquireTokenPopup(msalApp, aadConfig, userName);
  });
};

export const useAuthentication = (): UseAuthenticationResult => {
  const client = useApolloClient();
  const { loading: configLoading, aadConfig } = useContext(configContext);
  const msalApp = useMemo(() => {
    if (configLoading) {
      return undefined;
    }

    return new PublicClientApplication(aadConfig.msalConfig);
  }, [configLoading, aadConfig]);

  const acquireTokenWired = useCallback((username: string) => acquireToken(msalApp, aadConfig, username), [
    msalApp,
    aadConfig,
  ]);
  const getAccounts = useCallback(() => msalApp?.getAllAccounts() || [], [msalApp]);
  const signInWired = useCallback(() => signIn(msalApp, aadConfig), [msalApp, aadConfig]);
  const signOutWired = useCallback((username: string) => signOut(msalApp, username), [msalApp]);
  const resetCache = useCallback(() => client.clearStore(), [client]);
  const resetStore = useCallback(() => client.resetStore(), [client]);

  return {
    acquireToken: acquireTokenWired,
    getAccounts,
    signIn: signInWired,
    signOut: signOutWired,
    resetCache,
    resetStore,
    loading: configLoading,
  };
};
