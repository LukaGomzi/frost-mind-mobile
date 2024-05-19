import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrantFreezerAccessPageRoutingModule } from './grant-freezer-access-routing.module';

import { GrantFreezerAccessPage } from './grant-freezer-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrantFreezerAccessPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [GrantFreezerAccessPage]
})
export class GrantFreezerAccessPageModule {}
