// add-food-type.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypeService } from '../../services/food-type.service';
import { FoodTypeStore } from "../../state/food-type.store";

@Component({
  selector: 'app-add-food-type',
  templateUrl: './add-food-type.page.html',
  styleUrls: ['./add-food-type.page.scss'],
})
export class AddFoodTypePage {
  foodTypeName?: string;
  expirationMonths?: number;

  constructor(
    private foodTypeService: FoodTypeService,
    private router: Router,
    private foodTypeStore: FoodTypeStore
  ) {}

  // In add-food-type.page.ts
  submit() {
    if (this.foodTypeName && this.expirationMonths) {
      this.foodTypeStore.addFoodType({
        name: this.foodTypeName,
        expirationMonths: this.expirationMonths
      }).subscribe(() => {
        this.router.navigateByUrl('/manage-food-types'); // Navigate back after adding
      });
    }
  }

}
