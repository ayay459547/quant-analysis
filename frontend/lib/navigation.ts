import {
  Megaphone, FileText, CircleDollarSign, ShieldCheck,
  BarChart2, Scale, Users, Target, PieChart, Play
} from 'lucide-react';
import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { id: 'news', icon: Megaphone, label: '最新動態', href: '/news', availableIn: ['TW_STOCK', 'US_STOCK', 'CRYPTO'] },
  { id: 'financials', icon: FileText, label: '財務報表', href: '/financials', availableIn: ['TW_STOCK', 'US_STOCK'] },
  { id: 'profitability', icon: CircleDollarSign, label: '獲利能力', href: '/profitability', availableIn: ['TW_STOCK', 'US_STOCK'] },
  { id: 'safety', icon: ShieldCheck, label: '安全性分析', href: '/safety', availableIn: ['TW_STOCK', 'US_STOCK'] },
  { id: 'growth', icon: BarChart2, label: '成長力分析', href: '/growth', availableIn: ['TW_STOCK', 'US_STOCK'] },
  { id: 'valuation', icon: Scale, label: '價值評估', href: '/valuation', availableIn: ['TW_STOCK', 'US_STOCK'] },
  { id: 'chips', icon: Users, label: '董監與籌碼', href: '/chips', availableIn: ['TW_STOCK'] },
  { id: 'key_metrics', icon: Target, label: '關鍵指標', href: '/key_metrics', availableIn: ['TW_STOCK', 'US_STOCK'] },
  { id: 'product_mix', icon: PieChart, label: '產品組合', href: '/product_mix', availableIn: ['TW_STOCK', 'US_STOCK'] },
];

export const secondaryNavItems: NavItem[] = [
  { id: 'backtest', icon: Play, label: '策略回測', href: '/backtest', availableIn: ['TW_STOCK', 'US_STOCK', 'CRYPTO'] },
];
