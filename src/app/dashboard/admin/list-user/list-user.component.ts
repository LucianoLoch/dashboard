import { AuthenticationService } from './../../../user/authentication.service';
import { User } from './../../../user/user.model';
import { UserService } from './../../../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users : Array<User> = [];
  public msgErro: string;

  constructor(public userService : AuthenticationService) { }

  ngOnInit() {
    this.userService.listarTodos()
    .subscribe((users) => {
      console.log(users);
      this.users = users
    }, error => this.msgErro = error);
  }

}
