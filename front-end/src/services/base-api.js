import axios from 'axios';
import { getToken } from './auth';

//
/**
 Preconfiguring the requests:
 - Sets the baseURL
 - Sets the acess token to the authorization header of the requests
 * @param { String } baseURL - The base URL of the respective API
 * @returns 
 */
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