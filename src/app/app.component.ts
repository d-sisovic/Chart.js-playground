import { map, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgChartsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @ViewChildren(BaseChartDirective) chartElements!: QueryList<BaseChartDirective>;

  public labels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];

  public pieLabels: string[] = [
    'Red',
    'Blue',
    'Yellow'
  ];

  public datasets = [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderWidth: 1
    },
    {
      label: 'My Second Dataset',
      data: [5, 10, 15, 20, 15, 10, 5],
      borderWidth: 1
    }
  ];

  public singleDataset = [
    {
      label: 'Update dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderWidth: 1
    }
  ];

  public pieDataset = [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 40
  }];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  public pieOptions: ChartOptions<'pie'> = {
    responsive: false
  };

  public chartLegend = true;

  public ngOnInit(): void {
    this.updateLineChartEvery10Seconds();
  }

  private updateLineChartEvery10Seconds(): void {
    timer(0, 10_000)
      .pipe(map(() => Array.from({ length: 10 }).map(() => this.getRandomNumberBetween1And100)))
      .subscribe(newValues => {
        const chartReference = [...this.chartElements][1];

        (chartReference.datasets as ChartDataset<any>)[0].data = newValues;
        chartReference.update();
      });
  }

  private get getRandomNumberBetween1And100(): number {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  }
}
