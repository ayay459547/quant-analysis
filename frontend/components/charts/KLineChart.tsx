'use client';

import React from 'react';
import { ChartDataPoint } from '@/types';

interface KLineChartProps {
  data: ChartDataPoint[];
}

export const KLineChart: React.FC<KLineChartProps> = ({ data }) => {
  if (!data || data.length === 0) return (
    <div className="h-[400px] flex items-center justify-center text-slate-400">
      暫無數據
    </div>
  );

  // 計算價格範圍
  const maxPrice = Math.max(...data.map(d => Math.max(d.high, d.ma5 || 0, d.ma10 || 0, d.ma20 || 0)));
  const minPrice = Math.min(...data.map(d => Math.min(d.low, d.ma5 || 999999, d.ma10 || 999999, d.ma20 || 999999)));
  const priceRange = maxPrice - minPrice;

  // 計算成交量範圍
  const maxVolume = Math.max(...data.map(d => d.volume));

  const width = 1000;
  const height = 500;
  const padding = { top: 20, right: 60, bottom: 40, left: 10 };
  
  // 價格區域高度 70%, 成交量區域高度 20%, 中間間隔 10%
  const priceAreaHeight = height * 0.65;
  const volumeAreaHeight = height * 0.2;
  const volumeAreaTop = priceAreaHeight + (height * 0.1);

  const chartWidth = width - padding.left - padding.right;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (price: number) => padding.top + priceAreaHeight - ((price - minPrice) / priceRange) * priceAreaHeight;
  const getVolY = (vol: number) => volumeAreaTop + volumeAreaHeight - (vol / maxVolume) * volumeAreaHeight;

  // 生成均線路徑
  const generatePath = (key: 'ma5' | 'ma10' | 'ma20') => {
    return data
      .map((d, i) => {
        const val = d[key];
        if (val === undefined || val === 0) return null;
        return `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`;
      })
      .filter(p => p !== null)
      .join(' ');
  };

  return (
    <div className="w-full bg-white rounded-xl p-4">
      <div className="flex gap-4 mb-2 text-xs font-medium">
        <span className="text-blue-500">MA5: {data[data.length-1]?.ma5?.toFixed(1)}</span>
        <span className="text-orange-500">MA10: {data[data.length-1]?.ma10?.toFixed(1)}</span>
        <span className="text-yellow-500">MA20: {data[data.length-1]?.ma20?.toFixed(1)}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* 價格坐標線 */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + priceAreaHeight * ratio;
          const price = maxPrice - priceRange * ratio;
          return (
            <g key={`price-grid-${ratio}`}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={width - padding.right + 5} y={y + 4} fill="#94a3b8" fontSize="10">{price.toFixed(0)}</text>
            </g>
          );
        })}

        {/* 成交量坐標線 */}
        <line x1={padding.left} y1={volumeAreaTop} x2={width - padding.right} y2={volumeAreaTop} stroke="#f1f5f9" strokeWidth="1" />
        <text x={width - padding.right + 5} y={volumeAreaTop + 4} fill="#94a3b8" fontSize="10">Vol</text>

        {/* K線與成交量柱 */}
        {data.map((d, i) => {
          const x = getX(i);
          const isUp = d.close >= d.open;
          const color = isUp ? "#ef4444" : "#22c55e"; // 台股紅漲綠跌
          const barWidth = Math.max(2, (chartWidth / data.length) * 0.7);

          return (
            <g key={`kline-${i}`}>
              {/* K線影線 */}
              <line x1={x} y1={getY(d.high)} x2={x} y2={getY(d.low)} stroke={color} strokeWidth="1" />
              {/* K線實體 */}
              <rect
                x={x - barWidth/2}
                y={getY(Math.max(d.open, d.close))}
                width={barWidth}
                height={Math.max(1, Math.abs(getY(d.open) - getY(d.close)))}
                fill={color}
              />
              {/* 成交量柱 */}
              <rect
                x={x - barWidth/2}
                y={getVolY(d.volume)}
                width={barWidth}
                height={Math.max(1, volumeAreaTop + volumeAreaHeight - getVolY(d.volume))}
                fill={color}
                opacity="0.6"
              />
              {/* 日期標籤 */}
              {i % Math.floor(data.length / 5) === 0 && (
                <text x={x} y={height - 10} fill="#94a3b8" fontSize="10" textAnchor="middle">{d.date}</text>
              )}
            </g>
          );
        })}

        {/* 均線 */}
        <path d={generatePath('ma5')} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8" />
        <path d={generatePath('ma10')} fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" />
        <path d={generatePath('ma20')} fill="none" stroke="#eab308" strokeWidth="1.5" opacity="0.8" />
      </svg>
    </div>
  );
};
