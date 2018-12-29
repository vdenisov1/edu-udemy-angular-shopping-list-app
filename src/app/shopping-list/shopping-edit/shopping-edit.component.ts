import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputElement: ElementRef;
  @ViewChild('amountInput') amountInputElement: ElementRef;
  @Output() addedIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    const ingredient = new Ingredient(
      this.nameInputElement.nativeElement.value,
      this.amountInputElement.nativeElement.value
    );

    console.log('Submitted new ingredient '
      + ingredient.name
      + ' with amount '
      + ingredient.amount);

    this.addedIngredient.emit(ingredient);
  }

}
