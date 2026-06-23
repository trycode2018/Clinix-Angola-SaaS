from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from app.models import Specialty  # import enum

class DoctorBase(BaseModel):
    name: str
    specialty: Specialty
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    clinic_id: int

class DoctorCreate(DoctorBase):
    pass

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    specialty: Optional[Specialty] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    clinic_id: Optional[int] = None

class DoctorResponse(DoctorBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True