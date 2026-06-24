import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, deleteAppointment, cancelAppointment } from '../services/appointmentService';
import { Appointment } from '../types';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      const data = res.data.map((app: any) => ({
        ...app,
        status: app.status as Appointment['status'],
      }));
      setAppointments(data);
    } catch (error) {
      toast.error('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja eliminar esta consulta?')) return;
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter(a => a.id !== id));
      toast.success('Consulta eliminada com sucesso');
    } catch (error) {
      toast.error('Erro ao eliminar consulta');
    }
  };

  const handleCancel = async (id: number) => {
    if (!window.confirm('Deseja cancelar esta consulta?')) return;
    try {
      await cancelAppointment(id);
      toast.success('Consulta cancelada com sucesso');
      fetchAppointments();
    } catch (error) {
      toast.error('Erro ao cancelar consulta');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Consultas</h2>
        <button
          onClick={() => navigate('/appointments/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Nova Consulta
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Médico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">Nenhuma consulta registada</td>
              </tr>
            ) : (
              appointments.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.doctor_name || app.doctor_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.patient_name || app.patient_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${app.status === 'scheduled' && 'bg-yellow-100 text-yellow-800'}
                      ${app.status === 'confirmed' && 'bg-blue-100 text-blue-800'}
                      ${app.status === 'completed' && 'bg-green-100 text-green-800'}
                      ${app.status === 'cancelled' && 'bg-red-100 text-red-800'}
                    `}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => navigate(`/appointments/edit/${app.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    {app.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(app.id)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <FaTimes />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;