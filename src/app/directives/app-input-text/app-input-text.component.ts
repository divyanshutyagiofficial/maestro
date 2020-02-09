import { Component, Input, Output, ViewEncapsulation } from "@angular/core";
import { Validator } from "../validators";
import { UserService } from "../../services";

@Component({
  selector: "[app-text-box]",
  template: `
    <div class="col-md-12">
      <div class="form-group">
        <label for="form_lastname">
          {{ field.text }}
        </label>
        <input
          [id]="field.fieldType"
          name="name"
          class="form-control"
          data-error="Firstname is required."
          type="{{ type }}"
          [placeholder]="field.placeHolder"
          [required]="field.required"
          [(ngModel)]="field.input"
          (change)="validate(field.input)"
          required="true"
          (keyup)="check($event)"
          readonly
          (focus)="inputEdittable($event)"
        />
        <div class="help-block with-errors">
          <span class="error" *ngIf="validationResults['test']">
            {{ validationResults["message"] }}
          </span>
        </div>
        <div *ngIf="field.fieldType.toLowerCase() == 'password'">
          <img src="{{ src }}" (click)="toggle()" content="origin" alt="" />
        </div>
        <div *ngIf="field.fieldType.toLowerCase() == 'password'">
          <a *ngIf="warning" referrerpolicy="origin">{{ warning }}</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../../../assets/css/question-component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppInputTextComponent {
  constructor(private _userService: UserService) {}

  @Input() field: any;
  @Output() notify;

  validate: Function;
  validationResults: any = {};
  src: any = "assets/img/hide.png";
  type: any = "field.fieldType.toLowerCase()";
  warning;

  inputEdittable(e) {
    e.target.readOnly = false;
  }

  toggle() {
    if (this.type == "password") {
      this.type = "text";
      this.src = "assets/img/show.png";
    } else {
      this.type = "password";
      this.src = "assets/img/hide.png";
    }
  }

  ngOnInit() {
    this.type = this.field.fieldType.toLowerCase();
    this.validate = new Validator().prepare(
      this.field,
      this.validationResults,
      (value, errors: any = {}) => {
        this.field.errors = errors;
        this.notify("changed-input", this.field);
      }
    );
  }

  check(e) {
    let email = (<HTMLInputElement>document.getElementById("EMAIL")).value;
    let password = (<HTMLInputElement>document.getElementById("PASSWORD"))
      .value;
    let error1 = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let error2 = password.length < 8;
    if (!error1 && !error2) {
      (<HTMLInputElement>document.getElementById("submit")).disabled = false;
      this.checkForCaps(password, e);
      this._userService.setUserName(email);
    } else {
      (<HTMLInputElement>document.getElementById("submit")).disabled = true;
      this.checkForCaps(password, e);
    }
  }

  checkForCaps(password, e) {
    if (
      password.toUpperCase() === password &&
      password.toLowerCase() !== password &&
      !e.shiftkey
    )
      this.warning = "Capslock is On !!!";
    else this.warning = null;
  }

  setUserName(userName: string) {
    this._userService.setUserName(userName);
  }
}
