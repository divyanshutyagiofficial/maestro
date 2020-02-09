import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as moment from 'moment';
import { SurveyService, DashboardService, EventEmitterService } from '../../../services';
import 'rxjs/Rx';

@Component({
    selector: 'app-calender',
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class CalenderComponent implements OnChanges, OnInit {

    @Input() calendarData: any;
    @Input() content: Object;
    @Output() notify = new EventEmitter();
    @Output() selectToday = new EventEmitter();
    @Output() selectedWeek = new EventEmitter();
    @Output() page = new EventEmitter();
    currentPage: number = 0;
    calendarDownloadLink: string = '';
    showCopyCalendarLink: boolean = false;
    startDay: any;
    lastDay: string;
    selected: any;
    month: any;
    weeks: any = [];
    lastday: any;
    today: any;
    clicked;
    isSelected = false;
    selectedDate: any;
    firstLoad: boolean = false;

    constructor(private _surveyService: SurveyService, private _eventEmitterService: EventEmitterService) { }

    ngOnChanges(changes: SimpleChanges) {
        const name: SimpleChange = changes.calendarData;
        this.calendarData = name['currentValue'];
        if (this.firstLoad) {
            this.buildMonth(this.month);
        }
    }

    ngOnInit() {
        this._eventEmitterService.currentContent.subscribe(content => {
            this.page.emit(this.currentPage);
            this.firstLoad = true;
            const day = moment().day(0);
            this.startDay = day;
            this.selected = day.startOf('day');
            this.month = this.selected.clone();
            this.lastday = moment().day(0).format('MMM') + ' ' + moment().day(0).date();
            this.today = moment().day(0).add(13, 'days').format('ll');
            this.buildMonth(this.month);
            this._surveyService.getCalendar(false).subscribe(data => {
                this.calendarDownloadLink = data;
            })
        });
    }

    toggleShowCopyCalendarLink() {
        this.showCopyCalendarLink = !this.showCopyCalendarLink;
        if (this.showCopyCalendarLink) {
            this.downloadCalendarFromLink(this.calendarDownloadLink);
        }
    }

    downloadCalendarFromLink(url: string) {
        var blob = new Blob([this.calendarDownloadLink['_body']], { type: 'text/calendar' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    buildMonth(start) {
        this.weeks = [];
        let done = false;
        const date = start.clone();
        let monthIndex = date.month();
        let count = 0;
        while (count < 2) {
            this.weeks.push({
                days: this.buildWeek(date.clone(), this.month)
            });
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    buildWeek(date, month) {
        const days = [];
        const offset = new Date().getTimezoneOffset() * 60000;
        if (this.calendarData) {
            const data: any[] = Array.of(this.calendarData);
            for (let i: number = 0; i < 7; i++) {
                let isSame = false;
                let DROCount;
                for (let obj of data) {
                    for (let key in obj) {
                        const localDate = moment.utc(Number(key)).local();
                        const dateInMillis = date.unix() * 1000 - offset;
                        const scheduleDateInMillis = localDate.unix() * 1000;
                        if (dateInMillis === scheduleDateInMillis) {
                            isSame = true;
                            DROCount = obj[key];
                            break;
                        }
                    }
                }
                if (isSame) {
                    days.push({
                        name: date.format('ddd'),
                        number: date.date(),
                        noofDRO: '(' + DROCount + ')',
                        isToday: date.isSame(new Date(), 'day'),
                        date: date,
                        active: true,
                        isSelected: false
                    });
                } else {
                    days.push({
                        name: date.format('ddd'),
                        number: date.date(),
                        noofDRO: '',
                        isToday: date.isSame(new Date(), 'day'),
                        date: date,
                        active: false,
                        isSelected: false
                    });
                }
                date = date.clone();
                date.add(1, 'd');
            }
        } else {
            for (let i: number = 0; i < 7; i++) {
                days.push({
                    name: date.format('ddd'),
                    number: date.date(),
                    noofDRO: '',
                    isToday: date.isSame(new Date(), 'day'),
                    date: date,
                    active: false,
                    isSelected: false
                });
                date = date.clone();
                date.add(1, 'd');
            }
        }
        return days;
    }


    selectedDay(day, w, i) {
        let wk: any;
        for (wk = 0; wk < this.weeks.length; wk++) {
            for (let dy = 0; dy < 7; dy++) {
                this.weeks[wk].days[dy].isSelected = false;
            }
        }
        this.weeks[w].days[i].isSelected = true;
        this.selectedDate = day.date;
        this.clicked = day;
        this.notify.emit(day);
    }

    previous() {
        this.currentPage = this.currentPage - 1;
        this.page.emit(this.currentPage);
        this.updateDestinationDate(this.startDay.subtract(14, 'days'));
        this._surveyService.getCalendar(true).subscribe(data => {
            this.calendarDownloadLink = data;
        })
    }

    next() {
        this.currentPage = this.currentPage + 1;
        this.page.emit(this.currentPage);
        this.updateDestinationDate(this.startDay.add(14, 'days'));
        this._surveyService.getCalendar(true).subscribe(data => {
            this.calendarDownloadLink = data;
        });
    }

    updateDestinationDate(destDate: any) {
        const d = this.startDay;
        this.selected = destDate.startOf('day');
        this.month = this.selected.clone();
        this.selectedWeek.emit(this.month);
        this.lastday = destDate.format('MMM') + ' ' + destDate.date();
        this.today = destDate.add(13, 'days').format('ll');
        this.startDay = d.subtract(13, 'days');
        let wk: any;
        for (wk = 0; wk < this.weeks.length; wk++) {
            for (let dy = 0; dy < 7; dy++) {
                if (this.weeks[wk].days[dy].date.isSame(this.selectedDate)) {
                    this.weeks[wk].days[dy].isSelected = true;
                }
            }
        }
    }

    todayClick() {
        let name = {
            date: moment(new Date().setHours(0, 0, 0, 0))
        }
        this.selectToday.emit();
        this.ngOnInit();
    }

    toggle() {
        const x = document.getElementById('card_view');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }

    }
}
