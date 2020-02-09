import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { Validator } from '../validators';

@Component({
    selector: '[app-input-number]',
    template: `
    <div class="col-md-3">
            <div class="form-group">
                <label for="form_lastname">
                    {{ field.text }}
                </label>
                <input id="form_name"
                    name="name"
                    class="form-control"
                    data-error="Firstname is required."
                    type="number"
                    [placeholder]="field.placeHolder"
                    [required]="field.required"
                    [(ngModel)]="field.input"
                    (change)="validate(field.input)"
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
export class AppInputNumberComponent {

    @Input() field: any;
    @Input() notify: Function;

    validate: Function;
    validationResults: any = {};

    ngOnInit() {
        this.field.input = this.field.input.replace(/ /g,'');
        this.validate = new Validator()
            .prepare(this.field, this.validationResults, (value, errors: any = {}) => {
                this.field.errors = errors;
                this.notify('changed-input', this.field);
            })
    }
}
