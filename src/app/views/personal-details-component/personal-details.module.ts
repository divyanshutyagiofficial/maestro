import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalDetailsComponent } from './personal-details.component';
import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { DynamicLayoutModule } from '../../containers/dynamic-layout/dynamic-layout.module';

@NgModule({
  imports: [
    PersonalDetailsRoutingModule,
    CommonModule,
    FormsModule,
    DynamicLayoutModule
  ],
  declarations: [ PersonalDetailsComponent ]
})
export class PersonalDetailsModule { }
