import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-survey-upcoming',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SurveyUpcomingComponent implements OnInit {
  @Input() surveys: Object[];
  @Input() languageContent: string[];
  @Output() onclick = new EventEmitter();

   loading: boolean = true;
   offset: number;

  constructor() { }

  ngOnInit() {
    this.offset = new Date().getTimezoneOffset() * 60000;
    this.loading = false;
  }

  goToSurvey(userSurveySessionId: any, progressStatus: any, ) {
    this.onclick.emit({ userSurveySessionId, progressStatus });
  }
}
