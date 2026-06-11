import { LucideIcon } from 'lucide-react';

export type MarketType = 'TW_STOCK';

export interface ChartDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma10?: number;
  ma20: number;
}

export interface BacktestResult {
  winRate: string;
  totalReturn: string;
  maxDrawdown: string;
  trades: number;
  sharpeRatio: number;
}

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  availableIn?: MarketType[];
}
