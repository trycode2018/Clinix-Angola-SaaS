from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date as date_type, time as time_type
from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("/", response_model=schemas.appointment.AppointmentResponse)
def create_appointment(
    appointment: schemas.appointment.AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    # Verificar clinic, doctor, patient existem
    clinic = db.query(models.Clinic).filter(models.Clinic.id == appointment.clinic_id).first()
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    doctor = db.query(models.Doctor).filter(models.Doctor.id == appointment.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    patient = db.query(models.Patient).filter(models.Patient.id == appointment.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    db_appointment = models.Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    
    response = schemas.appointment.AppointmentResponse.from_orm(db_appointment)
    response.doctor_name = doctor.name
    response.patient_name = patient.name
    response.clinic_name = clinic.name
    return response

@router.get("/", response_model=List[schemas.appointment.AppointmentResponse])
def list_appointments(
    skip: int = 0,
    limit: int = 100,
    clinic_id: Optional[int] = None,
    doctor_id: Optional[int] = None,
    patient_id: Optional[int] = None,
    status: Optional[models.AppointmentStatus] = None,
    date: Optional[date_type] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    query = db.query(models.Appointment)
    if clinic_id:
        query = query.filter(models.Appointment.clinic_id == clinic_id)
    if doctor_id:
        query = query.filter(models.Appointment.doctor_id == doctor_id)
    if patient_id:
        query = query.filter(models.Appointment.patient_id == patient_id)
    if status:
        query = query.filter(models.Appointment.status == status)
    if date:
        query = query.filter(models.Appointment.date == date)
    
    appointments = query.offset(skip).limit(limit).all()
    
    result = []
    for app in appointments:
        resp = schemas.appointment.AppointmentResponse.from_orm(app)
        resp.doctor_name = app.doctor.name if app.doctor else None
        resp.patient_name = app.patient.name if app.patient else None
        resp.clinic_name = app.clinic.name if app.clinic else None
        result.append(resp)
    return result

@router.get("/{appointment_id}", response_model=schemas.appointment.AppointmentResponse)
def get_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    app = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    resp = schemas.appointment.AppointmentResponse.from_orm(app)
    resp.doctor_name = app.doctor.name if app.doctor else None
    resp.patient_name = app.patient.name if app.patient else None
    resp.clinic_name = app.clinic.name if app.clinic else None
    return resp

@router.put("/{appointment_id}", response_model=schemas.appointment.AppointmentResponse)
def update_appointment(
    appointment_id: int,
    appointment_update: schemas.appointment.AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    app = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    for key, value in appointment_update.dict(exclude_unset=True).items():
        setattr(app, key, value)
    db.commit()
    db.refresh(app)
    resp = schemas.appointment.AppointmentResponse.from_orm(app)
    resp.doctor_name = app.doctor.name if app.doctor else None
    resp.patient_name = app.patient.name if app.patient else None
    resp.clinic_name = app.clinic.name if app.clinic else None
    return resp

@router.patch("/{appointment_id}/cancel")
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    app = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    app.status = models.AppointmentStatus.CANCELLED
    db.commit()
    return {"detail": "Appointment cancelled"}

@router.patch("/{appointment_id}/reschedule")
def reschedule_appointment(
    appointment_id: int,
    new_date: date_type,
    new_time: time_type,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    app = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    app.date = new_date
    app.time = new_time
    if app.status == models.AppointmentStatus.CONFIRMED:
        app.status = models.AppointmentStatus.SCHEDULED
    db.commit()
    return {"detail": "Appointment rescheduled"}

@router.delete("/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    app = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(app)
    db.commit()
    return {"detail": "Appointment deleted"}