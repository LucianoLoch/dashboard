import { NotificationService } from './../../notification/notification.service';
import { Notification } from './../../notification/notification.model';

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
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  @Input() team: Team;
  public notifications : Notification[];
  public msgErro: String;
  public lengthNotification: number;
  

  constructor(public notificationService :NotificationService){    
  }

  ngOnInit() {
    this.team = JSON.parse(sessionStorage.getItem('team'));
    this.notificationService.getLastNotifications(this.team.id)
      .subscribe((notifications) => {
        this.notifications = notifications.content;
        this.lengthNotification = notifications.totalElements;
      }, error => this.msgErro = error);   

  }
}
