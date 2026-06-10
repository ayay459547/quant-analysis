'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import zhTW from 'antd/locale/zh_TW';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider 
      locale={zhTW}
      theme={{
        token: {
          colorPrimary: '#4f46e5', // indigo-600
          borderRadius: 12,
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
