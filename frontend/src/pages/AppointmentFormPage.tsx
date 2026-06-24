// src/pages/AppointmentFormPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointment, createAppointment, updateAppointment } from '../services/appointmentService';
import AppointmentForm from '../components/forms/AppointmentForm';
import toast from 'react-hot-toast';

const AppointmentFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchAppointment = async () => {
        try {
          const res = await getAppointment(Number(id));
          setInitialData(res.data);
        } catch (error) {
          toast.error('Erro ao carregar consulta');
          navigate('/appointments');
        }
      };
      fetchAppointment();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (id) {
        await updateAppointment(Number(id), data);
        toast.success('Consulta atualizada com sucesso');
      } else {
        await createAppointment(data);
        toast.success('Consulta criada com sucesso');
      }
      navigate('/appointments');
    } catch (error) {
      toast.error('Erro ao salvar consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Consulta' : 'Nova Consulta'}</h2>
      {id && !initialData ? (
        <p>Carregando...</p>
      ) : (
        <AppointmentForm initialData={initialData || {}} onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
};

export default AppointmentFormPage;