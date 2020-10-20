import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserChart } from 'src/app/model/user-chart';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  userChart: UserChart = new UserChart();

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salary' }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadChart().subscribe(
      data => {
        this.userChart = data;

        let salaries = JSON.parse('[' + this.userChart.salary + ']');
        this.barChartLabels = this.userChart.name.split(',');
        this.barChartData = [
          { data: salaries, label: 'Salary' }
        ];
      },
      error => { alert('Error ao carregar grafico') }
    );
  }
}
