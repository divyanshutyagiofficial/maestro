import { Component, OnInit } from "@angular/core";
import {
  SurveyService,
  EventEmitterService,
  ProgramService,
  UserService
} from "../../services";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  template: `
    <app-header *ngIf="!showReRoute"></app-header>
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
                <p *ngIf="score" class="score">
                  {{ pageContent[6] }} {{ score }}%
                </p>
              </div>
              <div class="re-route-wrapper" *ngIf="!showReRoute">
                <span [routerLink]="['/dashboard']"><<</span>
                <a class="re-routes" [routerLink]="['/dashboard']" referrerpolicy="origin">{{
                  pageContent[7]
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </article>
      <!-- Article section end -->
    </div>
    <app-footer></app-footer>
  `,
  styleUrls: ["./pages.component.css"]
})
export class ResultComponent implements OnInit {
  showReRoute: boolean = false;
  pageContent;
  score;
  constructor(
    private _eventEmitter: EventEmitterService,
    private _route: ActivatedRoute,
    private _programService: ProgramService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.showReRoute = !this._programService.isAdhoc() && !this._programService.isCRO();
    this._eventEmitter.currentContent.subscribe(content => {
      this.pageContent = content["misc"];
      this.score = this._route.snapshot.paramMap.get("score") || 0;
    });
  }
}
