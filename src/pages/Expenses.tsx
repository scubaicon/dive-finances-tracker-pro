
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Transaction } from '@/types';
import { transactionService } from '@/services/transactionService';
import TransactionForm from '@/components/Forms/TransactionForm';

const Expenses: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const allTransactions = transactionService.getAllTransactions();
    setTransactions(allTransactions.filter(t => t.type === 'expense'));
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      transactionService.deleteTransaction(id);
      loadTransactions();
      toast({
        title: "Success",
        description: "Transaction deleted successfully"
      });
    }
  };

  const handleFormSubmit = (transaction: Transaction) => {
    loadTransactions();
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'GBP' ? 'GBP' : currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTotalExpenses = () => {
    const totals: Record<string, number> = {};
    transactions.forEach(t => {
      totals[t.currency] = (totals[t.currency] || 0) + t.amount;
    });
    return totals;
  };

  const totalExpenses = getTotalExpenses();

  if (showForm) {
    return (
      <div className="flex justify-center p-6">
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Expense Tracking</h1>
          <p className="text-gray-600">Track all expenses for ProMaster Dive Center</p>
        </div>
        <Button onClick={handleAddTransaction} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Expense
        </Button>
      </div>

      {/* Expense Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(totalExpenses).map(([currency, amount]) => (
          <Card key={currency} className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total {currency}
              </CardTitle>
              <TrendingDown className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(amount, currency)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No expense transactions found. Add your first transaction to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {transaction.category}
                          {transaction.subcategory && ` - ${transaction.subcategory}`}
                        </h3>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>{transaction.date.toLocaleDateString()}</span>
                          <span>{transaction.paymentMethod}</span>
                          <span className={`px-2 py-1 rounded ${
                            transaction.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.status}
                          </span>
                          {transaction.recurring && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              Recurring {transaction.recurringPeriod}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.createdBy}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default Expenses;
