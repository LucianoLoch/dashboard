import { AlertService } from './../../util/alert.service';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

    model: any = {};
    loading = false;
 
    constructor(
        public router: Router,
        public userService: UserService,
        public alertService: AlertService) { }
 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                (res) => {
                    this.alertService.success('Registro Efetuado com sucesso', true);
                    this.router.navigate(['/login']);
                },
                (err) => {
                    this.alertService.error(err);
                    this.loading = false;
                });
    }

}