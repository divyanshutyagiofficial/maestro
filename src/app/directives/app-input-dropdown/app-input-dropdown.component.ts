import { Component, Input, Output,ViewEncapsulation } from '@angular/core'

@Component({
    selector: '[app-input-dropdown]',
    template: `
    <div class="col-md-12">
    <label for="">{{ field.text }}</label>
    <div class="form-group" >
        <label>
            <select class="form-control dropdown" [(ngModel)]="field.input" (change)="notify('changed-input', field)">
				<option value="" [selected]="!field.input" disabled="disabled">--</option>
				<option  *ngFor="let value of field.values" [value]="value" [selected]="value == field.input">{{ value }}</option>
			</select>
        </label>
        </div>
        <div class="help-block with-errors"></div>
    </div>
  `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None

})
export class AppInputDropdownComponent {
    @Input() field: any;
    @Input() notify : Function;
}
