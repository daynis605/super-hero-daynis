import { TestBed } from '@angular/core/testing';

import { InteceptorService } from './inteceptor.service';

describe('InteceptorService', () => {
  let service: InteceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
