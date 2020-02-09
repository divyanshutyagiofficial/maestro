import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { SurveyDeclinedComponent } from './survey-declined.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyDeclinedComponent,
    data: {
      title: 'SurveyDeclined'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyDeclinedRoutingModule { }
