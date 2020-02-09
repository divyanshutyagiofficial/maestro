import { Component, OnInit } from '@angular/core';
import { EventEmitterService, ProgramService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  privacyContent: any = {};

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length > 0 && this._router['url'].indexOf('privacy') >= 0) {
        this._programService.getOrganizationConfig().subscribe(orgConfig => {
          if (orgConfig['form'] && orgConfig['form']['common'] && orgConfig['form']['common']['bodies']) {
            this.privacyContent = orgConfig['form']['common']['bodies'].filter(body => {
              return (body[0]['type'] === 'PRIVACY_POLICY');
            })[0][0];
          }
        });
      }
    });
  }
}
