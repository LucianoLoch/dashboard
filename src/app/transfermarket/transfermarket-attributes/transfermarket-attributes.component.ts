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
      return 'label-warning'
    } else if (attribute >= 80) {
      return 'label-info'
    } else if (attribute >= 70) {
      return 'label-primary'
    } else if (attribute < 70) {
      return 'label-danger'
    } 
  }
}