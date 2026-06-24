import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/dashboardService';
import type { DashboardStats } from '../types';
import { 
  FaHospital, FaUserMd, FaUsers, FaCalendarCheck 
} from 'react-icons/fa';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!stats) return <div>Erro ao carregar dados</div>;

  const statusColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const statusData = Object.entries(stats.appointments_by_status).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaHospital} label="Clínicas" value={stats.total_clinics} color="blue" />
        <StatCard icon={FaUserMd} label="Médicos" value={stats.total_doctors} color="green" />
        <StatCard icon={FaUsers} label="Pacientes" value={stats.total_patients} color="purple" />
        <StatCard icon={FaCalendarCheck} label="Consultas" value={stats.total_appointments} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Consultas por Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resumo</h3>
          <div className="space-y-3">
            <p><span className="font-medium">Total de Clínicas:</span> {stats.total_clinics}</p>
            <p><span className="font-medium">Total de Médicos:</span> {stats.total_doctors}</p>
            <p><span className="font-medium">Total de Pacientes:</span> {stats.total_patients}</p>
            <p><span className="font-medium">Total de Consultas:</span> {stats.total_appointments}</p>
            <p><span className="font-medium">Agendadas:</span> {stats.appointments_by_status.scheduled}</p>
            <p><span className="font-medium">Confirmadas:</span> {stats.appointments_by_status.confirmed}</p>
            <p><span className="font-medium">Realizadas:</span> {stats.appointments_by_status.completed}</p>
            <p><span className="font-medium">Canceladas:</span> {stats.appointments_by_status.cancelled}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`p-3 rounded-full ${colors[color as keyof typeof colors]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;