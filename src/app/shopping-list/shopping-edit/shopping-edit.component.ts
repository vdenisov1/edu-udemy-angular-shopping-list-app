import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const ingredient = new Ingredient(
      this.shoppingEditForm.value.name,
      this.shoppingEditForm.value.amount
    );

    if(this.editMode) { 
      this.shoppingListService.updateIngredient(ingredient, this.editedItemIndex);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onClear();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editedItem = null;
    this.editedItemIndex = null;
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

}
