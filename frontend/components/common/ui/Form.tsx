'use client';

import React from 'react';
import { Form as AntdForm, FormProps, FormItemProps } from 'antd';

export const Form: React.FC<FormProps> & { Item: React.FC<FormItemProps> } = (props) => {
  return <AntdForm {...props} />;
};

const FormItem: React.FC<FormItemProps> = (props) => <AntdForm.Item {...props} />;
FormItem.displayName = 'Form.Item';

Form.displayName = 'Form';
Form.Item = FormItem;
