'use client';

import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface Stock {
  id: string;
  name: string;
  price: number;
  change: number;
}

interface StockListProps {
  stocks: Stock[];
  onStockClick: (stock: Stock) => void;
}

export const StockList: React.FC<StockListProps> = ({ stocks, onStockClick }) => {
  if (stocks.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400">
        <Activity size={48} className="mx-auto mb-4 opacity-20" />
        <p>暫無該產業的個股資料</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {stocks.map((stock) => (
        <div 
          key={stock.id}
          onClick={() => onStockClick(stock)}
          className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
              {stock.id.substring(0, 2)}
            </div>
            <div>
              <div className="font-bold text-slate-900">{stock.name}</div>
              <div className="text-xs text-slate-500">{stock.id}</div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="font-semibold text-slate-900">${stock.price.toFixed(1)}</div>
              <div className={`text-xs font-medium flex items-center justify-end gap-0.5 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(stock.change)}%
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-sky-400 transition-colors" />
          </div>
        </div>
      ))}
    </div>
  );
};
