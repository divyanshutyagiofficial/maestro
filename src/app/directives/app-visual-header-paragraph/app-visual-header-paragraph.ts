import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-header-paragraph',
    template: `
        <div class="column" *ngFor="let field of fields">
            <div class="sub-header" style="text-align: center;">
					<h2 class="main-heading" *ngIf="field.componentType == 'DIV_HEADER'">{{ field.masterBank.header }}</h2>
					<h3 class="main-heading" *ngIf="field.componentType == 'DIV_SUBHEADER'">{{ field.masterBank.header }}</h3>
			</div>

            <div class="column">
					<ul class="order" *ngIf="field.componentType == 'DIV_BODY'">
						<li>{{ field.masterBank.description}}</li>
					</ul>
			</div>
            <p *ngIf="field.componentType == 'VIDEO_VIEW'" style="text-align: center;">
                <app-media [field]="field" ></app-media>
            </p>
    </div>
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppVisualHeaderParagraphComponent {
    @Input() fields: any;
}

