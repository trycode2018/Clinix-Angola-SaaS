from .auth import UserCreate, UserLogin, Token, TokenData
from .clinic import ClinicBase, ClinicCreate, ClinicUpdate, ClinicResponse
from .doctor import DoctorBase, DoctorCreate, DoctorUpdate, DoctorResponse
from .patient import PatientBase, PatientCreate, PatientUpdate, PatientResponse
from .appointment import AppointmentBase, AppointmentCreate, AppointmentUpdate, AppointmentResponse
from .notification import NotificationBase, NotificationCreate, NotificationResponse