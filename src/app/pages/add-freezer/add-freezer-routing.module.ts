import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFreezerPage } from './add-freezer.page';

const routes: Routes = [
  {
    path: '',
    component: AddFreezerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFreezerPageRoutingModule {}
