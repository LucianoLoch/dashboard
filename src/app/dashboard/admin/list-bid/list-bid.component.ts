import { BidinfoService } from './../../../bidinfo/bidinfo.service';
import { BidInfo } from './../../../bidinfo/bid-info';
import { TeamService } from './../../../team/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bid',
  templateUrl: './list-bid.component.html',
  styleUrls: ['./list-bid.component.css']
})
export class ListBidComponent implements OnInit {

  public bids : Array<BidInfo> = []; 
  public msgErro : string;

  constructor(public bidinfoService : BidinfoService) { }

  ngOnInit() {
    this.bidinfoService.listarTodosBids()
      .subscribe((bids) => {
        this.bids = bids
      }, error => this.msgErro = error);

  }
}