import { Component, OnInit } from "@angular/core";
import {
  EventEmitterService,
  ProgramService,
  UserService
} from "../../services";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./app-footer.component.html",
  styleUrls: ["./app-footer.component.css"]
})
export class AppFooterComponent implements OnInit {
  content: Object = {};
  date = new Date().getFullYear();
  logo: string;
  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private http: HttpClient,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length) {
        this.content = content["footer"];
        this.getTheme();
      }
    });

    this._programService.adhocUrl.subscribe(value => {
      // variable in service is made subject behaviour, which returns an observable.
      this.logo = value;
    });
  }

  getTheme() {
    this._programService.validateCode().subscribe(
      theme => {
        this.setTheme(theme);
      },
      error => {
        this.logo = "assets/img/logo.png";
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

  navigate(route) {
    switch (true) {
      case this._programService.isAdhoc():
        this.router.navigate([route + "_"]);
        break;

      case this._programService.isCRO():
        this.router.navigate(["_" + route]);
        break;

      default:
        this.router.navigate([route]);
    }
  }
}
