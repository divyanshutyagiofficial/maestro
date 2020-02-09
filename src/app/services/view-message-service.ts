import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { ViewMessageApiService } from '../rest-api-services/view-message.api.service';

@Injectable()
export class ViewMessageService {

    constructor(
        private _userService: UserService,
        private _viewMessageApiService: ViewMessageApiService
    ) { }

    getMessage(): Observable<any> {
        if (this._userService.isAuthenticated()) {
            return this._viewMessageApiService.getMessage(this._userService.getUserId())
                .map(response => response)
        } else {
            return Observable.of(null);
        }
    }

    updateMessageStatus(message: Object): Observable<any> {
        return this._viewMessageApiService.updateMessageStatus(message)
            .map(response => response);
    }
}
