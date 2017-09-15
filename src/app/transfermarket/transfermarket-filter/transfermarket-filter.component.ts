import { LeagueService } from './../league.service';
import { AlertService } from './../../util/alert.service';
import { PlayerService } from './../../player/player.service';
import { TransfermarketService } from './../transfermarket.service';
import { League } from './../league.model';
import { Player } from './../../player/player.model';
import { Transfermarket } from './../transfermarket.model';
import { PlayerFilter } from './../playerFilter.model';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transfermarket-filter',
  templateUrl: './transfermarket-filter.component.html',
  styleUrls: ['./transfermarket-filter.component.css']
})
export class TransfermarketFilterComponent implements OnInit {

  public transfermarket: Transfermarket;
  public players: Array<Player> = [];
  public leagues: Array<League> = [];
  public playerFilter: PlayerFilter = new PlayerFilter();
  public leagueName: String = '';
  public value: any = {};
  selectedValue: string;



  public startPrice: number = 0;
  public endPrice: number = 0;
  public rating: number = 0;

  playerCtrl: FormControl;
  filteredPlayers: any;

  positionsCtrl: FormControl;
  filteredPositions: any;

  leaguesCtrl: FormControl;
  filteredLeagues: any;
  positions = ['CAM', 'CB', 'CDM', 'CF', 'CM', 'GK', 'LB', 'LM', 'LW', 'LWB', 'RB', 'RM', 'RW', 'RWB', 'ST'];

	/**
	 * Construtor.
	 *
	 * @param Router router
	 * @param TransfermarketService transfermarketService
	 */
  constructor(
    public router: Router,
    public transfermarketService: TransfermarketService,
    public playerService: PlayerService,
    public leagueService: LeagueService,
    public alertService: AlertService) {

    this.playerCtrl = new FormControl();
    this.filteredPlayers = this.playerCtrl.valueChanges
      .startWith(null)
      .map(player => this.filterPlayers(player));

    this.positionsCtrl = new FormControl();
    this.filteredPositions = this.positionsCtrl.valueChanges
      .startWith(null)
      .map(position => this.filterPositions(position));

    this.leaguesCtrl = new FormControl();
    this.filteredLeagues = this.leaguesCtrl.valueChanges
      .startWith(null)
      .map(leagues => this.filterLeagues(leagues));


  }

	/**
	 * Método executado logo após a criação do componente.
	 */
  ngOnInit() {
    this.transfermarket = new Transfermarket();
    this.playerService.listarTodos()
      .subscribe((players) => {
        this.players = players;
      });
    this.leagueService.listarTodos()
      .subscribe((leagues) => {
        this.leagues = leagues;
      });
    this.playerFilter.name = '';
    this.playerFilter.position = '';
    this.playerFilter.rating = 0;
    this.playerFilter.league = 0;

  }

  filterPlayers(val: string) {
    return val ? this.players.filter(s => new RegExp(`^${val}`, 'gi').test(s.name))
      : this.players;
  }

  filterPositions(val: string) {
    return val ? this.positions.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.positions;
  }

  filterLeagues(val: string) {
    return val ? this.leagues.filter(s => new RegExp(`^${val}`, 'gi').test(s.name))
      : this.leagues;
  }

  onInputStartPrice(event: any) {
    this.playerFilter.startValue = event.value;
  }

  onInputEndPrice(event: any) {
    this.playerFilter.endValue = event.value;
  }

  onInputRating(event: any) {
    this.playerFilter.rating = event.value;
  }
  check(filter: PlayerFilter): boolean {


    if ((filter.name.length === 0) &&
      (filter.position.length === 0) &&
      (filter.rating === 0) &&
      (filter.league === 0)) {
      return false;
    }
    return true;
  }

  findIdLeague(): number {
    let league : League;
    league = this.leagues.filter(leagues => leagues.name === this.leagueName)[0];
    return league.originalId;
  }

  filter(filterPlayer: PlayerFilter): NavigationExtras {
    let navextras: NavigationExtras = {
      queryParams: { "playerFilter": JSON.stringify(filterPlayer) }
    };
    return navextras;

  }

  onFilter(filterPlayer: PlayerFilter) {
    if (this.leagueName.length > 0){
      filterPlayer.league = this.findIdLeague();
    }

    if (this.check(filterPlayer)) {
      this.router.navigate(['/transfermarket/table'], this.filter(filterPlayer));
    } else {
      this.alertService.error('Informe pelo menos um filtro!');
    }
  }
}