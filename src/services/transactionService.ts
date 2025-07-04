
import { Transaction, DashboardMetrics, CurrencyAmount } from '@/types';

const API_BASE_URL = 'http://localhost/dive_center/api';

export const transactionService = {
  // Get all transactions
  getAllTransactions: async (): Promise<Transaction[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`);
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Invalid response format:', data);
        return [];
      }
      
      return data.map((t: any) => ({
        ...t,
        date: new Date(t.date)
      })) as Transaction[];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  // Add new transaction
  addTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transaction,
          date: transaction.date.toISOString().slice(0, 19).replace('T', ' ')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      // Fetch updated list to get the created transaction
      const transactions = await transactionService.getAllTransactions();
      if (transactions.length === 0) {
        throw new Error('Failed to retrieve created transaction');
      }
      return transactions[0] as Transaction; // Return the most recent transaction
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Update transaction
  updateTransaction: async (id: string, updates: Partial<Transaction>): Promise<Transaction | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          ...updates,
          date: updates.date ? updates.date.toISOString().slice(0, 19).replace('T', ' ') : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      // Fetch updated transaction
      const transactions = await transactionService.getAllTransactions();
      return transactions.find(t => t.id.toString() === id.toString()) || null;
    } catch (error) {
      console.error('Error updating transaction:', error);
      return null;
    }
  },

  // Delete transaction
  deleteTransaction: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  },

  // Get transactions by date range
  getTransactionsByDateRange: async (startDate: Date, endDate: Date): Promise<Transaction[]> => {
    const transactions = await transactionService.getAllTransactions();
    return transactions.filter(t => 
      t.date >= startDate && t.date <= endDate
    ).sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  // Get dashboard metrics
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const transactions = await transactionService.getAllTransactions();
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
