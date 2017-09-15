import { Router } from '@angular/router';
import { Team } from './team/team.model';
import { User } from './user/user.model';
import { TeamService } from './team/team.service';
import { UserService } from './user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pojeto-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    team : Team;
    public msgErro : string;
 
    constructor(public userService: UserService, 
                public teamService : TeamService,
                public router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (this.currentUser){
            this.teamService.buscarPorIdUser(this.currentUser.id)
                .subscribe((team) => { 
                    this.team = team;
                    console.log(team);
                    if(!this.team){
                        this.router.navigate(['/team/create']);
                    }
                },                
                error => this.msgErro = error);                
        }
    }
 
    ngOnInit() {
        
    }
 


}
 