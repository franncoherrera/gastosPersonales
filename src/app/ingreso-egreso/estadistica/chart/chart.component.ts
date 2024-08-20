import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  totalIngresos = input.required<number>();
  totalEgresos = input.required<number>();
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    Chart.register(...registerables);
  }
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [0, 0] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [this.totalIngresos(), this.totalEgresos()] }],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalIngresos'] || changes['totalEgresos']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [this.totalIngresos(), this.totalEgresos()] }],
    };
  }
}
