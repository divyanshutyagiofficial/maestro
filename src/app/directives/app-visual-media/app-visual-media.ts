import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-media',
    template: `
    <div class="video">
    <video class="embed-responsive-item movie" *ngIf="field.masterBank.urlType == 'VIDEO' &&  !field.masterBank.url.includes('embed')" controls controlsList="nodownload" allowfullscreen>
    <source [src]='field.masterBank.url'  type="video/mp4">
    </video>
    <iframe *ngIf="field.masterBank.urlType == 'VIDEO' && field.masterBank.url.includes('embed')" class="movie" width="360" height="240" [src]="getSafeUrl()" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <audio controls *ngIf="field.masterBank.urlType == 'AUDIO'" controlsList="nodownload">
    <source [src]='field.masterBank.url' type="audio/mpeg">
    </audio>
    <img class="img-fluid" *ngIf="field.masterBank.urlType == 'IMAGE' " [src]="field.masterBank.url" content="origin" alt="" />
    `,
    styleUrls: ['../../../assets/css/question-component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppVisualMediaComponent{
    @Input() field: any;
    url;
    constructor(private sanitizer: DomSanitizer) {
     }

     getSafeUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.field.masterBank.url);
     }
}
