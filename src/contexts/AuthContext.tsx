
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS: User[] = [
  { id: '1', username: 'Admin', role: 'admin', name: 'Administrator' },
  { id: '2', username: 'Owner', role: 'owner', name: 'Dive Center Owner' },
  { id: '3', username: 'Office', role: 'office', name: 'Office Staff' }
];

const CREDENTIALS = {
  'Admin': 'Promaster2025',
  'Owner': 'Promaster2025',
  'Office': 'Promaster123456'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('promasterUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (CREDENTIALS[username as keyof typeof CREDENTIALS] === password) {
      const userData = USERS.find(u => u.username === username);
      if (userData) {
        setUser(userData);
        localStorage.setItem('promasterUser', JSON.stringify(userData));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('promasterUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
