// frontend/src/services/notificationService.ts
import api from './api';
import type { Notification } from '../types';

export const sendNotification = (data: Omit<Notification, 'id' | 'sent_at' | 'status'>) =>
  api.post('/notifications/', data);

export const getNotifications = (params?: { skip?: number; limit?: number; clinic_id?: number }) =>
  api.get<Notification[]>('/notifications/', { params });

export const getNotification = (id: number) => api.get<Notification>(`/notifications/${id}`);