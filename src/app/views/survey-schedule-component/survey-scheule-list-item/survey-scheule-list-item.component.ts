import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService, ProgramService } from '../../../services';
import * as moment from 'moment';

@Component({
  selector: 'app-survey-schedule-list-item',
  templateUrl: './survey-scheule-list-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SurveyScheuleListItemComponent implements OnInit {
  @Input() surveySchedule: any;
  @Input() content: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  localEndTime: any;
  showButton: boolean;
  isDisabled: any = true;

  constructor(
    private _router: Router,
    private _surveyService: SurveyService,
    private _programService: ProgramService
  ) { }

  ngOnInit() {
    const offset = new Date().getTimezoneOffset() * 60000;
    const utcDate = moment.utc(this.surveySchedule['endTime'] + offset);
    this.localEndTime = utcDate.local();
  }

  goToSurvey(userSurveySessionId: number) {
    this._surveyService.clearCache();
    this._programService.setSurveyType('General');
    this._programService.setUserSurveySessionId(userSurveySessionId);
    if (this.surveySchedule['userSession']['percentageCompleted'] === 0) {
      this._router.navigate(['/intent']);
    } else {
      this._router.navigate(['/survey']);
    }
  }

  isEnable(): boolean {
    return this._surveyService.isButtonEnabled(this.surveySchedule, true);
  }

  isCheckBox(): boolean {
    return this._surveyService.isButtonEnabled(this.surveySchedule, false);
  }

  isExpired(): boolean {
    const now: any = moment();
    this.showButton = false;
    if (this.surveySchedule['userSession'] != null) {
      const offset = new Date().getTimezoneOffset() * 60000;
      const startUtcDate = moment.utc(this.surveySchedule['startTime'] + offset);
      const endUtcDate = moment.utc(this.surveySchedule['endTime'] + offset);
      const startLocalDate = startUtcDate.local();
      const endLocalDate = endUtcDate.local();
      const expired = this.surveySchedule['userSession']['progressStatus'] === 'EXPIRED';
      if (endUtcDate.diff(now) < 0 && expired) {
        this.showButton = true;
        document.getElementById('selectAll').style.display = 'block';
      }
    }
    return this.showButton;
  }

  getPercent(p) {
    return Math.abs(p) + '%';
  }

  check() {
    this.onSelect.emit();
  }
}
