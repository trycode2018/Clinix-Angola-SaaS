// frontend/src/services/dashboardService.ts
import api from './api';
import type { DashboardStats } from '../types';

export const getDashboardStats = (params?: { clinic_id?: number }) =>
  api.get<DashboardStats>('/dashboard/', { params });