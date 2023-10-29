import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { HomeAppComponent } from './home-app/home-app.component';
import { HomeListComponent } from './home-list/home-list.component';
import { SuperherosAddComponent } from './superheros-add/superheros-add.component';
import { SuperherosEditComponent } from './superheros-edit/superheros-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeAppComponent,
    children: [
      {
        path:'',
        component: HomeListComponent,
      },
      {
        path: '',
        redirectTo:'',
        pathMatch:'full'
      },
      {
        path:'add',
        component: SuperherosAddComponent,
      },
      {
        path:':id/edit',
      component: SuperherosEditComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule],
  providers:[provideRouter(routes, withComponentInputBinding())]
})
export class RootAppRoutingModule {}