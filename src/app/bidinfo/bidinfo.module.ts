import { ReactiveFormsModule } from '@angular/forms';
import { BidinfoService } from './bidinfo.service';
import { MdOptionModule, MdSelectModule,  MdNativeDateModule, MdTableModule, MdButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidinfoListComponent } from './bidinfo-list/bidinfo-list.component';
import {MdProgressSpinnerModule} from '@angular/material';

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
    RouterModule,
		MdOptionModule,
		MdSelectModule,
		MdButtonModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    MdTableModule,
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
    BidinfoListComponent
  ],
  	providers: [
		BidinfoService,
    TdLoadingService

	]
})
export class BidinfoModule { } 
