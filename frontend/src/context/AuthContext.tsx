import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';
import type { User } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await apiLogin(username, password);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    const userData: User = { id: 0, username, email: '' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

 const register = async (username: string, email: string, password: string) => {
  const response = await apiRegister(username, email, password);
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  const userData: User = { id: 0, username, email };
  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);