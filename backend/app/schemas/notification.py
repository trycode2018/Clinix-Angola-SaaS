from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NotificationBase(BaseModel):
    clinic_id: int
    appointment_id: Optional[int] = None
    type: str  # email, whatsapp
    recipient: str
    message: str

class NotificationCreate(NotificationBase):
    pass

class NotificationResponse(NotificationBase):
    id: int
    sent_at: datetime
    status: str

    class Config:
        from_attributes = True