import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import  {Location } from '@angular/common';

import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  bill: Bill = new Bill(-1,'',0,'',0,0,new Date());

  constructor(public activatedRoute: ActivatedRoute,
    public billService: BillService,
    private location: Location) { }

  ngOnInit() {
    let date = new Date();
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      if(id) {
        this.getBill(id);
      }
    })
  }
  getBill(id: number) {
    this.billService.getBill(id).subscribe((bill: Bill) => {
      this.bill = bill;
    })
  }
}
