import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../services/notificationService';
import type { Notification } from '../types';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (error) {
      toast.error('Erro ao carregar notificações');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notificações</h2>
        <button
          onClick={() => navigate('/notifications/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Nova Notificação
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destinatário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enviado em</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Nenhuma notificação registada</td>
              </tr>
            ) : (
              notifications.map((notif) => (
                <tr key={notif.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{notif.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{notif.recipient}</td>
                  <td className="px-6 py-4">{notif.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(notif.sent_at).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs ${notif.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {notif.status}
                    </span>
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

export default Notifications;