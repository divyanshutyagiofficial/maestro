import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: '[question-time-picker]',
    template: `
    <timepicker  [(ngModel)]="value" (ngModelChange)="debounce && notify('answered-question', { question : field.question, value : value })"></timepicker>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionTimePickerComponent {

    @Input() field: any;
    @Input() notify: Function;

    value: Date = new Date();
    debounce: boolean = false;

    ngOnInit() {
        setTimeout(() => {
            if (this.field['question']['ansFreeText'] && this.field['question']['ansFreeText'][0]) {
                this.value = this.field['question']['ansFreeText'][0] || '';
            }
            this.notify('answered-question', { question: this.field['question'], value: this.value });
            this.debounce = true;
        }, 100);
    }

    timeChange() {

    }

}
