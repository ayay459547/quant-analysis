# 開發紀錄 - Node.js 後端 (Backend Node.js)

本專案 Node.js 後端的所有重大變更都將紀錄於此。

## [0.1.0] - 2026-06-12

### 新增項目
- **專案初始化**：從零開始建立支援 TypeScript (ESM) 的 Node.js 專案。
- **導入乾淨架構**：建立 `src/domain`, `src/usecase`, `src/repository`, 與 `src/delivery` 的目錄結構。
- **基礎設施整合**：
  - 使用 `pg` (Pool) 實作 PostgreSQL 資料庫連線。
  - 配置 `tsconfig.json` 與 `package.json` 以支援 ESM 模組系統與 `ts-node/esm` 執行環境。
- **核心功能 (CRUD) 實作**：
  - **產業管理 (Industries)**：實作 `GET /industries` 與 `POST /industries`。
  - **個股管理 (Stocks)**：實作 `GET /stocks`、`POST /stocks` 以及 `GET /stocks/:symbol`。
- **工具與測試**：
  - 新增 `GET /hello` 測試端點。
- **Docker 支援**：建立 `Dockerfile` 並在 `docker-compose.yml` 中完成配置。
- **開發體驗優化**：新增 `nodemon` 自動重啟功能，並透過 `tsc` 進行靜態型別檢查。
