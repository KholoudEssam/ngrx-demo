import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

import * as App from 'src/app/state/app.state';

export interface State extends App.State {
  auth: AuthState;
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getToggleSpinner = createSelector(
  getAuthFeatureState,
  (state) => state.showSpinner
);

export const getIsAuth = createSelector(
  getAuthFeatureState,
  (state) => state.isAuth
);
export const getCurrentUser = createSelector(
  getAuthFeatureState,
  (state) => state.currentUser
);
export const getCurrentUrl = createSelector(
  getAuthFeatureState,
  (state) => state.currentUrl
);
export const getError = createSelector(
  getAuthFeatureState,
  (state) => state.error
);
