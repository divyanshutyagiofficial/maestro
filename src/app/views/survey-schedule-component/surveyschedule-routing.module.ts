import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { SurveyScheduleComponent } from './surveyschedule.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyScheduleComponent,
    data: {
      title: 'SurveySchedule'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyScheduleRoutingModule { }
