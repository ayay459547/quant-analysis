import React from 'react';
import { ChartDataPoint } from '@/types';

interface KLineChartProps {
  data: ChartDataPoint[];
}

export const KLineChart: React.FC<KLineChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const validData = data.slice(20); // 略過沒有 MA 的前段資料
  const maxPrice = Math.max(...validData.map(d => Math.max(d.high, d.ma20 || 0)));
  const minPrice = Math.min(...validData.map(d => Math.min(d.low, d.ma20 || 999999)));
  const priceRange = maxPrice - minPrice;

  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 60, bottom: 30, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (validData.length - 1)) * chartWidth;
  const getY = (price: number) => padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

  // MA Line Path
  const maPath = validData.map((d, i) => {
    return `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.ma20)}`;
  }).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full min-w-[600px]">
        {/* 背景格線 */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + chartHeight * ratio;
          const price = maxPrice - priceRange * ratio;
          return (
            <g key={ratio}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <text x={width - padding.right + 8} y={y + 4} fill="#64748b" fontSize="10" fontFamily="sans-serif">
                {price.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* K 線 (蠟燭圖) */}
        {validData.map((d, i) => {
          const x = getX(i);
          const isUp = d.close >= d.open;
          const color = isUp ? "#22c55e" : "#ef4444"; // 綠漲紅跌
          const candleWidth = Math.max(2, chartWidth / validData.length * 0.6);

          return (
            <g key={i} className="hover:opacity-80 transition-opacity cursor-crosshair">
              {/* 影線 (上/下) */}
              <line x1={x} y1={getY(d.high)} x2={x} y2={getY(d.low)} stroke={color} strokeWidth="1.5" />
              {/* 實體 (開/收) */}
              <rect
                x={x - candleWidth/2}
                y={getY(Math.max(d.open, d.close))}
                width={candleWidth}
                height={Math.max(1, Math.abs(getY(d.open) - getY(d.close)))}
                fill={color}
                rx="1"
              />
              {/* X軸日期 (稀疏顯示) */}
              {i % 7 === 0 && (
                <text x={x} y={height - 5} fill="#64748b" fontSize="10" textAnchor="middle">
                  {d.date}
                </text>
              )}
            </g>
          );
        })}

        {/* MA 20 線 */}
        <path d={maPath} fill="none" stroke="#eab308" strokeWidth="2" opacity="0.8" />
        <text x={padding.left + 10} y={padding.top} fill="#eab308" fontSize="12" fontWeight="bold">MA(20)</text>
      </svg>
    </div>
  );
};
