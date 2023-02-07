import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
import { ApexNonAxisChartSeries } from 'ng-apexcharts';
import { ApexChart } from 'ng-apexcharts/public_api';
import { Subscription } from 'rxjs';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  charts = this.dashboardSrv.getCharts();
  chart1: any;
  chart2: any;

  chartSeries: ApexNonAxisChartSeries=[40,32,28,55];

  chartDetails: ApexChart={
    type: 'pie',
    toolbar: {
      show: true
    }
  }
  stats = this.dashboardSrv.getStats();

  notifySubscription!: Subscription;

  constructor(
    private ngZone: NgZone,
    private dashboardSrv: DashboardService,
  ) {}

  ngOnInit() {
    
  }

  ngOnDestroy() {
    if (this.chart1) {
      this.chart1?.destroy();
    }
    if (this.chart2) {
      this.chart2?.destroy();
    }

    this.notifySubscription.unsubscribe();
  }

  
}