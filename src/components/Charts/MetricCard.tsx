
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyAmount } from '@/types';

interface MetricCardProps {
  title: string;
  amounts: CurrencyAmount[];
  icon: React.ReactNode;
  trend?: number;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, amounts, icon, trend, className }) => {
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'GBP' ? 'GBP' : currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const totalUSD = amounts.reduce((total, item) => {
    // Simple conversion rates for display (in real app, use live rates)
    const rates: Record<string, number> = {
      'USD': 1,
      'EGP': 0.032,
      'EUR': 1.1,
      'GBP': 1.27,
      'VISA': 1
    };
    return total + (item.amount * (rates[item.currency] || 1));
  }, 0);

  return (
    <Card className={`metric-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-blue-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800 mb-2">
          ${totalUSD.toLocaleString()}
        </div>
        <div className="space-y-1">
          {amounts.slice(0, 3).map((item, index) => (
            <div key={index} className="text-sm text-gray-600 flex justify-between">
              <span>{item.currency}:</span>
              <span className="font-medium">
                {formatAmount(item.amount, item.currency)}
              </span>
            </div>
          ))}
        </div>
        {trend !== undefined && (
          <div className={`text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}% from last period
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
