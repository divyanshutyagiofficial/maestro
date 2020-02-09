import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { SurveyScheduleComponent } from './surveyschedule.component';
import { SurveyScheduleRoutingModule } from './surveyschedule-routing.module';
import { CalenderComponent } from '../../views/survey-schedule-component/calender/component';
import { SurveyScheuleListComponent } from '../survey-schedule-component/survey-scheule-list/survey-scheule-list.component';
import { SurveyScheuleListItemComponent } from '../survey-schedule-component/survey-scheule-list-item/survey-scheule-list-item.component'

@NgModule({
    imports: [
        SurveyScheduleRoutingModule,
        CommonModule,
        ClipboardModule,
        FormsModule,
    ],
    declarations: [
        SurveyScheduleComponent,
        CalenderComponent,
        SurveyScheuleListComponent,
        SurveyScheuleListItemComponent
    ]
})
export class SurveyScheduleModule { }
