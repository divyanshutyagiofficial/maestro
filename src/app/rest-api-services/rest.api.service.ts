import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  Headers,
  Http,
  Response,
  RequestOptions,
  ResponseContentType
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import API_URL from "../util/api-url";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/share";
import { BlockUIService } from "ng-block-ui";
import { EventEmitterService } from "../services/event-emitter.service";

@Injectable()
export class RestApiService {
  baseUrl: string = API_URL.ROOT;
  uiBlocker: any[] = []; // stack for tracking currently dispatched calls
  uiBlocked: boolean = false;
  userToken: string;
  errorFlag: boolean;
  sessionErrorFlag: boolean;
  noDataError: boolean;
  errorMessagesContent;

  constructor(
    private _http: Http,
    private _blockUIService: BlockUIService,
    private _router: Router,
    private _eventEmitterService: EventEmitterService
  ) {
    this._eventEmitterService.currentContent.subscribe(content => {
      this.errorMessagesContent = content["error_messages"];
    });
  }

  setUserToken(userToken: string) {
    this.userToken = userToken;
  }

  get(endpoint: string, source?: string): Observable<any> {
    this.handleUIBlocker(true, endpoint);
    return this._http
      .get(this.getUrl(endpoint), this.getRequestOptions(source))
      .map(response => {
        this.handleUIBlocker(false, endpoint);
        return response;
      })
      .catch(error => {
        this.handleUIBlocker(false, endpoint);
        this.shouldResetRoute(error);
        return this.handleError(error);
      })
      .share();
  }

  post(endpoint: string, body: any, source?: string): Observable<any> {
    this.handleUIBlocker(true, endpoint);
    return this._http
      .post(this.getUrl(endpoint), body, this.getRequestOptions(source))
      .map((response: Response) => {
        this.handleUIBlocker(false, endpoint);
        return response;
      })
      .catch(error => {
        this.handleUIBlocker(false, endpoint);
        this.shouldResetRoute(error);
        return this.throwError(error);
      })
      .share();
  }

  put(endpoint: string, body: any, source?: string): Observable<any> {
    this.handleUIBlocker(true, endpoint);
    return this._http
      .put(this.getUrl(endpoint), body, this.getRequestOptions(source))
      .map(response => {
        this.handleUIBlocker(false, endpoint);
        return response;
      })
      .catch(e => {
        this.handleUIBlocker(false, endpoint);
        this.shouldResetRoute(e);
        return this.handleError(e);
      })
      .share();
  }

  upload(endpoint: string, body: any) {
    this.handleUIBlocker(true, endpoint);
    return this._http
      .post(this.getUrl(endpoint), body, this.setUploadHeaders())
      .map((response: Response) => {
        this.handleUIBlocker(false, endpoint);
        return response;
      })
      .catch(error => {
        this.handleUIBlocker(false, endpoint);
        this.shouldResetRoute(error);
        return this.throwError(error);
      })
      .share();
  }

  getFile(endpoint: string): Observable<any> {
    this.handleUIBlocker(true, endpoint);
    const headers = new Headers({
      //'Content-Type': 'application/json',
      "X-DRO-TOKEN":
        this.userToken || window.sessionStorage.getItem("userToken") || "",
      "X-DRO-PUSER": window.sessionStorage.getItem("programId") || "",
      "X-DRO-SOURCE": "WEB",
      "Allow-Credentials": true
    });
    let options = new RequestOptions({
      headers: headers,
      responseType: ResponseContentType.Blob
    });
    return this._http
      .get(this.getUrl(endpoint), options)
      .map(response => {
        this.handleUIBlocker(false, endpoint);
        return response;
      })
      .catch(error => {
        this.handleUIBlocker(false, endpoint);
        this.shouldResetRoute(error);
        return this.handleError(error);
      })
      .share();
  }

  getUserInfo(endpoint: string, body: any, source?: string): Observable<any> {
    //this.handleUIBlocker(true, endpoint);
    return this._http
      .post(this.getUrl(endpoint), body, this.getRequestOptions(source))
      .map((response: Response) => {
        //this.handleUIBlocker(false, endpoint);
        return response;
      })
      .catch(error => {
        //this.handleUIBlocker(false, endpoint);
        this.shouldResetRoute(error);
        return this.throwError(error);
      })
      .share();
  }

