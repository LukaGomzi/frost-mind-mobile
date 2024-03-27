import { Component, OnInit } from '@angular/core';
import { FoodTypeStore } from '../../state/food-type.store';

@Component({
  selector: 'app-manage-food-types',
  templateUrl: './manage-food-types.page.html',
  styleUrls: ['./manage-food-types.page.scss'],
})
export class ManageFoodTypesPage implements OnInit {
  foodTypes$ = this.foodTypeStore.getFoodTypes();

  constructor(private foodTypeStore: FoodTypeStore) {}

  ngOnInit() {
    this.foodTypeStore.loadFoodTypes();
  }
}
