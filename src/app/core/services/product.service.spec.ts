import apiClient from '../interceptors/axios.interceptor';
import { ShortPopUpService } from './popup.service';
import { Product } from '../interfaces/product';
import { ProductService } from './products.service';

// ✅ Mocks
jest.mock('../interceptors/axios.interceptor');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;
const showErrorMock = jest.fn();

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    const popupMock = {
      showError: showErrorMock,
    } as unknown as ShortPopUpService;

    service = new ProductService(popupMock);
    jest.clearAllMocks();
  });

  it('should load products successfully', async () => {
    const mockData: Product[] = [{ id: '1', name: 'Product A' }] as Product[];

    mockApiClient.get.mockResolvedValue({ data: { data: mockData } });

    const result = await service.loadProducts();

    expect(result).toEqual(mockData);
    expect(mockApiClient.get).toHaveBeenCalledWith('bp/products');
  });

  it('should return empty array if loadProducts fails', async () => {
    mockApiClient.get.mockRejectedValue(new Error('API Error'));

    const result = await service.loadProducts();

    expect(result).toEqual([]);
    expect(showErrorMock).toHaveBeenCalledWith('Error al cargar productos');
  });

  it('should create product successfully', async () => {
    const product: Product = { id: '2', name: 'Nuevo' } as Product;
    mockApiClient.post.mockResolvedValue({ data: { data: product } });

    const result = await service.createProducts(product);

    expect(result).toEqual(product);
    expect(mockApiClient.post).toHaveBeenCalledWith('bp/products', product);
  });
});
