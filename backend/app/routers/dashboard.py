from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard_stats(
    clinic_id: int = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    query_clinics = db.query(models.Clinic)
    query_doctors = db.query(models.Doctor)
    query_patients = db.query(models.Patient)
    query_appointments = db.query(models.Appointment)

    if clinic_id:
        query_clinics = query_clinics.filter(models.Clinic.id == clinic_id)
        query_doctors = query_doctors.filter(models.Doctor.clinic_id == clinic_id)
        query_patients = query_patients.filter(models.Patient.clinic_id == clinic_id)
        query_appointments = query_appointments.filter(models.Appointment.clinic_id == clinic_id)

    total_clinics = query_clinics.count()
    total_doctors = query_doctors.count()
    total_patients = query_patients.count()
    total_appointments = query_appointments.count()
    
    # Consultas por status
    scheduled = query_appointments.filter(models.Appointment.status == models.AppointmentStatus.SCHEDULED).count()
    confirmed = query_appointments.filter(models.Appointment.status == models.AppointmentStatus.CONFIRMED).count()
    completed = query_appointments.filter(models.Appointment.status == models.AppointmentStatus.COMPLETED).count()
    cancelled = query_appointments.filter(models.Appointment.status == models.AppointmentStatus.CANCELLED).count()

    return {
        "total_clinics": total_clinics,
        "total_doctors": total_doctors,
        "total_patients": total_patients,
        "total_appointments": total_appointments,
        "appointments_by_status": {
            "scheduled": scheduled,
            "confirmed": confirmed,
            "completed": completed,
            "cancelled": cancelled
        }
    }