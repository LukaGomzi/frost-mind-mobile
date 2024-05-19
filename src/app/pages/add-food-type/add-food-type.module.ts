import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFoodTypePageRoutingModule } from './add-food-type-routing.module';

import { AddFoodTypePage } from './add-food-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFoodTypePageRoutingModule
  ],
  declarations: [AddFoodTypePage]
})
export class AddFoodTypePageModule {}
