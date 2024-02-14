import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss'],
})
export class LoginAuthComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: CustomSnackbarService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public submitForm() {
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email!!, password!!)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.snackBarService.openSnackBar(
          'La credenciales son incorrectas o se produjo un error inténtelo más tarde'
        );
      });
  }
}
