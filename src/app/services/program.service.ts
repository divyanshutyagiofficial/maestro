import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import API_URL from "../util/api-url";
import { OrganizationApiService, RestApiService } from "../rest-api-services";
import { EventEmitterService } from "./event-emitter.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class ProgramService {
  private languageCode: string;
  private programId: string;
  private orgId: string;
  private programUserId: string;
  private surveyType: string;
  private adhocToken: string;
  private userSurveySessionId: number;
  private programCode: string;
  private clientCode: string;
  private croToken: string;
  private cro: boolean;
  private noticeFlag: boolean;
  private storage: Object[];
  private pageBank: Object[];
  private surveyGroup: string;
  private adhoc: boolean = false;
  private fcmToken: string;
  public adhocUrl: Subject<any> = new Subject<any>();

  constructor(private _organizationApiService: OrganizationApiService) {}

  validateCode(): Observable<any> {
    if (
      this.getProgramCode() &&
      this.getClientCode() &&
      this.getLanguageCode() &&
      this.getClientCode() != "null" &&
      this.getProgramCode() != "null"
    ) {
      return this._organizationApiService
        .validateCode(
          this.getClientCode(),
          this.getProgramCode(),
          this.getLanguageCode()
        )
        .map(response => response);
    } else {
      //this._router.navigate(['404']);
      return Observable.of(null);
    }
  }

  validateAdhoc() {
    const payload = {
      adhocToken: this.getAdhocToken(),
      language: this.getLanguageCode(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this._organizationApiService
      .validateAdhocToken(payload)
      .map(response => response);
  }

  validateCRO() {
    const payload = {
      croToken: this.getCroToken(),
      language: this.getLanguageCode(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this._organizationApiService
      .validateCroToken(payload)
      .map(response => response);
  }

  getOrganizationConfig(): Observable<any> {
    console.log(this.getProgramId());
    console.log(this.getLanguageCode());
    if (this.getProgramId() && this.getLanguageCode()) {
      return this._organizationApiService
        .getOrganizationConfig(this.getProgramId(), this.getLanguageCode())
        .map(response => response);
    } else {
      //this._router.navigate(['404']);
      return Observable.of(null);
    }
  }

  getBodyContent(): Observable<any> {
    return this._organizationApiService
      .getBodyContentForLanguage(this.getLanguageCode())
      .map(response => response);
  }

  getSupportedLanguages(): Observable<any> {
    return this._organizationApiService
      .getSupportedLanguages(this.getProgramId())
      .map(response => response);
  }

  generatePDF(): string {
    return (
      API_URL.ROOT +
      API_URL.USER.ROOT +
      API_URL.USER.GENERATEPDF +
      "/" +
      this.getProgramId() +
      "/" +
      this.getLanguageCode()
    );
  }

  setAdhocLogoUrl(url: any) {
    this.adhocUrl.next(url);
  }

  getAdhocLogoUrl(): any {
    return this.adhocUrl;
  }

  getLanguageCode(): string {
    return this.languageCode || window.sessionStorage.getItem("languageCode");
  }

  setLanguageCode(languageCode) {
    window.sessionStorage.setItem("languageCode", languageCode);
    this.languageCode = languageCode;
  }

  getProgramCode(): string {
    return this.programCode || window.sessionStorage.getItem("programCode");
  }

  setProgramCode(programCode) {
    window.sessionStorage.setItem("programCode", programCode);
    this.programCode = programCode;
  }

  getClientCode(): string {
    return this.clientCode || window.sessionStorage.getItem("clientCode");
  }

  setClientCode(clientCode) {
    window.sessionStorage.setItem("clientCode", clientCode);
    this.clientCode = clientCode;
  }

  getProgramId(): string {
    return this.programId || window.sessionStorage.getItem("programId");
  }

  setProgramId(programId: string) {
    window.sessionStorage.setItem("programId", programId);
    this.programId = programId;
  }

  getProgramUserId(): string {
    return this.programUserId || window.sessionStorage.getItem("programUserId");
  }

  setProgramUserId(programUserId: string) {
    window.sessionStorage.setItem("programUserId", programUserId);
    this.programUserId = programUserId;
  }

  getSurveyType() {
    return this.surveyType || window.sessionStorage.getItem("surveyType") || "";
  }

  setSurveyType(surveyType: string) {
    window.sessionStorage.setItem("surveyType", surveyType);
    this.surveyType = surveyType;
  }

  setSurveyGroup(surveyGroup: string) {
    window.sessionStorage.setItem("surveyGroup", surveyGroup);
    this.surveyGroup = surveyGroup;
  }

  getSurveyGroup() {
    return (
      this.surveyGroup || window.sessionStorage.getItem("surveyGroup") || ""
    );
  }

  getCroToken(): string {
    return this.croToken || window.sessionStorage.getItem("croToken");
  }

  setAdhocToken(adhocToken: string) {
    window.sessionStorage.setItem("adhocToken", adhocToken);
    this.adhocToken = adhocToken;
  }

  getAdhocToken(): string {
    return this.adhocToken || window.sessionStorage.getItem("adhocToken");
  }

  setCROToken(croToken: string) {
    window.sessionStorage.setItem("croToken", croToken);
    this.croToken = croToken;
  }

  setAdhoc(adhoc) {
    this.adhoc = adhoc;
  }

  setCRO(flag) {
    this.cro = flag;
  }

  isAdhoc() {
    return this.adhoc && sessionStorage.getItem("adhoc") == "true";
  }

  isCRO() {
    return this.cro && this.getCroToken() && this.getCroToken().length > 0;
  }

  getSelectedLanguage(languages) {
    if (languages.constructor === Array) {
      console.log("service    " + JSON.stringify(languages));
      return languages.filter(language => {
        return language["code"] === this.getLanguageCode();
      })[0]["desc"];
    }
  }

  getUserSurveySessionId() {
    return (
      this.userSurveySessionId ||
      window.sessionStorage.getItem("userSurveySessionId")
    );
  }

  setUserSurveySessionId(userSurveySessionId: number) {
    window.sessionStorage.setItem(
      "userSurveySessionId",
      userSurveySessionId.toString()
    );
    this.userSurveySessionId = userSurveySessionId;
  }

  setNoticeFlag(flag: boolean) {
    this.noticeFlag = flag;
  }

  getNoticeFlag() {
    return this.noticeFlag;
  }

  // Data Cache starts here...

  setExistingSchedule(storage) {
    this.storage = storage;
  }

  getExistingSchedule() {
    return this.storage || [];
  }

  setExistingPages(pageBank) {
    this.pageBank = pageBank;
  }

  getExistingPages() {
    return this.pageBank || [];
  }

  setFcmToken(token) {
    this.fcmToken = token;
  }

  getFcmToken() {
    return this.fcmToken || "";
  }

  clearValues() {
    this.languageCode = null;
    this.programId = null;
    this.orgId = null;
    this.programUserId = null;
    this.surveyType = null;
    this.surveyType = null;
    this.adhocToken = null;
    this.userSurveySessionId = null;
    this.programCode = null;
    this.clientCode = null;
    this.croToken = null;
    this.noticeFlag = null;
  }

  clearSchedules() {
    //window.sessionStorage.removeItem("croToken");
    //window.sessionStorage.removeItem("adhocToken");
    //window.sessionStorage.removeItem("userSurveySessionId");
    this.croToken = null;
    this.adhocToken = null;
    //this.userSurveySessionId = null;
    this.pageBank = null;
    this.storage = null;
  }
}
