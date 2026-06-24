import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctor, createDoctor, updateDoctor } from '../services/doctorService';
import DoctorForm from '../components/forms/DoctorForm';
import toast from 'react-hot-toast';

const DoctorFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchDoctor = async () => {
        try {
          const res = await getDoctor(Number(id));
          setInitialData(res.data);
        } catch (error) {
          toast.error('Erro ao carregar médico');
          navigate('/doctors');
        }
      };
      fetchDoctor();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (id) {
        await updateDoctor(Number(id), data);
        toast.success('Médico atualizado com sucesso');
      } else {
        await createDoctor(data);
        toast.success('Médico criado com sucesso');
      }
      navigate('/doctors');
    } catch (error) {
      toast.error('Erro ao salvar médico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Médico' : 'Novo Médico'}</h2>
      {id && !initialData ? (
        <p>Carregando...</p>
      ) : (
        <DoctorForm initialData={initialData || {}} onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
};

export default DoctorFormPage;