import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperherosI } from '../interfaces/superheros';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperherosService } from '../services/superheros.service';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteComponent } from '../confirmation-delete/confirmation-delete.component';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/root-common/customSnackbar.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'description',
    'powers',
    'battle_numbers',
    'actions',
  ];
  public totalHeros = 0;
  public valueFilter = '';

  public dataSource!: MatTableDataSource<SuperherosI>;
  public listHeros: SuperherosI[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private superherosService: SuperherosService,
    public dialog: MatDialog,
    private snackBarService: CustomSnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadListAllSuper();
  }

  public editHero(superheros: SuperherosI) {
    this.router.navigate([`/home/${superheros.id}/edit`]);
  }

  public deleteHero(superheros: SuperherosI) {
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent, {
      width: '500px',
      id: 'dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.superherosService
          .deleteSuperHeroById(superheros.id!)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.loadListAllSuper();
              this.snackBarService.openSnackBar(
                'Eliminado el super héroe exitosamente'
              );
            },
            error: () => {
              this.snackBarService.openSnackBar(
                'Se ha producido un error al tratar de  eliminar un super héroe.'
              );
            },
          });
      }
    });
  }

  public filterApply() {
    this.dataSource.filter = this.valueFilter.trim().toLowerCase();
  }

  private loadListAllSuper() {
    this.superherosService
      .getAllSuperHeros()
      .pipe(take(1))
      .subscribe({
        next: (hero: any) => {
          this.listHeros = hero;
          this.totalHeros = hero.length;
          this.dataSource = new MatTableDataSource(hero);
          this.dataSource!.paginator = this.paginator;
        },
        error: (error) => {
          this.snackBarService.openSnackBar(
            'Se ha producido un error al cargar el listado de super Heroes.'
          );
        },
      });
  }
}
