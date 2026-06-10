'use client';

import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';

export const Modal: React.FC<ModalProps> = (props) => {
  return <AntdModal {...props} />;
};
