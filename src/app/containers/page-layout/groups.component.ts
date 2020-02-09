import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[survey-group]',
    template: `
    <div class="column">
        <div class="row" *ngFor="let question of group.questions" survey-question [question]="question" [notify]="notify"></div>
    </div>
    `,

})
export class GroupComponent {
    @Input() group: any;

    @Input() notify;

    ngOnInit() {
    }
}

