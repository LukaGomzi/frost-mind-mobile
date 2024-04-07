import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageFoodTypesPageRoutingModule } from './manage-food-types-routing.module';

import { ManageFoodTypesPage } from './manage-food-types.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageFoodTypesPageRoutingModule
  ],
  declarations: [ManageFoodTypesPage]
})
export class ManageFoodTypesPageModule {}
