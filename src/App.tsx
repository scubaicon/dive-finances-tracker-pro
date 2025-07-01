
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout/Layout";
import Login from "@/components/Login";
import Dashboard from "@/pages/Dashboard";
import Income from "@/pages/Income";
import Expenses from "@/pages/Expenses";
import Transactions from "@/pages/Transactions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<div className="text-center p-8">Financial Reports Page - Coming Soon</div>} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/categories" element={<div className="text-center p-8">Manage Categories Page - Coming Soon</div>} />
        <Route path="/settings" element={<div className="text-center p-8">System Settings Page - Coming Soon</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
