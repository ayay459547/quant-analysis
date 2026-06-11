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
          colorPrimary: '#0ea5e9', // sky-500
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
