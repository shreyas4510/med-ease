import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';

// Create an axios instance with proper typing
const api = axios.create({
  baseURL: process.env.BACKENDURL, // Replace with your API's base URL
  timeout: 10000,  // Optional: request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token'); // Example of adding an auth token
    if (token) {
      if (config.headers) {
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error); // Handle request errors
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Handle successful responses
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error); // Handle other errors
  }
);

export default api;
