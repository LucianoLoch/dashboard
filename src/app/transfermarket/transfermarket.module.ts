import { TransfermarketTableComponent } from './transfermarket-table/transfermarket-table.component';
import { LeagueService } from './league.service';
import { TeamService } from './../team/team.service';
import { AlertService } from './../util/alert.service';
import { BidinfoService } from './../bidinfo/bidinfo.service';
import { PlayerService } from './../player/player.service';
import { TransfermarketService } from './transfermarket.service';
import { TransfermarketNameFilter } from './transfermarket.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MdOptionModule, MaterialModule, MdNativeDateModule, MdTableModule } from '@angular/material';
import { TeamModule } from './../team/team.module';
import { BidinfoModule } from './../bidinfo/bidinfo.module';
import { RouterModule } from '@angular/router';
import { TransfermarketListComponent } from './transfermarket-list/transfermarket-list.component';
import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  OverlayModule,
  PortalModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		BidinfoModule,
		TeamModule,
		MdOptionModule,
		MdSelectModule,
		MaterialModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    MdSlideToggleModule,
    MdTableModule,
		NgxPaginationModule,
    FormsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    
  ],
  declarations: [
 //   TransfermarketFilterComponent, 
    TransfermarketListComponent, 
    TransfermarketNameFilter,
    TransfermarketTableComponent
  ],
  providers: [
    TransfermarketService, 
    PlayerService, 
    BidinfoService, 
    AlertService, 
    TeamService,
    LeagueService
  ]
  
})
export class TransfermarketModule { }
