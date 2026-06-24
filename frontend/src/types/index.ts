export interface Clinic {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string | null;
  email: string | null;
  clinic_id: number;
  created_at: string;
  updated_at?: string;
}

export interface Patient {
  id: number;
  name: string;
  date_of_birth: string;
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  clinic_id: number;
  created_at: string;
  updated_at?: string;
}

export interface Appointment {
  id: number;
  clinic_id: number;
  doctor_id: number;
  patient_id: number;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  created_at: string;
  updated_at?: string;
  doctor_name?: string;
  patient_name?: string;
  clinic_name?: string;
}

export interface Notification {
  id: number;
  clinic_id: number;
  appointment_id: number | null;
  type: 'email' | 'whatsapp';
  recipient: string;
  message: string;
  sent_at: string;
  status: 'pending' | 'sent' | 'failed';
}

export interface DashboardStats {
  total_clinics: number;
  total_doctors: number;
  total_patients: number;
  total_appointments: number;
  appointments_by_status: {
    scheduled: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}

// Tipos para formulários (devem coincidir com os esquemas Yup)
export type ClinicFormData = {
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
};

export type DoctorFormData = {
  name: string;
  specialty: string;
  phone: string | null;
  email: string | null;
  clinic_id: number;
};

export type PatientFormData = {
  name: string;
  date_of_birth: string;
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  clinic_id: number;
};

export type AppointmentFormData = {
  clinic_id: number;
  doctor_id: number;
  patient_id: number;
  date: string;
  time: string;
  notes: string | null;
};

export type NotificationFormData = {
  clinic_id: number;
  appointment_id: number | null;
  type: string;
  recipient: string;
  message: string;
};