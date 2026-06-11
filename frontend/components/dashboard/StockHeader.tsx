'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { useStock } from '@/context/StockContext';
import { Tooltip } from 'antd';

export const StockHeader: React.FC = () => {
  const { selectedAsset, currentPrice, priceChange, isUp, marketType } = useStock();

  const getMarketBadge = () => {
    switch (marketType) {
      case 'TW_STOCK': return '台股';
      default: return '台股';
    }
  };


  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{selectedAsset}</h1>
          <span className="px-2.5 py-1 rounded-md bg-sky-50 text-xs font-medium text-sky-600 border border-sky-100">{getMarketBadge()}</span>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-semibold text-slate-900" suppressHydrationWarning>${currentPrice.toFixed(1)}</span>
          <div suppressHydrationWarning className={`flex items-center gap-1 mb-1 text-sm font-medium ${isUp ? 'text-green-600' : 'text-red-600'}`}>
            {isUp ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            {Math.abs(priceChange).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Tooltip title="將此個股加入您的追蹤清單">
          <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md shadow-sky-100">
            <Plus size={18} />
            加入追蹤
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
