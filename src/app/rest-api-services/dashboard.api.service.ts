import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import API_URL from '../util/api-url';
import { RestApiService } from './rest.api.service';
import 'rxjs/Rx';

@Injectable()
export class DashboardApiService {

    private dashboardDetails: any;
    private timelineDetails: any;
    private droData: Object;
    private scheduleDetails: Object;

    constructor(private _restApiService: RestApiService) { }

    getDashboard(dashboardInput: Object): Observable<any> {
        if (!this.dashboardDetails) {
            this.dashboardDetails = this._restApiService.post(API_URL.USER.ROOT + API_URL.USER.DASHBOARDDATA, dashboardInput)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.dashboardDetails;
    }

    getDroData(droDataInput: Object, clearCache?: boolean): Observable<any> {
        if (clearCache) {
            this.droData = null;
        }
        this.droData = this.droData || {};
        if (!this.droData[droDataInput['language']]) {
            this.droData[droDataInput['language']] = this._restApiService.post(API_URL.USER.ROOT + API_URL.USER.DRODATA, droDataInput)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.droData[droDataInput['language']];
    }

    getTimeline(timelineInput: Object, flag: boolean): Observable<any> {
        console.log(flag);
        if (!this.timelineDetails || flag) {
            this.timelineDetails = this._restApiService.post(API_URL.USER.ROOT + API_URL.USER.USERTIMELINE, timelineInput)
                .map(this._restApiService.handleResponse)
                .publishReplay(1)
                .refCount();
        }
        return this.timelineDetails;
    }

    getSurveySchedule(scheduleInput: Object, flag: boolean): Observable<any> {
        this.scheduleDetails = this.scheduleDetails || {};
        const url = API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.CALENDARSCHEDULES;
        if (!this.scheduleDetails[scheduleInput['language']] || flag) {
            this.scheduleDetails[scheduleInput['language']] = this._restApiService.post(url, scheduleInput)
                .map(this._restApiService.handleResponse)
                .publishReplay(1)
                .refCount();
        }
        return this.scheduleDetails[scheduleInput['language']];
    }

    clearCache() {
        this.dashboardDetails = null;
        this.timelineDetails = null;
        this.droData = null;
        this.scheduleDetails = null;
    }
}
