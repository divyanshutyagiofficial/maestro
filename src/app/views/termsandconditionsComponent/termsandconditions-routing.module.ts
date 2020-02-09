import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { TermsAndConditionsComponent } from './termsandconditions.component';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionsComponent,
    data: {
      title: 'TermsAndConditions'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsAndConditionsRoutingModule { }
