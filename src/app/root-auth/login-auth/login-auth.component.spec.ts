import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginAuthComponent } from './login-auth.component';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeListComponent } from 'src/app/root-app/home-list/home-list.component';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';
import { Router } from '@angular/router';

describe('LoginAuthComponent', () => {
  let component: LoginAuthComponent;
  let fixture: ComponentFixture<LoginAuthComponent>;
  let serviceAuthSpy: any, customSnackbarServiceSpy: any;
  let router: Router;

  beforeEach(waitForAsync(() => {
    serviceAuthSpy = jasmine.createSpyObj('SuperherosService', ['login']);
    customSnackbarServiceSpy = jasmine.createSpyObj('CustomSnackbarService', [
      'openSnackBar',
    ]);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeListComponent },
        ]),
      ],
      declarations: [LoginAuthComponent],
      providers: [
        HomeListComponent,
        { provide: AuthService, useValue: serviceAuthSpy },
        { provide: CustomSnackbarService, useValue: customSnackbarServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuthComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login satisfactorily ', () => {
    serviceAuthSpy.login.and.returnValue(Promise.resolve(null));
    spyOnProperty(router, 'url', 'get').and.returnValue('home');

    fixture.detectChanges();
    component.loginForm.setValue({
      email: 'example@gmail.com',
      password: '123456789',
    });

    component.submitForm();

    expect(serviceAuthSpy.login).toHaveBeenCalled();
    expect(router.url).toEqual('home');
  });

  it('should login and return error ', fakeAsync(() => {
    serviceAuthSpy.login.and.returnValue(
      Promise.reject({ message: 'auth/invalid-login-credentials' })
    );

    fixture.detectChanges();

    component.loginForm.setValue({
      email: 'example@gmail.com',
      password: '123456789',
    });

    component.submitForm();

    expect(serviceAuthSpy.login).toHaveBeenCalled();
    flush();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  }));
});
