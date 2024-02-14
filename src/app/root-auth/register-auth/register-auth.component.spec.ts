import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterAuthComponent } from './register-auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginAuthComponent } from '../login-auth/login-auth.component';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

describe('RegisterAuthComponent', () => {
  let component: RegisterAuthComponent;
  let fixture: ComponentFixture<RegisterAuthComponent>;
  let serviceAuthSpy: any, customSnackbarServiceSpy: any;
  let router: Router;

  beforeEach(waitForAsync(() => {
    serviceAuthSpy = jasmine.createSpyObj('SuperherosService', ['register']);
    customSnackbarServiceSpy = jasmine.createSpyObj('CustomSnackbarService', [
      'openSnackBar',
    ]);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: LoginAuthComponent },
        ]),
      ],
      declarations: [RegisterAuthComponent],
      providers: [
        LoginAuthComponent,
        { provide: AuthService, useValue: serviceAuthSpy },
        { provide: CustomSnackbarService, useValue: customSnackbarServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAuthComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register satisfactorily ', fakeAsync(() => {
    serviceAuthSpy.register.and.returnValue(Promise.resolve(null));
    spyOnProperty(router, 'url', 'get').and.returnValue('auth/login');

    fixture.detectChanges();
    component.registerForm.setValue({
      email: 'example@gmail.com',
      password: '123456789',
      password_repeat: '123456789',
    });

    component.submitForm();

    expect(serviceAuthSpy.register).toHaveBeenCalled();
    expect(router.url).toEqual('auth/login');
    flush();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  }));

  it('should register and return error ', fakeAsync(() => {
    serviceAuthSpy.register.and.returnValue(
      Promise.reject({ message: 'auth/invalid-login-credentials' })
    );

    fixture.detectChanges();

    component.registerForm.setValue({
      email: 'example@gmail.com',
      password: '123456789',
      password_repeat: '123456789',
    });

    component.submitForm();

    expect(serviceAuthSpy.register).toHaveBeenCalled();
    flush();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  }));

  it('should register and  password and password_repeat are different', () => {
    fixture.detectChanges();

    component.registerForm.setValue({
      email: 'example@gmail.com',
      password: '12345eee',
      password_repeat: '123456789',
    });

    component.submitForm();

    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });
});
