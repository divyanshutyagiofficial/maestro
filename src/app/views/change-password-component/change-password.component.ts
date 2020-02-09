import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NgForm
} from "@angular/forms";
import { UserService } from "../../services/user.service";
import { EventEmitterService } from "../../services/event-emitter.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
  providers: [UserService]
})
export class ChangePasswordComponent implements OnInit {
  form;
  validation_messages = {};
  viewPassword: string = "assets/img/hide.png";
  viewPassword1: string = "assets/img/hide.png";
  oldPassword: string = "password";
  fieldType: string = "password";
  languageContent: Object;
  passwdSuccess: boolean = false;
  strongLevel: number = 0;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private userService_: UserService,
    private _eventEmitterService: EventEmitterService
  ) {
    this.form = this.fb.group(
      {
        currentPassword: ["", Validators.compose([Validators.required])],
        newPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!$&#])[0-9a-zA-Z@!$&#]{8,}$"
            )
          ])
        ],
        confirmPassword: ["", Validators.compose([Validators.required])]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("newPassword").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  updateStrongValue() {
    let value = this.form.value.newPassword;

    switch (true) {
      case value.match(/[0-9]/g) !== null:
          this.strongLevel = this.strongLevel + 25;
        break;
      case value.match(/[@,!,#,&,$]/g) !== null:
          this.strongLevel = this.strongLevel + 25;
        break;
      case value.match(/[0-9]/g) !== null:
          this.strongLevel = this.strongLevel + 25;
        break;
      case value.match(/[0-9]/g) !== null:
          this.strongLevel = this.strongLevel + 25;
        break;
    }
  }

  checkValidity() {
    let flag = true;
    this.updateStrongValue();
    this.form.value.currentPassword.length > 0 &&
    this.form.value.newPassword.length > 0 &&
    this.form.value.confirmPassword.length > 0 &&
    this.form.value.newPassword === this.form.value.confirmPassword &&
    this.form.value.newPassword.match(
      "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!$&#])[0-9a-zA-Z@!$&#]{8,}$"
    ) !== null
      ? (flag = false)
      : (flag = true);
    return flag;
  }

  onSubmit(form: NgForm) {
    let payload: Object = {
      authKey: window.sessionStorage.getItem("userToken"),
      oldPassword: btoa(this.form.value.currentPassword),
      newPassword: btoa(this.form.value.newPassword),
    };

    this.userService_.changePassword(payload).subscribe(
      response => {
        if (response.message === "success") {
          this.passwdSuccess = true;
        } else {
          alert(response.message);
        }
      },
      err => {
        alert(this.languageContent[21]);
      }
    );
  }

  close() {
    this.passwdSuccess = false;
  }

  checkStatus() {}

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (
        Object.keys(content).length > 0 &&
        this._router["url"].indexOf("changePassword") >= 0
      ) {
        this.languageContent = content["change_password"];
        this.validation_messages = {
          currentPassword: [
            { type: "required", message: content["change_password"][15] }
          ],
          newPassword: [
            { type: "required", message: content["change_password"][16] },
            {
              type: "minlength",
              message: content["change_password"][17]
            },
            {
              type: "pattern",
              message: content["change_password"][18]
            }
          ],
          confirmPassword: [
            { type: "required", message: content["change_password"][19] },
            { type: "areEqual", message: content["change_password"][20] }
          ]
        };
      }
    });
  }

  showPassword() {
    if (this.fieldType === "password") {
      this.fieldType = "text";
      this.viewPassword = "assets/img/show.png";
    } else {
      this.fieldType = "password";
      this.viewPassword = "assets/img/hide.png";
    }
  }

  viewOldpassword(){
    if(this.oldPassword === "password") {
      this.oldPassword = "text";
      this.viewPassword1 = "assets/img/show.png";
    }else {
      this.oldPassword = "password";
      this.viewPassword1 = "assets/img/hide.png";
    }
  }
}
