import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { ProductoInternalService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-delete-product',
  imports: [CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css',
})
export class DeleteProductComponent implements OnInit {
  productoAEliminar: Product | null = null;

  constructor(private productoService: ProductoInternalService) {}
  ngOnInit(): void {
    this.productoService.getProductoObservable().subscribe((producto) => {
      this.productoAEliminar = producto;
    });
  }
  onConfirm(): void {
    if (this.productoAEliminar) this.productoService.clearDelProducto();
  }

  onCancel(): void {
    this.productoService.clearDelProducto();
  }
}
