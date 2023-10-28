import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootAuthRoutingModule } from './root-auth-routing.module';

import { LoginAuthComponent } from './login-auth/login-auth.component';
import { RegisterAuthComponent } from './register-auth/register-auth.component';
import { RootFormComponentModule } from '../root-form-component/root-form-component.module';
import { RootMaterialModule } from '../root-material/root-material.module';

@NgModule({
  imports: [
    CommonModule, 
    RootAuthRoutingModule,
    RootMaterialModule,
    RootFormComponentModule
  ],
  declarations: [LoginAuthComponent, RegisterAuthComponent]
})
export class RootAuthModule { }
