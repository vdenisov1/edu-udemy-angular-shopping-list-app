import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'An awesome Schnitzel!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'American Style',
      'https://images.pexels.com/photos/263109/pexels-photo-263109.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Cheese', 2)
      ]
    )
  ];

  recipesChanged = new Subject<Recipe[]>();

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
   return this.recipes[id];
  }

  setRecipes(recipes: Recipe[]) {
    console.log('setRecipes');
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
