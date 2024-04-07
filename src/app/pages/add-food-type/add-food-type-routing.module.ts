import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFoodTypePage } from './add-food-type.page';

const routes: Routes = [
  {
    path: '',
    component: AddFoodTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFoodTypePageRoutingModule {}
