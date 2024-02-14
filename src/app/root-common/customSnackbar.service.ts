import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

public openSnackBar(text: string) {
  this._snackBar.open(text, 'Cerrar', {
    duration: 5000
  });
}
}
