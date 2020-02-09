import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../services';

@Component({
  templateUrl: './survey-declined.component.html',
  styleUrls: ['./survey-declined.component.css']
})
export class SurveyDeclinedComponent {
  noOfDecline: any;
  pageName: any;

  constructor(
    private _surveyService: SurveyService,
    private _router: Router
  ) {
    this.noOfDecline = this._surveyService.getNoOfDecline();
    if (this._surveyService.getDeclinePageName() === 'schedule') {
      this.pageName = 'DRO Schedule';
    } else {
      this.pageName = 'Dashboard';
    }
  }

  backToSchedule() {
    this._router.navigate(['/' + this._surveyService.getDeclinePageName()]);
  }
}
