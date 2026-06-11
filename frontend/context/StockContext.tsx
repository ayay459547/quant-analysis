'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { dataService } from '@/lib/dataService';
import { ChartDataPoint, MarketType } from '@/types';
import { useParams } from 'next/navigation';

interface StockContextType {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
  selectedSymbol: string;
  marketType: MarketType;
  chartData: ChartDataPoint[];
  currentPrice: number;
  priceChange: number;
  isUp: boolean;
  loading: boolean;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

const DEFAULT_SYMBOL = '2330';

export function StockProvider({ 
  children, 
}: { 
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentMarketType: MarketType = 'TW_STOCK';
  const symbolParam = params?.symbol as string;
  
  const [selectedSymbol, setSelectedSymbol] = useState<string>(symbolParam || DEFAULT_SYMBOL);
  const [prevSymbolParam, setPrevSymbolParam] = useState<string | undefined>(symbolParam);
  const [selectedAssetName, setSelectedAssetName] = useState<string>('');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 在 Render 階段同步 URL 參數與 State，避免 Cascading Renders 錯誤
  if (symbolParam && symbolParam !== prevSymbolParam) {
    setPrevSymbolParam(symbolParam);
    setSelectedSymbol(symbolParam);
  }

  // 當 selectedSymbol 改變時，獲取股票基本資訊與圖表資料
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 同步獲取資訊與圖表
        const [info, chart] = await Promise.all([
          dataService.getStockInfo(selectedSymbol),
          dataService.getChartData(selectedSymbol)
        ]);
        
        setSelectedAssetName(info.name);
        setChartData(chart);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        setSelectedAssetName('未知標的');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSymbol]);

  const { currentPrice, priceChange, isUp } = useMemo(() => {
    if (chartData.length < 2) return { currentPrice: 0, priceChange: 0, isUp: true };
    
    const current = chartData[chartData.length - 1]?.close || 0;
    const prev = chartData[chartData.length - 2]?.close || 0;
    const change = prev !== 0 ? ((current - prev) / prev) * 100 : 0;
    
    return {
      currentPrice: current,
      priceChange: change,
      isUp: change >= 0
    };
  }, [chartData]);

  // 組合名稱與編號用於顯示
  const selectedAsset = selectedAssetName 
    ? `${selectedSymbol} ${selectedAssetName}` 
    : `${selectedSymbol}`;

  return (
    <StockContext.Provider value={{ 
      selectedAsset, 
      setSelectedAsset: (val) => setSelectedSymbol(val.split(' ')[0]),
      selectedSymbol,
      marketType: currentMarketType, 
      chartData, 
      currentPrice, 
      priceChange, 
      isUp,
      loading 
    }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
}
