import { Component, OnInit } from '@angular/core';
import { EventEmitterService, ProgramService } from '../../services';
import { Router } from '@angular/router';

@Component({
    templateUrl: './termsandconditions.component.html',
    styleUrls: ['./termsandconditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

    termsAndConditionContent: any;

    constructor(
        private _eventEmitterService: EventEmitterService,
        private _programService: ProgramService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._eventEmitterService.currentContent.subscribe(content => {
            if (Object.keys(content).length > 0 && this._router['url'].indexOf('termsandconditions') >= 0) {
                this._programService.getOrganizationConfig().subscribe(orgConfig => {
                    if (orgConfig['form'] && orgConfig['form']['common'] && orgConfig['form']['common']['bodies']) {
                        this.termsAndConditionContent = orgConfig['form']['common']['bodies'].filter(body => {
                            return (body[0]['type'] === 'TERM_CONDITION');
                        })[0][0];
                    }
                });
            }
        });
    }
}

