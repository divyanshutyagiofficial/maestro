import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { DisclaimerRoutingModule } from './disclaimer-routing.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  imports: [
    DisclaimerRoutingModule,
    CommonModule,
    DirectivesModule
  ],
  declarations: [ DisclaimerComponent ]
})
export class DisclaimerModule { }
