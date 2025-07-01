
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'owner' | 'office';
  name: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  subcategory?: string;
  amount: number;
  currency: 'EGP' | 'USD' | 'EUR' | 'GBP' | 'VISA';
  paymentMethod: 'cash' | 'credit_card' | 'online' | 'credit';
  status: 'paid' | 'credit';
  description: string;
  date: Date;
  createdBy: string;
  recurring?: boolean;
  recurringPeriod?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface IncomeCategory {
  id: string;
  name: string;
  subcategories: string[];
}

export interface ExpenseCategory {
  id: string;
  name: string;
  subcategories: string[];
}

export interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dateFrom: Date;
  dateTo: Date;
  data: ReportData;
  generatedAt: Date;
  generatedBy: string;
}

export interface ReportData {
  totalIncome: CurrencyAmount[];
  totalExpenses: CurrencyAmount[];
  netProfit: CurrencyAmount[];
  incomeByCategory: CategoryBreakdown[];
  expensesByCategory: CategoryBreakdown[];
  transactions: Transaction[];
}

export interface CurrencyAmount {
  currency: string;
  amount: number;
}

export interface CategoryBreakdown {
  category: string;
  amounts: CurrencyAmount[];
  percentage: number;
}

export interface DashboardMetrics {
  todayIncome: CurrencyAmount[];
  todayExpenses: CurrencyAmount[];
  monthlyIncome: CurrencyAmount[];
  monthlyExpenses: CurrencyAmount[];
  yearlyIncome: CurrencyAmount[];
  yearlyExpenses: CurrencyAmount[];
  recentTransactions: Transaction[];
}
