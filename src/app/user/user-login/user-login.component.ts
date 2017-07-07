import { AlertService } from './../../util/alert.service';
import { AuthenticationService } from './../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

    model: User;
    loading = false;
    returnUrl: string;

    public usuario: string;
    public senha: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authenticationService: AuthenticationService,
        public alertService: AlertService) { }

    ngOnInit() {
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.authenticationService.logout();
        let user = new User();
        user.login = this.usuario;
        user.senha = this.senha;

        this.authenticationService.login(user)
            .subscribe((user) => {
                let userLogged = user;
                 console.log(userLogged);
                if (userLogged && userLogged.keyAuth) {
                    this.alertService.success('Usuário Logado com Sucesso');
                    this.router.navigate(['/']);
                } else {
                    this.alertService.error('Usuário inválido ou senha incorreta.');
                    this.router.navigate(['/login']);
                }

            },
            error => this.alertService.error(error));
    }


    processarLogin(user: User) {
        console.log(user);
        if (user && user.keyAuth) {
            this.alertService.success('Usuário Logado com Sucesso');
            this.router.navigate(['/']);
        } else {
            this.alertService.error('Usuário inválido ou senha incorreta.');
            this.router.navigate(['/login']);
        }
    }

}