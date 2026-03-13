import axios from 'axios';

const API_BASE_URL = 'https://backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
