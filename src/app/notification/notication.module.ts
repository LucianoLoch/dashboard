import { NotificationService } from './notification.service';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdOptionModule, MdSelectModule, MaterialModule, MdNativeDateModule, MdPaginatorModule } from '@angular/material';

import { RouterModule } from '@angular/router';
import { UserService } from './../user/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import {MdTableModule} from '@angular/material';

import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentLoadingModule,
  CovalentExpansionPanelModule,
  CovalentChipsModule,
  TdLoadingService
} from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		MdOptionModule,
		MdSelectModule,
		MaterialModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    MdTableModule,
    MdPaginatorModule,
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    CovalentLoadingModule,
    CovalentExpansionPanelModule,
    CovalentChipsModule 
  ],
  declarations: [
    NotificationListComponent
  
  ],
  	providers: [
		NotificationService, 
    UserService,
    TdLoadingService
	],
  
})
export class NotificationModule { }
