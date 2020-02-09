import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ProgramService } from './program.service';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private _programService: ProgramService,
        private _router: Router,
        private _userService: UserService
    ) { }

    canActivate(): boolean {
        if (!this._userService.isAuthenticated() || JSON.parse(window.sessionStorage.getItem("adhoc")) === true  || JSON.parse(window.sessionStorage.getItem("cro")) === true ) {
            this._router.navigate([this._programService.getClientCode() +'/'+ this._programService.getProgramCode() + '/welcome']);
            return false;
        } else {
            return true;
        }
    }
}
