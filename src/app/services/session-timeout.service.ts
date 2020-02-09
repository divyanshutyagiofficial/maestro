import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ProgramService } from './program.service';

@Injectable()
export class SessionTimeoutService {

    private MINUTES_UNITL_AUTO_LOGOUT = 20 // in mins
    private CHECK_SESSION_INTERVAL = 10 // in seconds
    private lastClickedAt: number;

    constructor(
        private _userService: UserService, private _ngZone: NgZone,
        private _router: Router, private _programService: ProgramService) {
        this.checkSession();
        this.initListener();
        this.initInterval();
    }

    initListener() {
        document.body.addEventListener('click', () => this.resetCounter());
    }

    initInterval() {
        this._ngZone.runOutsideAngular(() => {
            setInterval(() => {
                this.checkSession();
            }, this.CHECK_SESSION_INTERVAL * 1000);
        })
    }

    checkSession() {
        const timeleft = this.lastClickedAt + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000 - Date.now();
        if (this._userService.isLoggedIn() && timeleft < 0) {
            this._ngZone.run(() => {
                this._userService.logout().subscribe(logout => {
                    this._router.navigate(['/login']);
                });
            })
        }
    }

    resetCounter() {
        this.lastClickedAt = Date.now();
    }

}
