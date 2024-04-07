import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodTypeDetailsPageRoutingModule } from './food-type-details-routing.module';

import { FoodTypeDetailsPage } from './food-type-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodTypeDetailsPageRoutingModule
  ],
  declarations: [FoodTypeDetailsPage]
})
export class FoodTypeDetailsPageModule {}
