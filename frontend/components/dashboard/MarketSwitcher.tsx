'use client';

import React from 'react';
import { useStock } from '@/context/StockContext';
import { MarketType } from '@/types';
import { Coins, LineChart, Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/common/ui';

export const MarketSwitcher: React.FC = () => {
  const { marketType } = useStock();
  const router = useRouter();
  const pathname = usePathname();

  const markets: { type: MarketType; label: string; icon: React.ElementType; route: string }[] = [
    { type: 'CRYPTO', label: '加密貨幣', icon: Coins, route: 'crypto' },
    { type: 'TW_STOCK', label: '台股', icon: LineChart, route: 'tw_stock' },
    { type: 'US_STOCK', label: '美股', icon: Globe, route: 'us_stock' },
  ];

  const handleMarketChange = (route: string) => {
    // 獲取當前的子頁面路徑 (例如: /tw_stock/news -> /news)
    const segments = pathname.split('/').filter(Boolean);
    const subPage = segments.length > 1 ? segments.slice(1).join('/') : 'news';
    router.push(`/${route}/${subPage}`);
  };

  return (
    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
      {markets.map((m) => {
        const Icon = m.icon;
        const isActive = marketType === m.type;
        return (
          <Button
            key={m.type}
            type={isActive ? 'primary' : 'text'}
            onClick={() => handleMarketChange(m.route)}
            icon={<Icon size={16} />}
            className={`flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 border-none shadow-none ${
              isActive
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            <span className="hidden sm:inline">{m.label}</span>
          </Button>
        );
      })}
    </div>
  );
};
