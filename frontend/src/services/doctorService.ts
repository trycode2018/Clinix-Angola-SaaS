// frontend/src/services/doctorService.ts
import api from './api';
import type { Doctor } from '../types';

export const createDoctor = (data: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>) =>
  api.post('/doctors/', data);

export const getDoctors = (params?: { skip?: number; limit?: number; clinic_id?: number }) =>
  api.get<Doctor[]>('/doctors/', { params });

export const getDoctor = (id: number) => api.get<Doctor>(`/doctors/${id}`);

export const updateDoctor = (id: number, data: Partial<Doctor>) =>
  api.put<Doctor>(`/doctors/${id}`, data);

export const deleteDoctor = (id: number) => api.delete(`/doctors/${id}`);