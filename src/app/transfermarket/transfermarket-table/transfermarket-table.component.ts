import { TeamService } from './../../team/team.service';
import { BidinfoService } from './../../bidinfo/bidinfo.service';
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
import { Bidinfo } from './../../bidinfo/bidinfo.model';
import { Transfermarket, TransfermarketRest } from './../transfermarket.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
import { PaginationInstance } from 'ngx-pagination';
import { IPageChangeEvent } from '@covalent/core';
import { MdSlideToggle } from '@angular/material';



import {
    TdDataTableService,
    TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent,
    ITdDataTableColumn,
    TdDataTableComponent,
    TdLoadingService
} from '@covalent/core';


@Component({
    selector: 'app-transfermarket-table',
    templateUrl: './transfermarket-table.component.html',
    styleUrls: ['./transfermarket-table.component.css']
})
export class TransfermarketTableComponent implements OnInit {

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Jogador', tooltip: 'Nome do Jogador' },
        { name: 'rating', label: 'Rating' },
        { name: 'position', label: 'Posição' },
        { name: 'bidValue', label: 'Lance', numeric: true, filter: true },
        { name: 'originalValue', label: 'Lance Inicial', numeric: true, filter: true },
        { name: 'hasBid', label: 'Tem Lance', filter: true },
        { name: 'bidAproved', label: 'Lance Aprovado', filter: true },
        { name: 'attribute', label: 'Atributos' },
        { name: 'bid', label: 'Lance' },

    ];

    data: Transfermarket[] = [];
    filteredData: Transfermarket[] = this.data;
    filteredTotal: number = this.data.length;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 20;
    sortBy: string = 'rating';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
    overlayStarSyntax: boolean = false;

    public bid: Bidinfo;
    public playerFilter: PlayerFilter;
    public team: Team;
    public transfermarketRest: TransfermarketRest = {};

    constructor(
        public _dataTableService: TdDataTableService,
        public transfermarketService: TransfermarketService,
        public alertService: AlertService,
        public route: ActivatedRoute,
        public dialog: MdDialog,
        public bidinfoService: BidinfoService,
        public teamService: TeamService,
        public _loadingService: TdLoadingService) {

        this.transfermarketRest.transfermarkets = [];

        this.route.queryParams.subscribe(params => {
            this.playerFilter = params["playerFilter"];
        });

    }



    getTransfermarket() {
        this._loadingService.register('overlayStarSyntax');

        let promise = this.transfermarketService.listarFilter2(this.playerFilter, this.currentPage - 1);

        promise.then((transferMarket) => {
            this.transfermarketRest = transferMarket;
            this.data = this.transfermarketRest.transfermarkets;
            this.team = this.transfermarketService.getTeam();
            this.filter();
     //       this._loadingService.resolve('overlayStarSyntax');
        })
    }

    ngOnInit() {
        this.bid = new Bidinfo();
        this.getTransfermarket();
    }

    /* Table Functions */


    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.fromRow = 1;
        this.currentPage = 1;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.getTransfermarket();
    }

    filter(): void {
        let newData: any[] = this.data;
        newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        this.filteredTotal = newData ? newData.length : 0;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        this.filteredData = newData;
    }

    getRatingColor(attribute: number) {
        if (attribute >= 75) {
            return 'rating-75-99'
        } else if (attribute >= 65) {
            return 'rating-65-74'
        } else if (attribute < 65) {
            return 'rating-1-64'
        }
    }


    onRefresh() {
        this.bid = new Bidinfo();
        this.getTransfermarket();
        this.filter();
    }

    check(transferMarket: Transfermarket): Promise<string> {
        return new Promise((resolve, reject) => {
            let mensagem: string = '';

            if (transferMarket.bidAproved) {
                mensagem = 'Você já está vencendo este leilão!';
                resolve(mensagem);
            } else {

                this.teamService.buscarPorIdUser(this.team.idUser)
                    .subscribe((team) => {
                        console.log(team);
                        this.team = team;
                        console.log('Bid Value: ' + transferMarket.bidValue);
                        console.log('Team Bid: ' + this.team.budget);
                        if (transferMarket.bidValue > this.team.budget) {
                            mensagem = 'Você não possuí dinheiro suficiente. Lance: R$ ' + transferMarket.bidValue + ',00' +
                                '. Dinheiro Disponível: R$' + this.team.budget + ',00';
                        }
                        resolve(mensagem);
                    });
            }
        });
    }


    onBid(transferMarket: Transfermarket) {
        let bidInfo = new Bidinfo();
        bidInfo.bidValue = transferMarket.bidValue;
        bidInfo.originalValue = transferMarket.originalValue;
        bidInfo.teamID = transferMarket.teamId;
        bidInfo.playerID = transferMarket.idPlayer;
        let promise = this.check(transferMarket);

        promise.then((check) => {
            console.log(check);
            this._loadingService.register('replaceTemplateSyntax');

            if (check.length === 0) {
                if (transferMarket.bidValue === this.transfermarketService.bid(transferMarket.rating)) {
                    this.bidinfoService.initialBid(bidInfo)
                        .subscribe(
                        (res) => {
                            this.alertService.success('Lance efetuado com sucesso!', true);
                            this._loadingService.resolve('replaceTemplateSyntax');
                            this.onRefresh();
                        },
                        (err) => {
                            this._loadingService.resolve('replaceTemplateSyntax');
                            this.alertService.error(err);
                        });
                } else {
                    this.bidinfoService.placeBid(bidInfo)
                        .subscribe(
                        (res) => {
                            this.alertService.success('Lance efetuado com sucesso!', true);
                            this._loadingService.resolve('replaceTemplateSyntax');
                            this.onRefresh();
                        },
                        (err) => {
                            this._loadingService.resolve('replaceTemplateSyntax');
                            this.alertService.error(err);

                        });
                }

            } else {
                 this.alertService.error(check);
            }

        });
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
        this.dialog.open(TransfermarketAttributesComponent, {
            width: '600px',
            height: '400px',
            data: {
                player: transferMarket.player,
            }
        });
    }
}