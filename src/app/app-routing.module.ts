import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './root-auth/guard/auth.guard';
import { appGuard } from './root-app/guard/app.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [appGuard],
    loadChildren: () =>
      import('./root-app/root-app.module').then((m) => m.RootAppModule),
  },
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./root-auth/root-auth.module').then((m) => m.RootAuthModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
