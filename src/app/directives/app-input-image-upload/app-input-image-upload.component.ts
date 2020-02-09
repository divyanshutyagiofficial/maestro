import { Component, Input, Output, ViewEncapsulation, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { EventEmitterService } from '../../services/event-emitter.service'
import { Validator } from '../validators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from '../image-cropper/image-cropper.component';

@Component({
    selector: '[app-image-upload]',
    template: `
        <h1 class="medium-title">{{title}}</h1>
        <div class="profile_column">
        <p align="center">{{ field.text }}</p>
            <div class="profile">
                <div class="defualt_pic">
                    <img [src]="avatarImageSafe" content="origin" alt="" />
                </div>

                <div class="browse_btn">
                    <label class="btn-bs-file btn btn-lg btn-primary">
                        <div id="upload_text">{{uploadText}}</div>
                        <input type="file" accept="image/*" id="avatar" (change)="onFileChange($event)" #fileInput>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="cropper_container" *ngIf="cropToggle">
        <div class="req_error" *ngIf="cropToggle">
        <div class="modal fade show in danger" id="myModal" role="dialog">
          <div class="modal-dialog">
          <div class="controls" *ngIf="cropperReady">
            <button class="close_button">
              <i class="material-icons close" (click)="close()">close</i>
            </button>
            <button class="done">
              <a (click)="crop()" referrerpolicy="origin">
                <i class="material-icons">
                  check
                </i></a></button>
                </div>
            <div class="modal-content">
                <div>
                <image-cropper [imageChangedEvent]="imageChangedEvent" [maintainAspectRatio]="true" [aspectRatio]="3 / 3"
                    [resizeToWidth]="128" [roundCropper]="false" format="png" outputType="both" (imageCropped)="imageCropped($event)"
                    (imageLoaded)="imageLoaded()" (loadImageFailed)="loadImageFailed()" style="max-height: 33vh"
                    [style.display]="cropperReady ? null : 'none'"></image-cropper>
                </div>
          </div>
        </div>
        
        <div class="imgLoader">
              <img *ngIf="!cropperReady" class="loading" src="assets/img/spinner_white.gif" alt="Loading..." content="origin" alt="" />
        </div>
      </div>
    </div>

</div>
    `,
    styleUrls: ['../../views/personal-details-component/personal-details.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class AppInputImageUploadComponent {
    @ViewChild('fileInput') fileInput: ElementRef;
    @Input() field: any;
    @Output() notify;
    @ViewChild('avatar') input: ElementRef;
    data;
    validate: Function;
    validationResults: any = {};
    title: string;
    cropToggle: boolean = false;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    cropperReady = false;

    avatar: any = {
        filename: null,
        filetype: null,
        value: null
    };
    avatarImageSafe: SafeUrl;
    uploadText: string;
    _placeholderImg;

    constructor(
        private sanitizer: DomSanitizer,
        private _eventEmitterService: EventEmitterService,
        private eventEmitter: EventEmitterService
    ) { }

    onFileChange(event) {
        this.cropperReady = false;
        if (event.target.files && event.target.files.length) {
            this.imageChangedEvent = event;
            this.cropToggle = true;
        }
    }

    ngOnInit() {
        this._eventEmitterService.currentContent.subscribe(content => {
            if (Object.keys(content).length) {
                this.title = content['personal_details'][6];
                if (this.field.input.length > 1) {
                    this.avatarImageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.field.input);
                    this.uploadText = content['personal_details'][7];
                } else {
                    this.avatarImageSafe = this.sanitizer.bypassSecurityTrustUrl('assets/img/default_profile_pic.png');
                    this.uploadText = content['personal_details'][7];
                }
            }
        });
        this.validate = new Validator()
            .prepare(this.field, this.validationResults, (value, errors: any = {}) => {
                this.field.errors = errors;
                this.notify('changed-input', this.field);
            })
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        this.cropperReady = true;
    }
    loadImageFailed() {
        console.log('Load failed');
    }
    crop() {
        this.avatarImageSafe = this.croppedImage;
        let url: any = this.avatarImageSafe;
        this.field.value = url.split(',')[1];
        this.field.input = url.split(',')[1];
        this.cropperReady = false;
        this.cropToggle = false;
    }
    close() {
        this.cropToggle = false;
    }
}
