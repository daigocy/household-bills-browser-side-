import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Bill, BillHistory} from './bill';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

let date1 = new Date();
date1.setFullYear(2018,4,24);
let date2 = new Date();
date2.setFullYear(2018,4,23);
let date3 = new Date();
date3.setFullYear(2018,4,22);

const bills: Bill[] = [
  {
    id: 1, name: '买菜', category: 0, desc: '买土豆，西红柿', cost: 10, user: 2,date: date1
  },
  {
    id: 2, name: '买眼罩', category: 4, desc: '买眼罩', cost: 15, user: 0,date: date1
  },
  {
    id: 3, name: '买菜', category: 0, desc: '买土豆，西红柿', cost: 15, user: 0,date: date2
  },
  {
    id: 4, name: '买菜', category: 0, desc: '买土豆，西红柿', cost: 12, user: 0,date: date3
  },
]
const billHistory:BillHistory[] = [
  { date: date1, bills: [
    {
    id: 1, name: '买菜', category: 0, desc: '买土豆，西红柿', cost: 10, user: 2,date: date1
  },
  {
    id: 2, name: '买眼罩', category: 4, desc: '买眼罩', cost: 15, user: 0,date: date1
  }],total: 25},
  { date: date2, bills: [
    {
    id: 3, name: '买菜', category: 0, desc: '买土豆，西红柿', cost: 15, user: 0,date: date2
  }],total: 15},
  { date: date3, bills: [
    {
    id: 4, name: '买菜', category: 0, desc: '买土豆，西红柿', cost: 12, user: 0,date: date3
  }],total:12}
] 


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private http: HttpClient
  ) { }
  private billsUrl: string = 'api/bills/';

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billsUrl).pipe(
      tap(bills => {console.log(bills)}),
    )
  }

  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(this.billsUrl +id).pipe(
      tap(b => {
        if(b) {
          b.date = new Date(b.date);
        }
      }),
    )
  }
  getBillHistory():Observable<BillHistory[]> {
    return of(billHistory);
  }
  postBill(bill:Bill):Observable<any> {
    return this.http.post(this.billsUrl, bill, httpOptions);
  }
  putBill(bill: Bill):Observable<any> {
    return this.http.put(this.billsUrl, bill, httpOptions);
  }
  deleteBill(bill:Bill | number):Observable<any> {
    let id = typeof bill === 'number'?bill:bill.id;
    return this.http.delete<any>(this.billsUrl +id, httpOptions);
  }
}
