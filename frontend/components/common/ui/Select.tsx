'use client';

import React from 'react';
import { Select as AntdSelect, SelectProps } from 'antd';

export const Select: React.FC<SelectProps> = (props) => {
  return <AntdSelect {...props} />;
};
