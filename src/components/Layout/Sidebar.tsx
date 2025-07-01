
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊', roles: ['admin', 'owner', 'office'] },
    { path: '/income', label: 'Income Tracking', icon: '💰', roles: ['admin', 'office'] },
    { path: '/expenses', label: 'Expense Tracking', icon: '💸', roles: ['admin', 'office'] },
    { path: '/reports', label: 'Financial Reports', icon: '📈', roles: ['admin', 'owner'] },
    { path: '/transactions', label: 'All Transactions', icon: '📋', roles: ['admin', 'owner'] },
    { path: '/categories', label: 'Manage Categories', icon: '🏷️', roles: ['admin'] },
    { path: '/settings', label: 'System Settings', icon: '⚙️', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 ocean-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold">PM</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    )
                  }
                  onClick={() => onClose()}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
