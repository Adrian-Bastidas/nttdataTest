import axios from 'axios';
import { environment } from '@envs/environment.development';

// Crea una instancia global de Axios
const api = axios.create({
  baseURL: `${environment.API_BASE_URL}`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'es-419,es-EC;q=0.9,es;q=0.8,de-EC;q=0.7,de;q=0.6',
    DNT: '1',
    Referer: 'http://localhost:4200/',
    'Sec-Ch-Ua':
      '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error en respuesta:', error.response);

      if (error.response.status === 401) {
        window.location.href = '/login';
      }

      if (error.response.status === 500) {
        alert('Error interno del servidor');
      }
    } else {
      console.error('Error sin respuesta:', error);
    }

    return Promise.reject(error);
  }
);

export default api;
