import { TransfermarketService } from './../transfermarket/transfermarket.service';
import { NotificationService } from './../transfermarket/notification.service';
import { BidinfoService } from './../bidinfo/bidinfo.service';
import { TeamService } from './../team/team.service';
import { NotificationComponent } from './notification/notification.component';
import { BidlistComponent } from './bidlist/bidlist.component';
import { PlayersComponent } from './players/players.component';
import { TeamComponent } from './team/team.component';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, MatSelectModule,  MatNativeDateModule, MatButtonModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserService } from './../user/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material';
import { CovalentExpansionPanelModule } from '@covalent/core';
import { AdminComponent } from './admin/admin.component';
import { ListTeamComponent } from './admin/list-team/list-team.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { ListBidComponent } from './admin/list-bid/list-bid.component';
import { GraphComponent } from './admin/graph/graph.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		MatOptionModule,
    MatSelectModule,
    MatButtonModule,		
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    CovalentExpansionPanelModule
  ],
  declarations: [
    DashboardComponent, 
    TeamComponent, 
    PlayersComponent, 
    BidlistComponent, 
    NotificationComponent, 
    AdminComponent, 
    ListTeamComponent, 
    ListUserComponent, 
    ListBidComponent, GraphComponent,  
  ],
  	providers: [
		TeamService, 
    UserService,     
    BidinfoService,
    NotificationService,
    TransfermarketService   
	],
  
})
export class DashboardModule { }
