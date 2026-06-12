# Quant Backend - Node.js

這是一個基於 Express 與 TypeScript 實作的量化分析後端服務。

## 技術棧 (Tech Stack)
- **語言**: Node.js 20+ (TypeScript)
- **框架**: Express
- **資料庫**: PostgreSQL (pg pool)
- **模組系統**: ECMAScript Modules (ESM)

## 快速啟動 (Quick Start)

### 1. 使用 Docker (推薦)
在專案根目錄執行：
```bash
docker-compose up backend-nodejs
```

### 2. 本地開發 (Local Development)
確保已啟動 PostgreSQL 資料庫。
```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (自動重啟)
npm run dev
```

## 開發常用指令 (Developer Commands)

### 相依性管理
- **安裝正式套件**: `npm install [package_name]`
- **安裝開發套件**: `npm install [package_name] --save-dev`
- **安裝型別定義**: `npm install @types/[package_name] --save-dev`

### 品質檢查與測試
- **型別檢查 (TSC)**: `npx tsc --noEmit`
- **格式化程式碼**: `npx prettier --write .`

## API 端點 (Endpoints)
- `GET /hello`: 服務連線測試
- `GET /industries`: 取得產業列表
- `POST /industries`: 新增產業
- `GET /stocks`: 取得個股清單
- `GET /stocks/:symbol`: 取得特定個股資料
- `POST /stocks`: 新增個股
