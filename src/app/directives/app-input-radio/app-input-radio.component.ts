   import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[app-input-radio]',
    template: `
    <div class="col-md-12">
    	<label class="chk_per_lb" for="">{{ field.text }}</label>
		<div class="clearfix"></div>
        <div class="form-group">
			<div class="row"><p class="col-md-6 heading heading_personal chk_per" *ngFor="let c of field.values" >
			
                <label [for]="'radio-' + field.fieldId  + '-' + c">
  					<input type="radio" class="" [id]="'radio-' + field.fieldId + '-' + c" [name]="'radio-' + field.fieldId" [(ngModel)]="field.input" [value]="c" (change)="notify('changed-input', field)"/>
					<span style="font-size: 1.3em;"> {{ c }} </span>
                </label>
            </p>
        </div>   </div>
        <div class="help-block with-errors"></div>
    </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppInputRadioComponent {
    @Input() field: any;
    @Output() notify;
}
