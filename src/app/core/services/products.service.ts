import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductWId } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';
import apiClient from '../interceptors/axios.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async loadProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get('bp/products');
      return response.data?.data || [];
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      return [];
    }
  }
  async createProducts(body: Product): Promise<Product> {
    try {
      const response = await apiClient.post('bp/products', body);
      return response.data?.data || [];
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      return {} as Product;
    }
  }
  async validateId(id: string): Promise<boolean> {
    try {
      const response = await apiClient.get(`bp/products/verification/${id}`);
      return response.data || false;
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      return false;
    }
  }
  async editProduct(id: string, body: ProductWId): Promise<Product> {
    try {
      const response = await apiClient.put(`bp/products/${id}`, body);
      return response.data?.data || [];
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      return {} as Product;
    }
  }
  async deleteProduct(id: string): Promise<string> {
    try {
      const response = await apiClient.delete(`bp/products/${id}`);
      return response.data.message || [];
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      return '';
    }
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
