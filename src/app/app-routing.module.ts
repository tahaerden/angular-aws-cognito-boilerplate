import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then((m) => m.LogoutModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule)
      }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
