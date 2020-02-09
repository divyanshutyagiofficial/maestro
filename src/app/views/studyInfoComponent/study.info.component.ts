import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-study-info',
  templateUrl: './study.info.component.html',
  styleUrls: ['./study.info.component.css']
})
export class StudyInfoComponent implements OnInit {

  studyInfo: any = {};
  loaded: boolean = false;
  constructor(
    private _programService: ProgramService,
    private _eventEmitterService: EventEmitterService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length && this._router['url'].indexOf('studyinfo') >= 0) {
        this._programService.getOrganizationConfig().subscribe(orgConfig => {
          if (orgConfig && orgConfig['form'] && orgConfig['form']['userNavigation']) {
            const filterBodies = orgConfig['form']['userNavigation']['bodies'].filter(body => {
              return body[0]['type'] === 'STUDY_INFO';
            });
            if (filterBodies.length) {
              this.studyInfo = filterBodies[0][0];
              this.loaded = true;
            }
          }
        });
      }
    });
  }
}
