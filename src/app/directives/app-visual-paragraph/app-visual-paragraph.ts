import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-paragraph',
    template: `
        <div class="column" *ngFor="let field of fields">
            <div class="small-title">
                {{ field.masterBank.header }}
            </div>
            <p>
                {{ field.masterBank.description | slice:0:450 }}
                <app-media [field]="field" ></app-media>
            </p>
            <p>{{ field.masterBank.description | slice:500:field.masterBank.description.length }}</p>
    </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppVisualParagraphComponent {
    @Input() fields: any;
}

