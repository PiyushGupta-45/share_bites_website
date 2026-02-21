import axios from 'axios';

function normalizeApiBaseUrl(rawUrl) {
  const cleaned = (rawUrl || '').trim().replace(/\/+$/, '');
  if (!cleaned) return 'http://localhost:5001/api';
  return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sharebite_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
