import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodTypeStore } from '../../state/food-type.store';
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Subject, takeUntil } from "rxjs";

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
    private alertController: AlertController
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

  loadFoodTypes(): void {
    this.foodTypeStore.loadFoodTypes();
  }

  navigateToAddFoodType() {
    this.router.navigateByUrl('/add-food-type');
  }

  async confirmDelete(id: number) {
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
            this.deleteFoodType(id);
          },
          cssClass: 'danger',
        },
      ],
    });

    await alert.present();
  }

  deleteFoodType(id: number) {
    this.foodTypeStore.deleteFoodType(id).subscribe(() => {
      this.foodTypeStore.loadFoodTypes();
    });
  }
}
