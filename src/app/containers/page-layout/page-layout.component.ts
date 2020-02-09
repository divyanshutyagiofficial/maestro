import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: '[page-layout]',
	template: `

    <div class="container">
    	<div class="row">
        	<div class="progress-section">
            	<div class="col-md-2 col-sm-12 col-xs-12">
                	<div class="question-number">
                    	Question <span>
                        	{{ current.totalAnswered }}
                    	</span>
                    	of <span>
                        	{{ current.totalQuestions }}
                    	</span>
                	</div>
            	</div>
            	<div class="col-md-6 col-sm-12 col-xs-12">
                	<div class="progress progress-striped">
                    	<div class="progress-bar {{current.currentlySaving ? 'progress-bar-warning active' : 'progress-bar-success'}}" [ngStyle]="{'width': current.percentCompleted + '%' }">
                        	<span class="sr-only">
                            	{{ current.percentCompleted }}% Complete
                        	</span>
                    	</div>
                	</div>
            	</div>
            	<div class="col-md-4 col-sm-12 col-xs-12">
                	<div class="question-control">
                    	<button class="btn btn-lg btn-info" [disabled]="current.hasErrors" *ngIf="current.page != 0" (click)="prev()"> Previous </button>
                    	<button class="btn btn-lg btn-info" [disabled]="current.hasErrors" *ngIf="!current.showSubmitForce" (click)="next()"> Next </button>
						<!-- button class="btn btn-lg btn-success" *ngIf="current.percentCompleted > 0 && current.percentCompleted < 100" (click)="submit()"> Save </button> -->
						<button class="btn btn-lg btn-success" [disabled]="current.hasErrors" *ngIf="current.showSubmitForce" (click)="submit()"> Submit </button>
                	</div>
            	</div>
        	</div>
			<div *ngIf="current.totalQuestions - current.totalAnswered==1" class="row">
			<alert type="danger" dismissible="dismissible" class="msg-answer-away">
				Whoa! You are only <strong>1 answer away</strong> from completing this questionnaire
			</alert>
			</div>
			</div>
    </div>

    <div class="questionnaire-section" *ngIf="pages[current.page].sections" survey-section [sections]="pages[current.page].sections" [current]="current" [notify]="notify"> </div>
    `,

})
export class PageLayoutComponent {
	@Input() pages: any;
	@Input() current: any;
	@Input() notify: Function;
	dismissible = true;
	ngOnInit() {
	}

	prev() {
		this.notify('to-prev');
	}

	next() {
		this.notify('to-next', this.pages[this.current.page].navigationRules || undefined);
		this.notify('submit-survey');
	}

	submit() {
		this.notify('submit-survey', { 'complete': true });
	}
}
