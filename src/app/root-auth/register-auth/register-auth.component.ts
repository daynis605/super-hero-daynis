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
        .catch(() => {
            this.openSnackBar('Este correo ya esxiste o se producido un error al realizar el registro.');
        });
      return
    }

    this.registerForm.get('password_repeat')?.reset()
    this.openSnackBar('Las contraseñas no coinciden');

  }

  private openSnackBar(text: string) {
    this._snackBar.open(text, 'Cerrar', {
      duration: 5000
    });
  }

}
