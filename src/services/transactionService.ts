
import { Transaction, DashboardMetrics, CurrencyAmount } from '@/types';

// Mock data storage - in real app this would be connected to a database
let transactions: Transaction[] = [
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
];

export const transactionService = {
  // Get all transactions
  getAllTransactions: (): Transaction[] => {
    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  // Add new transaction
  addTransaction: (transaction: Omit<Transaction, 'id'>): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    transactions.push(newTransaction);
    return newTransaction;
  },

  // Update transaction
  updateTransaction: (id: string, updates: Partial<Transaction>): Transaction | null => {
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    transactions[index] = { ...transactions[index], ...updates };
    return transactions[index];
  },

  // Delete transaction
  deleteTransaction: (id: string): boolean => {
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    transactions.splice(index, 1);
    return true;
  },

  // Get transactions by date range
  getTransactionsByDateRange: (startDate: Date, endDate: Date): Transaction[] => {
    return transactions.filter(t => 
      t.date >= startDate && t.date <= endDate
    ).sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  // Get dashboard metrics
  getDashboardMetrics: (): DashboardMetrics => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const todayTransactions = transactions.filter(t => 
      t.date >= today
    );
    
    const monthTransactions = transactions.filter(t => 
      t.date >= monthStart
    );
    
    const yearTransactions = transactions.filter(t => 
      t.date >= yearStart
    );

    const aggregateAmounts = (trans: Transaction[], type: 'income' | 'expense'): CurrencyAmount[] => {
      const amounts: Record<string, number> = {};
      
      trans.filter(t => t.type === type).forEach(t => {
        amounts[t.currency] = (amounts[t.currency] || 0) + t.amount;
      });
      
      return Object.entries(amounts)
        .filter(([_, amount]) => amount > 0)
        .map(([currency, amount]) => ({ currency, amount }));
    };

    return {
      todayIncome: aggregateAmounts(todayTransactions, 'income'),
      todayExpenses: aggregateAmounts(todayTransactions, 'expense'),
      monthlyIncome: aggregateAmounts(monthTransactions, 'income'),
      monthlyExpenses: aggregateAmounts(monthTransactions, 'expense'),
      yearlyIncome: aggregateAmounts(yearTransactions, 'income'),
      yearlyExpenses: aggregateAmounts(yearTransactions, 'expense'),
      recentTransactions: transactions.slice(0, 10).sort((a, b) => b.date.getTime() - a.date.getTime())
    };
  }
};
