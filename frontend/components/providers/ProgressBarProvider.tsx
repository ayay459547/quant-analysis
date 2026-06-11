'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置 NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08
});

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 當路徑或參數改變時，結束進度條
    NProgress.done();
    
    // 返回清理函數
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}
