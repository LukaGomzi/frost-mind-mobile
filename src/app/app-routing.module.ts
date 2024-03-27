import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/no-auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'add-freezer',
    loadChildren: () => import('./pages/add-freezer/add-freezer.module').then( m => m.AddFreezerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-food-types',
    loadChildren: () => import('./pages/manage-food-types/manage-food-types.module').then( m => m.ManageFoodTypesPageModule)
  },
  {
    path: 'add-food-type',
    loadChildren: () => import('./pages/add-food-type/add-food-type.module').then( m => m.AddFoodTypePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
