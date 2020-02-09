import { Component, Input, Output, ViewEncapsulation } from '@angular/core'

@Component({
    selector: '[question-input-dropdown]',
    template: `
    <div class="col-md-12">
    <label for="">{{ field.text }}</label>
    <div class="form-group" >
        <label>
            <select class="form-control dropdown" [(ngModel)]="field.question.answers[0]" (change)="changeTest()">
				<option value="" [selected]="!field.question.answers[0]" disabled="disabled">--</option>
				<option *ngFor="let c of field.question.choices; index as i" [value]="c.id" [selected]="field.question.answers[0] && (c.id == field.question.answers[0])">
				    {{ c.data }}
				</option>
			</select>
        </label>
        </div>
        <div class="help-block with-errors"></div>
    </div>
  `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputDropdownComponent {
    @Input() field: any;
    @Input() notify: Function;

    ngOnInit() {
        if (!this.field.question.answers || !this.field.question.answers[0]) {
            this.field.question.answers = [];
        }
    }

    changeTest() {
        this.notify('answered-question', { question: this.field.question, value: this.field.question.choices.filter(o => o.id == this.field.question.answers[0])[0] })
    }
}
