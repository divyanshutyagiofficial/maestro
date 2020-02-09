import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SurveyIntentFormComponent } from './survey-intent-form.component';
import { IntentBlockComponent } from './survey-intent-form-block.component';
import { SurveyIntentFormRoutingModule } from './survey-intent-form-routing.module';

@NgModule({
    imports: [
        SurveyIntentFormRoutingModule,
        BsDropdownModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [SurveyIntentFormComponent, IntentBlockComponent]
})
export class SurveyIntentFormModule { }
