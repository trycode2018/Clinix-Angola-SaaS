from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/clinics", tags=["Clinics"])

@router.post("/", response_model=schemas.clinic.ClinicResponse)
def create_clinic(
    clinic: schemas.clinic.ClinicCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    db_clinic = models.Clinic(**clinic.dict())
    db.add(db_clinic)
    db.commit()
    db.refresh(db_clinic)
    return db_clinic

@router.get("/", response_model=List[schemas.clinic.ClinicResponse])
def list_clinics(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    clinics = db.query(models.Clinic).offset(skip).limit(limit).all()
    return clinics

@router.get("/{clinic_id}", response_model=schemas.clinic.ClinicResponse)
def get_clinic(
    clinic_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    clinic = db.query(models.Clinic).filter(models.Clinic.id == clinic_id).first()
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return clinic

@router.put("/{clinic_id}", response_model=schemas.clinic.ClinicResponse)
def update_clinic(
    clinic_id: int,
    clinic_update: schemas.clinic.ClinicUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    clinic = db.query(models.Clinic).filter(models.Clinic.id == clinic_id).first()
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    for key, value in clinic_update.dict(exclude_unset=True).items():
        setattr(clinic, key, value)
    db.commit()
    db.refresh(clinic)
    return clinic

@router.delete("/{clinic_id}")
def delete_clinic(
    clinic_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    clinic = db.query(models.Clinic).filter(models.Clinic.id == clinic_id).first()
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    db.delete(clinic)
    db.commit()
    return {"detail": "Clinic deleted"}