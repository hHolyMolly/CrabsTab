import axios, { type AxiosInstance } from 'axios';

// export const BASE_URL: string = 'https://test-server2-phi.vercel.app/api';
export const BASE_URL: string = 'http://localhost:8000/api';

export const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');

  config.headers.Authorization = token;

  return config;
});
