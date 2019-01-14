import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe;
  private paramSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  loadRecipeDetail(params: Params) {
    this.id = +params.id;
    this.recipe = this.recipeService.getRecipeById(this.id);

    if (!this.recipe) {
      this.router.navigate([''], { relativeTo: this.route });
    }
  }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.loadRecipeDetail(params);
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
