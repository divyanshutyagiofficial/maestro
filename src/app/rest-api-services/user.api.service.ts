import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import API_URL from "../util/api-url";
import { RestApiService } from "./rest.api.service";
import "rxjs/Rx";

@Injectable()
export class UserApiService {
  private userInfo: Observable<any>;
  private personalDetails: Observable<any>;

  constructor(private _restApiService: RestApiService) {}

  login(loginDetails: Object, source?: string): Observable<any> {
    return this._restApiService
      .post(API_URL.LOGIN, loginDetails, source)
      .map(this._restApiService.handleResponse);
  }

  logout(logoutDetails: Object): Observable<any> {
    return this._restApiService
      .post(API_URL.LOGOUT, logoutDetails)
      .map(this._restApiService.handleResponse);
  }

  changePassword(payload: Object): Observable<any> {
    return this._restApiService
      .post(API_URL.USER.ROOT + API_URL.USER.CHANGE_PASSWORD, payload)
      .map(this._restApiService.handleResponse);
  }

  getUserInfo(userInput: Object): Observable<any> {
    if (!this.userInfo) {
      this.userInfo = this._restApiService
        .getUserInfo(API_URL.USER.ROOT + API_URL.USER.USERINFO, userInput)
        .map(this._restApiService.handleResponse)
        .publishReplay(1)
        .refCount();
    }
    return this.userInfo;
  }

  getPersonalDetails(clearCache: boolean): Observable<any> {
    if (clearCache) {
      this.personalDetails = null;
    }
    if (!this.personalDetails) {
      this.personalDetails = this._restApiService
        .get(API_URL.USER.ROOT + API_URL.USER.PERSONALDETAILS)
        .map(this._restApiService.handleResponse)
        .publishReplay(1)
        .refCount();
    }
    return this.personalDetails;
  }

  updatePersonalDetails(updatePersonalDetails: any[]): Observable<any> {
    return this._restApiService
      .put(API_URL.USER.ROOT + API_URL.USER.UPDATE, updatePersonalDetails)
      .map(this._restApiService.handleResponse);
  }

  sendEmailForLegalStatement(legalStatement: Object): Observable<any> {
    return this._restApiService
      .post(API_URL.USER.ROOT + API_URL.USER.EMAILLEGAL, legalStatement)
      .map(this._restApiService.handleResponse);
  }

  sendVerificationMail(mail: Object): Observable<any> {
    return this._restApiService
      .post(API_URL.FORGOT_PASSWORD.ROOT, mail)
      .map(this._restApiService.handleResponse);
  }

  verifyVerificationCode(emailID: string, verifyCode: string): Observable<any> {
    const url =
      API_URL.FORGOT_PASSWORD.ROOT +
      API_URL.FORGOT_PASSWORD.VERIFY +
      "?encodedNameTime=" +
      emailID +
      "&securityKey=" +
      verifyCode;
    return this._restApiService
      .get(url)
      .map(this._restApiService.handleResponse);
  }

  resetPassword(passwordInput: Object): Observable<any> {
    return this._restApiService
      .put(
        API_URL.FORGOT_PASSWORD.ROOT + API_URL.FORGOT_PASSWORD.RESET,
        passwordInput
      )
      .map(this._restApiService.handleResponse);
  }

  clearCache() {
    this.personalDetails = null;
    this.userInfo = null;
  }
}
