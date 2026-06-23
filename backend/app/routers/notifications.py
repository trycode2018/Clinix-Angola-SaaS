from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.post("/", response_model=schemas.notification.NotificationResponse)
def send_notification(
    notif: schemas.notification.NotificationCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    # Simular envio: apenas registar
    db_notif = models.Notification(**notif.dict(), status="sent")
    db.add(db_notif)
    db.commit()
    db.refresh(db_notif)
    return db_notif

@router.get("/", response_model=List[schemas.notification.NotificationResponse])
def list_notifications(
    skip: int = 0,
    limit: int = 100,
    clinic_id: int = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    query = db.query(models.Notification)
    if clinic_id:
        query = query.filter(models.Notification.clinic_id == clinic_id)
    notifications = query.offset(skip).limit(limit).all()
    return notifications

@router.get("/{notif_id}", response_model=schemas.notification.NotificationResponse)
def get_notification(
    notif_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    notif = db.query(models.Notification).filter(models.Notification.id == notif_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notif