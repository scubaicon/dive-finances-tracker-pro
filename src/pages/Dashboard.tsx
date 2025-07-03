
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MetricCard from '@/components/Charts/MetricCard';
import { DashboardMetrics, Transaction } from '@/types';
import { transactionService } from '@/services/transactionService';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const dashboardMetrics = await transactionService.getDashboardMetrics();
      setMetrics(dashboardMetrics);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-income':
        navigate('/income');
        break;
      case 'add-expense':
        navigate('/expenses');
        break;
      case 'view-reports':
        navigate('/reports');
        break;
      case 'all-transactions':
        navigate('/transactions');
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-8 text-gray-500">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="dive-card p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Financial Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to ProMaster Dive Center Financial Management System
        </p>
      </div>

      {/* Today's Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Income"
          amounts={metrics.todayIncome}
          icon={<span className="text-2xl">💰</span>}
          trend={12.5}
        />
        <MetricCard
          title="Today's Expenses"
          amounts={metrics.todayExpenses}
          icon={<span className="text-2xl">💸</span>}
          trend={-5.2}
        />
        <MetricCard
          title="Monthly Income"
          amounts={metrics.monthlyIncome}
          icon={<span className="text-2xl">📈</span>}
          trend={18.3}
        />
        <MetricCard
          title="Monthly Expenses"
          amounts={metrics.monthlyExpenses}
          icon={<span className="text-2xl">📊</span>}
          trend={8.7}
        />
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="dive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-xl">📋</span>
              <span>Recent Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.recentTransactions.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No recent transactions
                </div>
              ) : (
                metrics.recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${
                          transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium text-gray-800">
                          {transaction.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {transaction.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount} {transaction.currency}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.date.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="dive-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-xl">⚡</span>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
                onClick={() => handleQuickAction('add-income')}
              >
                <div className="text-2xl">💰</div>
                <div className="text-sm font-medium text-blue-700">Add Income</div>
              </Button>
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 bg-red-50 hover:bg-red-100 border-red-200"
                onClick={() => handleQuickAction('add-expense')}
              >
                <div className="text-2xl">💸</div>
                <div className="text-sm font-medium text-red-700">Add Expense</div>
              </Button>
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 bg-green-50 hover:bg-green-100 border-green-200"
                onClick={() => handleQuickAction('view-reports')}
              >
                <div className="text-2xl">📊</div>
                <div className="text-sm font-medium text-green-700">View Reports</div>
              </Button>
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 bg-purple-50 hover:bg-purple-100 border-purple-200"
                onClick={() => handleQuickAction('all-transactions')}
              >
                <div className="text-2xl">📋</div>
                <div className="text-sm font-medium text-purple-700">All Transactions</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Currency Exchange Rates (Mock) */}
      <Card className="dive-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-xl">💱</span>
            <span>Exchange Rates (USD Base)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-800">EGP</div>
              <div className="text-sm text-gray-600">31.25</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-800">EUR</div>
              <div className="text-sm text-gray-600">0.91</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-800">GBP</div>
              <div className="text-sm text-gray-600">0.79</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-800">VISA</div>
              <div className="text-sm text-gray-600">1.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
