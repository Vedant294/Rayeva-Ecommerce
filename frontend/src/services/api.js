import axios from 'axios';

// API configuration that works for both local dev and Vercel production
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for debugging
api.interceptors.request.use(config => {
  console.log('API Request:', config.url);
  return config;
});

// Response error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data)
};

export const orderApi = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders')
};

export const b2bApi = {
  create: (data) => api.post('/b2b', data),
  getAll: () => api.get('/b2b')
};

export const impactApi = {
  getAll: () => api.get('/impact'),
  getSummary: () => api.get('/impact/summary')
};

export const aiApi = {
  generateTags: (data) => api.post('/ai/generate-tags', data)
};

export default api;
