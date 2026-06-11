'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@/components/common/ui';
import { Bell, BellOff, CheckCheck, Clock, Info } from 'lucide-react';
import { dataService } from '@/lib/dataService';

interface Notification {
  id: string;
  type: string;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchNotifications = async () => {
        setLoading(true);
        try {
          const data = await dataService.getNotifications();
          setNotifications(data);
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    }
  }, [open]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-sky-600" />
          <span>通知訊息</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="read" onClick={markAllRead} icon={<CheckCheck size={16} />}>
          全部標記為已讀
        </Button>,
        <Button key="close" type="primary" className="bg-sky-600" onClick={onClose}>
          關閉
        </Button>
      ]}
      width={500}
    >
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="py-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-600/20 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p>載入中...</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3 py-2">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  n.isRead ? 'bg-white border-slate-100 opacity-60' : 'bg-sky-50/30 border-sky-100 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    {!n.isRead && <span className="w-2 h-2 bg-sky-500 rounded-full"></span>}
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={10} />
                    {n.time}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <BellOff size={48} className="mx-auto mb-4 opacity-20" />
            <p>目前沒有新通知</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
