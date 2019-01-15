import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  // ingredientsSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');

    // this.ingredientsSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    // });
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // this.ingredientsSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
