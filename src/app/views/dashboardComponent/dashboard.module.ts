import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';
import { PopoverModule } from 'ngx-popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SurveyUpcomingComponent } from './survey-upcoming/component';
import { FiveBoxSectionComponent } from './fivebox-section/component';
import { TimelineComponent } from './timeline/component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        DashboardRoutingModule,
        CommonModule,
        FormsModule,
        BsDropdownModule,
        ModalModule.forRoot(),
        OrderModule,
        DirectivesModule,
        PopoverModule
    ],
    exports: [
        SurveyUpcomingComponent,
        FiveBoxSectionComponent,
        TimelineComponent
    ],
    declarations: [
        DashboardComponent,
        SurveyUpcomingComponent,
        FiveBoxSectionComponent,
        TimelineComponent
    ]
})
export class DashboardModule { }
