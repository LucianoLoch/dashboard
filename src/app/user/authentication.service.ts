import { User } from './user.model';
import { HttpUtilService } from './../util/http-util.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

	public path = 'http://localhost:8585/pofexo/rest/user/login';

    public loginUrl:string = 'user/login';
	public logoutUrl:string = '';
    
	constructor(public http: Http, public httpUtil :HttpUtilService) { }

  
    login(user : User) {
        return this.http.post(this.httpUtil.url(this.loginUrl), user, 
                        this.httpUtil.headers())
                    .map(this.httpUtil.extrairDadosUser)
                    .catch(this.httpUtil.processarErros);                    
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('team');
        
    }

    isLogged(){
        return localStorage['token'];
    }

}
