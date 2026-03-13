import axios from 'axios';

const API_BASE_URL = 'https://backend-0ulg.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const productApi = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data)
};

export const orderApi = {
  create: (data) => api.post('/api/orders', data),
  getAll: () => api.get('/api/orders')
};

export const b2bApi = {
  create: (data) => api.post('/api/b2b', data),
  getAll: () => api.get('/api/b2b')
};

export const impactApi = {
  getAll: () => api.get('/api/impact'),
  getSummary: () => api.get('/api/impact/summary')
};

export const aiApi = {
  generateTags: (data) => api.post('/api/ai/generate-tags', data)
};

export default api;
