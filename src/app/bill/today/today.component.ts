import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  bills: Bill[] = [];

  constructor(public billService: BillService) { }

  ngOnInit() {
    this.getBills();
    
  }

  getBills() {
    this.billService.getBills().subscribe(bills => {this.bills=bills;this.refreshChart()});
  }
  refreshChart() {
    let ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    let data = [0,0,0,0,0];
    this.bills.forEach(bill => {
      data[bill.category] += bill.cost;
    })
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["买菜做饭", "家具器件", "鞋帽衣裤", "零食饮料", "其他"],
        datasets: [{
          label: '今日消费',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
