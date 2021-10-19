import { createAction, props } from '@ngrx/store';

export const toggleSpinner = createAction('[User] spinner');
export const logout = createAction('[User] LOGOUT');

export const loginUser = createAction(
  '[User] LOGIN',
  props<{ email: string; password: string }>()
);
export const loginUserSuccess = createAction(
  '[User] LOGIN Success',
  props<{ userId: string }>()
);
export const loginUserFail = createAction(
  '[User] LOGIN Fail',
  props<{ error: string }>()
);

export const signupUser = createAction(
  '[User] SIGNUP',
  props<{ email: string; password: string; name: string }>()
);
export const signupUserSuccess = createAction('[User] SIGNUP Success');
export const signupUserFail = createAction(
  '[User] SIGNUP Fail',
  props<{ error: string }>()
);
