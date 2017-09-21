import { User } from './../user/user.model';
import { Team } from './../team/team.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() currentUser: User;
  @Input() team : Team;
}
