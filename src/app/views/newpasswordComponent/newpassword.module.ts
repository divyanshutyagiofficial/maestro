import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './newpassword.component';
import { NewPasswordRoutingModule } from './newpassword-routing.module';

@NgModule({
  imports: [
    NewPasswordRoutingModule,
    CommonModule
  ],
  declarations: [ NewPasswordComponent]
})
export class NewPasswordModule { }
