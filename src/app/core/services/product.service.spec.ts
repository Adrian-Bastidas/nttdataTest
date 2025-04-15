import { TestBed } from '@angular/core/testing';
import { ShortPopUpService } from './popup.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import apiClient from '../interceptors/axios.interceptor';
import { Product } from '../interfaces/product';
import { of } from 'rxjs';
import { ProductoInternalService, ProductService } from './products.service';

jest.mock('../interceptors/axios.interceptor');
jest.mock('./popup.service');

describe('ProductService', () => {
  let productService: ProductService;
  let popupService: ShortPopUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, ShortPopUpService],
    });

    productService = TestBed.inject(ProductService);
    popupService = TestBed.inject(ShortPopUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load products', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            id: '1',
            name: 'Product 1',
            description: 'A sample product',
            logo: 'logo.png',
            date_release: '2022-01-01',
            date_revision: '2022-01-01',
          },
        ],
      },
    };

    apiClient.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await productService.loadProducts();
    expect(result).toEqual([
      {
        id: '1',
        name: 'Product 1',
        description: 'A sample product',
        logo: 'logo.png',
        date_release: '2022-01-01',
        date_revision: '2022-01-01',
      },
    ]);
    expect(apiClient.get).toHaveBeenCalledWith('bp/products');
  });

  it('should create product', async () => {
    const product: Product = {
      id: '2',
      name: 'New Product',
      description: 'New product description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2022-01-01',
    };
    const mockResponse = { data: { data: product } };

    apiClient.post = jest.fn().mockResolvedValue(mockResponse);
    popupService.showSuccess = jest.fn();

    const result = await productService.createProducts(product);
    expect(result).toEqual(product);
    expect(popupService.showSuccess).toHaveBeenCalledWith(
      'Producto creado con éxito'
    );
  });

  it('should validate product ID', async () => {
    const id = '123';
    apiClient.get = jest.fn().mockResolvedValue({ data: { data: true } });

    const result = await productService.validateId(id);
    expect(result).toBe(true);
    expect(apiClient.get).toHaveBeenCalledWith(
      `bp/products/verification/${id}`
    );
  });

  it('should edit product', async () => {
    const id = '1';
    const product: Product = {
      id,
      name: 'Updated Product',
      description: 'Updated description',
      logo: 'updated_logo.png',
      date_release: '2022-02-01',
      date_revision: '2022-02-01',
    };
    const mockResponse = { data: { data: product } };

    apiClient.put = jest.fn().mockResolvedValue(mockResponse);
    popupService.showSuccess = jest.fn();

    const result = await productService.editProduct(id, product);
    expect(result).toEqual(product);
    expect(popupService.showSuccess).toHaveBeenCalledWith(
      'Producto editado con éxito'
    );
  });

  it('should delete product', async () => {
    const id = '1';
    const mockResponse = { data: { data: { message: 'Product deleted' } } };

    apiClient.delete = jest.fn().mockResolvedValue(mockResponse);
    popupService.showSuccess = jest.fn();

    const result = await productService.deleteProduct(id);
    expect(result).toBe('Product deleted');
    expect(popupService.showSuccess).toHaveBeenCalledWith('Product deleted');
  });

  afterEach(() => {
    httpMock.verify();
  });
});

describe('ProductoInternalService', () => {
  let productoInternalService: ProductoInternalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoInternalService],
    });

    productoInternalService = TestBed.inject(ProductoInternalService);
  });

  it('should set and get producto', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Sample description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2022-01-01',
    };
    productoInternalService.setProducto(product);

    const result = productoInternalService.getProducto();
    expect(result).toEqual(product);
  });

  it('should clear producto', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Sample description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2022-01-01',
    };
    productoInternalService.setProducto(product);
    productoInternalService.clearProducto();

    const result = productoInternalService.getProducto();
    expect(result).toBeNull();
  });

  it('should set and get delProducto', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Sample description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2022-01-01',
    };
    productoInternalService.setDelProducto(product);

    const result = productoInternalService.getDelProducto();
    expect(result).toEqual(product);
  });

  it('should clear delProducto', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Sample description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2022-01-01',
    };
    productoInternalService.setDelProducto(product);
    productoInternalService.clearDelProducto();

    const result = productoInternalService.getDelProducto();
    expect(result).toBeNull();
  });

  it('should get producto observable', (done) => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Sample description',
      logo: 'logo.png',
      date_release: '2022-01-01',
      date_revision: '2022-01-01',
    };
    productoInternalService.setDelProducto(product);

    productoInternalService.getProductoObservable().subscribe((result) => {
      expect(result).toEqual(product);
      done();
    });
  });
});
