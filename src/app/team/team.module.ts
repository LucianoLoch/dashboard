import { BidinfoListComponent } from './../bidinfo/bidinfo-list/bidinfo-list.component';
import { BidinfoModule } from './../bidinfo/bidinfo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MdOptionModule, MdSelectModule,  MdNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserService } from './../user/user.service';
import { TeamService } from './team.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { FormsModule } from '@angular/forms';
import {MdTableModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		MdOptionModule,
		MdSelectModule,
		
    MdNativeDateModule,
    ReactiveFormsModule,
    MdTableModule,
  ],
  declarations: [
    TeamCreateComponent, 
    TeamEditComponent, 
    TeamListComponent, 
    TeamViewComponent   
  
  ],
  	providers: [
		TeamService, UserService,
	],
  
})
export class TeamModule { }
