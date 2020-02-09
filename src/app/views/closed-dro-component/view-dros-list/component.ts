import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-dros-list',
  templateUrl: './component.html',
  styleUrls: ['../closed-dro.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ViewDrosListComponent implements OnInit {

  @Input() surveys: any = [];
  @Input() content: Object;
  @Output() onSort = new EventEmitter();

  page: number = 1;
  from;
  to;
  isDesc: boolean = false;
  column: string;
  direction: number;
  offset = new Date().getTimezoneOffset() * 60000;

  ngOnInit() {
    this.from = (10 * (this.page - 1)) + 1;
    this.to = 10 * this.page;
  }

  returnTime(value) {
    var myDate = new Date(value);
    return (myDate.toUTCString().replace('GMT', ''));
  }

  sort(property) {
    let packet = { isDesc: this.isDesc, property: property }
    this.onSort.emit(packet);
    this.isDesc = !this.isDesc;
  }
  change(event: any, length: any) {
    this.from = (10 * (event - 1)) + 1;
    this.to = 10 * event;
  }
}
