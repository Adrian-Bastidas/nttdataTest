import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { create } from 'domain';
import { CreateProductComponent } from './features/products/components/create-product/create-product.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: CreateProductComponent,
  },
];
