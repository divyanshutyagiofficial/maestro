import { Component, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: '[question-rich-text-box]',
    template: `
        <div class="rc_bx">
            <ckeditor class="form-control"
                debounce="300" height="100"
                [(ngModel)]="field.question.input"
                (change)="notify('answered-question', { 'question' : field.question, 'value' : field.question.input })">
            </ckeditor>
        </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputRichTextComponent {
    @Input() field: any;
    @Input() notify;

    ngOnInit() {
        if(this.field.question.ansFreeText && this.field.question.ansFreeText[0]) {
            this.field.question.input = this.field.question.ansFreeText[0];
        }
    }
}
