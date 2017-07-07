import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';
import { TransfermarketListComponent } from './transfermarket-list/transfermarket-list.component';
import { AuthGuards } from './../auth-guards/auth-guards';

import { Routes } from '@angular/router'; 


export const TransfermarketRoutes: Routes = [
	{ path: 'transfermarket/list', component: TransfermarketListComponent, canActivate: [AuthGuards] }, 	
	{ path: 'transfermarket', component: TransfermarketFilterComponent, canActivate: [AuthGuards] },
];
