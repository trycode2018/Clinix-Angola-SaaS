import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendNotification } from '../services/notificationService';
import NotificationForm from '../components/forms/NotificationForm';
import toast from 'react-hot-toast';

const NotificationFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await sendNotification(data);
      toast.success('Notificação enviada com sucesso');
      navigate('/notifications');
    } catch (error) {
      toast.error('Erro ao enviar notificação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Enviar Notificação</h2>
      <NotificationForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default NotificationFormPage;