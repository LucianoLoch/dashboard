import { LeagueService } from './league.service';
import { TeamService } from './../team/team.service';
import { AlertService } from './../util/alert.service';
import { BidinfoService } from './../bidinfo/bidinfo.service';
import { PlayerService } from './../player/player.service';
import { TransfermarketService } from './transfermarket.service';
import { TransfermarketNameFilter } from './transfermarket.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MdSelectModule, MdOptionModule, MaterialModule, MdNativeDateModule, MdSlideToggleModule, MdTableModule } from '@angular/material';
import { TeamModule } from './../team/team.module';
import { BidinfoModule } from './../bidinfo/bidinfo.module';
import { RouterModule } from '@angular/router';
import { TransfermarketListComponent } from './transfermarket-list/transfermarket-list.component';
import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

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
		NgxPaginationModule
  ],
  declarations: [
 //   TransfermarketFilterComponent, 
    TransfermarketListComponent, 
    TransfermarketNameFilter
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
