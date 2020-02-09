import { Injectable } from '@angular/core';

//import * as firebase from 'firebase/app';
//import 'firebase/messaging';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ProgramService } from '.';

@Injectable()
export class MessagingService {

    constructor(private _programService: ProgramService) { }

    config = {
        apiKey: "AIzaSyDhFHl4_jKcrwj1cUsjuzb-1M6t7DgQy50",
        authDomain: "droweb-ba581.firebaseapp.com",
        databaseURL: "https://droweb-ba581.firebaseio.com",
        projectId: "droweb-ba581",
        storageBucket: "droweb-ba581.appspot.com",
        messagingSenderId: "76236516379"
    };
    messaging;
    currentMessage = new BehaviorSubject(null)

    getPermission() {
        // firebase.initializeApp(this.config);
        // this.messaging = firebase.messaging()
        // this.messaging.requestPermission()
        //     .then(() => {
        //         console.log('Permission granted');
        //         return this.messaging.getToken();
        //     })
        //     .then(token => {
        //         console.log(token);
        //         this._programService.setFcmToken(token);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    receiveMessage() {
        // this.messaging.onMessage((payload) => {
        //     console.log("Message received. ", payload);
        //     this.currentMessage.next(payload);
        // });
    }
}