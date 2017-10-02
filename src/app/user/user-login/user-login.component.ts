import { Team } from './../../team/team.model';
import { TeamService } from './../../team/team.service';
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
    public msgErro: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authenticationService: AuthenticationService,
        public alertService: AlertService,
        public teamService: TeamService) { }

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
                let team: Team;
                let userLogged = user;
                if (userLogged && userLogged.keyAuth) {
                    this.alertService.success('Usuário Logado com Sucesso');
                    this.router.navigate(['/dashboard']);
                    window.location.reload();

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
            this.router.navigate(['/dashboard']);
        } else {
            this.alertService.error('Usuário inválido ou senha incorreta.');
            this.router.navigate(['/login']);
        }
    }

}