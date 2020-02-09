import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { StudyInfoComponent } from './study.info.component';
import { StudyInfoRoutingModule } from './study.info-routing.module';

@NgModule({
  imports: [
    StudyInfoRoutingModule,
    CommonModule,
    DirectivesModule
  ],
  declarations: [ StudyInfoComponent ]
})
export class StudyInfoModule { }
