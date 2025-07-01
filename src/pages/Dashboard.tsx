
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MetricCard from '@/components/Charts/MetricCard';
import { DashboardMetrics, Transaction } from '@/types';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    todayIncome: [
      { currency: 'EGP', amount: 15420 },
      { currency: 'USD', amount: 485 },
      { currency: 'EUR', amount: 320 }
    ],
    todayExpenses: [
      { currency: 'EGP', amount: 5230 },
      { currency: 'USD', amount: 125 }
    ],
    monthlyIncome: [
      { currency: 'EGP', amount: 342150 },
      { currency: 'USD', amount: 12840 },
      { currency: 'EUR', amount: 6580 }
    ],
    monthlyExpenses: [
      { currency: 'EGP', amount: 156230 },
      { currency: 'USD', amount: 4230 }
    ],
    yearlyIncome: [
      { currency: 'EGP', amount: 2847500 },
      { currency: 'USD', amount: 95200 },
      { currency: 'EUR', amount: 45800 }
    ],
    yearlyExpenses: [
      { currency: 'EGP', amount: 1245800 },
      { currency: 'USD', amount: 38400 }
    ],
    recentTransactions: []
  });

  const [recentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'Dive Courses',
      subcategory: 'Open Water',
      amount: 2400,
      currency: 'EGP',
      paymentMethod: 'cash',
      status: 'paid',
      description: 'Open Water Certification - 2 students',
      date: new Date(),
      createdBy: 'Office'
    },
    {
      id: '2',
      type: 'expense',
      category: 'Equipment',
      subcategory: 'Tank Filling',
      amount: 150,
      currency: 'EGP',
      paymentMethod: 'cash',
      status: 'paid',
      description: 'Nitrox tank filling - 10 tanks',
      date: new Date(Date.now() - 3600000),
      createdBy: 'Office'
    },
    {
      id: '3',
      type: 'income',
      category: 'Equipment Rental',
      subcategory: 'Full Gear',
      amount: 85,
      currency: 'USD',
      paymentMethod: 'credit_card',
      status: 'paid',
      description: 'Full gear rental - 3 days',
      date: new Date(Date.now() - 7200000),
      createdBy: 'Office'
    }
  ]);

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
              {recentTransactions.map((transaction) => (
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
              ))}
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
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm font-medium text-blue-700">Add Income</div>
              </button>
              <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">💸</div>
                <div className="text-sm font-medium text-red-700">Add Expense</div>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-green-700">View Reports</div>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium text-purple-700">All Transactions</div>
              </button>
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
