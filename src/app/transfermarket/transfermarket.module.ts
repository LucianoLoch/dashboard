import { ProgressBarComponent } from './transfermarket-panel/progress-bar/progress-bar.component';
import { TransfermarketPanelComponent } from './transfermarket-panel/transfermarket-panel.component';
import { TransfermarketAttributesComponent } from './transfermarket-attributes/transfermarket-attributes.component';
import { TransfermarketTableComponent } from './transfermarket-table/transfermarket-table.component';
import { LeagueService } from './league.service';
import { TeamService } from './../team/team.service';
import { AlertService } from './../util/alert.service';
import { BidinfoService } from './../bidinfo/bidinfo.service';
import { PlayerService } from './../player/player.service';
import { TransfermarketService } from './transfermarket.service';
import { TransfermarketNameFilter } from './transfermarket.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule,  MatNativeDateModule, MatTableModule} from '@angular/material';
import { TeamModule } from './../team/team.module';
import { BidinfoModule } from './../bidinfo/bidinfo.module';
import { RouterModule } from '@angular/router';
import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TdLoadingService } from '@covalent/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';




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
  CovalentChipsModule 
} from '@covalent/core';
import {
  MatAutocompleteModule,  
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionPanel,
  MatExpansionModule,
  
  
  
} from '@angular/material';
import { AttributesItemComponent } from './transfermarket-panel/attributes-item/attributes-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		BidinfoModule,
		TeamModule,
		MatOptionModule,
		MatSelectModule,		
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
		NgxPaginationModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
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
    CovalentChipsModule,
    MatExpansionModule,
    MatProgressBarModule,
    NgxChartsModule
    
    
  ],
  entryComponents:[
    TransfermarketAttributesComponent
  ],
  declarations: [
    TransfermarketFilterComponent, 
    TransfermarketNameFilter,
    TransfermarketTableComponent,
    TransfermarketAttributesComponent,
    TransfermarketPanelComponent,
    AttributesItemComponent,
    ProgressBarComponent,
  ],
  providers: [
    TransfermarketService, 
    PlayerService, 
    BidinfoService, 
    AlertService, 
    TeamService,
    LeagueService,
    TdLoadingService
  ]
  
})
export class TransfermarketModule { }
