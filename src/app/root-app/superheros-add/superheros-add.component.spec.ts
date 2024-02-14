import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SuperherosAddComponent } from './superheros-add.component';
import { SuperherosService } from '../services/superheros.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeListComponent } from '../home-list/home-list.component';
import { of, throwError } from 'rxjs';
import { SuperherosI } from '../interfaces/superheros';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

describe('SuperherosAddComponent', () => {
  let component: SuperherosAddComponent;
  let fixture: ComponentFixture<SuperherosAddComponent>;
  let superHeroServiceSpy: any, customSnackbarServiceSpy: any;
  let router: Router;

  const superHeros: SuperherosI[] = [
    {
      id: '0',
      name: 'Super Tour',
      description: '',
    },
    {
      id: '1',
      name: 'Super 2',
      description: '',
    },
    {
      id: '3',
      name: 'Super 2',
      description: '',
    },
  ];

  beforeEach(waitForAsync(() => {
    superHeroServiceSpy = jasmine.createSpyObj('SuperherosService', [
      'createSuperHeros',
      'getAllSuperHeros',
    ]);
    customSnackbarServiceSpy = jasmine.createSpyObj('CustomSnackbarService', [
      'openSnackBar',
    ]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeListComponent },
        ]),
      ],
      declarations: [SuperherosAddComponent],
      providers: [
        HomeListComponent,
        { provide: SuperherosService, useValue: superHeroServiceSpy },
        { provide: CustomSnackbarService, useValue: customSnackbarServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosAddComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all superheroes satisfactorily ', () => {
    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(superHeros));

    fixture.detectChanges();

    expect(superHeroServiceSpy.getAllSuperHeros).toHaveBeenCalled();
    expect(component.listSuperHeros.length).toBe(3);
  });

  it('should get all superheroes and return error ', () => {
    superHeroServiceSpy.getAllSuperHeros.and.returnValue(
      throwError(() => new Error('Internar error'))
    );

    fixture.detectChanges();

    expect(superHeroServiceSpy.getAllSuperHeros).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });

  it('should submit name of super hero exist ', () => {
    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(superHeros));
    fixture.detectChanges();

    component.listSuperHeros = superHeros;
    component.addForm.setValue({
      name: 'Super Tour',
      description: '',
      photo: '',
      powers: '',
      battle_numbers: '',
    });

    component.submitForm();

    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });

  it('should submit form create super hero satisfactorily ', () => {
    superHeroServiceSpy.createSuperHeros.and.returnValue(of(superHeros[0]));
    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(superHeros));
    spyOnProperty(router, 'url', 'get').and.returnValue('home');
    fixture.detectChanges();

    component.listSuperHeros = superHeros;
    component.addForm.setValue({
      name: 'Super Other',
      description: '',
      photo: '',
      powers: '',
      battle_numbers: '',
    });

    component.submitForm();

    expect(superHeroServiceSpy.createSuperHeros).toHaveBeenCalled();
    expect(router.url).toEqual('home');
  });

  it('should submit form create super hero and return error ', () => {
    superHeroServiceSpy.createSuperHeros.and.returnValue(
      throwError(() => {
        new Error('Error');
      })
    );
    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(superHeros));
    spyOnProperty(router, 'url', 'get').and.returnValue('home');
    fixture.detectChanges();

    component.listSuperHeros = superHeros;
    component.addForm.setValue({
      name: 'Super Other',
      description: '',
      photo: '',
      powers: '',
      battle_numbers: '',
    });

    component.submitForm();

    expect(superHeroServiceSpy.createSuperHeros).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });
});
