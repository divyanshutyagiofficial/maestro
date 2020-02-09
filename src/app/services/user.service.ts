import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { DashboardService } from "./dashboard.service";
import { ProgramService } from "./program.service";
import { RestApiService } from "../rest-api-services/rest.api.service";
import { UserApiService } from "../rest-api-services/user.api.service";
import { EventEmitterService } from "./event-emitter.service";
import { BlockUIService } from "ng-block-ui";

@Injectable()
export class UserService {
  private userId: string;
  private userName: string;
  private userToken: string;
  private verificationCode: string;
  private content;

  constructor(
    private _dashboardService: DashboardService,
    private _programService: ProgramService,
    private _restApiService: RestApiService,
    private _userApiService: UserApiService,
    private _eventEmitterService: EventEmitterService,
    private _blockUIService: BlockUIService
  ) {
    this._eventEmitterService.currentContent.subscribe(content => {
      this.content = content["login"];
    });
  }

  login(userDetails: Object[]): Observable<any> {
    const loginDetails = {
      userName: userDetails
        .filter(user => {
          return user["fieldType"] === "EMAIL";
        })[0]
        ["input"].toLowerCase(),
      password: btoa(
        userDetails.filter(user => {
          return user["fieldType"] === "PASSWORD";
        })[0]["input"]
      ),
      language: this._programService.getLanguageCode(),
      organizationProgramId: this._programService.getProgramId(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      source: "WEB",
      dnToken: this._programService.getFcmToken()
    };
    return this._userApiService
      .login(
        loginDetails,
        this._programService.isAdhoc() === true ? "ADHOC" : "WEB"
      )
      .map(response => response);
  }

  logout(): Observable<any> {
    if (this.isLoggedIn()) {
      const logoutDetails = {
        userId: this.getUserId(),
        token: this.getUserToken()
      };
      return this._userApiService.logout(logoutDetails).map(response => {
        this.setUserId("");
        this.setUserToken("");
        this.setUserName("");
        if (!this._programService.isAdhoc()) {
          this._programService.setProgramUserId("");
        }
        this.clearCache();
        this.clearParams();
        this._dashboardService.clearCache();
        this._programService.clearValues();
        this._programService.clearSchedules();
        this._blockUIService.stop("app-component");
        return response;
      });
    } else {
      return Observable.of(null);
    }
  }

  changePassword(payload: Object): Observable<any> {
    return this._userApiService
      .changePassword(payload)
      .map(response => response);
  }

  getUserImage(): Observable<any> {
    if (this.isAuthenticated()) {
      const userInput = {
        getImage: "Yes",
        language: this._programService.getLanguageCode(),
        programUserId: this._programService.getProgramUserId(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      return this._userApiService
        .getUserInfo(userInput)
        .map(response => response);
    } else {
      return Observable.of(null);
    }
  }

  getPersonalDetails(clearCache?: boolean): Observable<any> {
    return this._userApiService
      .getPersonalDetails(clearCache)
      .map(response => response);
  }

  updatePersonalDetails(updatePersonalDetails: any[]): Observable<any> {
    let details = {
      firstName: updatePersonalDetails[0]["value"],
      lastName: updatePersonalDetails[1]["value"],
      image: updatePersonalDetails[8]["value"]
    };
    this._eventEmitterService.updateProfileDetails(details);
    this._dashboardService.clearCache();
    return this._userApiService
      .updatePersonalDetails(updatePersonalDetails)
      .map(response => response);
  }

  sendEmailForLegalStatement(progId: number): Observable<any> {
    const input = {
      organizationProgramId: progId,
      email: window.sessionStorage.getItem("userName"),
      //organizationId: this._programService.getProgramId(),
      language: this._programService.getLanguageCode()
    };
    return this._userApiService
      .sendEmailForLegalStatement(input)
      .map(response => response);
  }

  sendVerificationMail(): Observable<any> {
    if (this.getUserName()) {
      return this._userApiService
        .sendVerificationMail({ data: this.getUserName().toLocaleLowerCase() })
        .map(response => response);
    } else {
      return Observable.of(this.content["12"]);
    }
  }

  verifyVerificationCode(emailID: string, verifyCode: string): Observable<any> {
    return this._userApiService
      .verifyVerificationCode(emailID, verifyCode)
      .map(response => response);
  }

  resetPassword(newPassword: string): Observable<any> {
    const resetPasswordInput = {
      userName: this.getUserName().toLocaleLowerCase(),
      password: btoa(newPassword),
      securityKey: this.getVerificationCode()
    };
    return this._userApiService
      .resetPassword(resetPasswordInput)
      .map(response => response);
  }

  getShortEmailId() {
    const domain = this.getUserName().split("@");
    const last = domain[0].substr(domain[0].length - 2);
    const first = domain[0].substr(0, 2);
    return first + "******" + last + "@" + domain[1];
  }

  setUserId(userId: string) {
    window.sessionStorage.setItem("userId", userId);
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId || window.sessionStorage.getItem("userId");
  }

  setUserToken(userToken: string) {
    this.userToken = userToken;
    this._restApiService.setUserToken(this.userToken);
    window.sessionStorage.setItem("userToken", userToken);
  }

  getUserToken(): string {
    return window.sessionStorage.getItem("userToken");
  }

  setUserName(userName: string) {
    window.sessionStorage.setItem("userName", userName);
    this.userName = userName;
  }

  getUserName(): string {
    return this.userName || window.sessionStorage.getItem("userName") || "";
  }

  setVerificationCode(verificationCode: string) {
    window.sessionStorage.setItem("verificationCode", verificationCode);
    this.verificationCode = verificationCode;
  }

  getVerificationCode(): string {
    return (
      this.verificationCode || window.sessionStorage.getItem("verificationCode")
    );
  }

  isAuthenticated(): boolean {
    return !!this.getUserId();
  }

  isLoggedIn(): boolean {
    return !!this.getUserToken() && !!this.getUserId();
  }

  clearCache() {
    this._userApiService.clearCache();
  }

  clearParams() {
    window.sessionStorage.removeItem("surveyType");
    window.sessionStorage.removeItem("programUserId");
  }
}