  getUrl(url: string): string {
    return this.baseUrl + url;
  }

  handleResponse(res: Response) {
    return (res && res.json()) || {};
  }

  handleNullResponse(res: Response) {
    return null;
  }

  handleObject(res: any) {
    // to return an object as observable
    return Observable.of(res);
  }

  handleError(error: Response | any) {
    return Observable.of(null); // dont return error bcoz this plugs straight into redux
  }

  throwError(error: Response | any) {
    return Observable.throw(new Error(error.status));
  }

  shouldResetRoute(e: Response | any) {
    if (e.status === 401) {
      window.sessionStorage.removeItem("userToken");
      this._router.navigate([
        sessionStorage.getItem("clientCode") +
          "/" +
          sessionStorage.getItem("programCode") +
          "/welcome"
      ]);
      this.setSessionErrorFlag(true);
    } else if (e.status === 500) {
      console.log(sessionStorage.getItem("userToken"));
      alert(this.errorMessagesContent["1"]);
      switch (sessionStorage.getItem("userToken").length > 0) {
        case true:
          if (sessionStorage.getItem("adhoc") == "true") {
            this._router.navigate(["/adhoc-login"]);
          } else {
            this._router.navigate(["/dashboard"]);
          }
          break;
        case false:
          if (sessionStorage.getItem("adhoc") == "true") {
            this._router.navigate(["/adhoc-login"]);
          } else {
            this._router.navigate(["/dashboard"]);
          }
          break;
      }
    }
  }

  setSessionErrorFlag(flag: boolean) {
    this.sessionErrorFlag = flag;
  }

  getSessionErrorFlag() {
    return this.sessionErrorFlag;
  }

  setNoDataErrorFlag(flag: boolean) {
    this.noDataError = flag;
  }

  getNoDataErrorFlag() {
    return this.noDataError;
  }

  setErrorFlag(flag: boolean) {
    this.errorFlag = flag;
  }

  getErrorFlag() {
    return this.errorFlag;
  }

  // common stuff if we're doing the task for every call e.g the error handler
  getRequestOptions(source) {
    let headers = {
      headers: new Headers({
        "Content-Type": "application/json",
        "X-DRO-TOKEN":
          this.userToken || window.sessionStorage.getItem("userToken") || "",
        "X-DRO-PUSER": window.sessionStorage.getItem("programId") || "",
        "Allow-Credentials": true
      }),
      withCredentials: true
    };
    switch (source) {
      case "ADHOC":
        headers.headers.append("X-DRO-SOURCE", "ADHOC");
        break;
      case "ADMIN":
        headers.headers.append("X-DRO-SOURCE", "ADMIN");
        break;
      default:
        headers.headers.append("X-DRO-SOURCE", "WEB");
    }

    return headers;
  }

  setUploadHeaders() {
    return {
      headers: new Headers({
        //'Accept-Encoding': 'multipart/form-data',
        //'Content-Type': 'multipart/form-data',
        "X-DRO-TOKEN":
          this.userToken || window.sessionStorage.getItem("userToken") || "",
        "X-DRO-PUSER": window.sessionStorage.getItem("programId") || "",
        "X-DRO-SOURCE": "WEB",
        "Allow-Credentials": true
      }),
      withCredentials: true
    } as RequestOptions;
  }

  // one ui blocker for all calls
  handleUIBlocker(p: boolean, url: string) {
    console.log(p);
    console.log(url);
    if (p) {
      this.uiBlocker.filter(v => v == url).length < 1 &&
        this.uiBlocker.push(url);
    } else {
      this.uiBlocker.forEach((v, i, a) => v === url && a.splice(i, 1));
    }
    if (this.uiBlocker.length && !this.uiBlocked) {
      this._blockUIService.start("app-component");
      this.uiBlocked = true;
    }
    if (!this.uiBlocker.length && this.uiBlocked) {
      this.uiBlocked = false;
      this._blockUIService.stop("app-component");
    }
  }
}
