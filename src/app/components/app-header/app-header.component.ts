import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import {
  UserService,
  ProgramService,
  EventEmitterService,
  ViewMessageService,
  SurveyService,
  DashboardService
} from "../../services";
import { RestApiService } from "../../rest-api-services";

@Component({
  selector: "app-header",
  styleUrls: ["./app-header.component.css"],
  templateUrl: "./app-header.component.html"
})
export class AppHeaderComponent implements OnInit {
  avatarImageSafe: SafeUrl;
  headerData = Object;
  supportedLanguages: Object[] = [];
  selectedLanguage: string;
  userProfile;
  userDetails: Object = {};
  noOfMessages: any;
  isHideBackground: boolean = false;
  isSideBarOpen: boolean = false;
  isActive: Boolean;
  logo: string;

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _userService: UserService,
    public _programService: ProgramService,
    private _surveyService: SurveyService,
    public _router: Router,
    private _sanitizer: DomSanitizer,
    private _viewMessageService: ViewMessageService,
    private _restApiService: RestApiService,
    private _dashboardService: DashboardService
  ) {
    this._eventEmitterService.messages.subscribe(noOfMessages => {
      this.noOfMessages = noOfMessages;
    });
    this._eventEmitterService.details.subscribe(profileDetails => {
      this.avatarImageSafe = this._sanitizer.bypassSecurityTrustUrl(
        "data:image/png;base64," + profileDetails["image"]
      );
      this.userDetails["firstName"] = profileDetails["firstName"];
      this.userDetails["lastName"] = profileDetails["lastName"];
    });
    this._eventEmitterService.languages.subscribe(lang => {
      this.supportedLanguages = lang;
      this.selectedLanguage = this._programService.getSelectedLanguage(
        this.supportedLanguages
      );
    });
  }

  ngOnInit() {
    this.avatarImageSafe = "assets/img/ripple_placeholder.gif";
    //this.logo = "assets/img/ripple_placeholder.gif";
    this._programService.getBodyContent().subscribe(content => {
      let errorContent = content["error_messages"];
      this.headerData = content["header"];
      this._userService.getUserImage().subscribe(
        response => {
          this.userProfile = response;
          this.getUserProfile();
          this.getTheme();
        },
        error => {
          this._userService.logout().subscribe(response => {
            this._router.navigate([
              sessionStorage.getItem("clientCode") +
                "/" +
                sessionStorage.getItem("programCode") +
                "/welcome"
            ]);
          });
        }
      );
    });

    this._programService.adhocUrl.subscribe(value => {
      // variable in service is made subject behaviour, which returns an observable.
      this.logo = value;
    });
  }

  getUserProfile() {
    if (this._userService.isLoggedIn()) {
      this.userDetails["firstName"] = this.userProfile["firstName"];
      this.userDetails["lastName"] = this.userProfile["lastName"];
      if (this.userProfile["userImage"]) {
        this.avatarImageSafe = this._sanitizer.bypassSecurityTrustUrl(
          "data:image/png;base64," + this.userProfile["userImage"]
        );
      } else {
        this.avatarImageSafe = this._sanitizer.bypassSecurityTrustUrl(
          "assets/img/default_profile_pic.png"
        );
      }
    }
  }

  getTheme() {
    this._programService.validateCode().subscribe(
      theme => {
        this.setTheme(theme);
      },
      error => {
        this.logo = "assets/img/logo.png";
        Observable.of(null);
      }
    );
  }

  setTheme(theme) {
    if (theme) {
      switch (theme["logoURL"].length !== 0) {
        case true:
          this.logo = theme["logoURL"];
          break;
        default:
          this.logo = "assets/img/logo.png";
      }
    } else {
      this.logo = "assets/img/logo.png";
    }
  }

  setLanguage(selectedLanguage: Object) {
    if (selectedLanguage["code"] !== this._programService.getLanguageCode()) {
      this._programService.setLanguageCode(selectedLanguage["code"]);
      this.selectedLanguage = selectedLanguage["desc"];
      this._programService.getBodyContent().subscribe(content => {
        this.headerData = content["header"];
        this._eventEmitterService.changeContentForSelectedLanguage(content);
        this._surveyService.clearCache();
        this._dashboardService.clearCache();
        this._programService.clearSchedules();
        this._programService.setExistingPages(null);
        this._programService.setExistingSchedule(null);
      });
    }
  }

  mobileMenu() {
    this.isSideBarOpen = !this.isSideBarOpen;
    this.isHideBackground = !this.isHideBackground;
  }

  closeMobileMenu() {
    this.isSideBarOpen = false;
    this.isHideBackground = false;
  }

  get showUserNavigation() {
    return this._userService.isLoggedIn() && !this._programService.isAdhoc();
  }

  get showSurveyNavigation() {
    return (
      ["/survey", "/adhoc-intent", "/adhoc-survey", "/cro-survey"].indexOf(
        this._router.url
      ) >= 0
    );
  }

  logout() {
    this._userService.logout().subscribe(
      response => {
        this._router.navigate([
          this._programService.getClientCode() +
            "/" +
            this._programService.getProgramCode() +
            "/welcome"
        ]);
        this._restApiService.setSessionErrorFlag(false);
      },
      error => {
        this._router.navigate([
          this._programService.getClientCode() +
            "/" +
            this._programService.getProgramCode() +
            "/welcome"
        ]);
        this._restApiService.setSessionErrorFlag(true);
      }
    );
  }

  goToWelcome() {
    if (this._programService.isAdhoc()) {
      //this._router.navigate(["/adhoc/" + this._programService.getAdhocToken()]);
      window.location.href = "/#/adhoc/" + this._programService.getAdhocToken();
    } else if (this._programService.isCRO()) {
      // do nothing
    } else {
      if (this._userService.isAuthenticated()) {
        this._router.navigate(["dashboard"]);
      } else {
        this._router.navigate([
          this._programService.getClientCode() +
            "/" +
            this._programService.getProgramCode() +
            "/welcome"
        ]);
      }
    }
  }

  updateLanguage(lang) {
    this.supportedLanguages = lang;
    this.selectedLanguage = this._programService.getSelectedLanguage(
      this.supportedLanguages
    );
  }
}
