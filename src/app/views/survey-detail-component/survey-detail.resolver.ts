import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SurveyDetailRouteResolver implements Resolve<any> {

    constructor(private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return Observable.of(true);
    }
}
