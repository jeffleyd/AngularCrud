import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';
import {AuthGuard} from '../../../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  },
  {
    path: 'edit/:prod',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
