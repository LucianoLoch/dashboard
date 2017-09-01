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
}