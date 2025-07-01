
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download } from 'lucide-react';
import { Transaction } from '@/types';
import { transactionService } from '@/services/transactionService';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'credit'>('all');
  const [currencyFilter, setCurrencyFilter] = useState<'all' | 'EGP' | 'USD' | 'EUR' | 'GBP' | 'VISA'>('all');

  useEffect(() => {
    const allTransactions = transactionService.getAllTransactions();
    setTransactions(allTransactions);
    setFilteredTransactions(allTransactions);
  }, []);

  useEffect(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.subcategory && t.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Apply currency filter
    if (currencyFilter !== 'all') {
      filtered = filtered.filter(t => t.currency === currencyFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, typeFilter, statusFilter, currencyFilter]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'GBP' ? 'GBP' : currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTotals = () => {
    const totals = {
      income: {} as Record<string, number>,
      expense: {} as Record<string, number>
    };

    filteredTransactions.forEach(t => {
      if (!totals[t.type][t.currency]) {
        totals[t.type][t.currency] = 0;
      }
      totals[t.type][t.currency] += t.amount;
    });

    return totals;
  };

  const totals = getTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Transactions</h1>
          <p className="text-gray-600">Complete overview of all financial transactions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-green-600">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(totals.income).map(([currency, amount]) => (
              <div key={currency} className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{currency}:</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(amount, currency)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(totals.expense).map(([currency, amount]) => (
              <div key={currency} className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{currency}:</span>
                <span className="font-bold text-red-600">
                  {formatCurrency(amount, currency)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={typeFilter} onValueChange={(value: typeof typeFilter) => setTypeFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value: typeof statusFilter) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>

            <Select value={currencyFilter} onValueChange={(value: typeof currencyFilter) => setCurrencyFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                <SelectItem value="EGP">EGP</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="VISA">VISA</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
                setCurrencyFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Transactions ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions found matching your criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-800">
                            {transaction.category}
                            {transaction.subcategory && ` - ${transaction.subcategory}`}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {transaction.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>{transaction.date.toLocaleDateString()}</span>
                          <span>{transaction.paymentMethod}</span>
                          <span className={`px-2 py-1 rounded ${
                            transaction.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.status}
                          </span>
                          <span>by {transaction.createdBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
