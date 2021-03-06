import { Player } from './../player/player.model';
import { Team } from './../team/team.model';
import { User } from './../user/user.model';
import { TeamService } from './../team/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 

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
    public teamService: TeamService,
    public router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = +this.route.snapshot.params['id'];    

    this.teamService.buscarPorIdUser(this.user.id)
      .subscribe((team) => {        
        this.team = team;        
        if (this.team){
          this.loading = false;
          localStorage.setItem('team', JSON.stringify(this.team));					
        }else {
          this.router.navigate(['/team/create']);
        }
      },
      error => this.msgErro = error);

  }

}
