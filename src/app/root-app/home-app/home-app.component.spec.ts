import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeAppComponent } from './home-app.component';
import { LoginAuthComponent } from 'src/app/root-auth/login-auth/login-auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/root-auth/services/auth.service';
import { LoaderService } from '../services/loader.service';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('HomeAppComponent', () => {
  let fixture: ComponentFixture<HomeAppComponent>;
  let component: HomeAppComponent;

  let authServiceSpy: any;
  let loadingServiceSpy: any;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    loadingServiceSpy = jasmine.createSpyObj('LoaderService', [], {
      isLoading: new BehaviorSubject<boolean>(false),
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: LoginAuthComponent },
        ]),
      ],
      declarations: [HomeAppComponent],
      providers: [
        LoginAuthComponent,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: LoaderService, useValue: loadingServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAppComponent);
    component = fixture.componentInstance;
    loadingServiceSpy = TestBed.inject(LoaderService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should log out successfully', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/auth/login');

    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(router.url).toEqual('/auth/login');
  });
});
