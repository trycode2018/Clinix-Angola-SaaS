from pydantic import BaseModel, validator
from datetime import date as date_type, time as time_type, datetime
from typing import Optional
from app.models import AppointmentStatus

class AppointmentBase(BaseModel):
    clinic_id: int
    doctor_id: int
    patient_id: int
    date: date_type
    time: time_type
    status: Optional[AppointmentStatus] = AppointmentStatus.SCHEDULED
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    date: Optional[date] = None
    time: Optional[time] = None
    status: Optional[AppointmentStatus] = None
    notes: Optional[str] = None
    doctor_id: Optional[int] = None
    patient_id: Optional[int] = None

class AppointmentResponse(AppointmentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    # podemos incluir dados relacionados para exibição
    doctor_name: Optional[str] = None
    patient_name: Optional[str] = None
    clinic_name: Optional[str] = None

    class Config:
        from_attributes = True