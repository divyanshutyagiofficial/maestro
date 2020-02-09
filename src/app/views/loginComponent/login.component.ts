import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  EventEmitterService,
  ProgramService,
  UserService
} from "../../services";
import { MessagingService } from "../../services/messaging.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  content: any = {};
  loginContent: any = {};
  welcomeContent: any = {};
  orgExist: boolean = false;
  errorMessage: string = "";
  message;

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (this._router["url"].indexOf("login") >= 0) {
        if (Object.keys(content).length) {
          this.loginContent = content["login"];
          this.welcomeContent = content["welcome"];
        }
        if (this._programService.isAdhoc()) {
          this.fetchOrganizationDetails();
        } else {
          this.getLoginDetails();
        }
        // this._programService.validateCode().subscribe(theme => {
        // this.setTheme(theme);
        //  })
      }
    });
  }

  /*setTheme(theme) {
        let background = document.getElementById('article-section').style;
        background.backgroundImage = 'url(' + theme['background-img'] + ')';
    }*/

  getLoginDetails() {
    this._userService.logout().subscribe(logout => {
      this.fetchOrganizationDetails();
    });
  }

  fetchOrganizationDetails() {
    if (this._programService.getProgramId()) {
      this._programService.getOrganizationConfig().subscribe(orgConfig => {
        if (orgConfig["form"] && orgConfig["form"]["auth"]) {
          const auth = orgConfig["form"]["auth"];
          if (auth["bodies"].length) {
            this.orgExist = false;
          } else {
            this.orgExist = true;
            this._router.navigate(["oops"]);
          }
          const filterBodies = auth["bodies"].filter(body => {
            return body[0]["type"] === "LOGIN";
          });
          if (filterBodies.length) {
            this.content = filterBodies[0][0];
          }
        }
      });
    } else {
      this._router.navigate(["404"]);
    }
  }

  login() {
    this._userService.login(this.content["fields"]).subscribe(
      login => {
        this.errorMessage = "";
        this._userService.setUserId(login["userId"]);
        this._userService.setUserToken(login["token"]);
        switch (this._programService.isAdhoc()) {
          case true:
            if (
              login["programUserId"] === this._programService.getProgramUserId()
            ) {
              this._router.navigate(["adhoc-intent"]);
            } else {
              this.errorMessage = this.loginContent["10"];
            }
            break;

          default:
            if (login["token"]) {
              this._programService.clearSchedules();
              this._programService.setProgramUserId(login["programUserId"]);
              this._router.navigate(["/dashboard"]);
            } else {
              this.errorMessage = this.loginContent["10"];
            }
        }
      },
      error => {
        if (error["message"] === "400") {
          this.errorMessage = this.loginContent["10"];
        } else {
          this.errorMessage = this.loginContent["11"];
        }
      }
    );
  }

  notify(event: string, data: Object) {
    if (data["fieldType"] === "EMAIL") {
      this.setUserName(data["input"]);
    }
  }

  setUserName(userName: string) {
    this._userService.setUserName(userName);
  }

  closeModal() {
    this.orgExist = false;
  }
}
