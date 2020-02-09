import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EventEmitterService {

    private contentForLanguage = new BehaviorSubject<Object>({});
    currentContent = this.contentForLanguage.asObservable();

    private noOfUnreadMsgs = new BehaviorSubject<Object>(0);
    messages = this.noOfUnreadMsgs.asObservable();

    private profileDetails = new BehaviorSubject<Object>(0);
    details = this.profileDetails.asObservable();

    private supportedLanguages = new BehaviorSubject<any>({});
    languages = this.supportedLanguages.asObservable();

    private config = new BehaviorSubject<any>({});
    configData = this.config.asObservable();

    constructor() { }

    changeContentForSelectedLanguage(content: Object) {
        setTimeout(() => {
            this.contentForLanguage.next(content);
        }, 2);
    }

    updateUnreadMessages(noOfUnreadMsgs: number) {
        setTimeout(() => {
            this.noOfUnreadMsgs.next(noOfUnreadMsgs);
        }, 2);
    }

    updateProfileDetails(value: Object) {
        setTimeout(() => {
            this.profileDetails.next(value);
        }, 2);
    }

    updateSupportedLanguages(value: any) {
        this.supportedLanguages.next(value);
    }

    updateConfigData(config: any) {
        this.config.next(config);
    }


}

