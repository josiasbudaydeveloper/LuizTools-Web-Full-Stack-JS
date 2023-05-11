import axios from 'axios';
import { getToken } from './auth';

export default function baseAPI(baseURL) {
  const api = axios.create({
    baseURL,
  });
  
  api.interceptors.request.use(async (config) => {
    const token = getToken();
  
    if (token) {
      config.headers.authorization = token;
    }
  
    return config;
  });

  return api;
}