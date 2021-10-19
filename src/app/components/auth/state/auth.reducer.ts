import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  currentUser: string;
  error: string;
  showSpinner: boolean;
  currentUrl: string;
  isAuth: boolean;
}

const initState: AuthState = {
  currentUser: null,
  error: '',
  showSpinner: false,
  currentUrl: '',
  isAuth: false,
};

export const authReducer = createReducer(
  initState,
  on(AuthActions.toggleSpinner, (state): AuthState => {
    return {
      ...state,
      showSpinner: !state.showSpinner,
    };
  }),
  on(AuthActions.loginUser, (state): AuthState => {
    return {
      ...state,
      showSpinner: true,
    };
  }),
  on(AuthActions.loginUserSuccess, (state, action): AuthState => {
    return {
      ...state,
      showSpinner: false,
      isAuth: true,
      currentUser: action.userId,
    };
  }),
  on(AuthActions.loginUserFail, (state, action): AuthState => {
    return {
      ...state,
      showSpinner: false,
      isAuth: false,
      error: action.error,
    };
  }),
  on(AuthActions.signupUser, (state): AuthState => {
    return {
      ...state,
      showSpinner: true,
    };
  }),
  on(AuthActions.signupUserSuccess, (state): AuthState => {
    return {
      ...state,
      showSpinner: false,
      currentUrl: '/auth/login',
    };
  }),
  on(AuthActions.signupUserFail, (state, action): AuthState => {
    return {
      ...state,
      showSpinner: false,
      error: action.error,
    };
  }),
  on(AuthActions.logout, (state): AuthState => {
    return {
      ...state,
      currentUser: null,
      currentUrl: '/',
      isAuth: false,
    };
  })
);
