import { TransfermarketPanelComponent } from './transfermarket-panel/transfermarket-panel.component';
import { TransfermarketTableComponent } from './transfermarket-table/transfermarket-table.component';
import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';
import { AuthGuards } from './../auth-guards/auth-guards';

import { Routes } from '@angular/router'; 


export const TransfermarketRoutes: Routes = [
	{ path: 'transfermarket/table', component: TransfermarketTableComponent, canActivate: [AuthGuards] }, 	
	{ path: 'transfermarket/panel', component: TransfermarketPanelComponent, canActivate: [AuthGuards] },
	{ path: 'transfermarket', component: TransfermarketFilterComponent, canActivate: [AuthGuards] },
];
