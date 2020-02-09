import { Component, OnInit } from '@angular/core';
import { SurveyService, EventEmitterService, ProgramService } from '../../services';
import { Router } from '@angular/router';

@Component({
  template: `
  <div class="t_boty_container">
  <article class="forgot-password study-information terms-conditions disclaimer active-dros"><!-- Article section start -->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <img src="assets/img/404.jpg" content="origin" alt="" />
          <h1 class="medium-title">{{pageContent[3]}}</h1>
          <div class="read-more-sec">
            <p>{{pageContent[5]}}</p>
            <!--<a [routerLink]="['../welcome']">Back to Welcome Page</a>-->
          </div>
        </div>
      </div>
    </div>
  </article><!-- Article section end -->
  </div>
    `,
  styleUrls: ['./pages.component.css']
})
export class SurveyExpiredComponent implements OnInit {

  pageContent;
  constructor(private _programService: ProgramService) { }

  ngOnInit() {
    this._programService.getBodyContent().subscribe(content => {
      this.pageContent = content['misc'];
    });
  }
}
