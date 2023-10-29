import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootFormComponentModule } from '../root-form-component/root-form-component.module';
import { RootMaterialModule } from '../root-material/root-material.module';
import { RootAppRoutingModule } from './root-app-routing.module';

import { HomeAppComponent } from './home-app/home-app.component';
import { HomeListComponent } from './home-list/home-list.component';
import { ConfirmationDeleteComponent } from './confirmation-delete/confirmation-delete.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorTranslation } from '../root-material/paginator-translation';
import { SuperherosAddComponent } from './superheros-add/superheros-add.component';
import { SuperherosEditComponent } from './superheros-edit/superheros-edit.component';


@NgModule({
  imports: [
    CommonModule,
    RootAppRoutingModule,
    RootMaterialModule, 
    RootFormComponentModule,
  ],
  declarations: [HomeAppComponent, HomeListComponent, ConfirmationDeleteComponent,
    SuperherosAddComponent,
    SuperherosEditComponent ],

  providers:[
    { provide: MatPaginatorIntl , useClass: PaginatorTranslation},
  ]
})
export class RootAppModule { }
