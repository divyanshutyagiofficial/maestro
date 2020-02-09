import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ProgramService } from "./program.service";
import { DashboardApiService } from "../rest-api-services";
import * as moment from "moment";

@Injectable()
export class DashboardService {
  private droInfoList: Object[];
  private result: any;
  private storage = [];
  private pageBank = [];
  constructor(
    private _dashboardApiService: DashboardApiService,
    private _programService: ProgramService
  ) {}

  getDashboard(): Observable<any> {
    const dashboardInput = {
      language: this._programService.getLanguageCode(),
      programUserId: this._programService.getProgramUserId(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this._dashboardApiService
      .getDashboard(dashboardInput)
      .map(response => response);
  }

  getDroData(
    clearCache?: boolean,
    startTime?: number,
    endTime?: number
  ): Observable<any> {
    const offset = new Date().getTimezoneOffset() * 60000;
    const eTime = endTime || new Date().setHours(23, 59, 59, 999);
    const today = new Date();
    today.setDate(today.getDate() - 30);
    const sTime = startTime || today.setHours(0, 0, 0, 0);
    const droDataInput = {
      programUserId: this._programService.getProgramUserId(),
      startTime: sTime - offset,
      endTime: eTime - offset,
      status: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: this._programService.getLanguageCode()
    };
    return this._dashboardApiService
      .getDroData(droDataInput, clearCache)
      .map(response => {
        this.result = response["droInfoList"];
        return response;
      });
  }

  getTimeline(fromRow: number, toRow: number, flag: boolean): Observable<any> {
    const timelineInput = {
      fromRow: fromRow,
      toRow: toRow,
      language: this._programService.getLanguageCode(),
      programUserId: this._programService.getProgramUserId(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this._dashboardApiService
      .getTimeline(timelineInput, flag)
      .map(response => response);
  }

  getSurveySchedule(
    startTime: number,
    endTime: number,
    flag: boolean
  ): Observable<any> {
    const offset = new Date().getTimezoneOffset() * 60000;
    const scheduleInput = {
      programUserId: this._programService.getProgramUserId(),
      language: this._programService.getLanguageCode(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      startTime: startTime,
      endTime: endTime
    };
    return this._dashboardApiService
      .getSurveySchedule(scheduleInput, flag)
      .map(response => response);
  }

  setDroInfoList(droInfoList: Object[]) {
    this.droInfoList = droInfoList;
    this.sortDroDesc(this.droInfoList, "endTime");
  }

  getDroInfoList() {
    return this.droInfoList;
  }

  filterSearchByDroName(search: string) {
    if (search) {
      return this.result.filter(droData => {
        return droData["name"].toLowerCase().indexOf(search.toLowerCase()) >= 0;
      });
    } else {
      return this.result;
    }
  }

  droSearch(
    droName: string,
    progressStatus: string,
    startTime: number,
    endTime: number,
    droList?: Object[]
  ) {
    const droInfoList = this.getDroInfoList();
    this.result = droInfoList.filter(dro => {
      const checkSearchName =
        dro["name"]
          .toLowerCase()
          .indexOf(droName.toLowerCase() || "".toLowerCase()) >= 0;
      const checkProgressStatus =
        dro["progressStatus"]
          .toLowerCase()
          .indexOf(progressStatus.toLowerCase()) >= 0;
      const droEndTime =
        Number(dro["endTime"]) + new Date().getTimezoneOffset() * 60000;
      let checkDateRange = droEndTime >= 0;
      if (startTime && endTime) {
        checkDateRange = droEndTime >= startTime && droEndTime <= endTime;
      } else if (startTime) {
        checkDateRange = droEndTime >= endTime;
      } else if (endTime) {
        checkDateRange = droEndTime <= endTime;
      }
      return checkSearchName && checkProgressStatus && checkDateRange;
    });
    return this.result;
  }

  sortDroDesc(viewDrosData: Object[], property) {
    viewDrosData.sort(function(time1, time2) {
      if (time1[property] < time2[property]) {
        return 1;
      } else if (time1[property] > time2[property]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  sortDroAsc(viewDrosData: Object[], property) {
    viewDrosData.sort(function(time1, time2) {
      if (time1[property] > time2[property]) {
        return 1;
      } else if (time1[property] < time2[property]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  getBannerSurveys(dashboardDetails: Object): Object[] {
    return dashboardDetails["userSurveySessions"].filter(survey => {
      const offset = new Date().getTimezoneOffset() * 60000;
      const timeNow = Date.now();
      const currentDate = new Date(timeNow);
      const endOfDay = currentDate.setHours(23, 59, 59, 999);
      const startOfDay = currentDate.setHours(0, 0, 0, 0);
      const endTime = survey["surveySessionInfo"]["endTime"] + offset;
      return (
        endOfDay > endTime &&
        endTime > startOfDay &&
        survey["surveySessionInfo"]["endTime"] !== 0
      );
    });
  }

  clearCache() {
    this._dashboardApiService.clearCache();
  }
}
