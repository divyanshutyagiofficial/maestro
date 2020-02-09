import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService, UserService, EventEmitterService } from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './simple-layout.component.html',
})
export class SimpleLayoutComponent implements OnInit {

  clientCode: string = sessionStorage.getItem('clientCode') || '';
  programCode: string = sessionStorage.getItem('programCode') || '';
  constructor(private _route: ActivatedRoute, private _router: Router, private _programService: ProgramService, private _eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    const token = this._route.snapshot.paramMap.get('token');
    //if (this._router['url'].includes('welcome') || this._router['url'].includes('/login')) {
      this.setDefault();
    //}
  }

  setDefault() {
    this.getUrlParams();
    this.validateCode();
  }

  getUrlParams() {
    if (window.sessionStorage['clientCode'] === undefined) {
      this.clientCode = (this._route.firstChild.snapshot.params['orgCode']);
      this.programCode = (this._route.firstChild.snapshot.params['progCode']);
      this.setUrlParams(this.clientCode, this.programCode);
    }
  }

  setUrlParams(clientCode, programCode) {
    this._programService.setClientCode(clientCode);
    this._programService.setProgramCode(programCode);
  }

  validateCode() {
    if (this.clientCode && this.programCode && this.clientCode != 'null' && this.programCode != 'null') {
      this._programService.validateCode().subscribe(data => {
        this._programService.setProgramId(data['programId']);
        let serviceCalls = [this._programService.getSupportedLanguages(),
        this._programService.getOrganizationConfig()]
        Observable.forkJoin(serviceCalls).subscribe(responses => {
          this._eventEmitterService.updateSupportedLanguages(responses[0]);
          this._eventEmitterService.updateConfigData(responses[1]);
        });
      }, (error) => {
        this._router.navigate(['404']);
      });
    } else {
      this._router.navigate(['404']);
    }
  }
}
