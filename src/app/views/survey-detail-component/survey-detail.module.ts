import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CKEditorModule } from "ng2-ckeditor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SurveyDetailComponent } from "./survey-detail.component";
import { SurveyDetailRoutingModule } from "./survey-detail-routing.module";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
//import { RatingModule } from './rating/rating.module'
import { RatingModule } from "ngx-rating";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker/bs-datepicker.module";

@NgModule({
  imports: [
    SurveyDetailRoutingModule,
    CommonModule,
    FormsModule,
    CKEditorModule,
    NgbModule,
    RatingModule,
    BsDatepickerModule,
    TimepickerModule
  ],
  declarations: [SurveyDetailComponent]
})
export class SurveyDetailModule {}
