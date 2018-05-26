import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  bills: Bill[] = [];
  total: number = 0;

  constructor(public router: Router,
    public billService: BillService) { }

  ngOnInit() {
    this.getBills();

  }

  getBills() {
    this.billService.getBills().subscribe(bills => { this.bills = bills; this.refreshChart() });
  }
  refreshChart() {
    let ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    let data = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    this.bills.forEach(bill => {
      data[bill.user][bill.category] += bill.cost;
      this.total += bill.cost;
    })
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["买菜做饭", "家具器件", "鞋帽衣裤", "零食饮料", "其他"],
        datasets: [{
          label: '媛',
          data: data[0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
        },
        {
          label: '阳',
          data: data[1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '均摊',
          data: data[2],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }
        ]
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
  update(id: number) {
    this.router.navigateByUrl('/today/'+id);
  }
}
