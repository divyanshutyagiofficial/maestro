import { Component, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { DynamicLayoutMaps } from './dynamic-layout.maps';

@Component({
    selector: '[dynamic-loader]',
    template: `<ng-template #target></ng-template>`,
})
export class DynamicLoaderComponent {
    @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

    @Input() field: any = {};
    @Input() notify: Function;

    componentRef: ComponentRef<any>;
    private isViewInitialized: boolean = false;

    constructor(private resolver: ComponentFactoryResolver) { }

    updateComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.componentRef) {
            this.componentRef.destroy();
        }

        // have to defer element creation else changeDetection kicks in everytime
        setTimeout(() => {
            if (DynamicLayoutMaps[this.field.componentType]) {
                let factoryRef: ComponentFactory<any> = this.resolver.resolveComponentFactory(DynamicLayoutMaps[this.field.componentType]);
                this.componentRef = this.target.createComponent(factoryRef)

                if (!this.componentRef.instance.field) {
                    this.componentRef.instance.field = this.field;
                }
                if (!this.componentRef.instance.notify) {
                    this.componentRef.instance.notify = this.notify;
                }
            }
        }, 1);
    }

    ngOnChanges() {
        this.updateComponent();
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}

