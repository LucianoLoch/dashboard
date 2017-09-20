import { LeagueService } from './../league.service';
import { AlertService } from './../../util/alert.service';
import { PlayerService } from './../../player/player.service';
import { TransfermarketService } from './../transfermarket.service';
import { League } from './../league.model';
import { Player } from './../../player/player.model';
import { Transfermarket } from './../transfermarket.model';
import { PlayerFilter, PlayerFilterAttributes } from './../playerFilter.model';
import { Component, ViewChild } from '@angular/core';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transfermarket-filter',
  templateUrl: './transfermarket-filter.component.html',
  styleUrls: ['./transfermarket-filter.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TransfermarketFilterComponent implements OnInit {

  public transfermarket: Transfermarket;
  public players: Array<Player> = [];
  public leagues: Array<League> = [];
  public playerFilter: PlayerFilter = new PlayerFilter();
  public playerAttributes = [
    { "name": 'Defending', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.defending', "value": "0" },
    { "name": 'Dribbling', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.dribbling', "value": "0" },
    { "name": 'Pace', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.pace', "value": "0" },
    { "name": 'Passing', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.passing', "value": "0" },
    { "name": 'Physical', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.physical', "value": "0" },
    { "name": 'Shooting', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.shooting', "value": "0" }
  ];
  public gkAttributes = [
    { "name": 'Kicking', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.kicking' },
    { "name": 'Speed ', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.speed' },
    { "name": 'Handling', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.handling' },
    { "name": 'Positioning', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.positioning' },
    { "name": 'Reflexes', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.reflexes' },
    { "name": 'Diving', "icon": "fa fa-star", attribute: 'this.playerFilter.attributes.diving' }

  ]
  public leagueName: String = '';
  public value: any = {};
  selectedValue: string;

  onInputAttribute(event: any, name: string) {
    if (name === "Defending") {
      this.onInputDefending(event);
      this.updateAttribute(name, event.value, 0)

    } else if (name = "Dribbling") {
      this.onInputDribbling(event);
      this.updateAttribute(name, event.value, 1)

    } else if (name === "Pace") {
      this.onInputPace(event);
      this.updateAttribute(name, event.value, 2)

    } else if (name = "Passing") {
      this.onInputPassing(event);
      this.updateAttribute(name, event.value, 3)

    } else if (name === "Physical") {
      this.onInputPhysical(event);
      this.updateAttribute(name, event.value, 4)

    } else if (name = "Shooting") {
      this.onInputShooting(event);
      this.updateAttribute(name, event.value, 5)
    }


  }



  public startPrice: number = 0;
  public endPrice: number = 0;
  public rating: number = 0;
  public attributes = new PlayerFilterAttributes();

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

    // Player Attributes 
    this.attributes.defending = 0;
    this.attributes.dribbling = 0;
    this.attributes.pace = 0;
    this.attributes.passing = 0;
    this.attributes.physical = 0;
    this.attributes.shooting = 0;
    this.attributes.kicking = 0;
    this.attributes.speed = 0;
    this.attributes.handling = 0;
    this.attributes.positioning = 0;
    this.attributes.reflexes = 0;
    this.attributes.diving = 0;

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

  onInputDefending(event: any) {
    this.attributes.defending = event.value;
  }
  onInputDribbling(event: any) {
    this.attributes.dribbling = event.value;
  }
  onInputPace(event: any) {
    this.attributes.pace = event.value;
  }
  onInputPassing(event: any) {
    this.attributes.passing = event.value;
  }
  onInputPhysical(event: any) {
    this.attributes.physical = event.value;
  }
  onInputShooting(event: any) {
    this.attributes.shooting = event.value;
  }
  onInputKicking(event: any) {
    this.attributes.kicking = event.value;
  }
  onInputSpeed(event: any) {
    this.attributes.speed = event.value;
  }
  onInputHandling(event: any) {
    this.attributes.handling = event.value;
  }
  onInputPositioning(event: any) {
    this.attributes.positioning = event.value;
  }
  onInputReflexes(event: any) {
    this.attributes.reflexes = event.value;
  }
  onInputDiving(event: any) {
    this.attributes.diving = event.value;
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
    let league: League;
    league = this.leagues.filter(leagues => leagues.name === this.leagueName)[0];
    return league.originalId;
  }

  updateAttribute(name: string, value: number, i: number) {
    console.log(name);
    let att: any;
    att = this.playerAttributes.find(pl => pl.name === name);
    console.log(att);
    att.value = value;
    this.playerAttributes[i] = att;
  }

  filter(filterPlayer: PlayerFilter): NavigationExtras {
    console.log('dsadsa');
    let navextras: NavigationExtras = {
      queryParams: { "playerFilter": JSON.stringify(filterPlayer) }
    };
    console.log(navextras);
    return navextras;

  }

  onFilter(filterPlayer: PlayerFilter) {
   // filterPlayer.attributes = this.attributes;
    if (this.leagueName.length > 0) {
      filterPlayer.league = this.findIdLeague();
    }

    if (this.check(filterPlayer)) {
      this.router.navigate(['/transfermarket/table'], this.filter(filterPlayer));
    } else {
      this.alertService.error('Informe pelo menos um filtro!');
    }
  }
}