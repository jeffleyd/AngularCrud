import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPage } from './category.page';
import {AuthGuard} from '../../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  {
    path: ':id/product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
