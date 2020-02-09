import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs/Rx";
import { DashboardService } from "../../services/dashboard.service";
import { EventEmitterService } from "../../services/event-emitter.service";
import { ProgramService } from "../../services/program.service";
import { ViewMessageService } from "../../services/view-message-service";
import { SurveyService, UserService } from "../../services";
import { RestApiService } from "../../rest-api-services";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardDetails: any;
  languageContent: Object;
  dashboardContent: string[] = [];
  unreadMessages = [];
  content: Object;
  showModal: boolean = false;
  bannerSurveys: Object[];
  complianceLevel: number;
  showMore: boolean = true;
  timelineData: any = [];
  studyInfo: any;
  notify: Function = null;
  subscribers: Subscription[] = [];
  fromRow = 1;
  toRow = 10;
  loaded: boolean = false;
  errorFlag: boolean = this._restApiService.getErrorFlag();
  noticeFlag: boolean = this._programService.getNoticeFlag();

  adDetails = {
    addLinks: [
      {
        order: 1,
        type: "image",
        value: "assets/img/img1.jpg"
      },
      {
        order: 2,
        type: "image",
        value: "assets/img/img2.jpg"
      },
      {
        order: 3,
        type: "image",
        value: "assets/img/img3.jpg"
      }
    ]
  };

  constructor(
    private _dashboardService: DashboardService,
    private _eventEmitterService: EventEmitterService,
    private _router: Router,
    private _programService: ProgramService,
    private _viewMessageService: ViewMessageService,
    private _surveyService: SurveyService,
    public _restApiService: RestApiService,
    private _userService: UserService,
    private location: LocationStrategy
  ) {
    const viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      viewportmeta.setAttribute(
        "content",
        "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0"
      );
      window.addEventListener(
        "scroll",
        function() {
          viewportmeta.setAttribute(
            "content",
            "width=device-width, minimum-scale=1.0, maximum-scale=2.0"
          );
        },
        false
      );
    }
    window.history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      window.history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (
        Object.keys(content).length &&
        this._router["url"].indexOf("dashboard") >= 0
      ) {
        this.timelineData = [];
        this.languageContent = content;
        this.dashboardContent = content["dashboard"];
        const serviceCalls = [
          this._dashboardService.getDashboard().catch(error => {
            alert(this.languageContent["error_messages"]["1"]);
            this._userService.logout().subscribe(response => {
              this._router.navigate([
                sessionStorage.getItem("clientCode") +
                  "/" +
                  sessionStorage.getItem("programCode") +
                  "/welcome"
              ]);
            });
            return Observable.of(null);
          }),
          this._viewMessageService
            .getMessage()
            .catch(error => Observable.of(null)),
          this._dashboardService
            .getTimeline(0, this.toRow, false)
            .catch(error => Observable.of(null)),
          this._programService
            .getOrganizationConfig()
            .catch(error => Observable.of(null))
        ];
        Observable.forkJoin(serviceCalls).subscribe(
          responses => {
            this.dashboardDetails = responses[0];
            const surveySummary = this.dashboardDetails["userSurveySummary"];
            if (surveySummary["completed"] && surveySummary["assigned"]) {
              this.complianceLevel =
                (surveySummary["completed"] / surveySummary["assigned"]) * 100;
            }
            this.bannerSurveys = this._dashboardService.getBannerSurveys(
              this.dashboardDetails
            );
            this.getTimeline(responses[2]);
            this.fetchStudyInfo(responses[3]);
            this.notify = this.notifier();
            const messages = responses[1];
            if (messages && messages.length) {
              this.unreadMessages = messages.filter(
                message => message["readStatus"] === "UNREAD"
              );
              this._eventEmitterService.updateUnreadMessages(
                this.unreadMessages.length
              );
            } else {
              this._eventEmitterService.updateUnreadMessages(0);
            }
            this.loaded = true;
          },
          error => {
            if (error["message"] === "500") {
              this.errorFlag = true;
            }
          }
        );
      }
    });
  }

  fetchStudyInfo(orgConfig: Object) {
    if (orgConfig && orgConfig["form"] && orgConfig["form"]["userNavigation"]) {
      const filterBodies = orgConfig["form"]["userNavigation"]["bodies"].filter(
        body => {
          return body[0]["type"] === "STUDY_INFO";
        }
      );
      if (filterBodies.length) {
        this.studyInfo = filterBodies[0][0];
      }
    }
  }

  getTimeline(timeline: Object[]) {
    let total = 0;
    const showMore: boolean = timeline != null;
    if (showMore) {
      for (let i: number = 0; i < timeline.length; i++) {
        for (let j: number = 0; j < this.timelineData.length; j++) {
          if (timeline[i]["date"] === this.timelineData[j]["date"]) {
            timeline[i]["events"] = this.timelineData[j].events.concat(
              timeline[i]["events"]
            );
            this.timelineData.splice(j, 1);
          }
        }
      }
      for (let i: number = 0; i < timeline.length; i++) {
        this.timelineData.push(timeline[i]);
      }
      for (let i: number = 0; i < timeline.length; i++) {
        let num = timeline[i]["events"].length;
        total = total + num;
      }
      if (total < 10) {
        this.showMore = false;
      }
    }

    this.timelineData.sort(function(date1: Object, date2: Object) {
      if (date1["date"] < date2["date"]) {
        return 1;
      } else if (date1["date"] > date2["date"]) {
        return -1;
      } else {
        return 0;
      }
    });

    for (let i: number = 0; i < this.timelineData.length; i++) {
      this.timelineData[i].events.sort(function(time1, time2) {
        if (time1["time"] < time2["time"]) {
          return 1;
        } else if (time1["time"] > time2["time"]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  loadMore() {
    this.fromRow = this.toRow + 1;
    this.toRow = this.fromRow + 9;
    this._dashboardService
      .getTimeline(this.fromRow, this.toRow, true)
      .subscribe(
        timeline => {
          this.getTimeline(timeline);
        },
        err => {
          this.showMore = false;
        }
      );
  }

  openModal() {
    this.content = {
      headerText: this.dashboardContent[3],
      bodyText: this.dashboardContent[2],
      errorButtonText: this.dashboardContent[28],
      successButtonText: this.dashboardContent[29],
      cancelShow: false
    };
    this.showModal = !this.showModal;
  }

  ngOnDestroy() {
    this.subscribers.forEach(v => v.unsubscribe());
  }

  goToSurvey(event: any) {
    this._surveyService.clearCache();
    this._programService.setUserSurveySessionId(event.userSurveySessionId);
    this._programService.setSurveyType("General");
    if (event["progressStatus"] === "NOT_STARTED") {
      this._router.navigate(["/intent"]);
    } else {
      this._router.navigate(["/survey"]);
    }
  }

  dueToday(userSurveySessionId, progressStatus) {
    this._surveyService.clearCache();
    this._programService.setUserSurveySessionId(userSurveySessionId);
    this._programService.setSurveyType("General");
    sessionStorage.setItem("userSurveySessionId", userSurveySessionId);
    if (progressStatus === "NOT_STARTED") {
      this._router.navigate(["/intent"]);
    } else {
      this._router.navigate(["/survey"]);
    }
  }

  goToViewMsgs() {
    this._router.navigate(["/viewmessage"]);
  }

  goToStudyInfo() {
    this._router.navigate(["/studyinfo"]);
  }

  notifier() {
    const self = this;
    return (e: string, data?: any) => {
      if (e === "cancel-modal") {
        self.showModal = !self.showModal;
      }
    };
  }
}
