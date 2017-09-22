import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationModule } from './notification/notication.module';
import { NotificationService } from './notification/notification.service';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { AuthGuards } from './auth-guards/auth-guards';
import { AlertService } from './util/alert.service';
import { UserService } from './user/user.service';
import { AuthenticationService } from './user/authentication.service';
import { HttpUtilService } from './util/http-util.service';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModule } from './user/user.module';
import { BidinfoModule } from './bidinfo/bidinfo.module';
import { TransfermarketModule } from './transfermarket/transfermarket.module';
import { TeamModule } from './team/team.module';
import { AppRoutingModule } from './app-routing.module';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { TransfermarketFilterComponent } from './transfermarket/transfermarket-filter/transfermarket-filter.component';


import { MdSelectModule, MdOptionModule, MdAutocompleteModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import 'hammerjs';


import { TdDataTableService } from '@covalent/core';
import { CovalentExpansionPanelModule } from '@covalent/core';




@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    MdSelectModule,
    MdOptionModule,  
    MdAutocompleteModule,  
    AppRoutingModule,
    TeamModule,
    TransfermarketModule,
    UserModule,
    HttpModule,
    NotificationModule,
    FormsModule,
    ToastrModule.forRoot(),
    DashboardModule,
    CovalentExpansionPanelModule  
  ],
    declarations: [ 
    AppComponent,
    SidebarComponent, 
    NavbarComponent, 
 
  ],
  providers: [
    HttpUtilService,
    AuthGuards,
    AuthenticationService,
    UserService,
    AlertService,   
    TdDataTableService 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
