import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import API_URL from '../util/api-url';
import { RestApiService } from './rest.api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RequestOptions, ResponseContentType } from '@angular/http';

@Injectable()
export class SurveyApiService {
    private adhocDetails: Object;
    private surveyDetails: Object;
    private adhocSurveyDetails: Object;
    private declineReasons: Observable<any>;
    private calendarData: Observable<any>;

    constructor(private _restApiService: RestApiService) { }

    getSurveyData(payload: Object): Observable<any> {
        this.surveyDetails = this.surveyDetails || {};
        this.surveyDetails[payload['userSurveySessionId']] = this.surveyDetails[payload['userSurveySessionId']] || {};
        const url = API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.SURVEY;
        if (!this.surveyDetails[payload['userSurveySessionId']][payload['language']]) {
            this.surveyDetails[payload['userSurveySessionId']][payload['language']] = this._restApiService.post(url, payload)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.surveyDetails[payload['userSurveySessionId']][payload['language']];
    }

    getAdhocData(payload: Object): Observable<any> {
        this.adhocSurveyDetails = this.adhocSurveyDetails || {};
        const url = API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.ADHOC;
        if (!this.adhocSurveyDetails[payload['language']]) {
            this.adhocSurveyDetails[payload['language']] = this._restApiService.post(url, payload)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.adhocSurveyDetails[payload['language']];
    }

    getCROData(payload: Object): Observable<any> {
        this.adhocSurveyDetails = this.adhocSurveyDetails || {};
        const url = API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.CRO;
        if (!this.adhocSurveyDetails[payload['language']]) {
            this.adhocSurveyDetails[payload['language']] = this._restApiService.post(url, payload)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.adhocSurveyDetails[payload['language']];
    }

    getCalendar(params: string, flag: boolean) {
        if (!this.calendarData || flag) {
            this.calendarData = this._restApiService.get(API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.GETCALENDER + '/' + params)
                .publishReplay(1)
                .refCount();
        }
        return this.calendarData;
    }

    getDeclineReason(languageCode: String): Observable<any> {
        if (!this.declineReasons) {
            this.declineReasons = this._restApiService.get(API_URL.DECLINE.ROOT + '/' + languageCode)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.declineReasons;
    }

    saveDeclineReason(payload: Object): Observable<any> {
        return this._restApiService.post(API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.DECLINE, payload)
            .map(this._restApiService.handleResponse)
    }

    saveSurveyData(payload: any, source? :string): Observable<any> {
        return this._restApiService.post(API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.SAVESURVEY, payload, source)
            .map(this._restApiService.handleResponse)
    }

    uploadFile(payload): Observable<any> {
        return this._restApiService.upload(API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.UPLOAD_FILES, payload).map(this._restApiService.handleResponse);
        //return this._http.post(/*API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.UPLOAD_FILES*/ 'http://192.168.1.8:4000/upload', payload).map(this._restApiService.handleResponse);
    }

    getFile(fileId): Observable<any> {
        return this._restApiService.getFile(API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.GET_FILE + '/' + fileId).map((res: Response) => {  return { file: res.blob(), mimeType: res } });
    }

    clearCache() {
        this.surveyDetails = null;
        this.declineReasons = null;
        this.adhocSurveyDetails = null;
    }
}
