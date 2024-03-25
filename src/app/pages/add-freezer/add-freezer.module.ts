import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFreezerPageRoutingModule } from './add-freezer-routing.module';

import { AddFreezerPage } from './add-freezer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFreezerPageRoutingModule
  ],
  declarations: [AddFreezerPage]
})
export class AddFreezerPageModule {}
