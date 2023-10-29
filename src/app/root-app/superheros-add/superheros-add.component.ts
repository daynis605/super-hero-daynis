import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuperherosService } from '../services/superheros.service';
import { SuperherosI } from '../interfaces/superheros';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superheros-add',
  templateUrl: './superheros-add.component.html',
  styleUrls: ['./superheros-add.component.scss']
})
export class SuperherosAddComponent implements OnInit {

  public addForm!:FormGroup
  
  constructor(private superherosService: SuperherosService, private _snackBar: MatSnackBar, 
    private router: Router) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      photo: new FormControl(null),
      powers: new FormControl(null ),
      battle_numbers: new FormControl(null),
    });
  
  }

  public submitForm() {
    const { name, description, photo, powers, battle_numbers } = this.addForm.value
    const superheros: SuperherosI = { name, description, photo, powers, battle_numbers}
    this.superherosService.createSuperHeros(superheros).pipe(take(1))
    .subscribe({
      next: () => {
        this.openSnackBar('Adicionado el super héroe exitosamente');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.openSnackBar('Se ha producido un error al adicionado el super héroe,');
      },
    });

}

  public getNameError() {
    if (
      !this.addForm.get('name')?.touched ||
      !this.addForm.get('name')?.errors
    ) {
      return null;
    }

    if (
      this.addForm.get('name')?.errors?.['required'] &&
      this.addForm.get('name')?.dirty &&
      this.addForm.get('name')?.touched
    ) {
      return 'El nombre es requerido';
    }

    return null;
  }

  private openSnackBar(text: string) {
    this._snackBar.open(text, 'Cerrar', {
      duration: 5000
    });
  }

}
