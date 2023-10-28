import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginAuthComponent } from './login-auth/login-auth.component';
import { RegisterAuthComponent } from './register-auth/register-auth.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'login',
        component: LoginAuthComponent,
      },
      {
        path: 'register',
        component: RegisterAuthComponent,
      },
      {
        path: '',
        redirectTo:'login',
        pathMatch:'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootAuthRoutingModule {}
