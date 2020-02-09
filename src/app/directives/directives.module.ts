import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
//import { StarRatingModule } from 'angular-star-rating';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NouisliderModule } from 'ng2-nouislider';
import { dynamicModuleMaps } from '../containers/dynamic-layout/dynamic-layout.maps';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-popover';
import { ImageCropperModule } from './image-cropper/image-cropper.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CKEditorModule,
       // StarRatingModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NouisliderModule,
        ModalModule.forRoot(),
        PopoverModule,
        ImageCropperModule
    ],
    declarations: dynamicModuleMaps,
    exports: dynamicModuleMaps,
    schemas: [NO_ERRORS_SCHEMA]
})
export class DirectivesModule { }
