import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreezerNewItemPageRoutingModule } from './freezer-new-item-routing.module';

import { FreezerNewItemPage } from './freezer-new-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FreezerNewItemPageRoutingModule
  ],
  declarations: [FreezerNewItemPage]
})
export class FreezerNewItemPageModule {}
