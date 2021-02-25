import { STATUS_KEY, TOKEN_KEY } from '../../models/Constantes';
import { AuthActionTypes, AuthState, UPDATE_ACCOUNT, UPDATE_ERROR, UPDATE_STATUS, UPDATE_TOKEN } from './types';

const initialState: AuthState = {
  account: null,
  error: null,
  idToken: null,
  accessToken: null,
  isAuthenticated: false,
  status: 'unauthenticated',
};

export default function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        isAuthenticated: action.payload !== null,
      };
    case UPDATE_TOKEN:
      if (action.payload) {
        console.debug('Token: ', action.payload);
        localStorage.setItem(TOKEN_KEY, action.payload);
        return {
          ...state,
          accessToken: action.payload,
          isAuthenticated: true,
        };
      } else {
        return {
          ...state,
          idToken: null,
          accessToken: '',
          isAuthenticated: false,
        };
      }
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case UPDATE_STATUS:
      localStorage.setItem(STATUS_KEY, action.payload);
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}
