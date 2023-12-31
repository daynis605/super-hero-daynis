import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginAuthComponent } from './login-auth.component';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';


describe('LoginAuthComponent', () => {
  let component: LoginAuthComponent;
  let fixture: ComponentFixture<LoginAuthComponent>;
  let service: AuthService


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,  
        provideFirebaseApp(() => initializeApp(environment.firebase)), 
        provideAuth(() => getAuth()),
        BrowserAnimationsModule,
        ],
      declarations: [LoginAuthComponent],
      providers: [MatSnackBar, AuthService,
      provideRouter([{path: '**', component: LoginAuthComponent}]),],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(AuthService)
  });


    it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login done incorrectly', (done) => {

    spyOn(service, 'login').and.returnValue( 
      Promise.reject({ message: 'auth/invalid-login-credentials' }));
    
    component.submitForm()
    expect(service.login).toHaveBeenCalled();
    done()

  });

  it('Successful login', (done) => {

    spyOn(service, 'login').and.returnValue( 
      Promise.resolve(null));
    
    component.submitForm()
    expect(service.login).toHaveBeenCalled();
    done()

  });
});

