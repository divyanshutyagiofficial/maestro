import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  EventEmitterService,
  ProgramService,
  UserService
} from "../../services";

@Component({
  templateUrl: "./newpassword.component.html",
  styleUrls: ["./newpassword.component.css"]
})
export class NewPasswordComponent implements OnInit {
  changePasswordContent: Object = {};
  fieldType: string = "password";
  passInputFieldImageLocation: string = "assets/img/hide.png";
  emptyPassword: boolean = false;
  emptyConfirmPassword: boolean = false;
  chngPasswdSuccess: boolean = false;
  passwordNotMatch: boolean = false;
  streangthLevel: string;
  error: boolean;
  regexError: boolean;

  @ViewChild("newPassword") newPasswd: ElementRef;
  @ViewChild("confirmPassword") confirmPasswd: ElementRef;

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (
        Object.keys(content).length &&
        this._router["url"].indexOf("newpassword") >= 0
      ) {
        this.changePasswordContent = content["change_password"];
      }
    });
  }

  showHidePassword() {
    if (this.fieldType === "password") {
      this.fieldType = "text";
      this.passInputFieldImageLocation = "assets/img/show.png";
    } else {
      this.fieldType = "password";
      this.passInputFieldImageLocation = "assets/img/hide.png";
    }
  }

  checkStrength(pass: string) {
    let passLength = pass.length;
    this.emptyPassword = false;
    this.passwordNotMatch = false;
    if (
      pass.match(
        `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!$&#])[0-9a-zA-Z@!$&#]{8,}$`
      ) === null
    ) {
      this.regexError = true;
    } else {
      this.regexError = false;
    }

    switch (true) {
      case !passLength:
        this.streangthLevel = "";
        this.emptyPassword = true;
        break;
      case passLength < 3:
        this.streangthLevel = "Poor";
        break;
      case passLength < 5:
        this.streangthLevel = "Fair";
        break;
      case passLength < 7:
        this.streangthLevel = "Good";
        break;
      case passLength >= 7:
        this.streangthLevel = "Strong";
        break;
    }
  }

  setPassword() {
    this.error = this.newPasswd.nativeElement.value.length < 8;
    this.passwordNotMatch =
      this.newPasswd["nativeElement"]["value"] !==
      this.confirmPasswd["nativeElement"]["value"];
    if (!this.passwordNotMatch && !this.error && !this.regexError) {
      this._userService
        .resetPassword(this.newPasswd["nativeElement"]["value"])
        .subscribe(response => {
          if (response["message"] === "success") {
            this.chngPasswdSuccess = true;
            this._userService.setVerificationCode("");
            setTimeout(() => {
              this.chngPasswdSuccess = false;
              this._router.navigate(["/login"]);
            }, 5000);
          } else {
            alert(response["message"]);
            this.chngPasswdSuccess = false;
          }
        });
    }
  }
}
