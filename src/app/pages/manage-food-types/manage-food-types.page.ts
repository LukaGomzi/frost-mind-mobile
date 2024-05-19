import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodTypeStore } from '../../state/food-type.store';
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Subject, takeUntil } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { FoodType } from "../../services/food-type.service";

@Component({
  selector: 'app-manage-food-types',
  templateUrl: './manage-food-types.page.html',
  styleUrls: ['./manage-food-types.page.scss'],
})
export class ManageFoodTypesPage implements OnInit, OnDestroy {
  error?: string;
  foodTypes$ = this.foodTypeStore.getFoodTypes();
  isLoading$ = this.foodTypeStore.isLoading();
  private onDestroy$ = new Subject<void>();

  constructor(
    private foodTypeStore: FoodTypeStore,
    private router: Router,
    private alertController: AlertController,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadFoodTypes();
    this.foodTypeStore.getError().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(error => {
      this.error = error;
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  loadFoodTypes(event?: any): void {
    this.foodTypeStore.loadFoodTypes();
    if (event) {
      this.isLoading$.pipe(takeUntil(this.onDestroy$)).subscribe(isLoading => {
        if (!isLoading) {
          event.target.complete();
        }
      });
    }
  }

  navigateToAddFoodType() {
    this.router.navigateByUrl('/add-food-type');
  }

  async confirmDelete(foodType: FoodType) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this food type?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteFoodType(foodType);
          },
          cssClass: 'danger',
        },
      ],
    });

    await alert.present();
  }

  deleteFoodType(type: FoodType) {
    this.foodTypeStore.deleteFoodType(type.id!).subscribe({
      next: () => {
        this.notificationService.success(`Food type ${type.name} was successfully removed.`);
        this.foodTypeStore.loadFoodTypes();
      },
      error: () => {
        this.notificationService.error('Failed to delete food type. Please try again later.');
      }
    });
  }
}
