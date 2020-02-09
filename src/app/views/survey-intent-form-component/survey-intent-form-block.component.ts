import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[intent-block]',
  template: `
        <div class="section" [ngClass]="{'height_auto':readMore}">
          <div class="icon">
            <img [src]="imageMap[data.type]" content="origin" alt="" />
          </div>

          <div class="detail" [ngClass]="{'height_auto':readMore}">
            {{ data.description }}
          </div>
          <div  class="read-more" *ngIf="!readMore && show" (click)="readMore = !readMore">see more</div>
          <div class="read-more" (click)="readMore = !readMore" *ngIf="readMore">hide</div>
        </div>
      <!-- div class="container" *ngIf="sections[current.section].question" survey-question [question]="sections[current.section].question" [notify]="notify"></div -->
    `,
})
export class IntentBlockComponent implements OnInit {
  @Input() data: any;
  readMore: boolean = false;
  show: boolean;
  imageMap: any = {
    TIMING: 'assets/img/watch.png',
    WRONG_ANSWER: 'assets/img/report.png',
    AUTOSAVE_TRUE: 'assets/img/save-floppy.png',
    GOBACK_TRUE: 'assets/img/direction.png',
  };

  ngOnInit() {
    this.show = (this.data['description'].length > 80);
  }
}


