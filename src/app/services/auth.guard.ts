import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getIsAuth, State } from '../components/auth/state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(getIsAuth).pipe(
      map((isauth) => {
        if (!isauth) this.router.navigate(['/']);

        return isauth;
      })
    );
    // return this.store.select(getIsAuth).subscribe(isauth => {
    //   if (!isauth) this.router.navigate(['/']);

    //     return isauth;
    // });
  }
}
