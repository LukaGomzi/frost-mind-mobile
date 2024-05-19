// add-food-type.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypeService } from '../../services/food-type.service';
import { FoodTypeStore } from "../../state/food-type.store";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: 'app-add-food-type',
  templateUrl: './add-food-type.page.html',
  styleUrls: ['./add-food-type.page.scss'],
})
export class AddFoodTypePage {
  foodTypeName?: string;
  expirationMonths?: number;
  isLoading: boolean = false;

  constructor(
    private foodTypeService: FoodTypeService,
    private router: Router,
    private foodTypeStore: FoodTypeStore,
    private notificationsService: NotificationService,
  ) {}

  submit() {
    if (this.foodTypeName && this.expirationMonths) {
      this.isLoading = true;
      this.foodTypeStore.addFoodType({
        name: this.foodTypeName,
        expirationMonths: this.expirationMonths
      }).subscribe({
        next: () => {
          this.isLoading = false
          this.notificationsService.success(`Food type ${this.foodTypeName} was successfully added.`);
          this.router.navigateByUrl('/manage-food-types');
        },
        error: (_) => {
          this.notificationsService.error("Could not add new food type. Try again later.");
        }
      });
    } else {
      this.notificationsService.error("All fields are required.");
    }
  }

}
