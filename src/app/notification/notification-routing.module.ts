import { NotificationListComponent } from './notification-list/notification-list.component';
import { AuthGuards } from './../auth-guards/auth-guards';
import { Routes } from '@angular/router'; 


export const NotificationRoutes: Routes = [
	{ path: 'notification/list', component: NotificationListComponent, canActivate: [AuthGuards] }, 
];