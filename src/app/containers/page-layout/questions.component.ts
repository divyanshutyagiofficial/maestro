import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: '[survey-question]',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="questionnaire-title">
                        {{ question.sequence }}.
                        {{ question.text}}
                        <span *ngIf="question.helpText" title="question.helpText" class="glyphicon glyphicon-info-sign" (click)="allhelpModal.show()"></span>
                    </div>
                </div>
            </div>

            <div class="row" *ngIf="question.url">
                <div class="col-md-12" dynamic-loader [field]="{ 'componentType' : 'QVIEW_MEDIA', 'masterBank' : { 'urlType' : question.questionType, 'url' : question.url }}" [notify]="notify">
                </div>
            </div>

            <div class="row" *ngIf="question.answerType" dynamic-loader [field]="{ 'componentType' : 'Q' + question.answerType, 'question' : question }" [notify]="notify"></div>
        </div>

        <div class="information_modal">
            <div bsModal #allhelpModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-md">
                            <div class="modal-content" style="margin-top:150px">
                                <div class="modal-header">
                                <h4 class="modal-title pull-left">Help Text</h4>
                                <button type="button" class="close pull-right" aria-label="Close" (click)="allhelpModal.hide()">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" *ngIf="question[0].helpText">
                                {{ question[0].helpText }}
                            </div>
                    </div>
                </div>
            </div>
        </div>
                      
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit{
    @Input() question: any;
    @Input() notify: Function;

ngOnInit() {
}
    // content: any;
    // showModal: boolean = false;

    // openModal() {
    //     this.content = {
    //         "headerText": "Help",
    //         "bodyText": this.question.helpTexts[0],
    //         "errorButtonText": "Cancel",
    //         "successButtonText": "Ok",
    //         "cancelShow": false
    //     };
    //     this.showModal = !this.showModal;
    // }

    // notifier() {
    //     const self = this;
    //     return (e: string, data?: any) => {
    //         if (e == 'cancel-modal') {
    //             self.showModal = !self.showModal;
    //         }
    //     }
    // }
}

