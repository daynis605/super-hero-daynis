import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.scss']
})
export class RegisterAuthComponent {

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password_repeat: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar) { }

 public submitForm() {

    if (this.registerForm.get('password')?.value == this.registerForm.get('password_repeat')?.value) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password)
        .then(() => {
          this.openSnackBar('Se ha realizado el registro correctamente');
          this.router.navigate(['/auth/login']);
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use")
            this.openSnackBar('Este correo ya existe.');
          else
            this.openSnackBar('Se ha producido un error al realizar el registro.');

        });
      return
    }

    this.registerForm.get('password_repeat')?.reset()
    this.openSnackBar('Las contraseñas no coinciden');

  }

  public getEmailError() {
    if (
      !this.registerForm.get('email')?.touched ||
      !this.registerForm.get('email')?.errors
    ) {
      return null;
    }

    if (
      this.registerForm.get('email')?.errors?.['email'] &&
      this.registerForm.get('email')?.touched
    ) {
      return 'El correo es inválido';
    }

    if (
      this.registerForm.get('email')?.errors?.['required'] &&
      this.registerForm.get('email')?.dirty &&
      this.registerForm.get('email')?.touched
    ) {
      return 'El correo es requerido';
    }

    return null;
  }

  public getPasswordError() {

    if (
      !this.registerForm.get('password')?.touched ||
      !this.registerForm.get('password')?.errors
    ) {
      return null;
    }

    if (
      this.registerForm.get('password')?.errors?.['minlength'] &&
      this.registerForm.get('password')?.dirty &&
      this.registerForm.get('password')?.touched
    ) {
      return 'Mínimo 6 carácteres ';
    }

    else if (
      this.registerForm.get('password')?.errors?.['required'] &&
      this.registerForm.get('password')?.dirty &&
      this.registerForm.get('password')?.touched
    ) {
      return 'La contraseña es obligatoria.';
    }

    return null;
  }

  private openSnackBar(text: string) {
    this._snackBar.open(text, 'Cerrar', {
      duration: 5000
    });
  }

}
