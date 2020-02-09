import { Component, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: '[app-text]',
    template: `
        <p>{{ field.masterBank.description }}</p>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppVisualTextComponent {
    @Input() field: any;
    @Output() notify;
}

