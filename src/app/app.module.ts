import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { NouisliderModule } from "ng2-nouislider";
import { BlockUIModule } from "ng-block-ui";
import { OrderModule } from "ngx-order-pipe";
import { CKEditorModule } from "ng2-ckeditor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TabsModule } from "ngx-bootstrap/tabs";
import { AppComponent } from "./app.component";
import { AppFooterComponent, AppHeaderComponent } from "./components";
import {
  FullLayoutComponent,
  SimpleLayoutComponent,
  SurveyComponent,
  CROLayoutComponent
} from "./containers";
import { P404Component } from "./views/pages/p404.component";
import { SurveyExpiredComponent } from "./views/pages/surveyExpired.component";
import { ThankYouComponent } from "./views/pages/thankyou.component";
import { ResultComponent } from "./views/pages/result.component";
import { LoadingComponent } from "./views/pages/loading.component";
import { SurveyDetailData } from "./views/survey-detail-component/surveyDetailData";
import { ReplaceDirective } from "./directives";
import { AppRoutingModule } from "./app.routing";
/*import {NoopAnimationsModule} from '@angular/platform-browser/animations';*/
import {
  DashboardService,
  ProgramService,
  UserService,
  SurveyGuardService,
  AdhocGuardService,
  AuthGuardService,
  EventEmitterService,
  ViewMessageService,
  SessionTimeoutService,
  SurveyDetailService
} from "./services";
import {
  DashboardApiService,
  OrganizationApiService,
  SurveyApiService,
  RestApiService,
  ViewMessageApiService
} from "./rest-api-services";
import { ServiceModule } from "./services/module";
import { RestApiServiceModule } from "./rest-api-services/module";
import { NgxPaginationModule } from "ngx-pagination";
import { DashboardModule } from "./views/dashboardComponent/dashboard.module";
import { AdhocLayoutComponent } from "./containers/adhoc-layout";
import { CroGuardService } from "./services/cro.guard";

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent,
  SurveyComponent,
  AdhocLayoutComponent,
  CROLayoutComponent
];

const APP_COMPONENTS = [AppFooterComponent, AppHeaderComponent];

const APP_DIRECTIVES = [ReplaceDirective];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    HttpModule,
    ServiceModule,
    RestApiServiceModule,
    NouisliderModule,
    BlockUIModule,
    NgxPaginationModule,
    OrderModule,
    HttpClientModule,
    CKEditorModule,
    //NoopAnimationsModule,
    NgbModule.forRoot(),
    DashboardModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    P404Component,
    SurveyExpiredComponent,
    ThankYouComponent,
    ResultComponent,
    LoadingComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuardService,
    AdhocGuardService,
    CroGuardService,
    DashboardService,
    DashboardApiService,
    EventEmitterService,
    ProgramService,
    UserService,
    RestApiService,
    SessionTimeoutService,
    SurveyGuardService,
    OrganizationApiService,
    SurveyApiService,
    ViewMessageService,
    ViewMessageApiService,
    SurveyDetailService,
    SurveyDetailData
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
