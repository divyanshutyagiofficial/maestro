import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService, ProgramService, UserService } from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
    personalDetailsConent: Object;
    personalDetailsData: any;
    personalDetails: Object[];
    savingCurrentDetails: boolean = false;
    notify: Function;
    loaded: boolean = false;

    constructor(
        private _eventEmitterService: EventEmitterService,
        private _programService: ProgramService,
        private _userService: UserService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.notify = this.notifier();
        this._eventEmitterService.currentContent.subscribe(content => {
            if (Object.keys(content).length && this._router['url'].indexOf('personaldetails') >= 0) {
                const serviceCalls = [this._userService.getPersonalDetails(), this._programService.getOrganizationConfig()];
                this.personalDetailsConent = content['personal_details'];
                Observable.forkJoin(serviceCalls).subscribe(responses => {
                    this.personalDetails = responses[0];
                    this.getPersonalDetailsFields(this.personalDetails, responses[1]);
                    this.loaded = true;
                });
            }
        });
    }

    getPersonalDetailsFields(personalDetails: Object[], orgConfig: Object) {
        if (orgConfig && orgConfig['form'] && orgConfig['form']['userNavigation'] && personalDetails) {
            this.personalDetailsData = orgConfig['form']['userNavigation']['bodies'].filter(body => {
                return body[0]['type'] === 'PERSONAL_DETAILS';
            })[0][0];
            if (this.personalDetailsData['fields'].length) {
                this.personalDetailsData['fields'].forEach(field => {
                    const filterFieldsValue = personalDetails.filter(personalDetail => {
                        return personalDetail['fieldId'] === field['fieldId'];
                    });
                    if (filterFieldsValue.length) {
                        field['input'] = filterFieldsValue[0]['value'];
                    }
                })
            }
        }
    }

    notifier() {
        const self = this;
        return (event: string, data: any) => {
            if (event === 'changed-input') {
                self.savingCurrentDetails = false;
            }
        }
    }

    updatePersonalDetails(): void {
        if (this.hasErrors) {
            return;
        }

        this.personalDetails.map(detail => {
            const filterFields = this.personalDetailsData['fields'].filter(field => detail['fieldId'] === field['fieldId']);
            if (filterFields.length && filterFields[0]['input']) {
                detail['value'] = filterFields[0]['input'];
            }
        });

        this._userService.updatePersonalDetails(this.personalDetails).subscribe(data => {
            /*setTimeout(() => {
                this._userService.getPersonalDetails(true).subscribe(personalDetails => {
                    this.personalDetails = personalDetails;
                });
            }, 500)*/
            this.savingCurrentDetails = true;
        })
    }

    get hasErrors(): boolean {
        if (this.personalDetailsData) {
            return !!this.personalDetailsData['fields'].filter(field => field['errors'] && field['errors']['test']).length;
        } else {
            return;
        }
    }

    cross() {
        this.savingCurrentDetails = false;
    }
}
