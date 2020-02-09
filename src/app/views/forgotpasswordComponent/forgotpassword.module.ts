import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { ForgotPasswordRoutingModule } from './forgotpassword-routing.module';
import { CountdownTimerComponent } from './Countdown/component';

@NgModule({
  imports: [
    ForgotPasswordRoutingModule,
    CommonModule
  ],
  declarations: [ForgotPasswordComponent, CountdownTimerComponent]
})
export class ForgotPasswordModule { }
