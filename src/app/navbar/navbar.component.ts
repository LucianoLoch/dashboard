import { UserService } from './../user/user.service';
import { TeamService } from './../team/team.service';
import { Team } from './../team/team.model';
import { User } from './../user/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public msgErro : string;

  @Input() currentUser: User;
  @Input() team : Team;

}


  



