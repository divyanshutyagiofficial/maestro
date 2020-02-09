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
  selector: "app-cro",
  templateUrl: "./cro-layout.component.html"
})
export class CROLayoutComponent implements OnInit {
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
    if (this._router["url"].toLowerCase().indexOf("cro") >= 0) {
      this.setCRO(token);
    }
  }

  setCRO(token) {
    this._programService.setSurveyType("cro");
    this._programService.setCROToken(token);
    this._programService.validateCRO().subscribe(
      async adhocDetails => {
        await this._programService.setCRO(true);
        await sessionStorage.setItem("userToken", adhocDetails["token"]);
        await this._programService.setProgramId(
          adhocDetails["organizationProgramId"]
        );
        await this._programService.setProgramUserId(
          adhocDetails["programUserId"]
        );
        this._programService.setAdhocLogoUrl(
          adhocDetails["programInfo"].logoURL
        );
        let serviceCalls = [
          this._programService.getOrganizationConfig(),
          this._programService.getSupportedLanguages()
        ];
        Observable.forkJoin(serviceCalls).subscribe(responses => {
          this._eventEmitterService.updateConfigData(responses[0]);
          this._eventEmitterService.updateSupportedLanguages(responses[1]);
        });
        setTimeout(() => {
          if (this._programService.getProgramUserId()) {
            this._router.navigate(["/cro-intent"]);
          }
        }, 10);
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
}
