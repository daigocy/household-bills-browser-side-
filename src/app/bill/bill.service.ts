import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Bill, BillHistory} from './bill';

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

  constructor() { }
  getBills(): Observable<Bill[]> {
    return of(bills);
  }

  getBill(id: number): Observable<Bill> {
    return of(bills.filter(bill => {return bill.id==id})[0]);
  }
  getBillHistory():Observable<BillHistory[]> {
    return of(billHistory);
  }
}
