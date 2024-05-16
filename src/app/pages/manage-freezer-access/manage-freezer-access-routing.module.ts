import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageFreezerAccessPage } from './manage-freezer-access.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFreezerAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageFreezerAccessPageRoutingModule {}
