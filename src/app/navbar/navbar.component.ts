import { UserService } from './../user/user.service';
import { TeamService } from './../team/team.service';
import { Team } from './../team/team.model';
import { User } from './../user/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  team : Team;
  public msgErro : string;

  constructor(public userService: UserService, public teamService : TeamService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      if (this.currentUser){
          this.teamService.buscarPorIdUser(this.currentUser.id)
              .subscribe((team : any[]) => this.team = team,                
              error => this.msgErro = error);                
      }
  }


}
