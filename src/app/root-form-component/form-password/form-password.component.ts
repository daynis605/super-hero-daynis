import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputType } from '../enums/input-type.enum';
import { PasswordEyeIcon } from '../enums/password-eye-icon.enum';

@Component({
  selector: 'paz-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class FormPasswordComponent {
  @Input()
  public controlName = '';
  @Input()
  public errorMessage: string | null = '';
  @Input()
  public placeholder = '';

  public type = InputType.password;
  public activeIcon = PasswordEyeIcon.visibilityOn;


  public toggleType() {
    if (this.type === InputType.password) {
      this.type = InputType.text;
      this.activeIcon = PasswordEyeIcon.visibilityOff;
    } else if (this.type === InputType.text) {
      this.type = InputType.password;
      this.activeIcon = PasswordEyeIcon.visibilityOn;
    }
  }
}
