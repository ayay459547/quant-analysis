'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { ChevronRight, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IndustryCardProps {
  id: string;
  name: string;
  count: number;
  icon: string;
  monthlyChange: number;
  onClick: (id: string) => void;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  id, name, count, icon, monthlyChange, onClick
}) => {
  // 動態獲取圖示
  const Icon = (LucideIcons as any)[icon] || Activity;

  return (
    <Card
      onClick={() => onClick(id)}
      className="p-5 cursor-pointer hover:border-sky-300 hover:shadow-md transition-all group relative overflow-hidden"
    >
      <div className="absolute -right-4 -bottom-4 text-slate-50 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
         <Icon size={120} />
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
          monthlyChange >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {monthlyChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(monthlyChange)}%
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-lg text-slate-800">{name}</h3>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-sm text-slate-500">{count} 檔個股</p>
      </div>
    </Card>
  );
};
