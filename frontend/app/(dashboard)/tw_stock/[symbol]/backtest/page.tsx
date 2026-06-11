'use client';

import React, { useState } from 'react';
import { CandlestickChart, Settings, Play, TrendingUp } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { KLineChart } from '@/components/charts/KLineChart';
import { useStock } from '@/context/StockContext';
import { BacktestResult } from '@/types';
import { Select, Button } from '@/components/common/ui';

export default function BacktestPage() {
  const { chartData } = useStock();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<BacktestResult | null>(null);

  const handleRunBacktest = () => {
    setIsRunning(true);
    setResults(null);
    setTimeout(() => {
      setIsRunning(false);
      setResults({
        winRate: '68.5%',
        totalReturn: '+124.5%',
        maxDrawdown: '-15.2%',
        trades: 42,
        sharpeRatio: 1.85
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="h-[400px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2 text-slate-800">
              <CandlestickChart size={18} className="text-sky-600" />
              價格走勢與技術指標
            </h2>
            <div className="flex gap-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>多頭排列</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>MA(20)</span>
            </div>
          </div>
          <div className="flex-1 -mx-2 -mb-2">
            <KLineChart data={chartData} />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-800">
            <Settings size={18} className="text-sky-600" />
            策略回測參數
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium">策略選擇</label>
              <Select
                defaultValue="ma_cross"
                className="w-full"
                options={[
                  { value: 'ma_cross', label: '雙均線交叉策略 (MA Cross)' },
                  { value: 'rsi_mean', label: 'RSI 均值回歸策略' },
                  { value: 'macd_trend', label: 'MACD 趨勢追蹤' },
                ]}
              />
            </div>
            <Button
              onClick={handleRunBacktest}
              loading={isRunning}
              type="primary"
              size="large"
              block
              icon={<Play size={18} fill="currentColor" />}
              className="h-12 bg-gradient-to-r from-sky-600 to-purple-600 border-none shadow-md shadow-sky-100 flex items-center justify-center gap-2"
            >
              開始執行回測
            </Button>
          </div>
        </Card>

        <div className={`transition-all duration-500 ${results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {results && (
            <Card className="border-sky-100 bg-sky-50/50">
              <h2 className="text-sm font-medium text-sky-600 mb-4 flex items-center gap-2">
                <TrendingUp size={16} />
                回測績效報告
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">總報酬率</p>
                  <p className="text-2xl font-bold text-green-600">{results.totalReturn}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">勝率</p>
                  <p className="text-2xl font-bold text-slate-900">{results.winRate}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
