import { Component, Input, Output, ViewEncapsulation, ViewChild, ElementRef, VERSION } from '@angular/core';

@Component({
    selector: '[question-input-slider]',
    template: `
        <div class="col-md-12">
                <nouislider #slider
                    [min]="someMin" [max]="someMax" [connect] = [true,true]
                    [config]="{ start : [someMin], margin: 1, behaviour: 'drag', step: 0.1,
                    pageSteps: 10, pips: {
                        mode: 'count',
                        density: 1,
                        values: 11,
                        stepped: true
                      } }"
                    [(ngModel)]="field.question.ansFreeText[0]"
                    (change)="notify('answered-question', { question : field.question, value: this.field.question.ansFreeText[0]})"
                    ></nouislider>
        </div>
        <div style="padding-top:70px;">Value: {{ field.question.ansFreeText[0] }}</div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionInputSliderComponent {

    @Input() field: any;
    @Input() notify: Function;
    @ViewChild('slider', { read: ElementRef }) slider: ElementRef;
    public someRange: number[] = [1, 15];
    public someMin: number = 0;
    public someMax: number = 10;

    ngAfterViewInit() {
        this.func();
    }
    //Value: {{ field.question.ansFreeText[0] }}
    func() {
        const connect = this.slider.nativeElement.querySelectorAll('.noUi-connect');
        const classes = ['c-1-color', 'c-2-color'];
        for (let i = 0; i < connect.length; i++) {
            connect[i].classList.add(classes[i]);
        }
    }

    ngOnInit() {
        if (!this.field.question.ansFreeText || !this.field.question.ansFreeText[0]) {
            this.field.question.ansFreeText = [];
        }
    }

}
