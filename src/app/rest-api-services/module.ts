import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DashboardApiService, OrganizationApiService, RestApiService, SurveyApiService, UserApiService,
         ViewMessageApiService } from '../rest-api-services';

@NgModule({
    declarations: [],
    exports: [],
    imports: [CommonModule, HttpModule],
    providers: [...[
        DashboardApiService,
        OrganizationApiService,
        RestApiService,
        SurveyApiService,
        UserApiService,
        ViewMessageApiService
    ]],
})
export class RestApiServiceModule { }
