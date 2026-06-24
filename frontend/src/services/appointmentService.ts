// frontend/src/services/appointmentService.ts
import api from './api';
import type { Appointment } from '../types';

export const createAppointment = (data: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'doctor_name' | 'patient_name' | 'clinic_name'>) =>
  api.post('/appointments/', data);

export const getAppointments = (params?: {
  skip?: number;
  limit?: number;
  clinic_id?: number;
  doctor_id?: number;
  patient_id?: number;
  status?: string;
  date?: string;
}) => api.get<Appointment[]>('/appointments/', { params });

export const getAppointment = (id: number) => api.get<Appointment>(`/appointments/${id}`);

export const updateAppointment = (id: number, data: Partial<Appointment>) =>
  api.put<Appointment>(`/appointments/${id}`, data);

export const cancelAppointment = (id: number) =>
  api.patch(`/appointments/${id}/cancel`);

export const rescheduleAppointment = (id: number, newDate: string, newTime: string) =>
  api.patch(`/appointments/${id}/reschedule`, null, { params: { new_date: newDate, new_time: newTime } });

export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);