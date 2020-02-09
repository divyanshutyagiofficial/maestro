import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { DisclaimerComponent } from './disclaimer.component';

const routes: Routes = [
  {
    path: '',
    component: DisclaimerComponent,
    data: {
      title: 'Disclaimer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisclaimerRoutingModule { }
