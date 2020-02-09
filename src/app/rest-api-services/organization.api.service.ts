import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import API_URL from '../util/api-url';
import { RestApiService } from './rest.api.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class OrganizationApiService {

    bodyContentForLanguage: Object;
    orgConfig: Object;
    supportedLanguages: Observable<any>;
    systemInfo: any;
    adhocDetails: Object;
    surveyDetails: Object;
    adhocSurveyDetails: Object;
    declineReasons: Observable<any>;
    croDetails: Object;

    constructor(private _http: Http, private _restApiService: RestApiService, private _router: Router) { }


    validateCode(clientCode: string, programCode: string, languageCode: string): Observable<any> {
        if (!this.systemInfo) {
            this.systemInfo = this._restApiService.get(API_URL.ORGANIZATION.VALIDATECODE(clientCode, programCode, languageCode))
                .map(response => response.json())
                .publishReplay(1)
                .refCount();
        }
        return this.systemInfo;
    }

    validateAdhocToken(payload: Object): Observable<any> {
        this.adhocDetails = this.adhocDetails || {};
        const url = API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.VALIDATEADHOC;
        if (!this.adhocDetails[payload['adhocToken']]) {
            this.adhocDetails[payload['adhocToken']] = this._restApiService.post(url, payload)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.adhocDetails[payload['adhocToken']];
    }

    validateCroToken(payload: Object): Observable<any> {
        this.croDetails = this.croDetails || {};
        const url = API_URL.USER_SURVEY.ROOT + API_URL.USER_SURVEY.VALIDATECRO;
        if (!this.croDetails[payload['croToken']]) {
            this.croDetails[payload['croToken']] = this._restApiService.post(url, payload)
                .map(this._restApiService.handleResponse)
                .publishReplay(1).refCount();
        }
        return this.croDetails[payload['croToken']];
    }

    getBodyContentForLanguage(languageCode: string): Observable<any> {
        this.bodyContentForLanguage = this.bodyContentForLanguage || {};
        if (!this.bodyContentForLanguage[languageCode]) {
            this.bodyContentForLanguage[languageCode] = this._http.get(API_URL.GET_BODY_CONTENT(languageCode))
                .map(response => response.json())
                .catch(error => {
                    return Observable.throw(new Error(error.status));
                }).publishReplay(1)
                .refCount();
        }
        return this.bodyContentForLanguage[languageCode];
    }

    getSupportedLanguages(orgId: string): Observable<any> {
        if (!this.supportedLanguages) {
            this.supportedLanguages = this._restApiService.get(API_URL.MASTER_DATA.LANGUAGE(orgId))
                .map(this._restApiService.handleResponse)
                .catch(this._restApiService.handleError)
                .publishReplay(1).refCount();
        }
        return this.supportedLanguages;
    }

    getOrganizationConfig(orgId: string, languageCode: string): Observable<any> {
        this.orgConfig = this.orgConfig || {};
        this.orgConfig[orgId] = this.orgConfig[orgId] || {};
        if (!this.orgConfig[orgId][languageCode]) {
            this.orgConfig[orgId][languageCode] = this._restApiService.get(API_URL.ORGANIZATION.CONFIG(orgId, languageCode))
                .map(this._restApiService.handleResponse)
                .catch(this._restApiService.handleError)
                .publishReplay(1).refCount();
        }
        return this.orgConfig[orgId][languageCode];
    }
}
