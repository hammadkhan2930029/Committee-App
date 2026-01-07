import axios from 'axios';
import { BaseURL } from '../config/baseURL';

export const api = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-Type': 'application/json',
  
  },
  timeout: 10000,
});


