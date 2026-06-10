'use client';

import React from 'react';
import { Input as AntdInput, InputProps, GetProps } from 'antd';

type AntdPasswordProps = GetProps<typeof AntdInput.Password>;

export const Input: React.FC<InputProps> & { Password: React.FC<AntdPasswordProps> } = (props) => {
  return <AntdInput {...props} />;
};

const InputPassword: React.FC<AntdPasswordProps> = (props) => <AntdInput.Password {...props} />;
InputPassword.displayName = 'Input.Password';

Input.displayName = 'Input';
Input.Password = InputPassword;
