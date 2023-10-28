import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RootMaterialModule } from '../root-material/root-material.module';
import { FormInputComponent } from './form-input/form-input.component';
import { FormPasswordComponent } from './form-password/form-password.component';
import { UpperCaseDirective } from './uppercase.directive';

@NgModule({
  imports: [
    CommonModule,
    RootMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [FormInputComponent, FormPasswordComponent, UpperCaseDirective],
  exports: [FormInputComponent, FormPasswordComponent, ReactiveFormsModule, FormsModule]
})
export class RootFormComponentModule { }
