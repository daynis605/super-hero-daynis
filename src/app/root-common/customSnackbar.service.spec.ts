import { TestBed } from '@angular/core/testing';
import { CustomSnackbarService } from './customSnackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CustomSnackbarService', () => {
  let service: CustomSnackbarService;
  let snackbarSpy: any;

  beforeEach(() => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        CustomSnackbarService,
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
    });

    service = TestBed.inject(CustomSnackbarService);
  });

  it('should open methode in snacbar', () => {
    service.openSnackBar('Open');

    expect(snackbarSpy.open).toHaveBeenCalledTimes(1);
  });
});
