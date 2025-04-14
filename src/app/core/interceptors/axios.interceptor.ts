// src/app/interceptors/axios.interceptor.ts
import { environment } from '@envs/environment';
import axios from 'axios';
import { LoaderService } from '../services/loader.service';

const apiClient = axios.create({
  baseURL: environment.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const loaderService = new LoaderService();

apiClient.interceptors.request.use(
  (config) => {
    loaderService.show();
    console.log(
      '🔄 Enviando request:',
      config.method?.toUpperCase(),
      config.url
    );
    return config;
  },
  (error) => {
    loaderService.hide();
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Agregar un retraso de 1 minuto (60000 ms)
    return new Promise((resolve) => {
      console.log('✅ Respuesta recibida:', response.status, response.data);
      resolve(response);
      loaderService.hide();
    });
  },
  (error) => {
    loaderService.hide();
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      switch (status) {
        case 401:
          console.warn('⚠️ No autorizado. Redirigiendo...');

          break;
        case 403:
          console.warn('⛔ Prohibido');
          break;
        case 500:
          console.error('💥 Error interno del servidor');
          break;
        default:
          console.error('❗ Error desconocido', status);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
