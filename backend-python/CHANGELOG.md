# 開發紀錄 - Python 後端 (Backend Python)

本專案 Python 後端的所有重大變更都將紀錄於此。

## [0.1.0] - 2026-06-12

### 新增項目
- **導入 FastAPI 乾淨架構**：將應用程式結構化為 `api` (介面層)、`services` (服務層)、`repositories` (儲存庫層)、`models` (模型層) 與 `schemas` (數據架構層)。
- **基礎設施整合**：
  - 使用 SQLAlchemy 實作 PostgreSQL 資料庫整合。
  - 使用 Pydantic 模型進行請求驗證與回應序列化。
- **核心功能 (CRUD) 實作**：
  - **產業管理 (Industries)**：實作 `GET /industries` 與 `POST /industries`。
  - **個股管理 (Stocks)**：實作 `GET /stocks`、`POST /stocks` 以及 `GET /stocks/{symbol}`。
- **工具與測試**：
  - 新增 `GET /hello` 測試端點。
- **Docker 支援**：更新 `Dockerfile` 與環境變數配置。
- **資料模型定義**：定義 `Industry` (產業)、`Stock` (個股)、`DailyQuote` (日股價) 與 `StockSnapshot` (即時快照) 的 SQLAlchemy 模型。
