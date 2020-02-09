import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';

@NgModule({
  imports: [
    LegalRoutingModule,
    DirectivesModule,
    FormsModule,
    CommonModule
  ],
  declarations: [ LegalComponent ]
})
export class LegalModule { }
