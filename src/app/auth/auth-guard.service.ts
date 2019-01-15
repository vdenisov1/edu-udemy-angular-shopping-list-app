import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {


  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        return authState.authenticated;
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => {
          return authState.authenticated;
        })
      );
  }
}
