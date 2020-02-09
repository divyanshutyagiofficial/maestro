import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[question-input-checkbox]',
    template: `
        <!--p>{{ field.text }}</p-->
        <div class="col-md-12">
            <div class="questionnaire-options btn-group btn-group-vertical">
                <!-- <mat&#45;radio&#45;group> -->
				<p class="heading" *ngFor="let c of field.question.choices" >
                    <label [for]="'radio-' + field.question.id  + '-' + c.id">

                       <!-- <input type="checkbox" class="checkbox" [id]="'radio-' + field.question.id  + '-' + c.id" [value]="c.id" (change)="notify('answered-question-multi', { question : field.question, value : [c] });checkAnswer(c)" [checked]="isChecked(c)"/>
					     <span style="font-size: 1.3em;"> {{ c.data }} </span>  -->
                        <!-- <input type="checkbox" class="checkbox" [id]="'radio-' + field.question.id  + '-' + c.id" [value]="c.id" (change)="notify('answered-question-multi', { question : field.question, value : [c] });checkAnswer(c)" [checked]="isChecked(c)"/>-->
                        
                        <input type="checkbox" class="btn btn-primary" [id]="'radio-' + field.question.id  + '-' + c.id" [value]="c.id" (change)="checkAnswer(c);notify('answered-question-multi', { question : field.question, value : [c] })" [checked]="isChecked(c)"/>
                        <span style="font-size: 1.3em;"> {{ c.data }} </span>

                    </label>
				</p>
            </div>
        </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputCheckboxComponent {
    @Input() field: any;
    @Input() notify: Function;

    ngOnInit() {
        console.log(this.field);
        if (!this.field.question.answers) {
            this.field.question.answers = [];
            if (this.field.question.ansFreeText && this.field.question.ansFreeText[0]) {
                this.field.question.ansFreeText[0].split(',').filter(v => !!v).forEach(v => {
                    this.field.question.answers.push(this.field.question.choices.filter(w => w.id == v)[0]);
                });
            }
        }
    }

    isChecked(c) {
        console.log(c);
        return this.field.question.answers && this.field.question.answers.filter(v => v.id == c.id).length;
    }

    checkAnswer(c) {
        console.log(c);
        this.field['question']['answers'] && (() => {
            if (this.isChecked(c)) {
                this.field['question']['answers'].forEach((v, i, a) => {
                    if (v.id === c.id) {
                        a.splice(i, 1);
                    }
                })
            } else {
                this.field.question.answers.push(c);
            }
        })()
    }
}

