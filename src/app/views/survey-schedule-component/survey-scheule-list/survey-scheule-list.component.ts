import { Component, Input, ViewEncapsulation, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-survey-scheule-list',
  templateUrl: './survey-scheule-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SurveyScheuleListComponent {
  @Input() surveySchedules = [];
  @Input() content: Object;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  constructor() { }

  check(index) {
    this.onSelect.emit(index);
  }
}
