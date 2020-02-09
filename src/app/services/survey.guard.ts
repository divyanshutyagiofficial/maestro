import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ProgramService } from './program.service';
import { UserService } from './user.service'

@Injectable()
export class SurveyGuardService implements CanActivate {

    constructor(
        private _router: Router,
        private _programService: ProgramService,
        private _userService: UserService
    ) { }

    canActivate(): boolean {
        if (this._programService.getUserSurveySessionId() && this._programService.getUserSurveySessionId() != 0 && this._userService.getUserToken()) {
            return true;
        } else {
            this._router.navigate(['/dashboard']);
            return false;
        }
    }
}
