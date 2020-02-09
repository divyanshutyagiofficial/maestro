import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TimelineComponent {

  @Input() timelineData: Object[];
  @Input() content: Object;
  @Input() showMore: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  loadMore() {
    this.onClick.emit();
  }

  checkToday(date) {
    let myDate = new Date(date).toDateString();
    let today = new Date().toDateString();
    return (myDate == today);
  }

}


