import { Component, OnInit } from "@angular/core";
import { SurveyService, EventEmitterService } from "../../services";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI, BlockUIService } from "ng-block-ui";

@Component({
  template: `
    <div class="t_boty_container">
      <article
        class="forgot-password study-information terms-conditions disclaimer active-dros"
      >
        <!-- Article section start -->
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <img src="assets/img/ok.png" content="origin" alt="" />
              <h1 class="medium-title">{{ pageContent[1] }}</h1>
              <div class="read-more-sec">
                <p>{{ pageContent[2] }}</p>
                <!--<a [routerLink]="['../welcome']">Back to Welcome Page</a>-->
              </div>
            </div>
          </div>
        </div>
      </article>
      <!-- Article section end -->
    </div>
  `,
  styleUrls: ["./pages.component.css"]
})
export class ThankYouComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  pageContent;
  constructor(
    private _eventEmitter: EventEmitterService,
    private _blockUIService: BlockUIService
  ) {}

  ngOnInit() {
    this._blockUIService.stop("app-component");
    this._eventEmitter.currentContent.subscribe(content => {
      this.pageContent = content["misc"];
      document.getElementById("footer").style.position = "fixed";
      document.getElementById("footer").style.left = "0";
      document.getElementById("footer").style.right = "0";
      document.getElementById("footer").style.bottom = "0";
    });
  }
}
