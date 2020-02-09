import { Component, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: '[app-rich-text-box]',
    template: `
        <ckeditor class="form-control" debounce="300" > </ckeditor>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None

})
export class AppInputRichTextComponent {
    @Input() field: any;
    @Output() notify;
}
