import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { DynamicLayoutModule } from '../../containers/dynamic-layout/dynamic-layout.module';

@NgModule({
    imports: [
        LoginRoutingModule,
        CommonModule,
        FormsModule,
        DynamicLayoutModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
