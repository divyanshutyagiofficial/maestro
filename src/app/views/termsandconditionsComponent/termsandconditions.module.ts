import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TermsAndConditionsComponent } from './termsandconditions.component';
import { TermsAndConditionsRoutingModule } from './termsandconditions-routing.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  imports: [
    TermsAndConditionsRoutingModule,
    DirectivesModule,
    CommonModule
  ],
  declarations: [TermsAndConditionsComponent]
})
export class TermsAndConditionsModule { }
