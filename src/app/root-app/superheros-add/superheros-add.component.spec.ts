
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuperherosAddComponent } from './superheros-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperherosService } from '../services/superheros.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';


describe('SuperherosAddComponent', () => {
  let component: SuperherosAddComponent;
  let fixture: ComponentFixture<SuperherosAddComponent>;

  let service: SuperherosService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [SuperherosAddComponent],
      providers: [
        MatSnackBar,
        SuperherosService,
        provideRouter([{ path: '**', component: SuperherosAddComponent }]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents()

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SuperherosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(SuperherosService)
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Creating a user by clicking submit', () => {

    const spyService = spyOn(service, 'createSuperHeros').and.callFake(() => of(
      {
        id: '0', name: 'Super 1', description: ''
      }
    ))
    component.submitForm()
    expect(spyService).toHaveBeenCalled()

    expect(TestBed.inject(Router).url)
      .withContext(TestBed.inject(Router).url)
      .toEqual('/');

  });

  it('Create a user and receive an error when doing so ', () => {
    const spyService = spyOn(service, 'createSuperHeros').and.returnValue(throwError(() => { new Error("Error") }));
    component.submitForm()
    expect(spyService).toHaveBeenCalled()
  });

  it('Performing initial loading of all superheros', () => {

    spyOn(service, 'getAllSuperHeros').and.returnValue(of([
      {
        id: '0', name: 'Super 1', description: '', photo: '', powers: '', battle_numbers: 6
      }
    ]));
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(service.getAllSuperHeros).toHaveBeenCalled();
    expect(component.listSuper.length).toBe(1)

  });

  it('Doing the initial loading of the superhero and getting an error', () => {
    spyOn(service, 'getAllSuperHeros').and.returnValue(throwError(() => { new Error("Error") }));
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(service.getAllSuperHeros).toHaveBeenCalled();
    expect(component.listSuper.length).toBe(0)
  });

  it('Searching by name', () => {
    const spyService = spyOn(service, 'createSuperHeros').and.returnValue(throwError(() => { new Error("Error") }));
    component.listSuper = [{ id: '0', name: 'Super 1' }, { id: '2', name: 'Super 2' }]
    component.addForm.setValue({
      name: 'Super 1', description: '', photo: '',
      powers: '', battle_numbers: ''
    })
  
    component.submitForm();
    expect(spyService).not.toHaveBeenCalled();
  });

});

