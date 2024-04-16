import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreezerDetailsPage } from './freezer-details.page';

const routes: Routes = [
  {
    path: '',
    component: FreezerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreezerDetailsPageRoutingModule {}
