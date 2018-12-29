import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe',
               'This is simple a test',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tomato_Bruschetta.jpg/800px-Tomato_Bruschetta.jpg'),
    new Recipe('A Test Recipe 2',
      'This is simple a test',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tomato_Bruschetta.jpg/800px-Tomato_Bruschetta.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
