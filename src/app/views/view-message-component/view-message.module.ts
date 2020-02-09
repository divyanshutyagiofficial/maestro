import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ViewMessageComponent } from './view-message.component';
import { ViewMessageRoutingModule } from './view-message-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { OrderrByPipe } from './orderby.pipe';

@NgModule({
    imports: [
        ViewMessageRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [ViewMessageComponent, OrderrByPipe, FilterPipe]
})
export class ViewMessageModule { }
