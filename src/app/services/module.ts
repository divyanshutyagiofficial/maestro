import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService, DashboardService, UserService, ProgramService, EventEmitterService, SurveyService,
         ViewMessageService, SessionTimeoutService } from '../services';
import { OrganizationApiService, UserApiService, ViewMessageApiService } from '../rest-api-services';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [],
    exports: [],
    imports: [CommonModule, HttpModule],
    providers: [...[
        AuthGuardService,
        DashboardService,
        EventEmitterService,
        OrganizationApiService,
        ProgramService,
        SessionTimeoutService,
        SurveyService,
        UserService,
        UserApiService,
        ViewMessageService
    ]],
})
export class ServiceModule { }
