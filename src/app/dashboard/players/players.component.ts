import { TeamService } from './../../team/team.service';
import { Player } from './../../player/player.model';
import { User } from './../../user/user.model';
import { Team } from './../../team/team.model';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  public id: number;
  public teamResult: Team;
  public team: Team;
  public user: User;
  public msgErro: string;
  public players: Player[];
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';

  constructor(
    public route: ActivatedRoute,
    public teamService: TeamService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loading = true;
    console.log(this.user);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = +this.route.snapshot.params['id'];
    let idUser = 0;
    if (this.id === 0) {
      idUser = this.id;
    } else {
      idUser = this.user.id;
    }

    this.teamService.buscarPorIdUser(this.user.id)
      .subscribe((team) => {
        this.team = team;
        this.loading = false;
      },
      error => this.msgErro = error);

  }

}
