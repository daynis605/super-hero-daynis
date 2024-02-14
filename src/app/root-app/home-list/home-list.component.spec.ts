import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  waitForAsync,
} from '@angular/core/testing';
import { HomeListComponent } from './home-list.component';
import { SuperherosEditComponent } from '../superheros-edit/superheros-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SuperherosService } from '../services/superheros.service';

import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SuperherosI } from '../interfaces/superheros';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RootMaterialModule } from 'src/app/root-material/root-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

describe('HomeListComponent', () => {
  let fixture: ComponentFixture<HomeListComponent>;
  let component: HomeListComponent;

  let router: Router;
  let superHeroServiceSpy: any, customSnackbarServiceSpy: any, dialogSpy: any;

  beforeEach(waitForAsync(() => {
    superHeroServiceSpy = jasmine.createSpyObj('SuperherosService', [
      'deleteSuperHeroById',
      'getAllSuperHeros',
    ]);
    customSnackbarServiceSpy = jasmine.createSpyObj('CustomSnackbarService', [
      'openSnackBar',
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home/:id/edit', component: SuperherosEditComponent },
        ]),
        NoopAnimationsModule,
        RootMaterialModule,
        MatDialogModule,
      ],
      declarations: [HomeListComponent],
      providers: [
        HomeListComponent,
        { provide: SuperherosService, useValue: superHeroServiceSpy },
        { provide: CustomSnackbarService, useValue: customSnackbarServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges;
    router = TestBed.inject(Router);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of superheroes successfully', () => {
    const listSuperheroes: SuperherosI[] = [
      { id: '1', name: 'Ssuperheroe 1' },
      { id: '1', name: 'Ssuperheroe 1' },
    ];

    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(listSuperheroes));

    component.ngOnInit();

    expect(component.listHeros.length).toBe(2);
    expect(superHeroServiceSpy.getAllSuperHeros).toHaveBeenCalled();
    expect(component.totalHeros).toEqual(2);
  });

  it('should get a list of superheroes error', () => {
    superHeroServiceSpy.getAllSuperHeros.and.returnValue(
      throwError(() => new Error('404'))
    );

    component.ngOnInit();

    expect(superHeroServiceSpy.getAllSuperHeros).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });

  it('should navegate to component SuperherosEditComponent successfully', () => {
    const superHero: SuperherosI = { id: '1', name: 'PP' };

    spyOnProperty(router, 'url', 'get').and.returnValue(
      `home/${superHero.id}/edit`
    );
    component.editHero(superHero);

    expect(router.url).toEqual('home/1/edit');
  });

  it('should open dialog and hero delete successfully', fakeAsync(() => {
    const listSuperheroes: SuperherosI[] = [
      { id: '1', name: 'Ssuperheroe 1' },
      { id: '1', name: 'Ssuperheroe 1' },
    ];

    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(listSuperheroes));

    const dialogRef = {
      afterClosed: () => of(true),
    } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRef);
    const response = superHeroServiceSpy.deleteSuperHeroById.and.returnValue(
      of(listSuperheroes[1])
    );

    component.deleteHero(listSuperheroes[0]);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(superHeroServiceSpy.deleteSuperHeroById).toHaveBeenCalled();

    flush();

    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
    expect(superHeroServiceSpy.getAllSuperHeros).toHaveBeenCalled();
  }));

  it('should open dialog and return hero delete error', () => {
    const superHero: SuperherosI = { id: '1', name: 'PP' };

    const dialogRef = {
      afterClosed: () => of(true),
    } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRef);
    superHeroServiceSpy.deleteSuperHeroById.and.returnValue(
      throwError(() => new Error('404'))
    );

    component.deleteHero(superHero);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(superHeroServiceSpy.deleteSuperHeroById).toHaveBeenCalled();
    expect(customSnackbarServiceSpy.openSnackBar).toHaveBeenCalled();
  });

  it('should apply filter', () => {
    component.valueFilter = 'Tour';
    const listSuperheroes: SuperherosI[] = [
      { id: '1', name: 'Ssuperheroe 1' },
      { id: '1', name: 'Ssuperheroe 1' },
    ];

    superHeroServiceSpy.getAllSuperHeros.and.returnValue(of(listSuperheroes));
    component.dataSource = new MatTableDataSource(listSuperheroes);

    fixture.detectChanges();

    component.filterApply();
    expect(component.dataSource.filter).toEqual('tour');
  });
});
