
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Transaction } from '@/types';
import { transactionService } from '@/services/transactionService';
import { incomeCategories, expenseCategories } from '@/data/categories';
import { useAuth } from '@/contexts/AuthContext';

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Transaction) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onSubmit, onCancel }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: transaction?.type || 'income' as 'income' | 'expense',
    category: transaction?.category || '',
    subcategory: transaction?.subcategory || '',
    amount: transaction?.amount || 0,
    currency: transaction?.currency || 'EGP' as 'EGP' | 'USD' | 'EUR' | 'GBP' | 'VISA',
    paymentMethod: transaction?.paymentMethod || 'cash' as 'cash' | 'credit_card' | 'online' | 'credit',
    status: transaction?.status || 'paid' as 'paid' | 'credit',
    description: transaction?.description || '',
    date: transaction?.date || new Date(),
    recurring: transaction?.recurring || false,
    recurringPeriod: transaction?.recurringPeriod || 'monthly' as 'daily' | 'weekly' | 'monthly' | 'yearly'
  });

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;
  const selectedCategory = categories.find(c => c.name === formData.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      let result: Transaction;
      
      if (transaction) {
        result = await transactionService.updateTransaction(transaction.id, {
          ...formData,
          createdBy: user?.username || 'Unknown'
        });
        
        if (!result) {
          throw new Error('Failed to update transaction');
        }
      } else {
        result = await transactionService.addTransaction({
          ...formData,
          createdBy: user?.username || 'Unknown'
        });
      }

      onSubmit(result);
      toast({
        title: "Success",
        description: `Transaction ${transaction ? 'updated' : 'added'} successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transaction",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {transaction ? 'Edit Transaction' : 'Add New Transaction'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Transaction Type</Label>
              <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => {
                setFormData({ ...formData, type: value, category: '', subcategory: '' });
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => {
                setFormData({ ...formData, category: value, subcategory: '' });
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select value={formData.subcategory} onValueChange={(value) => {
                setFormData({ ...formData, subcategory: value });
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory?.subcategories.map(sub => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value: typeof formData.currency) => {
                setFormData({ ...formData, currency: value });
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EGP">EGP</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="VISA">VISA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={formData.paymentMethod} onValueChange={(value: typeof formData.paymentMethod) => {
                setFormData({ ...formData, paymentMethod: value });
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                  <SelectItem value="credit">Credit (آجل)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Payment Status</Label>
              <Select value={formData.status} onValueChange={(value: typeof formData.status) => {
                setFormData({ ...formData, status: value });
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="credit">Credit (آجل)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter transaction description..."
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={formData.recurring}
              onCheckedChange={(checked) => setFormData({ ...formData, recurring: checked })}
            />
            <Label htmlFor="recurring">Recurring Transaction</Label>
          </div>

          {formData.recurring && (
            <div>
              <Label htmlFor="recurringPeriod">Recurring Period</Label>
              <Select value={formData.recurringPeriod} onValueChange={(value: typeof formData.recurringPeriod) => {
                setFormData({ ...formData, recurringPeriod: value });
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {transaction ? 'Update Transaction' : 'Add Transaction'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
