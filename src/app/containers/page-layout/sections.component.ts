import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[survey-section]',
    template: `
      <div class="value_section" *ngIf="sections[current.section].questions" survey-question [question]="sections[current.section].questions" [notify]="notify"></div>
      <div class="container" *ngIf="sections[current.section].group" survey-group [group]="sections[current.section].group" [notify]="notify"></div>
      <div class="column_section" *ngIf="sections[current.section].groupTab" survey-group-tab [groupTab]="sections[current.section].groupTab" [notify]="notify"></div>`,

})
export class SectionComponent {
    @Input() sections: any;
    @Input() current: any;
    @Input() notify: Function;

}

