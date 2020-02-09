import { Component, OnInit } from '@angular/core';
import { EventEmitterService, ProgramService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  disclaimerContent: any = {};

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length > 0 && this._router['url'].indexOf('disclaimer') >= 0) {
        this._programService.getOrganizationConfig().subscribe(orgConfig => {
          console.log(orgConfig);
          if (orgConfig['form'] && orgConfig['form']['common'] && orgConfig['form']['common']['bodies']) {
            this.disclaimerContent = orgConfig['form']['common']['bodies'].filter(body => {
              return (body[0]['type'] === 'DISCLAIMER');
            })[0][0];
          }
        });
      }
    });
  }
}
