'use client';

import React, { useState, useEffect } from 'react';
import { IndustryCard } from '@/components/dashboard/IndustryCard';
import { StockList } from '@/components/dashboard/StockList';
import { dataService } from '@/lib/dataService';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { useStock } from '@/context/StockContext';

import { useRouter, useParams } from 'next/navigation';

export default function MarketDashboard() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [stocks, setStocks] = useState<any[]>([]);
  const { setSelectedAsset } = useStock();
  const router = useRouter();

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
  const updateDate = process.env.NEXT_PUBLIC_UPDATE_DATE;

  // 初始化獲取產業列表
  useEffect(() => {
    const fetchIndustries = async () => {
      const data = await dataService.getIndustries();
      setIndustries(data);
    };
    fetchIndustries();
  }, []);

  // 當選擇產業改變時獲取股票清單
  useEffect(() => {
    if (selectedIndustry) {
      const fetchStocks = async () => {
        const data = await dataService.getStocksByIndustry(selectedIndustry);
        setStocks(data);
      };
      fetchStocks();
    }
  }, [selectedIndustry]);

  const handleStockClick = (stock: { id: string, name: string }) => {
    setSelectedAsset(`${stock.id} ${stock.name}`);
    router.push(`/tw_stock/${stock.id}/news`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">產業儀表板</h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-slate-500">即時掌握各產業表現與龍頭個股</p>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full">v{appVersion} | 更新日期: {updateDate}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-100 text-sm font-medium">
            <TrendingUp size={16} />
            市場看漲
          </div>
        </div>
      </div>

      {!selectedIndustry ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <IndustryCard 
              key={industry.id}
              {...industry}
              onClick={setSelectedIndustry}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedIndustry(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-sky-600 font-medium transition-colors mb-4"
          >
            <ChevronRight size={18} className="rotate-180" />
            返回產業列表
          </button>
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">
                {industries.find(i => i.id === selectedIndustry)?.name} - 個股清單
              </h3>
              <span className="text-sm text-slate-500">
                共 {stocks.length} 檔
              </span>
            </div>
            <StockList 
              stocks={stocks}
              onStockClick={handleStockClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
