import { Component, Input, Output, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: '[app-button]',
    template: `
        <div class="col-md-12">
            <div class="form-group">
                <input id="submit" type="submit" class="btn btn-send" [value]="field.text" (click)="notify('AppInputButtonComponent', field)">
            </div>
        </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppInputButtonComponent {
    @Input() field: any;
    @Output() notify;
}

