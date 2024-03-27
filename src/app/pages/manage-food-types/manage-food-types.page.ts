import { Component, OnInit } from '@angular/core';
import { FoodTypeStore } from '../../state/food-type.store';
import { Router } from "@angular/router";

@Component({
  selector: 'app-manage-food-types',
  templateUrl: './manage-food-types.page.html',
  styleUrls: ['./manage-food-types.page.scss'],
})
export class ManageFoodTypesPage implements OnInit {
  foodTypes$ = this.foodTypeStore.getFoodTypes();

  constructor(private foodTypeStore: FoodTypeStore, private router: Router) {}

  navigateToAddFoodType() {
    this.router.navigateByUrl('/add-food-type');
  }
  ngOnInit() {
    this.foodTypeStore.loadFoodTypes();
  }
}
