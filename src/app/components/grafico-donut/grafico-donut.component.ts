import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-donut',
  templateUrl: './grafico-donut.component.html',
  styles: [
  ]
})
export class GraficoDonutComponent implements OnInit {
  @Input() doughnutChartData;
  @Input() doughnutChartLabels;
  @Input() doughnutChartType;
  @Input() leyenda;
  constructor() { }

  ngOnInit(): void {
  }

}
