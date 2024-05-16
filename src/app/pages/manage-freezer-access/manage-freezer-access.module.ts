import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageFreezerAccessPageRoutingModule } from './manage-freezer-access-routing.module';

import { ManageFreezerAccessPage } from './manage-freezer-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageFreezerAccessPageRoutingModule
  ],
  declarations: [ManageFreezerAccessPage]
})
export class ManageFreezerAccessPageModule {}
