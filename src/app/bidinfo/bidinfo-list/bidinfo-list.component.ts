import { TdLoadingService, TdDataTableService, IPageChangeEvent, ITdDataTableColumn, ITdDataTableSortChangeEvent, TdDataTableSortingOrder } from '@covalent/core';
import { AlertService } from './../../util/alert.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from './../../player/player.service';
import { TeamService } from './../../team/team.service';
import { BidinfoService } from './../bidinfo.service';
import { Player } from './../../player/player.model';
import { User } from './../../user/user.model';
import { Team } from './../../team/team.model';
import { Bidinfo, BidInfoRest } from './../bidinfo.model';
import { Component, OnInit } from '@angular/core';


const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);
@Component({
  selector: 'app-bidinfo-list',
  templateUrl: './bidinfo-list.component.html',
  styleUrls: ['./bidinfo-list.component.css']
})
export class BidinfoListComponent implements OnInit {


  public bidinfos : Bidinfo[];
  public msgErro: String;

  public columns: ITdDataTableColumn[] = [

    { name: 'id',  label: '#', hidden: true},
    { name: 'playerName',  label: 'Jogador', filter: true},
    { name: 'position',  label: 'Posição', filter: true},    
    { name: 'bidValue', label: 'Valor do Lance', filter: true, format: DECIMAL_FORMAT },
    { name: 'originalValue', label: 'Valor Original', filter: true, format: DECIMAL_FORMAT },
  ];
  public data: Bidinfo[] = [];
  public filteredData: any[] = this.data;
  public filteredTotal: number = this.data.length;
  public searchTerm: string = '';
  public selectedRows: any[] = [];
  public fromRow: number = 1;
  public currentPage: number = 1;
  public pageSize: number = 20;
  public bidinfoRest: BidInfoRest = {};
  public team = new Team();
  public sortBy: string = 'position';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  
  constructor(public bidinfoService: BidinfoService,
              public alertService: AlertService,
              public _loadingService: TdLoadingService,
              public _dataTableService: TdDataTableService){    
  }

  ngOnInit() {
    this.team = JSON.parse(sessionStorage.getItem('team'));
    this.getBidInfos();
  }

  getBidInfos(){
    this._loadingService.register('overlayStarSyntax');
    this.bidinfoService.buscarPorTeam(this.team.id,this.currentPage-1)
      .subscribe((bifinfos) => {
        this.bidinfoRest = bifinfos;
        this.data = this.bidinfoRest.content;        
        this._loadingService.resolve('overlayStarSyntax');
        this.filter();
      }, error => this.msgErro = error);   
  }

  
  filter(): void {
    let newData: any[] = this.data;
    
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData ? newData.length : 0;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    this.filteredData = newData;
    this.filteredTotal = newData.length;    
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.getBidInfos();
  }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

  onRefresh() {
    this.getBidInfos();
  }

 
}