import { Bidinfo } from './../../bidinfo/bidinfo.model';
import { PlayerService } from './../../player/player.service';
import { BidinfoService } from './../../bidinfo/bidinfo.service';
import { TeamService } from './../../team/team.service';
import { Player } from './../../player/player.model';
import { User } from './../../user/user.model';
import { Team } from './../../team/team.model';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bidlist',
  templateUrl: './bidlist.component.html',
  styleUrls: ['./bidlist.component.css']
})

export class BidlistComponent implements OnInit {

  public bidinfos: Bidinfo[];
  public idExcluir: number;
  public pagina: number;
  public totalRegistros: number;
  public msgErro: string;
  public user: User;
  public player: Player;
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';
  @Input() team: Team;

  constructor(public bidinfoService: BidinfoService,
    public teamService: TeamService,
    public playerService: PlayerService,
    public route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loading = true;
    this.teamService.buscarPorIdUser(this.user.id)
      .subscribe((team) => {
        this.team = team
        this.bidinfoService.buscarPorTeam(this.team.id)
          .subscribe((bidinfo) => {
            this.bidinfos = bidinfo;
            this.loading = false;

          }, error => this.msgErro = error);
      }, error => this.msgErro = error);

  }
}
