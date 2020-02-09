import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-fivebox-section',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FiveBoxSectionComponent implements OnInit {

  @Input() summary: any;
  @Input() languageContent: any;
  showFiveBox: boolean = true;

  constructor() { }

  ngOnInit() { }

  toggleBox() {
    this.showFiveBox = !this.showFiveBox;
  };
}


