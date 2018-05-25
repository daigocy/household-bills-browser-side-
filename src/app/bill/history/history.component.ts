import { Component, OnInit } from '@angular/core';
import { BillHistory } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  billHistory: BillHistory[] = [];
  constructor(public billService: BillService) { }

  ngOnInit() {
    this.getBillHistory();
  }
  getBillHistory() {
    this.billService.getBillHistory().subscribe(
      billHistory => {
        this.billHistory = billHistory;
      }
    )
  }
}
