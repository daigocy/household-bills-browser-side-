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
  chartData: number[][] = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  chartObject: Chart;

  constructor(public router: Router,
    public billService: BillService) { }

  ngOnInit() {
    this.createChart()
    this.getBills();

  }

  getBills() {
    this.billService.getBills().subscribe(bills => { this.bills = bills; this.refreshChart() });
  }
  getChartData() {
    this.chartData = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    this.total = 0;
    this.bills.forEach(bill => {
      this.chartData[bill.user][bill.category] += bill.cost;
      this.total += bill.cost;
    })
  }

  refreshChart() {
    this.getChartData();
    this.chartObject.data.datasets = [{
      label: '媛',
      data: this.chartData[0],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1
    },
    {
      label: '阳',
      data: this.chartData[1],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: '均摊',
      data: this.chartData[2],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
    this.chartObject.update();
  }

  createChart() {
    this.getChartData();
    let ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.chartObject = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["买菜做饭", "家具器件", "鞋帽衣裤", "零食饮料", "其他"],
        datasets: [{
          label: '媛',
          data: this.chartData[0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
        },
        {
          label: '阳',
          data: this.chartData[1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '均摊',
          data: this.chartData[2],
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
  delete(id: number) {

    this.billService.deleteBill(id).subscribe(
      _ => this.getBills()
    )
  }
}
