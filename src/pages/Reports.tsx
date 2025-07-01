
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { transactionService } from '@/services/transactionService';
import { Transaction, CurrencyAmount } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReportData();
  }, [reportType, startDate, endDate]);

  const loadReportData = () => {
    setLoading(true);
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      const data = transactionService.getTransactionsByDateRange(start, end);
      setTransactions(data);
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const aggregateAmounts = (trans: Transaction[], type: 'income' | 'expense'): CurrencyAmount[] => {
    const amounts: Record<string, number> = {};
    
    trans.filter(t => t.type === type).forEach(t => {
      amounts[t.currency] = (amounts[t.currency] || 0) + t.amount;
    });
    
    return Object.entries(amounts)
      .filter(([_, amount]) => amount > 0)
      .map(([currency, amount]) => ({ currency, amount }));
  };

  const totalIncome = aggregateAmounts(transactions, 'income');
  const totalExpenses = aggregateAmounts(transactions, 'expense');

  const getChartData = () => {
    const categoryData: Record<string, { income: number; expenses: number }> = {};
    
    transactions.forEach(t => {
      if (!categoryData[t.category]) {
        categoryData[t.category] = { income: 0, expenses: 0 };
      }
      
      const amountInEGP = t.currency === 'EGP' ? t.amount : t.amount * 31.25; // Mock conversion
      categoryData[t.category][t.type === 'income' ? 'income' : 'expenses'] += amountInEGP;
    });

    return Object.entries(categoryData).map(([category, data]) => ({
      category,
      income: data.income,
      expenses: data.expenses,
      net: data.income - data.expenses
    }));
  };

  const getPieData = () => {
    const incomeByCategory: Record<string, number> = {};
    
    transactions.filter(t => t.type === 'income').forEach(t => {
      const amountInEGP = t.currency === 'EGP' ? t.amount : t.amount * 31.25;
      incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + amountInEGP;
    });

    return Object.entries(incomeByCategory).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  };

  const chartData = getChartData();
  const pieData = getPieData();
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  const exportToPDF = () => {
    // Mock PDF export - in real app would generate actual PDF
    const reportData = {
      period: `${startDate} to ${endDate}`,
      totalIncome,
      totalExpenses,
      transactions: transactions.length,
      categories: chartData.length
    };
    
    console.log('Exporting PDF report:', reportData);
    alert('PDF export feature will be implemented with backend integration');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="dive-card p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Financial Reports</h1>
        <p className="text-gray-600">Comprehensive financial analysis and reporting</p>
      </div>

      {/* Report Controls */}
      <Card className="dive-card">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={exportToPDF} className="w-full">
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dive-card">
          <CardHeader>
            <CardTitle className="text-green-600">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            {totalIncome.map(amount => (
              <div key={amount.currency} className="text-2xl font-bold text-green-600">
                {amount.amount.toLocaleString()} {amount.currency}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="dive-card">
          <CardHeader>
            <CardTitle className="text-red-600">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            {totalExpenses.map(amount => (
              <div key={amount.currency} className="text-2xl font-bold text-red-600">
                {amount.amount.toLocaleString()} {amount.currency}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="dive-card">
          <CardHeader>
            <CardTitle className="text-blue-600">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {transactions.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="dive-card">
          <CardHeader>
            <CardTitle>Income vs Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="dive-card">
          <CardHeader>
            <CardTitle>Income Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="dive-card">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Category</th>
                  <th className="border border-gray-200 p-3 text-right">Income (EGP)</th>
                  <th className="border border-gray-200 p-3 text-right">Expenses (EGP)</th>
                  <th className="border border-gray-200 p-3 text-right">Net (EGP)</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 p-3">{row.category}</td>
                    <td className="border border-gray-200 p-3 text-right text-green-600">
                      {row.income.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 p-3 text-right text-red-600">
                      {row.expenses.toLocaleString()}
                    </td>
                    <td className={`border border-gray-200 p-3 text-right font-bold ${
                      row.net >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {row.net.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
