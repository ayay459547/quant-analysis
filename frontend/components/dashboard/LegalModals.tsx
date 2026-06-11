'use client';

import React from 'react';
import { Modal } from '@/components/common/ui';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<LegalModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-sky-600">
          <ShieldCheck size={20} />
          <span>隱私權政策</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <button
          key="close"
          onClick={onClose}
          className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors font-medium"
        >
          我已閱讀並了解
        </button>
      ]}
      width={600}
      centered
    >
      <div className="space-y-4 text-slate-600 py-2 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        <section>
          <h4 className="font-bold text-slate-900 mb-2">1. 資料蒐集與用途</h4>
          <p>我們僅會蒐集為提供量化分析服務所必需的資訊。這包括但不限於：您的帳號設定、偏好之自定義指標、以及追蹤清單。這些資料旨在個人化您的分析體驗。</p>
        </section>
        
        <section>
          <h4 className="font-bold text-slate-900 mb-2">2. 數據安全</h4>
          <p>我們採用業界標準的加密技術來保護您的數據。所有的分析計算與個人設定均在加密通道中進行。我們承諾絕不主動將您的個人數據揭露、出售或轉讓給第三方。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">3. Cookie 使用</h4>
          <p>本平台使用 Cookie 技術來維持您的登錄狀態及記錄介面設置。您可以透過瀏覽器設定拒絕 Cookie，但這可能導致平台部分功能無法正常運作。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">4. 第三方分析工具</h4>
          <p>我們可能使用如 Google Analytics 等第三方服務來分析流量，以優化產品體驗。這些工具蒐集的數據為去識別化之統計資訊。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">5. 政策修訂</h4>
          <p>我們保留隨時修訂本政策的權利。重大變更將透過平台內通知告知。繼續使用本服務即表示您同意修訂後的條款。</p>
        </section>
      </div>
    </Modal>
  );
};

export const TermsModal: React.FC<LegalModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-sky-600">
          <FileText size={20} />
          <span>服務條款</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <button
          key="close"
          onClick={onClose}
          className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors font-medium"
        >
          同意並關閉
        </button>
      ]}
      width={600}
      centered
    >
      <div className="space-y-4 text-slate-600 py-2 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl mb-4 flex items-start gap-3">
          <CheckCircle2 size={20} className="text-sky-600 shrink-0 mt-0.5" />
          <p className="text-sm text-sky-800">歡迎使用 Quant Analysis。使用本平台即表示您同意以下條款。</p>
        </div>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">1. 投資風險聲明</h4>
          <p className="text-red-600 font-medium">注意：本平台提供之量化數據、回測結果及 AI 分析僅供參考，不構成任何投資建議。投資必定有風險，過往績效不代表未來表現。用戶應獨立思考並自負盈虧。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">2. 帳戶使用規範</h4>
          <p>用戶需妥善保管帳號密碼。嚴禁將帳號借予他人使用或進行任何形式的商業轉售。若發現異常登入或安全性漏洞，請立即通知本平台。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">3. 智慧財產權</h4>
          <p>平台內所有量化模型、介面設計、原創內容及商標均屬本公司財產。未經書面許可，禁止任何抓取 (Scraping)、重製或散佈行為。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">4. 服務中斷與限制</h4>
          <p>為維護系統穩定，我們可能會進行例行性維護。此外，若因交易所 API 異動或網路故障導致數據延遲或不正確，本平台不承擔相應損失之賠償責任。</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2">5. 條款終止</h4>
          <p>若用戶違反上述規定，我們有權在不經通知的情況下暫停或終止該用戶之服務權限。</p>
        </section>
      </div>
    </Modal>
  );
};
