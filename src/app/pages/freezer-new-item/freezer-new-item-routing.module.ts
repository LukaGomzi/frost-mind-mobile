import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreezerNewItemPage } from './freezer-new-item.page';

const routes: Routes = [
  {
    path: '',
    component: FreezerNewItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreezerNewItemPageRoutingModule {}
