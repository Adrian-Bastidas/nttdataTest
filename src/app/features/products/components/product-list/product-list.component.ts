import { Component, OnInit } from '@angular/core';
import { TableConstructorComponent } from '../../../../shared/components/table-constructor/table-constructor.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ProductService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [TableConstructorComponent, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // this.cargarProductos();
  }
  goToAddProduct() {
    this.router.navigate(['/add']); // Cambia la ruta a la deseada
  }

  // productos: Product[] = [];
  // async cargarProductos() {
  //   try {
  //     this.productos = await this.productService.getProducts();
  //   } catch (error) {
  //     console.error('Error cargando productos', error);
  //   }
  // }
  columns = [
    { key: 'logo', label: 'Logo' },
    { key: 'name', label: 'Nombre del producto' },
    {
      key: 'description',
      label: 'Descripción',
      tooltip: 'Información del producto',
    },
    {
      key: 'date_release',
      label: 'Fecha de liberación',
      tooltip: 'Fecha de lanzamiento',
    },
    {
      key: 'date_revision',
      label: 'Fecha de reestructuración',
      tooltip: 'Fecha de modificación',
    },
  ];

  rows = [
    {
      id: 'uno',
      name: 'Nombre producto',
      description: 'Descripción producto',
      logo: 'assets-1.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    },
  ];
}
