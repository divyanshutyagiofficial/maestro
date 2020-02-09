import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { DynamicLayoutComponent } from './dynamic-layout.component';
import { DynamicLoaderComponent } from './dynamic-loader.component';
import { layoutMaps } from './dynamic-layout.maps';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectivesModule
    ],
    exports: [
        DynamicLayoutComponent,
        DynamicLoaderComponent
    ],
    declarations: [
        DynamicLayoutComponent,
        DynamicLoaderComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: layoutMaps
})
export class DynamicLayoutModule { }

