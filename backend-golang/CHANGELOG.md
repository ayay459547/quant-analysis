# 開發紀錄 - Go 後端 (Backend Golang)

本專案 Go 後端的所有重大變更都將紀錄於此。

## [0.1.0] - 2026-06-12

### 新增項目
- **導入乾淨架構 (Clean Architecture)**：將專案劃分為 `domain` (領域層)、`usecase` (業務邏輯層)、`repository` (資料存取層) 以及 `delivery/http` (接口層)。
- **基礎設施整合**：
  - 使用 GORM 實作 PostgreSQL 資料庫連線。
  - 透過 `godotenv` 支援環境變數設定。
- **核心功能 (CRUD) 實作**：
  - **產業管理 (Industries)**：實作 `GET /industries` 與 `POST /industries`。
  - **個股管理 (Stocks)**：實作 `GET /stocks`、`POST /stocks` 以及 `GET /stocks/:symbol`。
- **工具與測試**：
  - 新增 `GET /hello` 測試端點，用於確認連線狀態。
- **Docker 支援**：配置 `Dockerfile` 以支援容器化佈署。
- **依賴管理**：初始化 `go.mod` 並安裝必要套件 (`gin`, `gorm`, `pgx`)。
