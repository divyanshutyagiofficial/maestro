import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
    selector: '[question-input-rating]',
    template: `
        <star-rating-comp
            [starType]="'svg'"
            [size]="'large'"
            [showHalfStars]="true"
            [step]="0.5"
            [rating]="(field.question.input) ? field.question.input : 0"
            (onClick)="onRatingChange($event)">
        </star-rating-comp>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputRatingComponent {
    @Input() field: any;
    @Input() notify;

    ngOnInit() {
        if (this.field.question.ansFreeText && this.field.question.ansFreeText[0]) {
            this.field.question.input = Number(this.field.question.ansFreeText[0]);
        }
    }

    onRatingChange($event) {
        if (this.field.question.input == $event.rating) {
            if (Math.abs($event.rating) == $event.rating) {
                $event.rating += 0.5;
                this.field.question.input = $event.rating;
            }
        } else {
            this.field.question.input = $event.rating;
        }

        this.notify('answered-question', { question: this.field.question, value: this.field.question.input.toFixed(2) });
    };
}
