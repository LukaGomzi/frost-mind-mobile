import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreezerDetailsPageRoutingModule } from './freezer-details-routing.module';

import { FreezerDetailsPage } from './freezer-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreezerDetailsPageRoutingModule
  ],
  declarations: [FreezerDetailsPage]
})
export class FreezerDetailsPageModule {}
