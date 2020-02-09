import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, ProgramService } from '../../services';

@Component({
    selector: '[app-link]',
    template: `
        <div class="col-md-12">
            <div class="form-group forgot-password">
                <p style="font-size: 12px; color: red;">{{errorMessage}}</p>
                <a class="forget-link" (click)="check()" referrerpolicy="origin">{{ field.masterBank.description }}</a>
            </div>
        </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppVisualLinkComponent {
    errorMessage: string;
    @Input() field: any;
    @Output() notify;
    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }

    check() {
        let email = (<HTMLInputElement>document.getElementById('EMAIL'));
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const userName = this._userService.getUserName();
        if (email && email.value.match(mailFormat)) {
            this._userService.setUserName(email.value);
            document.getElementById('EMAIL').style.border = '1px solid #d4dbe3';
            this._router.navigate(['../forgotpassword']);
            this.errorMessage = null;
        } else {
            this.errorMessage = 'Please enter a valid Email Id in order to proceed.'
            document.getElementById('EMAIL').style.border = '1px solid red';

        }
    }
}

