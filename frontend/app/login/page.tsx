'use client';

import React from 'react';
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { App } from 'antd';
import { Form, Input, Button, Checkbox } from '@/components/common/ui';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';

interface LoginValues {
  email?: string;
  password?: string;
  remember?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const { message } = App.useApp();

  const onFinish = (values: LoginValues) => {
    console.log('Login values:', values);
    message.success('登入成功');
    // 模擬登入，跳轉至首頁
    router.push('/tw_stock/news');
  };

  const handleSocialLogin = (provider: string) => {
    message.loading(`正在導向至 ${provider} 登入...`, 0.8).then(() => {
      message.success(`${provider} 登入成功 (模擬)`);
      router.push('/tw_stock/news');
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100 mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Quant Analysis</h1>
          <p className="text-slate-500 text-sm mt-2">量化分析交易平台</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">歡迎回來</h2>
          
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            className="space-y-4"
          >
            <Form.Item
              label="電子郵件"
              name="email"
              rules={[{ required: true, message: '請輸入電子郵件' }, { type: 'email', message: '格式不正確' }]}
            >
              <Input 
                prefix={<Mail className="text-slate-400" size={18} />} 
                placeholder="your@email.com"
                className="rounded-xl py-2.5"
              />
            </Form.Item>

            <Form.Item
              label="密碼"
              name="password"
              rules={[{ required: true, message: '請輸入密碼' }]}
            >
              <Input.Password 
                prefix={<Lock className="text-slate-400" size={18} />} 
                placeholder="••••••••"
                className="rounded-xl py-2.5"
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-slate-600">記住我</Checkbox>
              </Form.Item>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">忘記密碼？</a>
            </div>

            <Form.Item className="mt-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="h-12 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold shadow-md shadow-indigo-100 flex items-center justify-center gap-2 group border-none"
              >
                登入系統 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative bg-white px-4 text-xs text-slate-400 uppercase tracking-wider">或者透過以下方式登入</span>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <Button 
              block 
              size="large" 
              icon={<GoogleOutlined />} 
              onClick={() => handleSocialLogin('Google')}
              className="rounded-xl border-slate-200 hover:border-indigo-500 hover:text-indigo-600 h-11 flex items-center justify-center font-medium"
            >
              使用 Google 帳號登入
            </Button>
            <Button 
              block 
              size="large" 
              icon={<GithubOutlined />} 
              onClick={() => handleSocialLogin('GitHub')}
              className="rounded-xl border-slate-200 hover:border-indigo-500 hover:text-indigo-600 h-11 flex items-center justify-center font-medium"
            >
              使用 GitHub 帳號登入
            </Button>
            <Button 
              block 
              size="large" 
              onClick={() => handleSocialLogin('LINE')}
              className="rounded-xl border-slate-200 hover:border-[#00b900] hover:text-[#00b900] h-11 flex items-center justify-center font-medium gap-2"
            >
              <span className="w-5 h-5 bg-[#00b900] text-white flex items-center justify-center rounded text-[10px] font-bold">LINE</span>
              使用 LINE 帳號登入
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              還沒有帳號？ <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">立即註冊</a>
            </p>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-xs mt-8">
          © 2026 Quant Analysis. All rights reserved.
        </p>
      </div>
    </div>
  );
}
