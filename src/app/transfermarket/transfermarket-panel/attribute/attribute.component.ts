import { PlayerAttributes } from './../../../player/playerAttributes.model';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  constructor() { }

  @Input () attributes : Array<PlayerAttributes>;

  ngOnInit() {
  }

  getAttributeColor(attribute: number) {
    if (attribute >= 90) {
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

}
