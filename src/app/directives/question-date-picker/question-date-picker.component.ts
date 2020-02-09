import { Component, Input, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: '[question-date-picker]',
    template: `
        <div *ngIf="field" class="col-md-3">
        <div class="date_picker">
        <div class="form-group">
        <label>
                {{ field.text }}
        <input type="text"
               class="form-control"
               [minDate]="minDate"
               [maxDate]="maxDate"
               [bsConfig]="{ dateInputFormat: 'MMMM Do, YYYY' }"
               bsDatepicker [(bsValue)]="bsValue"
               value="{{ field.input | date:'MMMM d, y' }}"
               (bsValueChange)="textChange()">
        </label>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionDatePickerComponent implements OnInit {

    @Input() field: any;
    @Input() notify: Function;

    minDate: Date;
    maxDate: Date;
    bsValue: Date;
    debounce: boolean = false;

    ngOnInit() {
        console.log(this.field);
        this.minDate = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear() - 100);
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear());
        if (this.field.question.ansFreeText && this.field.question.ansFreeText[0]) {
            const day: number = Number(this.field.question.ansFreeText[0].split('/')[0]);
            const month: number = Number(this.field.question.ansFreeText[0].split('/')[1]);
            const year: number = Number(this.field.question.ansFreeText[0].split('/')[2]);
            this.bsValue = new Date(year, month - 1, day);
        } else {
            this.bsValue = new Date();
            this.bsValue.setFullYear(this.bsValue.getFullYear() - 9);
            this.textChange(true);
        }
        setTimeout(() => {
            this.debounce = true;
        }, 1000);
    }

    textChange(isDeBounceNotNeeded: boolean) {
        console.log(this.bsValue);
        console.log(this.bsValue.toDateString());
        /*const day = this.bsValue.getDate();
        const month = this.bsValue.getMonth() + 1;
        const year = this.bsValue.getFullYear();*/
        let date = this.bsValue.toDateString().split(' ')[1] + ' ' + this.bsValue.toDateString().split(' ')[2] + ', ' + this.bsValue.toDateString().split(' ')[3];
        console.log(date);
        this.field['input'] = date;
        console.log(this.field);

        if (isDeBounceNotNeeded) {
            this.notify('answered-question', { question: this.field.question, value: this.bsValue.toDateString() });
        } else {
            this.debounce && this.notify('answered-question', { question: this.field.question, value: this.bsValue.toDateString() });
        }

    }
}
