import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {


  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').map((authState: fromAuth.State) => {
      console.log('CanActivate: ' + authState.authenticated);
      return authState.authenticated;
    });
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store.select('auth').map((authState: fromAuth.State) => {
      console.log('CanLoad: ' + authState.authenticated);
      return authState.authenticated;
    });
  }
}
