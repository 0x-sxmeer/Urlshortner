import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function normalizeApiError(error) {
  if (!error.response) {
    return {
      status: 0,
      message: 'Network error. Please check your connection and try again.',
      data: null,
      originalError: error,
    };
  }

  const { status, data } = error.response;

  let message = data?.detail || data?.message || 'Request failed.';

  if (Array.isArray(message)) {
    message = message.map((item) => item.msg || JSON.stringify(item)).join(', ');
  }

  if (typeof message !== 'string') {
    message = 'Request failed.';
  }

  return {
    status,
    message,
    data,
    originalError: error,
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error);
    return Promise.reject(normalizedError);
  }
);