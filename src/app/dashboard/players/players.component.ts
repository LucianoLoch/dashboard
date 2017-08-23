import { FormsModule } from '@angular/forms';
import { TeamService } from './../../team/team.service';
import { Player } from './../../player/player.model';
import { User } from './../../user/user.model';
import { Team } from './../../team/team.model';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  @Input() players: Player[];


  getRatingColor(rating: number){
    if (rating >= 90){
      return 'label-warning'
    } else if (rating >= 80) {
      return 'label-info'
    } else if (rating >= 70) {
      return 'label-primary'
    } else if (rating < 70) {
      return 'label-danger'
    } 
  }
}
