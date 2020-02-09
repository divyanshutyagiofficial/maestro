import { OnInit, Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import { DashboardService, EventEmitterService, SurveyService, ProgramService } from '../../services';
import { RestApiService } from '../../rest-api-services';

@Component({
  templateUrl: './surveyschedule.component.html',
  styleUrls: ['./surveyschedule.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SurveyScheduleComponent implements OnInit {

  @ViewChild('selectAll') selectAll: ElementRef;
  surveyScheduleContent: Object = {};
  dashboardContent: Object = {};
  calenderSchedule: Object = {};
  content: Object = {};
  utcDay: any;
  declineConfirm = false;
  ConfirmDecline = false;
  declineSchedule: Object[] = [];
  declineReasonlist: Object[] = [];
  reason: any;
  errorMessage: any;
  surveySchedules: Object[];
  selectedDate: any;
  selectedDateDroCount: number = 0;
  surveySchedulesByDate: { number: Object[] };
  increment: number = 0;
  allSurvey: Object[];
  selectedSurveys = [];
  isDisabled: boolean = true;
  checkAll: boolean = false;
  loaded: boolean = false;
  storage: any = [];
  pageBank = [];
  currentPage: number = 0;

  constructor(
    private _dashboardService: DashboardService,
    private _eventEmitterService: EventEmitterService,
    private _router: Router,
    private _surveyService: SurveyService,
    public _restApiService: RestApiService,
    private _programService: ProgramService
  ) {
    this._eventEmitterService.currentContent.subscribe(content => {
      //this.allSurvey = [];
      this.selectedSurveys = [];
      this.calenderSchedule = {};
      this._programService.setExistingPages([]);
      this._programService.setExistingSchedule([]);
      this.getData(true);
    });
  }


  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length && this._router['url'].indexOf('schedule') >= 0) {
        this.selectedSurveys = [];
        this.calenderSchedule = {};
        this.content = content;
        this.surveyScheduleContent = content['survey_schedule'];
        this.dashboardContent = content['dashboard'];
        const offset = new Date().getTimezoneOffset() * 60000;
        let startTime = moment().day(0).startOf('day').unix() * 1000 - offset;
        let endTime = moment().day(0).startOf('day').add(13, 'days').add(86399, 'seconds').unix() * 1000 - offset;
        this.pageBank = this._programService.getExistingPages();
        this.storage = this._programService.getExistingSchedule();
        if (this.pageBank.includes(this.currentPage) === false) {
          this.pageBank.push(0);
        }
        if (this.storage.length == 0) {
          this.getData(false);
        } else {
          this.populate(this.storage);
          this.newSelectedDateModel();
          this.loaded = true;
        }
      }
    });
    this.selectedDate = new Date().setHours(0, 0, 0, 0);
  }

  getData(flag) {
    const offset = new Date().getTimezoneOffset() * 60000;
    let startTime = moment().day(0).startOf('day').unix() * 1000 - offset;
    let endTime = moment().day(0).startOf('day').add(13, 'days').add(86399, 'seconds').unix() * 1000 - offset;
    this._dashboardService.getSurveySchedule(startTime, endTime, flag).subscribe(scheduleDetails => {
      this.storage = scheduleDetails;
      console.log(this.storage)
      this.populate(this.storage);
      this.newSelectedDateModel();
      this.loaded = true;
    }, error => {
      this.loaded = true;
      this.storage = null;
    });
  }

  populate(surveys: Object[]): void {
    const that = this;
    this.allSurvey = surveys;
    this.calenderSchedule = {};
    if (surveys) {
      Observable.from(surveys).map(survey => {
        const selectedSurvey = survey['sessions'] && survey['sessions'].length && survey['sessions'][0];
        if (selectedSurvey) {
          selectedSurvey['isSelected'] = false;
        }
        return selectedSurvey;
      }).toArray().subscribe(survays => {
        console.log(5);
        console.log(surveys)
        console.log(survays);
        surveys.forEach(survey => {
          that.calenderSchedule[survey['date']] = survey['sessionCount'];
        });
      });
    }
  }

  newSelectedDateModel() {
    const offset = new Date().getTimezoneOffset() * 60000;
    const selectedDateInMillis = (new Date().setHours(0, 0, 0, 0) - offset);
    this.utcDay = moment(selectedDateInMillis).format('MMM Do YYYY');
    this.allSurvey.filter(item => item['date'] === selectedDateInMillis).map(survey => {
      this.selectedSurveys = survey['sessions'];
    });
    this.selectedDateDroCount = this.selectedSurveys && this.selectedSurveys.length || 0;
  }

  selectedDateModal(day: any) {
    this.selectedDate = day.date.valueOf();
    const offset = new Date().getTimezoneOffset() * 60000;
    const selectedDateInMillis = day.date.unix() * 1000 - offset;
    this.utcDay = moment(this.selectedDate).format('ll');
    this.allSurvey.filter((item) => item['date'] === selectedDateInMillis).map(survey => {
      this.selectedSurveys = survey['sessions'];
    });
    this.selectedDateDroCount = this.selectedSurveys && this.selectedSurveys.length || 0;
  }

  populateSchedule(day: any) {
    const offset = (new Date().getTimezoneOffset() * 60000);
    const start = moment(day);
    const endDay = start.add(13, 'days');
    this.calenderSchedule = {};
    this.increment = this.increment + 1;
    this.calenderSchedule[this.increment] = this.increment;
    let startDate = new Date(day._d).getTime();
    let endDate = startDate + 2 * 604800000; // adding two weeks
    if (this.pageBank.includes(this.currentPage) === false) {
      this.pageBank.push(this.currentPage);
      this._dashboardService.getSurveySchedule(startDate, endDate, true).subscribe(scheduleDetails => {
        this.storage = this.storage.concat(scheduleDetails);
        this.populate(this.storage);
        this._programService.setExistingSchedule(this.storage);
        this._programService.setExistingPages(this.pageBank);
      });
    }
    this.populate(this.storage);
  }

  checkUnCheckAll(event): void {
    this.checkAll = !this.checkAll;
    if (this.checkAll) {
      this.selectedSurveys.forEach(item => {
        if (item['userSession'].progressStatus === 'NOT_STARTED' && item['userSession'].isDeclined === false) {
          item['isSelected'] = true;
        }
      });
      this.isDisabled = false;
    } else {
      this.selectedSurveys.forEach(item => {
        if (item['userSession'].progressStatus === 'NOT_STARTED' && item['userSession'].isDeclined === false) {
          item['isSelected'] = false;
        }
      })
      this.isDisabled = true;
    }
  }

  declineModal() {
    this.declineSchedule = [];
    this.selectedSurveys.forEach(item => {
      if (item['isSelected'] && item['userSession']['percentageCompleted'] === 0
        && moment(Number(item['endTime'])).isSameOrAfter(new Date(), 'day')) {
        this.declineSchedule.push(item);
      }
    })
    if (this.declineSchedule.length > 0) {
      this._surveyService.getDeclineReason().subscribe((data) => {
        this.declineReasonlist = data;
      })
      this.declineConfirm = true;
    }
  }

  cross() {
    this.declineConfirm = false;
  }

  DeclineConfirm(selectedReason) {
    this.reason = selectedReason;
    this.ConfirmDecline = true;
    this.declineConfirm = false;
  }

  checkOne(i) {
    this.selectedSurveys[i]['isSelected'] = !this.selectedSurveys[i]['isSelected'];
    const count = this.selectedSurveys.filter(survey => { return survey['isSelected'] === true }).length;
    this.isDisabled = !count;
    this.selectAll.nativeElement.checked = false;
    this.checkAll = false;
  }

  confirm() {
    this._surveyService.saveDeclineReasonForSchedule(this.reason, this.declineSchedule).subscribe(data => {
      if (data['message'] === 'Success') {
        this._surveyService.setNoOfDecline(String(this.declineSchedule.length));
        this._surveyService.setDeclinePageName('schedule');
        this._dashboardService.clearCache();
        this._router.navigate(['/declined']);
      }
    });
  }

  close() {
    this.ConfirmDecline = false;
  }

  showSelect(): Boolean {
    const offset = (new Date().getTimezoneOffset() * 60000);
    const currentTime = (new Date()).toDateString();
    const selected = (new Date(this.selectedDate - offset)).toDateString();
    let cleanSurvey = this.selectedSurveys.filter(survey => {
      if (survey['userSession']) {
        return survey['userSession']['progressStatus'] === 'NOT_STARTED';
      }
    });
    return ((selected === currentTime) && (cleanSurvey.length > 1));
  }

  showDecline(): Boolean {
    const offset = (new Date().getTimezoneOffset() * 60000);
    const currentTime = (new Date()).toDateString();
    const selected = (new Date(this.selectedDate - offset)).toDateString();
    return (selected === currentTime);
  }

  loadDefault() {
    this.currentPage = 0;
    let day = { active: true, date: moment(), isSelected: true, isToday: true }
    const offset = new Date().getTimezoneOffset() * 60000;
    let startTime = moment().day(0).startOf('day').unix() * 1000 - offset;
    let endTime = moment().day(0).startOf('day').add(13, 'days').add(86399, 'seconds').unix() * 1000 - offset;
    if (!this.storage || this.storage == []) {
      this._dashboardService.getSurveySchedule(startTime, endTime, true).subscribe(scheduleDetails => {
        this.populate(this.storage);
        this.newSelectedDateModel();
        this.selectedDateModal(day);
        this.loaded = true;
      }, error => {
        this.loaded = true;
      });
    } else {
      this.populate(this.storage);
      this.newSelectedDateModel();
      this.selectedDateModal(day);
    }
  }

  getCurrentPage($event) {
    this.currentPage = $event;
  }
}
