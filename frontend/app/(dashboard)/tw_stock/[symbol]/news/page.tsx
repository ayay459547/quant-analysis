'use client';

import React, { useState } from 'react';
import { KLineChart } from '@/components/charts/KLineChart';
import { useStock } from '@/context/StockContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/ui';
import { Activity, TrendingUp, TrendingDown, Clock, BarChart3 } from 'lucide-react';

type Timeframe = 'D' | 'W' | 'M' | 'Y';

export default function NewsPage() {
  const { selectedAsset, chartData, loading, currentPrice, priceChange, isUp } = useStock();
  const [timeframe, setTimeframe] = useState<Timeframe>('D');

  const timeframes: { label: string; value: Timeframe }[] = [
    { label: '日線', value: 'D' },
    { label: '周線', value: 'W' },
    { label: '季線', value: 'M' },
    { label: '年線', value: 'Y' },
  ];

  return (
    <div className="space-y-6">
      {/* 股票概覽卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
                <BarChart3 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">技術分析</h2>
                <p className="text-sm text-slate-500">即時 K 線與成交量觀察</p>
              </div>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    timeframe === tf.value
                      ? 'bg-white text-sky-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="h-[400px] flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-sky-600/20 border-t-sky-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 text-sm">正在載入圖表數據...</p>
            </div>
          ) : (
            <KLineChart data={chartData} />
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-sky-600" />
              市場概況
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">當前價格</span>
                <span className={`font-bold text-lg ${isUp ? 'text-red-600' : 'text-green-600'}`}>
                  {currentPrice.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">今日漲跌</span>
                <span className={`font-bold flex items-center gap-1 ${isUp ? 'text-red-600' : 'text-green-600'}`}>
                  {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(priceChange).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">成交量</span>
                <span className="font-bold text-slate-900">
                  {(chartData[chartData.length - 1]?.volume / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-sky-600" />
              最近更新
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-1">營收公告</p>
                <p className="text-xs text-slate-500">2026-06-10 14:30</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  本月營收創歷史新高，較去年同期成長 25.4%，主要受惠於 AI 晶片需求強勁。
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-1">法說會摘要</p>
                <p className="text-xs text-slate-500">2026-06-08 10:00</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  公司表示未來三季展望樂觀，毛利率預計將維持在 53% 以上。
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
