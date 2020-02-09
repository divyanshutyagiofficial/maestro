import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { SurveyIntentFormComponent } from './survey-intent-form.component';

const routes: Routes = [
    {
        path: '',
        component: SurveyIntentFormComponent,
        data: {
            title: 'SurveyIntentForm'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyIntentFormRoutingModule { }
