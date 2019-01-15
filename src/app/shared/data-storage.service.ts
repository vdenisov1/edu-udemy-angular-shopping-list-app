import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
  recipesUrl = 'https://ng-recipe-book-b4ea3.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    // return this.http.put(this.recipesUrl,
    //   this.recipeService.getRecipes(), {
    //     observe: 'events',
    //     headers: new HttpHeaders().set('Authorization', 'Bearere XYZ'),
    //     params: new HttpParams().set('auth', token)
    //   });
    const req = new HttpRequest('PUT', this.recipesUrl,
      this.recipeService.getRecipes(), {
        reportProgress: true
      });

      return this.http.request(req);
  }

  getRecipes() {
    this.http
      .get(this.recipesUrl)
      .map((recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
