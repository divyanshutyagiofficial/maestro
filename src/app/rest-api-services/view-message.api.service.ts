import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import API_URL from '../util/api-url';
import { RestApiService } from './rest.api.service';
import 'rxjs/Rx';

@Injectable()
export class ViewMessageApiService {
    
    constructor(private _restApiService: RestApiService) { }

    getMessage(userId: string): Observable<any> {
        return this._restApiService.get(API_URL.VIEW_MESSAGE.ROOT + '/' + userId)
            .map(this._restApiService.handleResponse)
    }

    updateMessageStatus(message: Object): Observable<any> {
        return this._restApiService.put(API_URL.VIEW_MESSAGE.ROOT + API_URL.VIEW_MESSAGE.UPDATE, message)
            .map(this._restApiService.handleResponse);
    }
}
