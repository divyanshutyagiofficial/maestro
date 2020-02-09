import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';

@NgModule({
  imports: [
    PrivacyRoutingModule,
    CommonModule,
    DirectivesModule
  ],
  declarations: [PrivacyComponent]
})
export class PrivacyModule { }
