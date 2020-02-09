import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyDetailComponent } from './survey-detail.component';

const routes: Routes = [{
    path: '',
    component: SurveyDetailComponent,
    data: {
        title: 'Survey'
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyDetailRoutingModule { }

