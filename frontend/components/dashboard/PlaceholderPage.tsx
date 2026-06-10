'use client';

import React from 'react';
import { Target, ArrowUpRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';

interface PlaceholderPageProps {
  title: string;
  icon?: LucideIcon;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon: Icon = Target }) => {
  return (
    <Card className="h-[60vh] flex flex-col items-center justify-center text-slate-500 animate-in fade-in duration-300">
      <Icon size={64} className="mb-6 opacity-20 text-indigo-500" />
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        {title} 模組開發中
      </h2>
      <p className="text-slate-600 max-w-sm text-center mb-6">
        我們正在努力將基本面與籌碼面數據整合進量化平台，敬請期待後續更新。
      </p>
      <Link
        href="/profitability"
        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition-colors"
      >
        先去看看「獲利能力」展示 <ArrowUpRight size={16} />
      </Link>
    </Card>
  );
};
