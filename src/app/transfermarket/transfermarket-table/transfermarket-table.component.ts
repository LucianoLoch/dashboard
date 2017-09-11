import { TransfermarketAttributesComponent } from './../transfermarket-attributes/transfermarket-attributes.component';
import { PlayerAttributes } from './../../player/playerAttributes.model';
import { MdDialog } from '@angular/material';
import { BidInfo } from './../../bidinfo/bid-info';
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
import { IPageChangeEvent } from '@covalent/core';



import {
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  ITdDataTableColumn
} from '@covalent/core';



@Component({
  selector: 'app-transfermarket-table',
  templateUrl: './transfermarket-table.component.html',
  styleUrls: ['./transfermarket-table.component.css']
})
export class TransfermarketTableComponent implements OnInit {
  
  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Jogador', tooltip: '' },
    { name: 'rating', label: 'Rating' },   
    { name: 'position', label: 'Posição' },
    { name: 'bidValue', label: 'Lance', numeric: true, filter: true },
    { name: 'originalValue', label: 'Lance Inicial', numeric: true, filter: true },
    { name: 'hasBid', label: 'Tem Lance', filter: true },
    { name: 'bidAproved', label: 'Lance Aprovado', filter: true },
    { name: 'attribute', label: 'Atributos'},
    { name: 'bid', label: 'Lance'},
    
  ];
  filteredData: any[]; ;
  filteredTotal: number; 

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'name';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  public timerSubscription: AnonymousSubscription;
  public playersSubscription: AnonymousSubscription;


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
    public route: ActivatedRoute,
    public _dataTableService: TdDataTableService,
    public dialog: MdDialog) {
    this.bidinfoService = _bidinfoService;

    this.route.queryParams.subscribe(params => {
      this.playerFilter = params["playerFilter"];
    });
  }


  ngOnInit() {
    this.bid = new Bidinfo();
    this.loading = true;
    this.transfermarkets = this.transfermarketService.listarFilter(this.playerFilter,0);
    this.refreshData(true);
    this.team = this.transfermarketService.getTeam();
  }

  public ngOnDestroy(): void {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {  
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.transfermarkets;
    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  public subscribeToData(): void {
    this.timerSubscription = Observable.timer(60000)
      .subscribe(() => this.refreshData(false));
  }

  public refreshData(firtsTime : Boolean): void {
    this.loading = true;

    this.playersSubscription = this.transfermarketService.listarFilterObservable(this.playerFilter).
      subscribe(
      (data: Transfermarket[]) => { 
        
        this.loading = false;
        this.team = this.transfermarketService.getTeam();
        this.transfermarkets = data;
        this.filter();
        //this.filteredData = this.transfermarkets;
        //this.filteredTotal = this.transfermarkets.length;
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
    this.transfermarkets = this.transfermarketService.listarFilter(this.playerFilter, 0);
    this.filter();
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

  openDialog(transferMarket: Transfermarket) {
    console.log(transferMarket);
    this.dialog.open(TransfermarketAttributesComponent, {
     width: '600px',
     height: '400px',
     data: {
        attributes: transferMarket.attributes,
        name: transferMarket.name,
        rating: transferMarket.rating,
        position: transferMarket.position
      }
    });
  }

  change(event: IPageChangeEvent): void {
   // ...
  }



}