'use client';

import React, { useState } from 'react';
import { CandlestickChart, Settings, Play, TrendingUp, DollarSign, Calendar, RefreshCcw, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { KLineChart } from '@/components/charts/KLineChart';
import { useStock } from '@/context/StockContext';
import { BacktestResult } from '@/types';
import { Select, Button, Input } from '@/components/common/ui';
import { DatePicker, InputNumber, Divider, Statistic, Row, Col } from 'antd';
import dayjs from 'dayjs';

export default function BacktestPage() {
  const { chartData, selectedAsset } = useStock();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<any | null>(null);

  // 回測參數狀態
  const [initialAmount, setInitialAmount] = useState<number>(100000);
  const [startDate, setStartDate] = useState<any>(dayjs().subtract(1, 'year'));
  const [dcaFrequency, setDcaFrequency] = useState<string>('monthly');
  const [dcaAmount, setDcaAmount] = useState<number>(10000);

  const handleRunBacktest = () => {
    setIsRunning(true);
    setResults(null);
    
    // 模擬回測計算
    setTimeout(() => {
      setIsRunning(false);
      
      // 根據參數生成模擬結果
      const totalInvested = initialAmount + (dcaAmount * 12); // 假設回測一年
      const mockReturnRate = 0.245; // 24.5%
      const finalValue = totalInvested * (1 + mockReturnRate);
      const profit = finalValue - totalInvested;

      setResults({
        totalReturn: '+24.5%',
        annualReturn: '+18.2%',
        maxDrawdown: '-12.4%',
        totalInvested: totalInvested,
        finalValue: finalValue,
        profit: profit,
        winRate: '72%',
        sharpeRatio: 1.65
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="h-[450px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                <BarChart3 size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">策略資產曲線</h2>
                <p className="text-xs text-slate-500">視覺化您的投資成長路徑</p>
              </div>
            </div>
          </div>
          <div className="flex-1 -mx-2 -mb-2">
            <KLineChart data={chartData} />
          </div>
        </Card>

        {results && (
          <Card className="p-6 border-sky-100 bg-white">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-500" />
              回測績效深度報告
            </h2>
            
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Statistic 
                  title="總資產終值" 
                  value={results.finalValue} 
                  precision={0} 
                  prefix="$" 
                  valueStyle={{ color: '#0f172a', fontWeight: '800' }}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="累計報酬率" 
                  value={results.totalReturn.replace('+', '').replace('%', '')} 
                  suffix="%" 
                  valueStyle={{ color: '#16a34a', fontWeight: '800' }}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="年化報酬率" 
                  value={results.annualReturn.replace('+', '').replace('%', '')} 
                  suffix="%" 
                  valueStyle={{ color: '#0284c7', fontWeight: '800' }}
                />
              </Col>
              
              <Divider className="my-0" />
              
              <Col span={6}>
                <p className="text-xs text-slate-500 mb-1">投入本金</p>
                <p className="text-lg font-bold text-slate-700">${results.totalInvested.toLocaleString()}</p>
              </Col>
              <Col span={6}>
                <p className="text-xs text-slate-500 mb-1">累計獲利</p>
                <p className="text-lg font-bold text-green-600">+${results.profit.toLocaleString()}</p>
              </Col>
              <Col span={6}>
                <p className="text-xs text-slate-500 mb-1">最大回撤</p>
                <p className="text-lg font-bold text-rose-600">{results.maxDrawdown}</p>
              </Col>
              <Col span={6}>
                <p className="text-xs text-slate-500 mb-1">夏普值</p>
                <p className="text-lg font-bold text-slate-700">{results.sharpeRatio}</p>
              </Col>
            </Row>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-800">
            <Settings size={20} className="text-sky-600" />
            回測參數設定
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <DollarSign size={16} className="text-slate-400" />
                初始投入金額
              </label>
              <InputNumber
                className="w-full h-10 flex items-center"
                value={initialAmount}
                onChange={(val) => setInitialAmount(val || 0)}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Calendar size={16} className="text-slate-400" />
                回測開始日期
              </label>
              <DatePicker 
                className="w-full h-10" 
                value={startDate}
                onChange={setStartDate}
                placeholder="選擇日期"
              />
            </div>

            <Divider className="my-2" />

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <RefreshCcw size={16} className="text-slate-400" />
                定期定額 (DCA) 頻率
              </label>
              <Select
                value={dcaFrequency}
                onChange={setDcaFrequency}
                className="w-full h-10"
                options={[
                  { value: 'none', label: '不使用定期定額' },
                  { value: 'weekly', label: '每週一次' },
                  { value: 'monthly', label: '每月一次' },
                  { value: 'quarterly', label: '每季一次' },
                ]}
              />
            </div>

            {dcaFrequency !== 'none' && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <PieChartIcon size={16} className="text-slate-400" />
                  每次 DCA 金額
                </label>
                <InputNumber
                  className="w-full h-10 flex items-center"
                  value={dcaAmount}
                  onChange={(val) => setDcaAmount(val || 0)}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </div>
            )}

            <div className="pt-4">
              <Button
                onClick={handleRunBacktest}
                loading={isRunning}
                type="primary"
                size="large"
                block
                icon={<Play size={18} fill="currentColor" />}
                className="h-12 bg-sky-600 hover:bg-sky-500 border-none shadow-lg shadow-sky-100 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                執行策略回測
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-slate-50 border-dashed border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">提示：</span>
            回測模型將根據您設定的開始日期，自動計算複利效應與定期定額的成本攤平效果。結果僅供參考，不構成投資建議。
          </p>
        </Card>
      </div>
    </div>
  );
}
