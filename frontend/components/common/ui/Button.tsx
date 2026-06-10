'use client';

import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';

export const Button: React.FC<ButtonProps> = (props) => {
  return <AntdButton {...props} />;
};
