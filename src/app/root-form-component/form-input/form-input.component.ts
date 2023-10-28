import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'paz-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class FormInputComponent { 
  @Input()
  public controlName = '';
  @Input()
  public errorMessage: string | null = '';
  @Input()
  public placeholder = '';
  @Input()
  public activeIcon = '';
  @Input()
  public typeInput = 'text';

}
