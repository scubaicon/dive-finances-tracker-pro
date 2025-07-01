
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-0">
          {/* Mobile menu button */}
          <div className="lg:hidden p-4 border-b bg-white">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Menu
            </Button>
          </div>
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
