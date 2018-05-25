import { Component, OnInit } from '@angular/core';
import { Bill, BillHistory } from '../bill/bill';
import { BillService } from '../bill/bill.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  billHistory: BillHistory;
  constructor(public billService: BillService) { }

  ngOnInit() {
  }
  getBillHistory() {
  }
}
