# 開發紀錄 - 前端 (Frontend)

本專案前端的所有重大變更都將紀錄於此。

## [0.1.0] - 2026-06-12

### 新增項目
- **專案基礎建設**：
  - 基於 **Next.js 16** (App Router) 與 **TypeScript** 建立專案。
  - 整合 **Tailwind CSS 4** 與 **PostCSS** 進行樣式管理。
  - 配置 **ESLint** 與 **Prettier** 維護程式碼品質。
- **UI 框架與組件**：
  - 整合 **Ant Design (antd)** 作為主要 UI 組件庫。
  - 實作自定義 UI 組件（Button, Input, Select, Tabs, Modal, Switch 等）。
  - 建立 **KLineChart** 組件，預留 K 線圖開發空間。
- **頁面佈局與路由**：
  - 實作登入頁面 (`/login`)。
  - 實作儀表板佈局 (`(dashboard)`) 與台股資訊頁面。
  - 建立動態股票路徑 `/tw_stock/[symbol]`，包含回測、籌碼、財務、技術指標等子頁面佔位。
- **儀表板功能組件**：
  - **產業卡片 (IndustryCard)**：展示各產業漲跌狀態。
  - **股票清單 (StockList)**：展示追蹤清單。
  - **搜尋列 (SearchBar)**：支援股票代碼搜尋。
  - **市場切換 (MarketSwitcher)**：支援不同市場間切換。
  - **通知與設定 (NotificationModal, UserSettingsModal)**：實作使用者介面。
- **狀態管理與資料流**：
  - 建立 **StockContext** 管理全局股票狀態。
  - 整合 **Axios** 實作資料 API 請求基礎。
  - 導入 **nprogress** 提升頁面切換時的使用者體驗。
- **Docker 支援**：配置前端專屬 `Dockerfile` 並整合至 `docker-compose.yml`。
