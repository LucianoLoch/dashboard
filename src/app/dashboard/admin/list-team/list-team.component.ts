import { Team } from './../../../team/team.model';
import { TeamService } from './../../../team/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {

  public teams : Array<Team> = [];
  public msgErro: string;

  constructor(public teamService : TeamService) { }

  ngOnInit() {
    this.teamService.listarTodos()
    .subscribe((teams) => {
      console.log(teams);
      this.teams = teams
    }, error => this.msgErro = error);
  }

}
