import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simple a test',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tomato_Bruschetta.jpg/800px-Tomato_Bruschetta.jpg'),
    new Recipe('A Test Recipe 2',
      'This is simple a test',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tomato_Bruschetta.jpg/800px-Tomato_Bruschetta.jpg')
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}
