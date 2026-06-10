'use client';

import React from 'react';
import { Avatar as AntdAvatar, AvatarProps } from 'antd';

export const Avatar: React.FC<AvatarProps> = (props) => {
  return <AntdAvatar {...props} />;
};
