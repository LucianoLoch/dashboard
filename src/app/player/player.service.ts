
import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { PlayerFilter } from './../transfermarket/playerFilter.model';

import { HttpUtilService } from './../util/http-util.service';

import { Player } from './player.model';


@Injectable()
export class PlayerService {

  public path = 'player/list';

  public msgErro: string;
  public players: Player[];

  constructor(public http: Http, public httpUtil: HttpUtilService) {
  }

  listarTodos(): Observable<Player[]> {
    return this.http.get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDadosContent)
      .catch(this.httpUtil.processarErros);
  }

  listarFiltro(playerFilter: PlayerFilter): Observable<Player[]> {
    let params = JSON.parse(JSON.stringify(playerFilter || null));
    return this.http.post(this.httpUtil.url('player/getPlayers'), params,
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDadosContent)
      .catch(this.httpUtil.processarErros);
  }

  cadastrar(player: Player): Observable<Player> {
    let params = JSON.stringify(player);

    return this.http.post(this.httpUtil.url(this.path), params,
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }


  buscarPorId(id: number): Observable<Player> {
    return this.http.get(this.httpUtil.url('player/getPlayer/' + id),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }


}
