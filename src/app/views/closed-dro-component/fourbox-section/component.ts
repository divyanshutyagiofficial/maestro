import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services';

@Component({
  selector: 'app-fourbox-section',
  templateUrl: './component.html',
  styleUrls: ['../closed-dro.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FourBoxSectionComponent implements OnInit {

  @Input() content: any;

  showFourBox: boolean = true;
  completed: number;
  declined: number;
  expire: number;
  avgdro: number;
  fromDate: number;

  constructor(
    private _dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this._dashboardService.getDashboard().subscribe(dashboard => {
      this.completed = dashboard['userSurveySummary'].completed;
      this.expire = dashboard['userSurveySummary'].expired;
      this.declined = dashboard['userSurveySummary'].declined;
      this.avgdro = dashboard['userSurveySummary'].averagePerWeek;
      this.fromDate = dashboard['userSurveySummary'].fromDate;
    });
  }

  toggleBox() {
    this.showFourBox = !this.showFourBox;
  };

}
