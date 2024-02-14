import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SuperherosEditComponent } from './superheros-edit.component';
import { SuperherosService } from '../services/superheros.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeListComponent } from '../home-list/home-list.component';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SuperherosEditComponent', () => {
  let component: SuperherosEditComponent;
  let fixture: ComponentFixture<SuperherosEditComponent>;
  let superHeroServiceSpy: any, customSnackbarServiceSpy: any;
  let router: Router;

  const editSuperHero = {
    id: '0',
    name: 'Super Tour',
    description: '',
  };
  beforeEach(waitForAsync(() => {
    superHeroServiceSpy = jasmine.createSpyObj('SuperherosService', [
      'getSuperHeroById',
      'updateSuperHeros',
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
      declarations: [SuperherosEditComponent],
      providers: [
        HomeListComponent,
        { provide: SuperherosService, useValue: superHeroServiceSpy },
        { provide: CustomSnackbarService, useValue: customSnackbarServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperherosEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get a superhero by id satisfactorily ', () => {
    superHeroServiceSpy.getSuperHeroById.and.returnValue(
      of({
        id: '0',
        name: 'Super Tour',
        description: '',
      })
    );

    fixture.detectChanges();

    expect(superHeroServiceSpy.getSuperHeroById).toHaveBeenCalled();
    expect(component.hero?.id).toEqual('0');
  });

  it('should get a superhero by id and return error', () => {
    superHeroServiceSpy.getSuperHeroById.and.returnValue(
      throwError(() => new Error('Internar error'))
    );

    fixture.detectChanges();

    expect(superHeroServiceSpy.getSuperHeroById).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });

  it('should submit form edit super hero satisfactorily ', () => {
    superHeroServiceSpy.getSuperHeroById.and.returnValue(of(editSuperHero));
    superHeroServiceSpy.updateSuperHeros.and.returnValue(of(editSuperHero));
    spyOnProperty(router, 'url', 'get').and.returnValue('home');
    fixture.detectChanges();

    component.editForm.setValue({
      name: 'Super Tour',
      description: '',
      photo: '',
      powers: '',
      battle_numbers: '',
    });

    component.submitForm();

    expect(superHeroServiceSpy.updateSuperHeros).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
    expect(router.url).toEqual('home');
  });

  it('should submit form edit super hero and return error ', () => {
    superHeroServiceSpy.getSuperHeroById.and.returnValue(of(editSuperHero));
    superHeroServiceSpy.updateSuperHeros.and.returnValue(
      throwError(() => {
        new Error('Error');
      })
    );

    fixture.detectChanges();

    component.editForm.setValue({
      name: 'Super Other',
      description: '',
      photo: '',
      powers: '',
      battle_numbers: '',
    });

    component.submitForm();

    expect(superHeroServiceSpy.updateSuperHeros).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });
});
