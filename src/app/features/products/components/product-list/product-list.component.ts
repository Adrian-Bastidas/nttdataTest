import { Component, OnInit } from '@angular/core';
import { TableConstructorComponent } from '../../../../shared/components/table-constructor/table-constructor.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import {
  ProductoInternalService,
  ProductService,
} from '../../../../core/services/products.service';
import { Product } from '../../../../core/interfaces/product';
import { Router } from '@angular/router';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-product-list',
  imports: [TableConstructorComponent, SearchComponent, DeleteProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private productoService: ProductoInternalService
  ) {}
  searchTerm: string = '';
  filteredRows: any[] = [];
  showDeleteModal: boolean = false;
  selectedProduct: any = null;

  ngOnInit(): void {
    this.filteredRows = [...this.rows];
    // this.cargarProductos();
  }

  searchChange(term: string) {
    const lowerCaseTerm = term.toLowerCase();
    this.filteredRows = this.rows.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
  }

  goToAddProduct() {
    this.router.navigate(['/add']);
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
      name: 'Nombre producto 1',
      description: 'Descripción producto',
      logo: 'assets-1.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    },
    {
      id: 'dos',
      name: 'no se que poner',
      description: 'Descripción producto',
      logo: 'assets-1.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    },
    {
      id: 'tres',
      name: 'lorem ipsum',
      description: 'Descripción producto',
      logo: 'assets-1.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    },
  ];

  openDeleteModal(product: any): void {
    console.log('Deleting product:', product);
    this.productoService.setDelProducto(product);

    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  deleteProduct(productId: any): void {
    // Handle product deletion logic here
    console.log(`Deleting product with ID: ${productId}`);
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }
}
