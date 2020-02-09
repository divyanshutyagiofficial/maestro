import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/bs-datepicker.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopoverModule } from 'ngx-popover';
import { ClosedDroComponent } from './closed-dro.component';
import { ClosedDroRoutingModule } from './closed-dro-routing.module';
import { ViewDrosListComponent } from './view-dros-list/component';
import { FourBoxSectionComponent } from './fourbox-section/component';
import { OrderrByPipe } from './orderby.pipe';

@NgModule({
  imports: [
    ClosedDroRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    PopoverModule
  ],
  declarations: [
    ClosedDroComponent,
    ViewDrosListComponent,
    FourBoxSectionComponent,
    OrderrByPipe
  ]
})
export class ClosedDroModule { }
