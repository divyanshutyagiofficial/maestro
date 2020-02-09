import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from "./change-password.component"
import { ChangePasswordRoutingModule } from "./change-password-routing.module"
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChangePasswordRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ChangePasswordComponent
    ]
})
export class ChangePasswordModule { }

