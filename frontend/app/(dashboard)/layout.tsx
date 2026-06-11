'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Activity, Search, Bell, User } from 'lucide-react';
import { navItems, secondaryNavItems } from '@/lib/navigation';
import { StockProvider, useStock } from '@/context/StockContext';
import { StockHeader } from '@/components/dashboard/StockHeader';
import { MarketSwitcher } from '@/components/dashboard/MarketSwitcher';
import { UserSettingsModal } from '@/components/dashboard/UserSettingsModal';
import { NotificationModal } from '@/components/dashboard/NotificationModal';
import { Input } from '@/components/common/ui';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const symbolParam = (params?.symbol as string) || '2330';
  const { marketType } = useStock();

  const [modalOpen, setModalOpen] = useState(false);
  const [notiModalOpen, setNotiModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'profile' | 'settings'>('profile');

  const openModal = (tab: 'profile' | 'settings') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const filteredNavItems = navItems.filter(item => 
    !item.availableIn || item.availableIn.includes(marketType)
  );

  const filteredSecondaryNavItems = secondaryNavItems.filter(item => 
    !item.availableIn || item.availableIn.includes(marketType)
  );

  const isMainDashboard = pathname === `/tw_stock`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex selection:bg-sky-100">
      {/* --- 左側邊欄 (Sidebar) --- */}
      {!isMainDashboard && (
        <aside className="w-24 lg:w-64 border-r border-slate-200 bg-white flex flex-col transition-all duration-300 shrink-0 shadow-sm">
          <Link 
            href={`/tw_stock`}
            className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100 shrink-0 hover:bg-slate-50 transition-colors"
          >
            <div className="bg-sky-600 p-1.5 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <span className="ml-3 font-bold text-xl hidden lg:block tracking-wide text-slate-800">Quant Analysis</span>
          </Link>

          {/* 導覽列滾動區塊 */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
            {filteredNavItems.map(item => {
              const href = `/tw_stock/${symbolParam}${item.href}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`w-full flex lg:flex-row flex-col items-center justify-center lg:justify-start lg:px-4 py-3 lg:py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 font-semibold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={22} className={`mb-1 lg:mb-0 lg:mr-3 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] lg:text-sm">{item.label}</span>
                </Link>
              );
            })}

            <div className="my-4 border-t border-slate-100 mx-2"></div>

            {filteredSecondaryNavItems.map(item => {
              const href = `/tw_stock/${symbolParam}${item.href}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`w-full flex lg:flex-row flex-col items-center justify-center lg:justify-start lg:px-4 py-3 lg:py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 font-semibold border border-sky-100'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={22} className={`mb-1 lg:mb-0 lg:mr-3 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] lg:text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>
      )}

      {/* --- 主內容區 (Main Content) --- */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
        {/* 頂部導覽列 (Header) */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-6">
            {isMainDashboard && (
              <Link 
                href={`/tw_stock`}
                className="flex items-center gap-3 mr-4"
              >
                <div className="bg-sky-600 p-1.5 rounded-lg text-white">
                  <Activity size={24} />
                </div>
                <span className="font-bold text-xl tracking-wide text-slate-800">Quant Analysis</span>
              </Link>
            )}
            <Input
              placeholder="搜尋代號 (如 2330 / BTC)"
              prefix={<Search size={16} className="text-slate-400" />}
              variant="filled"
              className="w-64 rounded-full bg-slate-100 border-none hover:bg-slate-200 focus:bg-white transition-all"
            />
            <MarketSwitcher />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setNotiModalOpen(true)}
              className="p-2 text-slate-500 hover:text-sky-700 transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div 
              onClick={() => openModal('profile')}
              className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center shadow-md shadow-sky-100 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <User size={18} className="text-white" />
            </div>
          </div>
        </header>

        {/* 內容卷軸區 */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth flex flex-col">
          <div className="max-w-7xl mx-auto space-y-6 flex-1">
            {pathname !== `/tw_stock` && <StockHeader />}
            {children}
          </div>
          
          {/* 頁尾 (Footer) */}
          <footer className="mt-12 py-6 border-t border-slate-200 text-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
              <p>© 2026 Quant Analysis. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-sky-600 transition-colors">隱私權政策</a>
                <a href="#" className="hover:text-sky-600 transition-colors">服務條款</a>
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-500 font-medium">Apache-2.0 License</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      <UserSettingsModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialTab={modalTab} 
      />

      <NotificationModal
        open={notiModalOpen}
        onClose={() => setNotiModalOpen(false)}
      />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StockProvider>
      <DashboardContent>{children}</DashboardContent>
    </StockProvider>
  );
}
