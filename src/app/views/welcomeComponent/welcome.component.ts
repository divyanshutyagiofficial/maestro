import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService, ProgramService, SurveyService, EventEmitterService } from './../../services';
import { RestApiService } from '../../rest-api-services';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    welcomeLangContent: Object = {};
    content: any;
    showLogOutModal: boolean = false;
    orgExist: boolean = false;
    @Input() supportedLanguages = new EventEmitter();
    errorFlag: boolean = this._restApiService.getSessionErrorFlag();

    constructor(
        private _eventEmitterService: EventEmitterService,
        private _programService: ProgramService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _surveyService: SurveyService,
        public _restApiService: RestApiService
    ) { }

    ngOnInit() {
        this._eventEmitterService.currentContent.subscribe(content => {
            this._eventEmitterService.configData.subscribe(config => {
                const token = this._route.snapshot.paramMap.get('token');
                if (Object.keys(content).length &&
                    this._router['url'].toLowerCase().indexOf('welcome') >= 0 ||
                    this._router['url'].toLowerCase().indexOf('/adhoc') >= 0 ||
                    this._router['url'].toLowerCase().indexOf('/cro') >= 0) {
                    this.welcomeLangContent = content['welcome'];
                    this.getData(config);
                    // this._programService.validateCode().subscribe(theme => {
                    //this.setTheme(theme);
                    // })
                }
            });
        });
    }

    /*setTheme(theme){
        let background = document.getElementById('article-section').style;
        background.backgroundImage = 'url('+theme['background-img']+')';
    }*/

   async getData(config) {
        //this._userService.logout().subscribe(logout => {
            await this.fetchOrganizationDetails(config);
            await this._programService.getOrganizationConfig().subscribe(orgConfig => {
                this.fetchOrganizationDetails(orgConfig);
            })
       // });
    }

    fetchOrganizationDetails(orgConfig: Object) {
        if (orgConfig) {
            if (orgConfig['form'] && orgConfig['form']['auth']) {
                const auth = orgConfig['form']['auth'];
                this.orgExist = false;
                const filterBodies = auth['bodies'].filter(body => {
                    return body[0]['type'] === 'WELCOME';
                });
                if (filterBodies.length) {
                    this.content = filterBodies[0][0];
                }
            }
        }
    }

    continue() {
        this.showLogOutModal = false;
    }

    goToLogin() {
        switch (this._programService.isAdhoc()) {
            case true:
                this._router.navigate(['/adhoc-login']);
                break;
            default:
                this._router.navigate(['login']);
        }
    }

    closeModal() {
        this.orgExist = false;
    }
}
