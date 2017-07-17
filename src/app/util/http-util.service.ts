import { User } from './../user/user.model';
import { Team } from './../team/team.model';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class HttpUtilService {

	public API_URL: string = 'http://10.1.40.106:8585/pofexo/rest/';
	
	url(path: string) {
		return this.API_URL + path;
	}

	headers() {
		let headersParams = { 'Content-Type': 'application/json' };
	//	if (localStorage['token']) {
	//		headersParams['Authorization'] = localStorage['token'];
	//	}
		
		let headers = new Headers(headersParams);
		headers.append('Access-Control-Allow-Origin','*');
		headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	let options = new RequestOptions({ headers: headers });
    	return options;
	}

	extrairDados(response: Response) {
    	let data = response.json();
    	return data;
  	}
	  

	extrairDadosCadastro(response : Response){
		let data = response;
		return data.toString();
	}

	extrairDadosUser(response : Response){
		let user = response.json();	
		console.log(user);	
		if (user && user.keyAuth){
			localStorage.setItem('currentUser', JSON.stringify(user));
		}
		return user;
	}

	extrairDadosBidInfo(response : Response){
		let bidInfo = response.json();
		if(bidInfo){
			if (bidInfo.bidAproved == false){
				throw new Error('Seu Lance já foi superado! Tente Novamente!');
			}else{
				return bidInfo || {};
			} 
		}
	}

  	processarErros(erro: any) {
	    return Observable.throw(erro);
	}
}