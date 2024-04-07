import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodTypeDetailsPage } from './food-type-details.page';

const routes: Routes = [
  {
    path: '',
    component: FoodTypeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodTypeDetailsPageRoutingModule {}
