import api from './api';
import type { Clinic } from '../types';

export const createClinic = (data: Omit<Clinic, 'id' | 'created_at' | 'updated_at'>) =>
  api.post('/clinics/', data);

export const getClinics = (params?: { skip?: number; limit?: number }) =>
  api.get<Clinic[]>('/clinics/', { params });

export const getClinic = (id: number) => api.get<Clinic>(`/clinics/${id}`);

export const updateClinic = (id: number, data: Partial<Clinic>) =>
  api.put<Clinic>(`/clinics/${id}`, data);

export const deleteClinic = (id: number) => api.delete(`/clinics/${id}`);