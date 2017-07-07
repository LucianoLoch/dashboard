import { TransfermarketRoutes } from './transfermarket/transfermarket-routing.module';
import { TeamRoutes } from './team/team-routing.module';
import { BidinfoRoutes } from './bidinfo/bidinfo-routing.module';
import { AuthGuards } from './auth-guards/auth-guards';
import { TeamViewComponent } from './team/team-view/team-view.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  ...TeamRoutes,

  ...BidinfoRoutes,
  ...TransfermarketRoutes,
  { path: '', component: TeamViewComponent, canActivate: [AuthGuards]},
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserCreateComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}