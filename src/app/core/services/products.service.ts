import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3002/bp';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductoInternalService {
  private productoParaEditar: Product | null = null;
  private productoSubject = new BehaviorSubject<Product | null>(null);

  setProducto(producto: Product) {
    this.productoParaEditar = producto;
  }

  getProducto() {
    return this.productoParaEditar;
  }

  clearProducto() {
    this.productoParaEditar = null;
  }

  setDelProducto(producto: Product) {
    this.productoSubject.next(producto);
  }
  getDelProducto() {
    return this.productoSubject.value;
  }
  getProductoObservable() {
    return this.productoSubject.asObservable();
  }
  clearDelProducto() {
    this.productoSubject.next(null);
  }
}
