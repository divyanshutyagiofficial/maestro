import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService, ProgramService, UserService } from '../../services';
import { CountdownTimerComponent } from './Countdown/component';

@Component({
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('verificationCode') input: ElementRef;
  @ViewChild(CountdownTimerComponent)
  timerComponent: CountdownTimerComponent;
  forgotPasswordContent: any = {};
  forgotPasswordFields: any = {};
  shrtEmailId: string = '';
  mailSent: boolean = false;
  showResend: boolean = false;
  startSending: boolean = false;
  errorMessage: string = '';
  verificationCodeError = false;
  isVerificationCodeValid = false;

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length && this._router['url'].indexOf('forgotpassword') >= 0) {
        this.forgotPasswordContent = content['forgot_password'];
        if (this._userService.getUserName()) {
          this._programService.getOrganizationConfig().subscribe(orgConfig => {
            if (orgConfig['form'] && orgConfig['form']['auth'] && orgConfig['form']['auth']['bodies']) {
              this.forgotPasswordFields = orgConfig['form']['auth']['bodies'].filter(body => {
                return (body[0]['type'] === 'FORGOT_PASSWORD');
              })[0][0];
            }
            this.shrtEmailId = this._userService.getShortEmailId();
          });
        }
      }
    });
  }

  sendVerificationMail(resend: boolean) {
    this.startSending = true;
    if (resend) {
      this.timerComponent.start();
    }
    this._userService.sendVerificationMail().subscribe(mailStatus => {
      this.startSending = false;
      if (mailStatus['message'] === 'Success') {
        this.mailSent = true;
      } else {
        this.errorMessage = mailStatus['message'];
      }
    }, error => {
    });
  }

  verifyCode() {
    if (this.input['nativeElement']['value']) {
      this._userService.verifyVerificationCode(this._userService.getUserName().toLocaleLowerCase(), this.input['nativeElement']['value'])
        .subscribe((data) => {
          if (data['message'] === 'Success') {
            this._userService.setVerificationCode(this.input['nativeElement']['value']);
            this._router.navigate(['/newpassword']);
          } else {
            this.verificationCodeError = true;
          }
        })
    } else {
      this.verificationCodeError = true;
    }
  }

  timesup(message: string) {
    if (message === 'TimesOver') {
      this.showResend = true;
    }
  }

  keyup(value: string) {
    if (value) {
      this.isVerificationCodeValid = true;
    } else {
      this.isVerificationCodeValid = false;
    }
  }


}
