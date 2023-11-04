import { TestBed } from '@angular/core/testing';

import { InteceptorService } from './inteceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { BehaviorSubject, of } from 'rxjs';

class LoginServiceMock {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}

describe('InteceptorService', () => {
  let http: HttpTestingController;
  let httpClient: HttpClient;
  let interceptor: InteceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InteceptorService,
          multi: true,
        },
        { provide: LoaderService, 
          useClass: LoginServiceMock },
      ]
    });
    interceptor = TestBed.inject(InteceptorService);
  });

  it('should be created', () => {
    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    expect(interceptor).toBeTruthy();
  });

  it('Intercept a method of delete', () => {
    expect((interceptor as any) instanceof InteceptorService).toBeTruthy();
    
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        expect(request.method).toEqual('DELETE');
        return of({ hello: 'world' });
      }
    };

    const req = new HttpRequest<any>('DELETE', "http://localhost:3000/superheros");

    interceptor.intercept(req, next).subscribe(() => {})

  });

});
