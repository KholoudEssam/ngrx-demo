import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getError, getIsAuth, getToggleSpinner, State } from '../state';
import * as AuthActions from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading$: Observable<boolean>;
  isErr$: Observable<string>;

  constructor(private store: Store<State>, private router: Router) {}
  ngOnInit(): void {
    this.loading$ = this.store.select(getToggleSpinner);
    // this.isErr$ = this.store.select(getError);

    this.store.select(getError).pipe(tap((err) => console.log(err)));
  }
  onSubmitForm(form: NgForm) {
    const { password, email } = form.value;
    this.store.dispatch(AuthActions.loginUser({ email, password }));
    this.store.select(getIsAuth).subscribe((isAuth) => {
      if (isAuth) this.router.navigate(['/']);
    });
  }
}
