
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ProgramService } from './program.service';
import { UserService } from './user.service';

@Injectable()
export class CroGuardService implements CanActivate {

    constructor(
        private _programService: ProgramService,
        private _router: Router,
        private _userService: UserService
    ) { }

    canActivate(): boolean {
        if (this._programService.getCroToken()) {
            return true;
        } else {
            this._router.navigate(['oops']);
            return false;
        }
    }
}
