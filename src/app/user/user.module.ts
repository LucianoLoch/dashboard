import { TeamService } from './../team/team.service';
import { AuthenticationService } from './authentication.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdOptionModule, MdSelectModule, MdNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		MaterialModule,
		MdOptionModule,
		MdSelectModule,
		MaterialModule,
    MdNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserCreateComponent, 
    UserLoginComponent
  ],
  providers: [
		AuthenticationService,
    TeamService
	]
})
export class UserModule { }
