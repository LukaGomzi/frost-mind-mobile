import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageFoodTypesPage } from './manage-food-types.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFoodTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageFoodTypesPageRoutingModule {}
