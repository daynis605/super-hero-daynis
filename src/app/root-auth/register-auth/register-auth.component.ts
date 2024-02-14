import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.scss'],
})
export class RegisterAuthComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: CustomSnackbarService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password_repeat: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public submitForm() {
    if (
      this.registerForm.get('password')?.value ==
      this.registerForm.get('password_repeat')?.value
    ) {
      const { email, password } = this.registerForm.value;
      this.authService
        .register(email, password)
        .then(() => {
          this.snackBarService.openSnackBar(
            'Se ha realizado el registro correctamente'
          );
          this.router.navigate(['/auth/login']);
        })
        .catch(() => {
          this.snackBarService.openSnackBar(
            'Este correo ya esxiste o se producido un error al realizar el registro.'
          );
        });
      return;
    }

    this.registerForm.get('password_repeat')?.reset();
    this.snackBarService.openSnackBar('Las contraseñas no coinciden');
  }
}
