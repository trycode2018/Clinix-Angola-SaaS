import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClinic, createClinic, updateClinic } from '../services/clinicService';
import ClinicForm from '../components/forms/ClinicForm';
import toast from 'react-hot-toast';

const ClinicFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchClinic = async () => {
        try {
          const res = await getClinic(Number(id));
          setInitialData(res.data);
        } catch (error) {
          toast.error('Erro ao carregar clínica');
          navigate('/clinics');
        }
      };
      fetchClinic();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (id) {
        await updateClinic(Number(id), data);
        toast.success('Clínica atualizada com sucesso');
      } else {
        await createClinic(data);
        toast.success('Clínica criada com sucesso');
      }
      navigate('/clinics');
    } catch (error) {
      toast.error('Erro ao salvar clínica');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Clínica' : 'Nova Clínica'}</h2>
      {id && !initialData ? (
        <p>Carregando...</p>
      ) : (
        <ClinicForm initialData={initialData || {}} onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
};

export default ClinicFormPage;