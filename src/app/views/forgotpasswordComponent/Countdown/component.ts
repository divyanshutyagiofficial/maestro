import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  template: '{{message}}'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  intervalId = 0;
  message = '';
  @Input() seconds: any;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  clearTimer() { clearInterval(this.intervalId); }

  ngOnInit() { this.start(); }
  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0 || this.seconds < 0) {
        this.message = 'Time"s Up!!';
        this.notify.emit('TimesOver');
      } else {
        if (this.seconds < 0) {
          clearInterval(this.intervalId);
        }
        this.message = `${this.seconds} s`;
      }
    }, 1000);
  }
}
