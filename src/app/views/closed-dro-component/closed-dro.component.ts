import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { EventEmitterService, DashboardService } from "../../services";

@Component({
  templateUrl: "./closed-dro.component.html",
  styleUrls: ["./closed-dro.component.css"]
})
export class ClosedDroComponent implements OnInit {
  content: Object;
  viewDroContent: Object[];
  elementRef: ElementRef;
  viewDrosData: Object[] = [];
  search = "";
  progressStatus = "";
  fromDate: Date;
  toDate: Date;
  errorMessage: string = "";
  loaded: boolean = false;

  constructor(
    private _dashboardService: DashboardService,
    private _eventEmitterService: EventEmitterService,
    private myElement: ElementRef,
    private _router: Router
  ) {
    this.elementRef = myElement;
  }

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (
        Object.keys(content).length &&
        this._router["url"].indexOf("viewdros") >= 0
      ) {
        this.content = content;
        this.viewDroContent = content["view_dro"];
        this._dashboardService.getDroData().subscribe(droData => {
          this._dashboardService.setDroInfoList(droData["droInfoList"]);
          this.viewDrosData = droData["droInfoList"];
          this._dashboardService.sortDroDesc(this.viewDrosData, "endTime");
          this.toDate = new Date();
          const today = new Date();
          today.setDate(today.getDate() - 30);
          this.fromDate = today;
          this.loaded = true;
        });
      }
    });
  }

  filterSearchByDroName() {
    this.viewDrosData = this._dashboardService.filterSearchByDroName(
      this.search
    );
  }

  droSearch() {
    const startTime = this.fromDate && this.fromDate.setHours(0, 0, 0, 0);
    const endTime = this.toDate && this.toDate.setHours(23, 59, 59, 999);
    const eTime = new Date().setHours(23, 59, 59, 999);
    const today = new Date();
    today.setDate(today.getDate() - 30);
    const sTime = today.setHours(0, 0, 0, 0);
    if (startTime > endTime) {
      this.errorMessage = "Please choose valid range.";
    } else if (
      (startTime && !(startTime >= sTime && startTime <= eTime)) ||
      (endTime && !(endTime >= sTime && endTime <= eTime))
    ) {
      this.errorMessage = "";
      this._dashboardService
        .getDroData(true, startTime, endTime)
        .subscribe(dro => {
          this._dashboardService.setDroInfoList(dro["droInfoList"]);
          this.viewDrosData = this._dashboardService.droSearch(
            this.search,
            this.progressStatus,
            startTime,
            endTime,
            dro["droInfoList"]
          );
          this._dashboardService.sortDroDesc(this.viewDrosData, "endTime");
        });
    } else {
      this.errorMessage = "";
      this.viewDrosData = this._dashboardService.droSearch(
        this.search,
        this.progressStatus,
        startTime,
        endTime
      );
    }
  }

  clear() {
    this.search = "";
    let DropdownList = document.getElementById("status") as HTMLSelectElement;
    DropdownList.selectedIndex = 0;
    this.progressStatus = "";
    this.errorMessage = "";
    this.ngOnInit();
  }

  sort(packet) {
    let isDesc = packet.isDesc;
    let property = packet.property;
    if (isDesc) {
      this._dashboardService.sortDroDesc(this.viewDrosData, property);
    } else {
      this._dashboardService.sortDroAsc(this.viewDrosData, property);
    }
  }
}
