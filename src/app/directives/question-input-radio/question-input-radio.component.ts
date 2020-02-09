import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[question-input-radio]',
    template: `
        <!--p>{{ field.text }}</p-->
        <div class="col-md-12">
            <div class="questionnaire-options btn-group btn-group-vertical">
				<p class="heading" *ngFor="let c of field.question.choices" >
                    <label [for]="'radio-' + field.question.id  + '-' + c.id">
  						<input type="radio" class="btn btn-primary" [id]="'radio-' + field.question.id + '-' + c.id" [name]="'radio-' + field.question.id" [(ngModel)]="field.question.answers[0]" [value]="c.id" (change)="notify('answered-question', { 'question' : field.question, value : c })"/>
						<span *ngIf="c.url == null" style="font-size: 1.3em;vertical-align: middle;"> {{ c.data }}</span> <div class="image_text" *ngIf="c.url != null">{{ c.data }}</div> <img *ngIf="c.url != null" class="choice_img" src="{{c.url}}" content="origin" alt="" />
					</label>
				</p>
            </div>
        </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputRadioComponent {
    @Input() field: any;
    @Input() notify: Function

    ngOnInit() {
        if (!this.field.question.answers || !this.field.question.answers[0]) {
            this.field.question.answers = [];
        }
    }
}

