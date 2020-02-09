import { Component, OnInit } from '@angular/core';
import { SurveyService, EventEmitterService, ProgramService } from '../../services';

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
            <p>{{pageContent[4]}}</p>
            <!--<a [routerLink]="['../welcome']">Back to Welcome Page</a>-->
          </div>
        </div>
      </div>
    </div>
  </article>
  </div><!-- Article section end -->
    `,
  styleUrls: ['./pages.component.css']
})
export class P404Component implements OnInit {

  pageContent;
  constructor( private _programService : ProgramService) { }

  ngOnInit() {
    this._programService.getBodyContent().subscribe(content => {
      this.pageContent = content['misc'];
      document.getElementById('footer').style.position = 'fixed';
      document.getElementById('footer').style.left = '0';
      document.getElementById('footer').style.right = '0';
      document.getElementById('footer').style.bottom = '0';
    });
  }
}