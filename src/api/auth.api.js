import { apiClient } from '@/api/client';

export const authApi = {
  async me() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  async login(payload) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },

  async register(payload) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },

  async logout() {
    await apiClient.post('/auth/logout');
  },
};