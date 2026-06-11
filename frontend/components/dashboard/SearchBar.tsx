'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { dataService } from '@/lib/dataService';
import { useStock } from '@/context/StockContext';
import { debounce } from 'lodash';

export const SearchBar: React.FC = () => {
  const [options, setOptions] = useState<{ value: string; label: React.ReactNode; symbol: string }[]>([]);
  const router = useRouter();
  const { setSelectedAsset } = useStock();

  // 搜尋邏輯，使用 useMemo 建立穩定的 debounce 函數
  // React Compiler 要求 useCallback 的第一個參數必須是內聯函數表達式，
  // 因此使用 useMemo(() => debounce(...), []) 是正確且符合規範的作法。
  const handleSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value || value.trim().length === 0) {
          setOptions([]);
          return;
        }

        try {
          const results = await dataService.searchStocks(value);
          const newOptions = results.map((stock: any) => ({
            value: `${stock.id} ${stock.name}`,
            symbol: stock.id,
            label: (
              <div className="flex justify-between items-center py-1">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800">{stock.id} {stock.name}</span>
                  <span className="text-[10px] text-slate-400">{stock.industry}</span>
                </div>
                <span className="text-sky-600 text-xs font-medium px-1.5 py-0.5 bg-sky-50 rounded">台股</span>
              </div>
            ),
          }));
          setOptions(newOptions);
        } catch (error) {
          console.error('Search error:', error);
        }
      }, 300),
    []
  );

  // 元件卸載時取消未完成的 debounce 請求
  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  const onSelect = (value: string, option: any) => {
    setSelectedAsset(value);
    router.push(`/tw_stock/${option.symbol}/news`);
  };

  return (
    <div className="w-64">
      <AutoComplete
        popupMatchSelectWidth={250}
        style={{ width: '100%' }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        className="search-autocomplete"
      >
        <Input
          placeholder="搜尋代號 (如 2330 / BTC)"
          prefix={<Search size={16} className="text-slate-400" />}
          variant="filled"
          className="rounded-full bg-slate-100 border-none hover:bg-slate-200 focus:bg-white transition-all h-10"
        />
      </AutoComplete>
      <style jsx global>{`
        .search-autocomplete .ant-select-selector {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .search-autocomplete .ant-input-affix-wrapper {
          height: 40px;
        }
      `}</style>
    </div>
  );
};
