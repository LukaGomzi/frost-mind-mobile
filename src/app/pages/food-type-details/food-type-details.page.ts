import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodType } from "../../services/food-type.service";
import { FoodTypeStore } from "../../state/food-type.store";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: 'app-food-type-details',
  templateUrl: './food-type-details.page.html',
  styleUrls: ['./food-type-details.page.scss'],
})
export class FoodTypeDetailsPage implements OnInit {
  foodType?: FoodType;
  isLoading: boolean = false;
  private id?: number;

  constructor(
    private foodTypeStore: FoodTypeStore,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.foodTypeStore.getFoodTypeById(this.id).subscribe((data: FoodType | undefined) => {
        if (data) {
          this.foodType = { ...data };
        } else {
          this.router.navigateByUrl('/manage-food-types');
        }
      });
    } else {
      this.router.navigateByUrl('/manage-food-types');
    }
  }

  save() {
    if (this.foodType?.name && this.foodType?.expirationMonths) {
      this.isLoading = true;
      if (this.id && this.foodType?.createdBy) {
        this.foodTypeStore.updateFoodType(this.id, this.foodType!).subscribe({
          next: () => {
            this.isLoading = false;
            this.notificationService.success(`Food type ${this.foodType?.name} was successfully updated.`)
            this.router.navigateByUrl('/manage-food-types');
          },
          error: () => {
            this.isLoading = false;
            this.notificationService.error('Could not update food type. Try again later.');
          }
        });
      } else {
        this.foodTypeStore.addFoodType(this.foodType!).subscribe({
          next: () => {
            this.isLoading = false;
            this.notificationService.success(`Food type ${this.foodType?.name} was successfully updated.`)
            this.router.navigateByUrl('/manage-food-types');
          },
          error: () => {
            this.isLoading = false;
            this.notificationService.error('Could not update food type. Try again later.');
          }
        });
      }
    } else {
      this.notificationService.error('Food type name and expiration time are required.')
    }
  }
}
