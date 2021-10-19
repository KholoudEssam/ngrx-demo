import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { getCurrentUrl, getToggleSpinner, State } from '../state';
import * as AuthActions from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loading$: Observable<boolean>;
  isErr = false;

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(getToggleSpinner);
  }

  onSubmitForm(form: NgForm) {
    const { name, password, email } = form.value;
    const data: User = {
      name,
      email,
      password,
    };
    this.store.dispatch(AuthActions.signupUser(data));

    this.store
      .select(getCurrentUrl)
      .subscribe((url) => this.router.navigate([url]));
  }
}
