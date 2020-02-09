import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { ForgotPasswordComponent } from './forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgotpassword'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
