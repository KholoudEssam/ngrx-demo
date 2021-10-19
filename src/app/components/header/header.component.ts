import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getIsAuth, State } from '../auth/state';
import * as AuthActions from '../auth/state/auth.actions';
import { getCurrentUrl } from '../posts/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(getIsAuth);

    this.isAuth$.subscribe((isA) => console.log(isA));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    this.store.dispatch(AuthActions.logout());
    this.store.select(getCurrentUrl).subscribe((url) => {
      this.router.navigate([url]);
    });
  }
}
