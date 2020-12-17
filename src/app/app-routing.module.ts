import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products-main/products.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { ProductAddComponent } from './pages/products/product-add/product-add.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './providers/authentication/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products'},
    canActivate: [AuthGuard]
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product Details'},
    canActivate: [AuthGuard]
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add Product'},
    canActivate: [AuthGuard]
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product'},
    canActivate: [AuthGuard]
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
