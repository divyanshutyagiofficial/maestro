import { Component, Input, Output, EventEmitter} from '@angular/core';
import { DynamicLoaderComponent } from './dynamic-loader.component'

@Component({
    selector: 'dynamic-layout',
    template: `
      <div class="row" *ngFor="let field of fields" dynamic-loader [field]="field" [notify]="notify"></div>`,
})
export class DynamicLayoutComponent {
    @Input() fields: any[] = [];
    @Input() notify: EventEmitter<any> = new EventEmitter<any>();
}
