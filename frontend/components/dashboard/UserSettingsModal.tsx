'use client';

import React, { useState } from 'react';
import { Upload, App } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, GlobalOutlined, BgColorsOutlined, CameraOutlined, LogoutOutlined, PhoneOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Settings as SettingsIcon } from 'lucide-react';
import { Modal, Tabs, Form, Input, Button, Switch, Avatar, Select } from '@/components/common/ui';
import { useRouter } from 'next/navigation';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: 'profile' | 'settings';
}

type TabKey = 'profile' | 'settings';

export const UserSettingsModal: React.FC<UserModalProps> = ({ open, onClose, initialTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const { message } = App.useApp();
  const router = useRouter();

  const handleLogout = () => {
    message.loading('正在登出...', 0.8).then(() => {
      onClose();
      router.push('/login');
    });
  };

  const profileContent = (
    <div className="py-4">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <Avatar size={100} icon={<UserOutlined />} className="bg-indigo-600 shadow-lg" />
          <Upload showUploadList={false} className="absolute bottom-0 right-0">
            <Button shape="circle" icon={<CameraOutlined />} size="small" className="shadow-md" />
          </Upload>
        </div>
        <h3 className="text-xl font-bold mt-4">John Doe</h3>
        <p className="text-slate-500">Premium Member</p>
      </div>

      <Form layout="vertical" initialValues={{ name: 'John Doe', email: 'john.doe@example.com', phone: '+886 912 345 678' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Form.Item label="真實姓名" name="name">
            <Input prefix={<UserOutlined className="text-slate-400" />} placeholder="您的姓名" />
          </Form.Item>
          <Form.Item label="電子郵件" name="email">
            <Input prefix={<MailOutlined className="text-slate-400" />} placeholder="email@example.com" />
          </Form.Item>
          <Form.Item label="手機號碼" name="phone">
            <Input prefix={<PhoneOutlined className="text-slate-400" />} placeholder="+886" />
          </Form.Item>
          <Form.Item label="二階段驗證">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <SafetyCertificateOutlined /> 已啟用
            </div>
          </Form.Item>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" className="bg-indigo-600" onClick={() => message.success('個人資訊已儲存')}>儲存變更</Button>
        </div>
      </Form>
    </div>
  );

  const settingsContent = (
    <div className="py-4">
      <Form layout="vertical">
        <div className="space-y-6">
          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BgColorsOutlined className="text-amber-500" /> 外觀與通知
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>深色模式</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>價格預警通知</span>
                <Switch defaultChecked />
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <GlobalOutlined className="text-blue-500" /> 語言與地區
            </h4>
            <Form.Item label="介面語言">
              <Select defaultValue="zh_TW">
                <Select.Option value="zh_TW">繁體中文 (台灣)</Select.Option>
                <Select.Option value="en_US">English (US)</Select.Option>
              </Select>
            </Form.Item>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LockOutlined className="text-rose-500" /> 安全性
            </h4>
            <Button block icon={<LockOutlined />}>修改密碼</Button>
          </section>
        </div>
        <div className="flex justify-end mt-8">
          <Button type="primary" className="bg-indigo-600" onClick={() => message.success('設定已套用')}>套用所有設定</Button>
        </div>
      </Form>
    </div>
  );

  const items = [
    { key: 'profile', label: <span><UserOutlined /> 個人資訊</span>, children: profileContent },
    { key: 'settings', label: <span><SettingsIcon size={14} className="inline mr-1" /> 偏好設定</span>, children: settingsContent },
  ];

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      className="user-settings-modal"
    >
      <div className="p-2">
        <Tabs 
          activeKey={activeTab} 
          onChange={(key) => setActiveTab(key as TabKey)} 
          items={items}
          className="custom-tabs"
        />
        
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <Button type="text" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            登出帳號
          </Button>
          <span className="text-xs text-slate-400">v1.0.42 Quant Analysis</span>
        </div>
      </div>
    </Modal>
  );
};
