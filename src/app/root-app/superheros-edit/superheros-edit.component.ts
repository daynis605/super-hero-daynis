import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SuperherosI } from '../interfaces/superheros';
import { SuperherosService } from '../services/superheros.service';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';
import {
  isExistSuperHero,
  superHeroFactory,
} from 'src/app/root-common/common-filter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-superheros-edit',
  templateUrl: './superheros-edit.component.html',
  styleUrls: ['./superheros-edit.component.scss'],
})
export class SuperherosEditComponent implements OnInit {
  public editForm!: FormGroup;
  public listSuperHeros: SuperherosI[] = [];

  public hero!: SuperherosI | null;
  @Input() id = '0';

  constructor(
    private superherosService: SuperherosService,
    private snackBarService: CustomSnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      photo: new FormControl(''),
      powers: new FormControl(''),
      battle_numbers: new FormControl(0),
    });
    this.loadSuperHeroById();
    this.loadSuperAllHero();
  }

  public submitForm() {
    let superhero = superHeroFactory(this.editForm);
    superhero.id = this.hero?.id;

    if (
      superhero.name != this.hero?.name &&
      isExistSuperHero(superhero, this.listSuperHeros)
    ) {
      this.snackBarService.openSnackBar(
        'No pueden editar el super héroes con ese nombre porque ya existe.'
      );
      return;
    }
    this.superherosService
      .updateSuperHeros(superhero)
      .pipe(take(1))
      .subscribe({
        next: () => this.showNotification(),
        error: (error: HttpErrorResponse) => {
          if (error.status != 500)
            this.snackBarService.openSnackBar(
              'Se ha producido un error al editar el super héroe,'
            );
          this.showNotification();
        },
      });
  }

  private loadSuperHeroById() {
    this.superherosService
      .getSuperHeroById(this.id!)
      .pipe(take(1))
      .subscribe({
        next: (hero: SuperherosI) => {
          this.hero = hero;
          this.editForm.setValue({
            name: hero.name,
            description: hero.description!,
            photo: hero.photo!,
            powers: hero.powers!,
            battle_numbers: hero.battle_numbers!,
          });
        },
        error: () => {
          this.snackBarService.openSnackBar(
            'Se ha producido un error al cargar los datos del super héroe. Intente esta operación más tarde'
          );
        },
      });
  }

  private loadSuperAllHero() {
    this.superherosService
      .getAllSuperHeros()
      .pipe(take(1))
      .subscribe({
        next: (hero: SuperherosI[]) => {
          this.listSuperHeros = hero;
        },
        error: () => {
          this.snackBarService.openSnackBar(
            'Se ha producido un error al cargar los datos del super héroe. Intente esta operación más tarde'
          );
        },
      });
  }

  private showNotification() {
    this.snackBarService.openSnackBar('Editado el super héroe exitosamente');
    this.router.navigate(['/home']);
  }
}
