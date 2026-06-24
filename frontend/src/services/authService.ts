import api from './api';

export const register = (username: string, email: string, password: string) =>
  api.post('/auth/register', { username, email, password });

export const login = (username: string, password: string) =>
  api.post('/auth/login', new URLSearchParams({ username, password }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });