import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';


const api = axios.create({
  baseURL: process.env.BACKENDURL,
  timeout: 10000,  
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error); 
  }
);

export default api;
