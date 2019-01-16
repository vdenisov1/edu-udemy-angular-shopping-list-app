import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>,
    private router: Router) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onFetch() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onSave() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }
}
