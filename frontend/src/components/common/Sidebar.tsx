import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaHospital, FaUserMd, FaUsers, FaCalendarCheck, FaBell, FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: FaHome },
    { to: '/clinics', label: 'Clínicas', icon: FaHospital },
    { to: '/doctors', label: 'Médicos', icon: FaUserMd },
    { to: '/patients', label: 'Pacientes', icon: FaUsers },
    { to: '/appointments', label: 'Consultas', icon: FaCalendarCheck },
    { to: '/notifications', label: 'Notificações', icon: FaBell },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Hospital SaaS</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;