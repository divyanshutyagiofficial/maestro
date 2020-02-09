import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { ProgramService } from '../services/program.service';
import { SurveyService } from './survey.service';

@Injectable()
export class AdhocGuardService implements CanActivate {

    constructor(
        private _router: Router,
        private _route : ActivatedRoute,
        private _programService: ProgramService,
        private _surveyService: SurveyService
    ) {}

    canActivate(): boolean {
        if (this._programService.getAdhocToken()) {
            return true;
        } else {
            this._router.navigate(['oops']);
            return false;
        }
    }
}
