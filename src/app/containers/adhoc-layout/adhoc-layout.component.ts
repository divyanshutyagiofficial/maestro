import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProgramService,
  UserService,
  EventEmitterService
} from "../../services";
import { Observable } from "rxjs/Observable";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-adhoc",
  templateUrl: "./adhoc-layout.component.html"
})
export class AdhocLayoutComponent implements OnInit {
  @HostListener("window: beforeunload", ["$event"]) unloadHandler(
    event: Event
  ) {
    event.returnValue = true;
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _programService: ProgramService,
    private _eventEmitterService: EventEmitterService,
    private location: LocationStrategy
  ) {
    window.history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      window.history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {
    const token = this._route.children["0"].snapshot.params.token;
    if (this._router["url"].indexOf("/adhoc") >= 0) {
      this.setAdhoc(token);
    }
  }

  setAdhoc(token) {
    sessionStorage.setItem("adhoc", "true");
    this._programService.setAdhoc(true);
    this._programService.setAdhocToken(token);
    this._programService.validateAdhoc().subscribe(
     async adhocDetails => {
        await sessionStorage.setItem("userToken", adhocDetails["token"]);
        await this._programService.setProgramId(
          adhocDetails["organizationProgramId"]
        );
        await this._programService.setAdhocLogoUrl(
          adhocDetails["programInfo"].logoURL
        );
        await this._programService.setProgramUserId(adhocDetails["programUserId"]);
        if (adhocDetails["organizationProgramId"]) {
          await this.setLanguage();
          await this.getConfig();
        }
      },
      error => {
        if (error["message"] === "404") {
          this._router.navigate(["expired"]);
        } else if (error["message"] === "500") {
          this._router.navigate(["404"]);
        }
      }
    );
  }

  getConfig() {
    this._programService.getOrganizationConfig().subscribe(config => {
      this._eventEmitterService.updateConfigData(config);
    });
  }

  setLanguage() {
    this._programService.getSupportedLanguages().subscribe(lang => {
      this._eventEmitterService.updateSupportedLanguages(lang);
    });
  }
}
