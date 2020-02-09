import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[survey-group-tab]',
    template: `<div>
                <tabset>
                <tab title="{{group.headerTexts[0]}}" heading="{{group.headerTexts[0]}}" *ngFor="let group of groupTab" survey-group [group]="group" [notify]="notify"></tab>
                </tabset>
                </div>`,

} )
export class GroupTabComponent {
    @Input() groupTab: any;
    @Input() notify: Function;

    ngOnInit(){

    }

}
