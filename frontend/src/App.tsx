import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Clinics from './pages/Clinics';
import ClinicFormPage from './pages/ClinicFormPage';
import Doctors from './pages/Doctors';
import DoctorFormPage from './pages/DoctorFormPage';
import Patients from './pages/Patients';
import PatientFormPage from './pages/PatientFormPage';
import Appointments from './pages/Appointments';
import AppointmentFormPage from './pages/AppointmentFormPage';
import Notifications from './pages/Notifications';
import NotificationFormPage from './pages/NotificationFormPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/clinics"
            element={
              <ProtectedRoute>
                <Layout>
                  <Clinics />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/clinics/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClinicFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/clinics/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClinicFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Layout>
                  <Doctors />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Layout>
                  <Patients />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <PatientFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <PatientFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Layout>
                  <Appointments />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <AppointmentFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AppointmentFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Layout>
                  <Notifications />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationFormPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;