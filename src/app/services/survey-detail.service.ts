import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { SurveyService } from "./survey.service";
import { SurveyApiService } from "../rest-api-services";
import { SurveyDetailData } from "../views/survey-detail-component/surveyDetailData";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { DashboardService } from "./dashboard.service";
import { ProgramService } from "./program.service";

@Injectable()
export class SurveyDetailService {
  private offset = new Date().getTimezoneOffset() * 60000;
  constructor(
    private surveyService: SurveyService,
    private _surveyApiService: SurveyApiService,
    private surveyDetailData: SurveyDetailData,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dashboardService: DashboardService,
    private _programService: ProgramService
  ) {}

  getAdhocData(): Observable<any> {
    return this.surveyService.getAdhocData().map(res => res);
  }

  getSurveyData(): Observable<any> {
    return this.surveyService.getSurveyData().map(res => res);
  }

  getCroData(): Observable<any> {
    return this.surveyService.getCroData().map(res => res);
  }

  postSurveyData(
    data,
    progressStatus,
    endTime,
    percentageComplete,
    timeSpent,
    lastAnswerPageId,
    startTime,
    navArray,
    newStorage
  ): Observable<any> {
    let response = {
      id: data.userSurveySession.id,
      programSurveyId: data.userSurveySession.programSurveyId,
      programUserID: data.userSurveySession.programUserID,
      userSurveySessionDetail: {
        id: data.userSurveySession.id,
        progressStatus: progressStatus,
        percentageComplete: percentageComplete,
        startTime: startTime,
        endTime: endTime,
        lastSubmissionTime:
          data.userSurveySession.userSurveySessionDetail.lastSubmissionTime,
        timeSpent: timeSpent,
        lastAnswerPageId: lastAnswerPageId,
        declined: false
      },
      scheduledSession: data.userSurveySession.scheduledSession,
      pageNavigations: navArray,
      userAnswerLogs: newStorage,
      unscheduled: false
    };
    return this._surveyApiService
      .saveSurveyData(
        response,
        this._programService.isCRO() == true ? "ADMIN" : undefined
      )
      .map(res => res);
  }
}
