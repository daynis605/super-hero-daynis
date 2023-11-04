import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { SuperherosEditComponent } from './superheros-edit.component';
import { SuperherosService } from '../services/superheros.service';


describe('SuperherosEditComponent', () => {
  let component: SuperherosEditComponent;
  let fixture: ComponentFixture<SuperherosEditComponent>;

  let service: SuperherosService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [SuperherosEditComponent],
      providers: [
        MatSnackBar,
        SuperherosService,
        provideRouter([{ path: '**', component: SuperherosEditComponent }]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents()

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SuperherosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(SuperherosService)
  });


  it('should create', () => {   
    expect(component).toBeTruthy();
  });

  
  it('Editing a user by clicking submit', () => {

    const spyService = spyOn(service, 'updateSuperHeros').and.returnValue(of(
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

  it('Edit a user and receive an error when doing so ', () => {
    const spyService = spyOn(service, 'updateSuperHeros').and.returnValue(throwError(()=>{ new Error("Error")}));
    component.submitForm()
    expect(spyService).toHaveBeenCalled()
  });

  it('Performing initial loading of the superhero', () => {

    spyOn(service, 'getSuperHeroById').and.returnValue(of(
      {
        id: '0', name: 'Super 1', description: '', photo: '', powers:'', battle_numbers: 6
      }
    ));
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(service.getSuperHeroById).toHaveBeenCalled();
    expect(component.hero?.id).toBe('0')

  });  

  it('Doing the initial loading of the superhero and getting an error', () => {

    spyOn(service, 'getSuperHeroById').and.returnValue(throwError(()=>{ new Error("Error")}));

    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(service.getSuperHeroById).toHaveBeenCalled();
    expect(component.hero?.id).toBeUndefined()

  });  

});

