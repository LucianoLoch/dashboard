import { TransfermarketNameFilter } from './../transfermarket.pipe';
import { Player } from './../../player/player.model';
import { AlertService } from './../../util/alert.service';
import { TransfermarketService } from './../transfermarket.service';
import { Team } from './../../team/team.model';
import { PlayerFilter } from './../playerFilter.model';
import { BidinfoService } from './../../bidinfo/bidinfo.service';
import { PlayerService } from './../../player/player.service';
import { Bidinfo } from './../../bidinfo/bidinfo.model';
import { Transfermarket } from './../transfermarket.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-transfermarket-list',
  templateUrl: './transfermarket-list.component.html',
  styleUrls: ['./transfermarket-list.component.css']
})
export class TransfermarketListComponent implements OnInit {

  public timerSubscription: AnonymousSubscription;
  public playersSubscription: AnonymousSubscription;


  ticks = 20;
  public transfermarkets: Transfermarket[];
  public idExcluir: number;
  public pagina: number;
  public totalRegistros: number;
  public playerService: PlayerService;
  public bidinfoService: BidinfoService;
  public playerId: number;
  public bid: Bidinfo;
  public playerFilter: PlayerFilter;
  public team: Team;
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';


  constructor(public transfermarketService: TransfermarketService,
    public alertService: AlertService,
    _playerService: PlayerService,
    _bidinfoService: BidinfoService,
    public route: ActivatedRoute) {
    this.bidinfoService = _bidinfoService;

    this.route.queryParams.subscribe(params => {
      this.playerFilter = params["playerFilter"];
      console.log(this.playerFilter);
    });

  }

  public ngOnDestroy(): void {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }



  getPlayers(): Player[] {
    return [];
  }


  ngOnInit() {
    this.bid = new Bidinfo();
    this.loading = true;
    //this.transfermarkets = this.transfermarketService.listarFilter(this.playerFilter);
    this.refreshData();
    this.team = this.transfermarketService.getTeam();
    let timer = Observable.timer();
    timer.subscribe();


  }
  public filter: string = '';
  public nameFilter: string;
  public positionFilter: string;
  public ratingFilter: number;
  public bidValueFilter: number;
  public originalValueFilter: number;
  public hasBidFilter: boolean;
  public bidAprovedFilter: boolean;

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próximo',
    screenReaderPaginationLabel: 'Paginação',
    screenReaderPageLabel: 'pagina',
    screenReaderCurrentLabel: `Você está na página`
  };

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  public subscribeToData(): void {

    this.timerSubscription = Observable.timer(60000)
      .subscribe(() => this.refreshData());
  }

  public refreshData(): void {
    this.loading = true;

    this.playersSubscription = this.transfermarketService.listarFilterObservable(this.playerFilter).
      subscribe(
      (data: Transfermarket[]) => {
        this.transfermarkets = data;
       // this.filterRemove();
        this.loading = false;
        this.team = this.transfermarketService.getTeam();
        this.subscribeToData();
      },
      function (error) {

      },
      function () {

      }
      );

  }
  onRefresh() {
    this.bid = new Bidinfo();
    this.loading = true;
    this.transfermarkets = this.transfermarketService.listarFilter(this.playerFilter);
    this.loading = false;
  }

  check(transferMarket: Transfermarket): boolean {
    let mensagem: string = '';
    if (transferMarket.bidAproved) {
      mensagem = 'Você já está vencendo este leilão!';
    } else if (transferMarket.bidValue > transferMarket.team.budget) {
      mensagem = 'Você não possuí dinheiro suficiente. Lance: R$ ' + transferMarket.bidValue + ',00' +
        '. Em conta: R$' + transferMarket.team.budget + ',00';
    }

    if (mensagem.length > 0) {
      this.alertService.error(mensagem);
    }
    return mensagem.length === 0;

  }


  onBid(transferMarket: Transfermarket) {
    let bidInfo = new Bidinfo();


    bidInfo.bidValue = transferMarket.bidValue;
    bidInfo.originalValue = transferMarket.originalValue;
    bidInfo.teamID = transferMarket.teamId;
    bidInfo.playerID = transferMarket.idPlayer;

    if (this.check(transferMarket)) {
      this.loading = true;
      if (transferMarket.bidValue === this.transfermarketService.bid(transferMarket.rating)) {
        this.bidinfoService.initialBid(bidInfo)
          .subscribe(
          (res) => {
            this.loading = false;
            this.alertService.success('Lance efetuado com sucesso!', true);
          },
          (err) => {
            this.loading = false;
            this.alertService.error(err);
          });
      } else {
        this.bidinfoService.placeBid(bidInfo)
          .subscribe(
          (res) => {
            this.loading = false;
            this.alertService.success('Lance efetuado com sucesso!', true);
          },
          (err) => {
            this.loading = false;
            this.alertService.error(err);
          });
      }
    }
  }

  closeMarket() {
    this.bidinfoService.closeMarket()
      .subscribe(
      (res) => {
        this.alertService.success('Mercado fechado com sucesso!', true);
      },
      (err) => {
        this.alertService.error(err);
      });
  }

  filterRemove() {
  }




}

