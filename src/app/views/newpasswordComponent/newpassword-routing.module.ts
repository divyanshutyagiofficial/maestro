import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { NewPasswordComponent } from './newpassword.component';

const routes: Routes = [
  {
    path: '',
    component: NewPasswordComponent,
    data: {
      title: 'NewPassword'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
