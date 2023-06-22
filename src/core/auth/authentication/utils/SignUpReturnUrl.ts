import { useEffect, useRef } from 'react';
import { ROUTE_HOME } from '../../../../domain/platform/routes/constants';
import { STORAGE_KEY_RETURN_URL } from '../constants/authentication.constants';
import { useConfig } from '../../../../domain/platform/config/useConfig';
import { env } from '../../../../types/env';

const STORAGE_KEY_SIGN_UP_RETURN_URL = 'signUpReturnUrl';

const storeSignUpReturnUrl = (returnUrl: string) => {
  localStorage.setItem(STORAGE_KEY_SIGN_UP_RETURN_URL, returnUrl);
};

export const useReturnUrl = () => {
  const { platform, loading } = useConfig();
  let defaultReturnUrl = '';
  if (platform?.domain === 'localhost') {
    defaultReturnUrl = `//${env?.REACT_APP_ALKEMIO_DOMAIN}${ROUTE_HOME}`;
  } else if (platform && !loading) {
    defaultReturnUrl = `https://${platform?.domain}${ROUTE_HOME}`;
  }

  return useRef(sessionStorage.getItem(STORAGE_KEY_RETURN_URL)).current ?? defaultReturnUrl;
};

type UseSignUpReturnUrlProvided = [returnUrl: string, cleanUp: () => void];

export const useSignUpReturnUrl = (): UseSignUpReturnUrlProvided => {
  const { platform } = useConfig();
  const sessionReturnUrl = useRef(sessionStorage.getItem(STORAGE_KEY_RETURN_URL)).current;

  const signUpReturnUrl = useRef(localStorage.getItem(STORAGE_KEY_SIGN_UP_RETURN_URL)).current;

  useEffect(() => {
    if (!sessionReturnUrl && signUpReturnUrl) {
      sessionStorage.setItem(STORAGE_KEY_RETURN_URL, signUpReturnUrl);
    }
  }, [sessionReturnUrl]);

  const returnUrl = sessionReturnUrl ?? signUpReturnUrl ?? `https://${platform?.domain}${ROUTE_HOME}`;

  const cleanUp = () => localStorage.removeItem(STORAGE_KEY_SIGN_UP_RETURN_URL);

  return [returnUrl, cleanUp];
};

export const useStoreSignUpReturnUrl = () => {
  const returnUrl = useRef(sessionStorage.getItem(STORAGE_KEY_RETURN_URL)).current;

  useEffect(() => {
    if (returnUrl) {
      storeSignUpReturnUrl(returnUrl);
    }
  }, [returnUrl]);
};
