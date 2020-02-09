import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { Validator } from '../validators';
import { error } from 'util';

@Component({
    selector: '[question-input-textbox]',
    template: `
        <div class="col-md-3">
            <div class="form-group">
                <input id="form_name"
                    type="text"
                    class="form-control"
                    [(ngModel)]="field.question.ansFreeText[0]"
                    (change)="validate(field.question.ansFreeText[0])"
                />
                <div class="help-block with-errors">
                    <span class="error" *ngIf="validationResults['test']">
                        {{ validationResults['message'] }}
                    </span>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputTextComponent {
    @Input() field: any;
    @Input() notify: Function;

    validate: Function;
    validationResults: any = {};

    ngOnInit() {
        if (!this.field.question.ansFreeText || !this.field.question.ansFreeText[0]) {
            this.field.question.ansFreeText = [''];
        }

        this.validate = new Validator()
            .prepare(this.field.question, this.validationResults, (value, errors: any = {}) => {
                this.field.question.errors = errors;
                this.notify('answered-question', { question: this.field.question, value: this.field.question.ansFreeText[0] });
            });
    }
}
