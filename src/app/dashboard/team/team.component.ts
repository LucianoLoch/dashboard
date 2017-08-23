import { TeamService } from './../../team/team.service';
import { Player } from './../../player/player.model';
import { User } from './../../user/user.model';
import { Team } from './../../team/team.model';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent  {

   @Input() team: Team;
}
