import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  recipesUrl = 'https://ng-recipe-book-b4ea3.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((actions: RecipeActions.FetchRecipes) => {
      return this.http
        .get<Recipe[]>(this.recipesUrl);
    }),
    map((recipes: Recipe[]) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }

      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({ dispatch: false })
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', this.recipesUrl,
        state.recipes, {
          reportProgress: true
        });

      return this.http.request(req);
    })
  );


  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
}
