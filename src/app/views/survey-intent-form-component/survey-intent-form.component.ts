import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import {
  ProgramService,
  SurveyService,
  EventEmitterService,
  DashboardService
} from "../../services";
import { RestApiService } from "../../rest-api-services";
import { PlatformLocation } from "@angular/common";

@Component({
  templateUrl: "./survey-intent-form.component.html",
  styleUrls: ["./survey-intent-form.component.css"]
})
export class SurveyIntentFormComponent implements OnInit, OnDestroy {
  content: any;
  declineConfirm = false;
  declineReasonlist: Object[] = [];
  subscribers: Subscription[] = [];
  showDeclineConfirmModal = false;
  reason: any;
  surveyDetail: any;
  dueByDate: number;
  offset = new Date().getTimezoneOffset() * 60000;

  constructor(
    private _dashboardService: DashboardService,
    private _eventEmitter: EventEmitterService,
    public _programService: ProgramService,
    private _router: Router,
    private _surveyService: SurveyService,
    private location: PlatformLocation
  ) {
    history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        history.go(1);
    };
  }

  ngOnInit() {
    this._eventEmitter.currentContent.subscribe(content => {
      if (
        (Object.keys(content).length &&
          this._router["url"].indexOf("intent") >= 0) ||
        this._router["url"].indexOf("adhoc-intent") >= 0 ||
        this._router["url"].indexOf("cro") >= 0
      ) {
        this.content = content;
        if (this._programService.isAdhoc()) {
          this.getAdhocData();
        } else if (this._programService.isCRO()) {
          this.getCroData();
        } else {
          this.getSurveyData();
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscribers.forEach(v => v.unsubscribe());
  }

  getCroData() {
    this._surveyService.getCroData().subscribe(
      survey => {
        this.surveyDetail = survey;
        this._programService.setSurveyType(survey["survey"]["type"]);
        const scheduleSession = this.surveyDetail["userSurveySession"][
          "scheduledSession"
        ];
        this.dueByDate = scheduleSession["endTime"];
      },
      error => {
        if (error["message"] == 404) {
          this._programService.setNoticeFlag(true);
          this._router.navigate(["404"]);
        }
      }
    );
  }

  getSurveyData() {
    this._surveyService.getSurveyData().subscribe(
      survey => {
        this.surveyDetail = survey;
        this._programService.setSurveyType(survey["survey"]["type"]);
        const scheduleSession = this.surveyDetail["userSurveySession"][
          "scheduledSession"
        ];
        this.dueByDate = scheduleSession["endTime"];
      },
      error => {
        if (error["message"] == 404) {
          this._programService.setNoticeFlag(true);
          this._router.navigate(["dashboard"]);
        }
      }
    );
  }

  getAdhocData() {
    this._surveyService.getAdhocData().subscribe(
      data => {
        this.surveyDetail = data;
        this._programService.setSurveyType(data["survey"]["type"]);
        const scheduleSession = this.surveyDetail["userSurveySession"][
          "scheduledSession"
        ];
        this.dueByDate = scheduleSession["endTime"];
      },
      error => {
        if (error["message"] === "404") {
          this._router.navigate(["expired"]);
        }
        if (error["message"] === "500") {
          this._router.navigate(["404"]);
        }
      }
    );
  }

  continueToSurvey() {
    if (this._programService.isAdhoc()) {
      this._router.navigate(["/adhoc-survey"]);
    } else if (this._programService.isCRO()) {
      this._router.navigate(["/cro-survey"]);
    } else {
      this._programService.setUserSurveySessionId(
        this.surveyDetail["userSurveySession"]["id"]
      );
      this._router.navigate(["/survey"]);
    }
  }

  declineParticipation() {
    this._surveyService.getDeclineReason().subscribe(response => {
      this.declineReasonlist = response;
      this.declineConfirm = true;
    });
  }

  cross() {
    this.declineConfirm = false;
  }

  confirmDeclination(selectedReason) {
    this.reason = selectedReason;
    this.showDeclineConfirmModal = true;
    this.declineConfirm = false;
  }

  confirmDecline() {
    this._surveyService
      .saveDeclineReason(
        this.reason,
        this.surveyDetail["userSurveySession"]["id"]
      )
      .subscribe(data => {
        if (data["message"] === "Success") {
          this._surveyService.setNoOfDecline("1");
          this._surveyService.setDeclinePageName("dashboard");
          this._dashboardService.clearCache();
          this._router.navigate(["/declined"]);
        }
      });
  }

  close() {
    this.showDeclineConfirmModal = false;
  }
}
