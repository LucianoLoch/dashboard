import { User } from './../user.model';
import { AuthenticationService } from './../authentication.service';
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
        public authenticationService: AuthenticationService,
        public alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            (res) => {
                this.alertService.success('Registro Efetuado com sucesso', true);
                let user = new User();
                user.login = this.model.email;
                user.senha = this.model.senha;
                this.authenticationService.login(user)
                    .subscribe((user) => {
                        let userLogged = user;
                        if (userLogged && userLogged.keyAuth) {                            
                            this.router.navigate(['/team/create']);
                            this.alertService.success('Usuário Logado com Sucesso');
                            window.location.reload();
                        }
                    },
                    error => { 
                        this.router.navigate(['/team/create']);
                        this.alertService.error(error)});                
            },
            (err) => {
                this.alertService.error(err);
                this.loading = false;
            });
    }

}