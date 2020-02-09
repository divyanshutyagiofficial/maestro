import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { P404Component } from "./views/pages/p404.component";
import { SurveyExpiredComponent } from "./views/pages/surveyExpired.component";

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent,
  SurveyComponent,
  AdhocLayoutComponent,
  CROLayoutComponent
} from "./containers";

import { AuthGuardService } from "./services";
import { SurveyGuardService } from "./services";
import { AdhocGuardService } from "./services";
import { ThankYouComponent } from "./views/pages/thankyou.component";
import { ResultComponent } from "./views/pages/result.component";
import { LoadingComponent } from "./views/pages/loading.component";
import { CroGuardService } from "./services/cro.guard";

export const routes: Routes = [
  {
    path: "404",
    component: P404Component
  },
  {
    path: "expired",
    component: SurveyExpiredComponent
  },
  {
    path: "thankyou",
    component: ThankYouComponent,
    canActivate: [AdhocGuardService]
  },
  {
    path: "cro-thankyou",
    component: ThankYouComponent
  },
  {
    path: "result/:score",
    component: ResultComponent
  },
  {
    path: "",
    component: FullLayoutComponent,
    data: {
      title: "Home"
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: "dashboard",
        loadChildren:
          "./views/dashboardComponent/dashboard.module#DashboardModule"
      },
      {
        path: "components",
        loadChildren: "./views/components/components.module#ComponentsModule"
      },
      {
        path: "personaldetails",
        loadChildren:
          "./views/personal-details-component/personal-details.module#PersonalDetailsModule"
      },
      {
        path: "schedule",
        loadChildren:
          "./views/survey-schedule-component/surveyschedule.module#SurveyScheduleModule"
      },
      {
        path: "declined",
        loadChildren:
          "./views/survey-declined-component/survey-declined.module#SurveyDeclinedModule"
      },
      {
        path: "intent",
        loadChildren:
          "./views/survey-intent-form-component/survey-intent-form.module#SurveyIntentFormModule",
        canActivate: [SurveyGuardService]
      },
      {
        path: "viewmessage",
        loadChildren:
          "./views/view-message-component/view-message.module#ViewMessageModule"
      },
      {
        path: "studyinfo",
        loadChildren:
          "./views/studyInfoComponent/study.info.module#StudyInfoModule"
      },
      {
        path: "viewdros",
        loadChildren:
          "./views/closed-dro-component/closed-dro.module#ClosedDroModule"
      },
      {
        path: "changePassword",
        loadChildren:
          "./views/change-password-component/change-password.module#ChangePasswordModule"
      },
      {
        path: "survey",
        loadChildren:
          "./views/survey-detail-component/survey-detail.module#SurveyDetailModule",
        canActivate: [SurveyGuardService]
      }
    ]
  },
  {
    path: "",
    component: SimpleLayoutComponent,
    data: {
      title: "BeforeLogin"
    },
    children: [
      {
        path: "login",
        loadChildren: "./views/loginComponent/login.module#LoginModule"
      },
      {
        path: ":orgCode/:progCode/welcome",
        loadChildren: "./views/welcomeComponent/welcome.module#WelcomeModule"
      },
      {
        path: "forgotpassword",
        loadChildren:
          "./views/forgotpasswordComponent/forgotpassword.module#ForgotPasswordModule"
      },
      {
        path: "newpassword",
        loadChildren:
          "./views/newpasswordComponent/newpassword.module#NewPasswordModule"
      },
      {
        path: "termsandconditions",
        loadChildren:
          "./views/termsandconditionsComponent/termsandconditions.module#TermsAndConditionsModule"
      },
      {
        path: "privacy",
        loadChildren: "./views/privacyComponent/privacy.module#PrivacyModule"
      },
      {
        path: "legal",
        loadChildren: "./views/legalComponent/legal.module#LegalModule"
      },
      {
        path: "disclaimer",
        loadChildren:
          "./views/disclaimerComponent/disclaimer.module#DisclaimerModule"
      },
      {
        path: "oops",
        component: P404Component
      }
    ]
  },
  {
    path: "",
    component: AdhocLayoutComponent,
    data: {
      title: "Adhoc"
    },
    children: [
      {
        path: "adhoc/:token",
        loadChildren: "./views/welcomeComponent/welcome.module#WelcomeModule"
      },
      {
        path: "adhoc-login",
        loadChildren: "./views/loginComponent/login.module#LoginModule"
      },
      {
        path: "adhoc-intent",
        loadChildren:
          "./views/survey-intent-form-component/survey-intent-form.module#SurveyIntentFormModule"
      },
      {
        path: "adhoc-survey",
        loadChildren:
          "./views/survey-detail-component/survey-detail.module#SurveyDetailModule",
        canActivate: [AdhocGuardService]
      },
      {
        path: "termsandconditions_",
        loadChildren:
          "./views/termsandconditionsComponent/termsandconditions.module#TermsAndConditionsModule"
      },
      {
        path: "privacy_",
        loadChildren: "./views/privacyComponent/privacy.module#PrivacyModule"
      },
      {
        path: "legal_",
        loadChildren: "./views/legalComponent/legal.module#LegalModule"
      },
      {
        path: "disclaimer_",
        loadChildren:
          "./views/disclaimerComponent/disclaimer.module#DisclaimerModule"
      }
    ]
  },
  {
    path: "",
    component: CROLayoutComponent,
    data: {
      title: "CRO"
    },
    children: [
      {
        path: "cro/:token",
        component: LoadingComponent
      },
      {
        path: "cro-intent",
        loadChildren:
          "./views/survey-intent-form-component/survey-intent-form.module#SurveyIntentFormModule"
      },
      {
        path: "cro-survey",
        loadChildren:
          "./views/survey-detail-component/survey-detail.module#SurveyDetailModule",
        canActivate: [CroGuardService]
      },
      {
        path: "_termsandconditions",
        loadChildren:
          "./views/termsandconditionsComponent/termsandconditions.module#TermsAndConditionsModule"
      },
      {
        path: "_privacy",
        loadChildren: "./views/privacyComponent/privacy.module#PrivacyModule"
      },
      {
        path: "_legal",
        loadChildren: "./views/legalComponent/legal.module#LegalModule"
      },
      {
        path: "_disclaimer",
        loadChildren:
          "./views/disclaimerComponent/disclaimer.module#DisclaimerModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
