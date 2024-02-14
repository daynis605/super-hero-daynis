import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuperherosService } from '../services/superheros.service';
import { SuperherosI } from '../interfaces/superheros';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

@Component({
  selector: 'app-superheros-add',
  templateUrl: './superheros-add.component.html',
  styleUrls: ['./superheros-add.component.scss'],
})
export class SuperherosAddComponent implements OnInit {
  public addForm!: FormGroup;
  public listSuperHeros: SuperherosI[] = [];

  constructor(
    private superherosService: SuperherosService,
    private snackBarService: CustomSnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      photo: new FormControl(null),
      powers: new FormControl(null),
      battle_numbers: new FormControl(null),
    });

    this.loadSuperAllHero();
  }

  public submitForm() {
    const { name, description, photo, powers, battle_numbers } =
      this.addForm.value;
    const superheros: SuperherosI = {
      name,
      description,
      photo,
      powers,
      battle_numbers,
    };

    const hero = this.listSuperHeros.find(
      (hero) =>
        hero.name.toLocaleUpperCase() === superheros.name.toLocaleUpperCase()
    );

    if (hero == undefined) {
      this.superherosService
        .createSuperHeros(superheros)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBarService.openSnackBar(
              'Adicionado el super héroe exitosamente'
            );
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.snackBarService.openSnackBar(
              'Se ha producido un error al adicionado el super héroe,'
            );
          },
        });
    }
    this.snackBarService.openSnackBar(
      'No pueden existir super héroes con el mismo nombre'
    );
  }

  private loadSuperAllHero() {
    this.superherosService
      .getAllSuperHeros()
      .pipe(take(1))
      .subscribe({
        next: (hero: SuperherosI[]) => {
          this.listSuperHeros = hero;
        },
        error: (error) => {
          this.snackBarService.openSnackBar(
            'Se ha producido un error al cargar los datos del super héroe. Intente esta operación más tarde'
          );
        },
      });
  }
}
