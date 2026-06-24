// frontend/src/services/patientService.ts
import api from './api';
import type { Patient } from '../types';

export const createPatient = (data: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) =>
  api.post('/patients/', data);

export const getPatients = (params?: { skip?: number; limit?: number; clinic_id?: number }) =>
  api.get<Patient[]>('/patients/', { params });

export const getPatient = (id: number) => api.get<Patient>(`/patients/${id}`);

export const updatePatient = (id: number, data: Partial<Patient>) =>
  api.put<Patient>(`/patients/${id}`, data);

export const deletePatient = (id: number) => api.delete(`/patients/${id}`);