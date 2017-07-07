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
        console.log('league');
        return this.http.get(this.httpUtil.url(this.path), this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }


    cadastrar(league: League): Observable<League> {
        let params = JSON.stringify(league);

        return this.http.post(this.httpUtil.url(this.path), params,
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }



    buscarPorId(id: number): Observable<League> {
        return this.http.get(this.httpUtil.url(this.path + '/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }


    atualizar(league: League) {
        let params = JSON.stringify(league);

        return this.http.put(this.httpUtil.url(this.path), params,
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }


    excluir(id: number) {

        return this.http.delete(this.httpUtil.url(this.path + '/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }




}