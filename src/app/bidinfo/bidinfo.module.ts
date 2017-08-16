import { BidinfoService } from './bidinfo.service';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidinfoListComponent } from './bidinfo-list/bidinfo-list.component';
import {MdProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
		MaterialModule,
		MdProgressSpinnerModule
  ],
  declarations: [
  //  BidinfoListComponent
  ],
  	providers: [
		BidinfoService
	]
})
export class BidinfoModule { } 
