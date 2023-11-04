import {  Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SuperherosI } from '../interfaces/superheros';
import { SuperherosService } from '../services/superheros.service';

@Component({
  selector: 'app-superheros-edit',
  templateUrl: './superheros-edit.component.html',
  styleUrls: ['./superheros-edit.component.scss']
})
export class SuperherosEditComponent implements OnInit {

  public editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    photo: new FormControl(''),
    powers: new FormControl(''),
    battle_numbers: new FormControl(0),
  });

  public hero!: SuperherosI | null 
  @Input() id = '0'

  constructor(private superherosService: SuperherosService, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
   this.loadSuperHeroById()
  }

  public submitForm() {

    const superheros: SuperherosI = {
      name: this.editForm.value.name!!,
      description: this.editForm.value.description!!,
      photo: this.editForm.value.photo!!,
      battle_numbers: this.editForm.value.battle_numbers!!,
      powers: this.editForm.value.powers!!,
      id: this.id
    }
    this.superherosService.updateSuperHeros(superheros).pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Editado el super héroe exitosamente');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.openSnackBar('Se ha producido un error al editar el super héroe,');
        },
      });
  }

  private openSnackBar(text: string) {
    this._snackBar.open(text, 'Cerrar', {
      duration: 5000
    });
  }

  private loadSuperHeroById(){
    this.superherosService.getSuperHeroById(this.id!).pipe(take(1))
    .subscribe({
      next: (hero: SuperherosI) => {
        this.hero = hero
        this.editForm.setValue({
          name: hero.name, description: hero.description!,
          photo: hero.photo!, powers: hero.powers!, battle_numbers: hero.battle_numbers!
        })

      },
      error: (error) => {
        this.openSnackBar('Se ha producido un error al cargar los datos del super héroe. Intente esta operación más tarde');
      },
    });
  }

}
