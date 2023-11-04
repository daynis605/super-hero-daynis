import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RegisterAuthComponent } from './register-auth.component';


describe('RegisterAuthComponent', () => {
  let component: RegisterAuthComponent;
  let fixture: ComponentFixture<RegisterAuthComponent>;
  let service: AuthService


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,  
        provideFirebaseApp(() => initializeApp(environment.firebase)), 
        provideAuth(() => getAuth()),
        BrowserAnimationsModule,
        ],
      declarations: [RegisterAuthComponent],
      providers: [MatSnackBar, AuthService,
      provideRouter([{path: '**', component: RegisterAuthComponent}]),],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(AuthService)
  });


    it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Register done incorrectly', (done) => {

    spyOn(service, 'register').and.returnValue( 
      Promise.reject({ message: 'auth/invalid-login-credentials' }));
    
    component.submitForm()
    expect(service.register).toHaveBeenCalled();
    done()

  });

  it('Successful register', (done) => {

    spyOn(service, 'register').and.returnValue( 
      Promise.resolve(null));
    
    component.submitForm()
    expect(service.register).toHaveBeenCalled();
    done()

  });
});

