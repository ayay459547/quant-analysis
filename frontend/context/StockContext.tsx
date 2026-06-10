'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { generateMockData } from '@/lib/mockData';
import { ChartDataPoint, MarketType } from '@/types';
import { useParams } from 'next/navigation';

interface StockContextType {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
  marketType: MarketType;
  chartData: ChartDataPoint[];
  currentPrice: number;
  priceChange: number;
  isUp: boolean;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

const DEFAULT_ASSETS: Record<MarketType, string> = {
  TW_STOCK: '2330 台積電',
  US_STOCK: 'NVDA NVIDIA',
  CRYPTO: 'BTC Bitcoin',
};

const marketMap: Record<string, MarketType> = {
  'tw_stock': 'TW_STOCK',
  'us_stock': 'US_STOCK',
  'crypto': 'CRYPTO'
};

export function StockProvider({ 
  children, 
}: { 
  children: React.ReactNode;
}) {
  const params = useParams();
  const marketParam = params?.market as string;
  const currentMarketType = (marketParam && marketMap[marketParam.toLowerCase()]) || 'TW_STOCK';
  
  const [selectedAsset, setSelectedAsset] = useState<string>(DEFAULT_ASSETS[currentMarketType]);
  const [prevMarketType, setPrevMarketType] = useState<MarketType>(currentMarketType);

  // 當 URL 的市場類型改變時，同步重置所選資產 (在 Render 階段處理以避免 Extra Render)
  if (currentMarketType !== prevMarketType) {
    setPrevMarketType(currentMarketType);
    setSelectedAsset(DEFAULT_ASSETS[currentMarketType]);
  }

  const chartData = useMemo(() => generateMockData(90, selectedAsset), [selectedAsset]);
  const currentPrice = chartData[chartData.length - 1]?.close || 0;
  const prevPrice = chartData[chartData.length - 2]?.close || 0;
  const priceChange = ((currentPrice - prevPrice) / prevPrice) * 100;
  const isUp = priceChange >= 0;

  return (
    <StockContext.Provider value={{ selectedAsset, setSelectedAsset, marketType: currentMarketType, chartData, currentPrice, priceChange, isUp }}>
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
