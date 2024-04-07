import { Component, OnInit } from '@angular/core';
import { FoodTypeStore } from '../../state/food-type.store';
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-manage-food-types',
  templateUrl: './manage-food-types.page.html',
  styleUrls: ['./manage-food-types.page.scss'],
})
export class ManageFoodTypesPage implements OnInit {
  foodTypes$ = this.foodTypeStore.getFoodTypes();

  constructor(private foodTypeStore: FoodTypeStore, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
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
