import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, createPatient, updatePatient } from '../services/patientService';
import PatientForm from '../components/forms/PatientForm';
import toast from 'react-hot-toast';

const PatientFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const res = await getPatient(Number(id));
          setInitialData(res.data);
        } catch (error) {
          toast.error('Erro ao carregar paciente');
          navigate('/patients');
        }
      };
      fetchPatient();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (id) {
        await updatePatient(Number(id), data);
        toast.success('Paciente atualizado com sucesso');
      } else {
        await createPatient(data);
        toast.success('Paciente criado com sucesso');
      }
      navigate('/patients');
    } catch (error) {
      toast.error('Erro ao salvar paciente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Paciente' : 'Novo Paciente'}</h2>
      {id && !initialData ? (
        <p>Carregando...</p>
      ) : (
        <PatientForm initialData={initialData || {}} onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
};

export default PatientFormPage;