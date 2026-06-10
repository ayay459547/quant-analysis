'use client';

import React from 'react';
import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd';

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <AntdCheckbox {...props} />;
};
