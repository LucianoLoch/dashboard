import { Notification } from './../transfermarket/notification.model';
import { NotificationService } from './../transfermarket/notification.service';
import { UserService } from './../user/user.service';
import { TeamService } from './../team/team.service';
import { Team } from './../team/team.model';
import { User } from './../user/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public msgErro : string;
  public timerSubscription: AnonymousSubscription;
  public notificationSubscription: AnonymousSubscription;

  @Input() currentUser: User;
  @Input() team : Team;
  public notifications : Notification[];

  constructor(public notificationService :NotificationService){    
  }

  ngOnInit() {
    this.team = JSON.parse(sessionStorage.getItem('team'));
    if (this.team){
      this.refreshData();
    }    
  }

  public ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public refreshData(): void {
      this.notificationSubscription =  this.notificationService.getLastNotifications(this.team.id)
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.subscribeToData();
      }, error => this.msgErro = error);
  }

  public subscribeToData(): void {

    this.timerSubscription = Observable.timer(1500)
      .subscribe(() => this.refreshData());
  }

}


  



