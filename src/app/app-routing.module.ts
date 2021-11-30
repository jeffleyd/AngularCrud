import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {GuestGuard} from './guard/guest.guard';
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [GuestGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/admin/main/main.module').then( m => m.MainPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/admin/category/category.module').then( m => m.CategoryPageModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
