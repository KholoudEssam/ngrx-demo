import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  $loginUser = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(
            (data) => AuthActions.loginUserSuccess({ userId: data.userId }),
            catchError((err) =>
              of(AuthActions.loginUserFail({ error: err.message }))
            )
          )
        )
      )
    );
  });

  $signupUser = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.signupUser),
      mergeMap((action) =>
        this.authService
          .signup({
            name: action.name,
            email: action.email,
            password: action.password,
          })
          .pipe(
            map(
              () => AuthActions.signupUserSuccess(),
              catchError((err) =>
                of(AuthActions.signupUserFail({ error: err.message }))
              )
            )
          )
      )
    );
  });
}
