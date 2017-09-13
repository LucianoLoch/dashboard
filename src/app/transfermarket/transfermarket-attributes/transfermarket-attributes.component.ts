import { PlayerAttributes } from './../../player/playerAttributes.model';
import {OnInit, Input } from '@angular/core';
import {Component, Inject} from '@angular/core';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-transfermarket-attributes',
  templateUrl: './transfermarket-attributes.component.html',
  styleUrls: ['./transfermarket-attributes.component.css']
})
export class TransfermarketAttributesComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}  

  getAttributeColor(attribute: number){
    if (attribute >= 90){
      return 'stats-90-99'
    } else if (attribute >= 80) {
      return 'stats-80-89'
    } else if (attribute >= 70) {
      return 'stats-70-79'
    } else if (attribute >= 50) {
      return 'stats-50-69'
    } else if (attribute < 50) {
      return 'stats-1-49'
    }
  }

  getRatingColor(attribute: number){
    if (attribute >= 75){
      return 'rating-75-99'
    } else if (attribute >= 65) {
      return 'rating-65-74'
    } else if (attribute < 65) {
      return 'rating-1-64'
    } 
  }

  
}