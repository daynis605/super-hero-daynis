import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  public submitForm() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email!!, password!!)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        if (error.code == "auth/invalid-login-credentials")
          this.openSnackBar('La contraseña es incorrecta.');
        else
          this.openSnackBar('Se ha producido un error inténtelo más tarde');
      });
  }

  public getEmailError() {
    if (
      !this.loginForm.get('email')?.touched ||
      !this.loginForm.get('email')?.errors
    ) {
      return null;
    }

    if (
      this.loginForm.get('email')?.errors?.['email'] &&
      this.loginForm.get('email')?.touched
    ) {
      return 'El correo es inválido';
    }

    if (
      this.loginForm.get('email')?.errors?.['required'] &&
      this.loginForm.get('email')?.dirty &&
      this.loginForm.get('email')?.touched
    ) {
      return 'El correo es requerido';
    }

    return null;
  }

  public getPasswordError() {
    if (
      !this.loginForm.get('password')?.touched ||
      !this.loginForm.get('password')?.errors
    ) {
      return null;
    }

    else if (
      this.loginForm.get('password')?.errors?.['required'] &&
      this.loginForm.get('password')?.dirty &&
      this.loginForm.get('password')?.touched
    ) {
      return 'La contraseña es obligatoria.';
    }

    if (
      this.loginForm.get('password')?.errors?.['minlength'] &&
      this.loginForm.get('password')?.dirty &&
      this.loginForm.get('password')?.touched
    ) {
      return 'Mínimo 6 carácteres ';
    }

    return null;
  }

  private openSnackBar(text: string) {
    this._snackBar.open(text, 'Cerrar', {
      duration: 5000
    });
  }

}
