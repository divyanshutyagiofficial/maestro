import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import * as moment from "moment";
import { ProgramService } from "../services/program.service";
import { SurveyApiService } from "../rest-api-services/survey.api.service";

@Injectable()
export class SurveyService {
  private noOfDecline: string;
  private declinePageName: string;
  public pointerSize: number = 5;
  constructor(
    private _programService: ProgramService,
    private _surveyApiService: SurveyApiService
  ) { }

  getSurveyData(): Observable<any> {
    const payload = {
      programUserId: this._programService.getProgramUserId(),
      userSurveySessionId: this._programService.getUserSurveySessionId(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: this._programService.getLanguageCode()
    };
    return this._surveyApiService.getSurveyData(payload).map(res => res);
  }
  getAdhocData(): Observable<any> {
    const payload = {
      adhocToken: this._programService.getAdhocToken(),
      language: this._programService.getLanguageCode(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this._surveyApiService.getAdhocData(payload).map(res => res);
  }
  getCroData() {
    const payload = {
      croToken: this._programService.getCroToken(),
      language: this._programService.getLanguageCode(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this._surveyApiService.getCROData(payload).map(res => res);
  }
  getDeclineReason(): Observable<any> {
    let languageCode = this._programService.getLanguageCode();
    return this._surveyApiService
      .getDeclineReason(languageCode)
      .map(res => res);
  }
  saveDeclineReason(reason: string, id: Object): Observable<any> {
    const offset = new Date().getTimezoneOffset() * 60000;
    const payload = [
      {
        declineReasonId: reason,
        userSurveySessionId: id,
        declineTime: Math.round(new Date().getTime()) - offset
      }
    ];
    return this._surveyApiService.saveDeclineReason(payload).map(res => res);
  }
  getCalendar(flag: boolean): Observable<any> {
    const offset = new Date().getTimezoneOffset() * 60000;
    let startTime =
      moment()
        .day(0)
        .startOf("day")
        .unix() *
      1000 -
      offset;
    let endTime =
      moment()
        .day(0)
        .startOf("day")
        .add(13, "days")
        .add(86399, "seconds")
        .unix() *
      1000 -
      offset;
    const params =
      this._programService.getProgramId() +
      "/" +
      this._programService.getProgramUserId() +
      "/" +
      this._programService.getLanguageCode() +
      "?startTime=" +
      startTime +
      "&endTime=" +
      endTime;
    return this._surveyApiService.getCalendar(params, flag).map(res => res);
  }
  saveDeclineReasonForSchedule(
    reason: string,
    declineSchedule: Object[]
  ): Observable<any> {
    const offset = new Date().getTimezoneOffset() * 60000;
    const payload = [];
    declineSchedule.forEach(data => {
      payload.push({
        declineReasonId: reason,
        userSurveySessionId: data["userSession"]["id"],
        declineTime: Math.round(new Date().getTime()) - offset
      });
    });
    return this._surveyApiService.saveDeclineReason(payload).map(res => res);
  }
  setPointerSize(value) {
    this.pointerSize = value;
  }
  getPointerSize() {
    return this.pointerSize;
  }
  initializeCanvas() {
    var c = <HTMLCanvasElement>document.getElementById("myCanvas");
    let ctx = c && c.getContext("2d");
    var img = <HTMLImageElement>document.getElementById("scream");
    ctx.drawImage(img, 0, 0, c.width, c.height);
  }
  onMouseMove(e, pointerColor, pointerSize, pos) {
    let c = <HTMLCanvasElement>document.getElementById("myCanvas");
    if (e.buttons !== 1) return;
    let ctx = c.getContext("2d");
    ctx.beginPath(); // begin
    ctx.lineCap = "round";
    ctx.lineWidth = pointerSize;
    ctx.strokeStyle = pointerColor;
    ctx.moveTo(pos.x, pos.y); // from
    var rect = c.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
    ctx.lineTo(pos.x, pos.y); // to
    ctx.stroke(); // draw it!
  }
  onMouseDown(e, pos) {
    let c = <HTMLCanvasElement>document.getElementById("myCanvas");
    var rect = c.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
    if (e.touches) e = e.touches[0];
    return false;
  }
  onMouseEnter(e, pos) {
    let c = <HTMLCanvasElement>document.getElementById("myCanvas");
    var rect = c.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
  }
  isButtonEnabled(surveySchedule: Object, checkForButton: boolean): boolean {
    let isEnabled = false;
    const now: any = moment();
    const progressStatus = ["STARTED", "COMPLETED", "EXPIRED"];
    const localDate = moment.utc(surveySchedule["startTime"]).local();
    const offset = new Date().getTimezoneOffset() * 60000;
    const startUtcDate = moment.utc(surveySchedule["startTime"] + offset);
    const endUtcDate = moment.utc(surveySchedule["endTime"] + offset);

    if (localDate.diff(now) > 0 && !checkForButton) {
      isEnabled = true;
    }

    if (
      surveySchedule["userSession"] &&
      (surveySchedule["userSession"]["progressStatus"] === "NOT_STARTED" ||
        (surveySchedule["userSession"]["progressStatus"] === "STARTED" &&
          checkForButton))
    ) {
      isEnabled = true;
    }

    if (
      (surveySchedule["userSession"] &&
        (progressStatus.indexOf(
          surveySchedule["userSession"]["progressStatus"]
        ) >= 0 ||
          surveySchedule["userSession"]["isDeclined"])) ||
      startUtcDate.diff(now) > 0 ||
      endUtcDate.diff(now) < 0
    ) {
      isEnabled = false;
    }
    return isEnabled;
  }

  setNoOfDecline(noOfDecline: string) {
    this.noOfDecline = noOfDecline;
  }

  getNoOfDecline() {
    return this.noOfDecline;
  }

  setDeclinePageName(declinePageName: string) {
    this.declinePageName = declinePageName;
  }

  getDeclinePageName() {
    return this.declinePageName;
  }

  clearCache() {
    this._surveyApiService.clearCache();
  }
}
