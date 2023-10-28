import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./root-app/root-app.module').then((m) => m.RootAppModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
    import('./root-auth/root-auth.module').then((m) => m.RootAuthModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
