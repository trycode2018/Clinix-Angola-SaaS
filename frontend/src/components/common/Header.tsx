import { useAuth } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">
        Bem-vindo, {user?.username || 'Utilizador'}
      </h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <FaUserCircle className="w-8 h-8 text-gray-500" />
      </div>
    </header>
  );
};

export default Header;