import { HttpUtilService } from './../util/http-util.service';
import { Injectable } from '@angular/core';

import { League } from './league.model';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class LeagueService {

    public path = 'league/list';
    public msgErro: string;
    public leagues: League[];

    constructor(public http: Http, public httpUtil: HttpUtilService) {
    }

    listarTodos(): Observable<League[]> {
        return this.http.get(this.httpUtil.url(this.path), this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosContent)
            .catch(this.httpUtil.processarErros);
    }   

    buscarPorId(id: number): Observable<League> {
        return this.http.get(this.httpUtil.url(this.path + '/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }  

}