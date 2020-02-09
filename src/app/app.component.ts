import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EventEmitterService, ProgramService } from './services';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessagingService } from './services/messaging.service';


@Component({
    selector: 'app-body',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [MessagingService]
})
export class AppComponent {

    isConnected;
    message;
    @BlockUI('app-component') blockUI: NgBlockUI;

    constructor(
        private _eventEmitterService: EventEmitterService,
        private _programService: ProgramService,
        private notificationService: MessagingService
    ) {
        this.isConnected = Observable.merge(
            Observable.of(navigator.onLine),
            Observable.fromEvent(window, 'online').map(() => true),
            Observable.fromEvent(window, 'offline').map(() => false)
        );
        this.notificationService.currentMessage.subscribe(message => {
            console.log(message);
        });
    }

    ngOnInit() {
        const languageCode = this._programService.getLanguageCode() || 'EN';
        this._programService.setLanguageCode(languageCode);
        this._programService.getBodyContent().subscribe(bodyContent => {
            this._eventEmitterService.changeContentForSelectedLanguage(bodyContent);
        });
        this.notificationService.getPermission();
        this.notificationService.receiveMessage();
    }
}
