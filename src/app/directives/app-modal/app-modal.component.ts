import { Component, Input, Output } from '@angular/core';


@Component({
    selector: 'app-modal',
    template: `
    <div class="dashboard_modal_section">
        <div class="modal fade  smartpopup show in danger" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left"> {{ content?.headerText }}</h4>
                        <button type="button" class="close pull-right" aria-label="Close" (click)="cancel()">
                            <span class="cross"><img src="assets/img/close.png" content="origin" alt="" /></span>
                        </button>
                    </div>
                <div class="modal-body">
                    {{ content?.bodyText }}
                </div>
                <div class="modal-footer">
                    <button *ngIf="content.cancelShow" type="button" class="btn btn-default" (click)="cancel()"> {{ content?.errorButtonText }}</button>
                    <button type="button" class="btn btn-success" (click)="cancel()"> {{ content?.successButtonText }}</button>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls: [

    ]
})

export class AppModalComponent {
    @Input() content: any;
    @Input() notify: Function;

    hide() {
        this.notify('hide-modal');
    }

    cancel() {
        this.notify('cancel-modal');
    }

    success() {
        this.notify('success-modal');
    }
}

