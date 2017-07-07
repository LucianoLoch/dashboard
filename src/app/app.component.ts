import { Team } from './team/team.model';
import { User } from './user/user.model';
import { TeamService } from './team/team.service';
import { UserService } from './user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'pojeto-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
 