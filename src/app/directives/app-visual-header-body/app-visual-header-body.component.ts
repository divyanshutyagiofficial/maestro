import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-visual-header-body',
    template: `
        <div class="column" *ngFor="let field of fields">
            <div class="small-title">
                {{ field.masterBank.header }}
            </div>
            <p>
                {{ field.masterBank.description }}
                <app-media [field]="field" ></app-media>
            </p>
            
    </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppVisualHeaderBodyComponent {
    @Input() fields: any;
}
