import { Component, Input, Output, ViewEncapsulation } from '@angular/core'

@Component({
    selector: '[app-input-checkbox]',
    template: `
    <div class="col-md-12">
    	<label for="">{{ field.text }}</label>
        <div *ngFor="let c of field.values;" >
	        <p class="col-md-6 row heading heading_personal" >
                <label [for]="'radio-' + field.fieldId  + '-' + c.value">
	                <input type="checkbox"
                        [required]="field.required"
                        data-error="checkbox is required."
                        [id]="'radio-' + field.fieldId + '-' + c.value"
                        [name]="'radio-' + field.fieldId"
                        [value]="c.value"
                        (change)="checkAnswer(c);notify('changed-input', field)"
						[checked]="c.isChecked"
                    />
       	            <span style="font-size: 1.3em;" > {{ c.value }} </span>
                </label>
            </p>
        </div>
        <div class="help-block with-errors"></div>
    </div>
  `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None

})
export class AppInputCheckboxComponent {
    @Input() field: any;
    @Input() notify: Function;

    ngOnInit() {
        if(!this.field.values[0]['value']){
            this.field.values.forEach((value, index) => {
                this.field.values[index] = { value: value };
                if (this.field.input.includes(value)) {
                    this.field['values'][index]['isChecked'] = true;
                }
            })
        }
    }

    checkAnswer(c) {
        let values = [];
        c['isChecked'] = !c['isChecked'];
        this.field.input = this.field['values'].filter(object => { return object['isChecked'] == true }).forEach(value => {
            values.push(value['value']);
        });
        this.field.input = values.toString() + ' ';
    }
}
