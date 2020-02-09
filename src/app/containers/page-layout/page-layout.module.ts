import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicLayoutModule } from '../dynamic-layout/dynamic-layout.module';
import { DynamicLayoutMaps } from '../dynamic-layout/dynamic-layout.maps';
import { PageLayoutComponent } from './page-layout.component';
import { SectionComponent } from './sections.component';
import { QuestionComponent } from './questions.component';
import { GroupComponent } from './groups.component';
import { GroupTabComponent } from './group-tab.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { pageLayoutModuleMaps } from '../../containers/dynamic-layout/dynamic-layout.maps';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DynamicLayoutModule,
        TabsModule.forRoot(),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
    ],
    exports: [
        PageLayoutComponent,
        SectionComponent,
        QuestionComponent,
    ],
    declarations: [
        PageLayoutComponent,
        SectionComponent,
        QuestionComponent,
        GroupComponent,
        GroupTabComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: pageLayoutModuleMaps
})
export class PageLayoutModule { }

