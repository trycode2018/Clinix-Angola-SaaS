// src/pages/Clinics.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClinics, deleteClinic } from '../services/clinicService';
import { Clinic } from '../types';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Clinics = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const res = await getClinics();
      setClinics(res.data);
    } catch (error) {
      toast.error('Erro ao carregar clínicas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja eliminar esta clínica?')) return;
    try {
      await deleteClinic(id);
      setClinics(clinics.filter(c => c.id !== id));
      toast.success('Clínica eliminada com sucesso');
    } catch (error) {
      toast.error('Erro ao eliminar clínica');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clínicas</h2>
        <button
          onClick={() => navigate('/clinics/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Nova Clínica
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endereço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clinics.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Nenhuma clínica registada</td>
              </tr>
            ) : (
              clinics.map((clinic) => (
                <tr key={clinic.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{clinic.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{clinic.address || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{clinic.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{clinic.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => navigate(`/clinics/edit/${clinic.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(clinic.id)}
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

export default Clinics;