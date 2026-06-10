'use client';

import React from 'react';
import { ArrowUpRight, CircleDollarSign } from 'lucide-react';
import { Card } from '@/components/common/Card';

export default function ProfitabilityPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '毛利率 (季)', value: '53.1%', trend: '+0.5%' },
          { label: '營業利益率 (季)', value: '42.0%', trend: '+0.8%' },
          { label: '稅後淨利率 (季)', value: '38.2%', trend: '+1.2%' },
          { label: 'ROE 股東權益報酬率', value: '28.4%', trend: '+2.1%' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5 border-t-2 border-t-indigo-600">
            <p className="text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">{stat.value}</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-green-50 text-green-600 flex items-center gap-1 w-max">
              <ArrowUpRight size={14} /> {stat.trend} (YoY)
            </span>
          </Card>
        ))}
      </div>

      <Card className="h-[450px] flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10 opacity-100 transition-opacity">
          <CircleDollarSign size={48} className="text-indigo-600 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2 text-slate-900">獲利能力趨勢圖</h3>
          <p className="text-slate-600 text-sm mb-6 max-w-md text-center">
            透過視覺化圖表追蹤三率（毛利率、營業利益率、稅後淨利率）的長期變化，快速判斷企業本業獲利是否持續成長。
          </p>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-md shadow-indigo-100">
            解鎖圖表完整功能
          </button>
        </div>
        {/* 圖表背景佔位符 */}
        <div className="w-full h-full flex items-end gap-2 px-10 pb-10 opacity-10 blur-sm">
           {[40, 42, 45, 48, 47, 50, 52, 53].map((h, i) => (
             <div key={i} className="flex-1 bg-indigo-600 rounded-t-sm" style={{ height: `${h}%` }}></div>
           ))}
        </div>
      </Card>
    </div>
  );
}
