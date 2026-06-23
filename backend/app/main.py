# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    auth, clinics, doctors, patients, appointments, notifications, dashboard
)

app = FastAPI(
    title="Hospital SaaS API",
    description="API para gestão de clínicas/hospitais",
    version="1.0.0"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Ajuste para produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router)
app.include_router(clinics.router)
app.include_router(doctors.router)
app.include_router(patients.router)
app.include_router(appointments.router)
app.include_router(notifications.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "Bem-vindo à API do Hospital SaaS"}