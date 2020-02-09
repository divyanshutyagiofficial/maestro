import { Component } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { ProgramService, EventEmitterService } from "../../services";

@Component({
  selector: "app-dashboard",
  templateUrl: "./full-layout.component.html"
})
export class FullLayoutComponent {
  constructor(
    private _programService: ProgramService,
    private _eventEmitterService: EventEmitterService,
    private location: LocationStrategy
  ) {
    window.history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      window.history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {
    this._programService.getSupportedLanguages().subscribe(lang => {
      this._eventEmitterService.updateSupportedLanguages(lang);
    });
  }
}
