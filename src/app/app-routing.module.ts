import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',loadChildren: ()=>import('./login/login.module').then(m=>m.LoginModule)},
  { path: 'signup',loadChildren: ()=>import('./sign-up/sign-up.module').then(m=>m.SignUpModule)},
  { path: 'wfms',loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports:[RouterModule]
})
export class AppRoutingModule { }
