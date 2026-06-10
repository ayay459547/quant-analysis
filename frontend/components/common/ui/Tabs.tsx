'use client';

import React from 'react';
import { Tabs as AntdTabs, TabsProps } from 'antd';

export const Tabs: React.FC<TabsProps> = (props) => {
  return <AntdTabs {...props} />;
};
