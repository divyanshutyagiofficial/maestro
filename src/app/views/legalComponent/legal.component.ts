import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventEmitterService, ProgramService, UserService } from '../../services';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  legalBodyContent: any = {};
  legalStatement: any = {};
  authenticated: boolean = false;
  submitSuccessModal = false; // true : if message sent successfully; else false

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _programService: ProgramService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (Object.keys(content).length > 0 && this._router['url'].indexOf('legal') >= 0) {
        this.legalBodyContent = content['legal_statement'];
        this._programService.getOrganizationConfig().subscribe(orgConfig => {
          console.log(orgConfig);
          if (orgConfig['form'] && orgConfig['form']['common'] && orgConfig['form']['common']['bodies']) {
            this.legalStatement = orgConfig['form']['common']['bodies'].filter(body => {
              return (body[0]['type'] === 'LEGAL_STATEMENT');
            })[0][0];
          }
          this.authenticated = this._userService.isLoggedIn();
        });
      }
    });
  }

  goToWelcome() {
    if (this._programService.isAdhoc()) {
      this._router.navigate(['/adhoc/' + this._programService.getAdhocToken()]);
    } else {
      if (this._userService.isAuthenticated()) {
        this._router.navigate(['dashboard']);
      } else {
        this._router.navigate([this._programService.getClientCode() + '/' + this._programService.getProgramCode() + '/welcome']);
      }
    }
  }

  print() {
    let printContents, popupWin;
    printContents = '<html><head><title>' + this.legalStatement['name'] + '</title><style></style></head>' +
      '<body onload="window.print();window.close()">';
    this.legalStatement['fields'].forEach(field => {
      if (field['fieldType'] === 'DIV_HEADER') {
        printContents = printContents + '<h1 style="text-align: center;">' + field['masterBank']['header'] + '</h1>'
      }
      if (field['fieldType'] === 'DIV_SUBHEADER') {
        printContents = printContents + '<h2 style="text-align: center;">' + field['masterBank']['header'] + '</h2>'
      }
      if (field['fieldType'] === 'DIV_BODY') {
        printContents = printContents + '<ul><li>' + field['masterBank']['description'] + '</li></ul>'
      }
      if (field['fieldType'] === 'VIDEO_VIEW') {
        printContents = printContents + '<ul><li><a href="#" referrerpolicy="origin">' + field['masterBank']['url'] + '</a></li></ul>'
      }
    });
    printContents = printContents + '</body></html>';
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(printContents);
    popupWin.document.close();
  }

  downloadPDF() {
    var doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 0, 0, {
      'width': 125,
      'elementHandlers': specialElementHandlers
    }, function (bla) {
      doc.save('legal statement.pdf');
    }, { top: 0, left: 20, right: 0, bottom: 0 });
  }

  sendMail() {
    this._userService.getUserImage().subscribe(userInfo => {
      console.log(userInfo);
      this._userService.sendEmailForLegalStatement(userInfo["programInfo"]["programId"]).subscribe(response => {
        if (response['message'] === 'Success') {
          this.submitSuccessModal = true;
        }
      }, error => {
        console.log('could not send mail');
      });
    });
  }

  close() {
    this.submitSuccessModal = false;
  }
}
