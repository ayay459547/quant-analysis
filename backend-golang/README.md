# Quant Backend - Golang

這是一個基於 Go 語言與 Clean Architecture 架構實作的量化分析後端服務。

## 技術棧 (Tech Stack)
- **語言**: Go 1.26+
- **框架**: Gin (Web), GORM (ORM)
- **資料庫**: PostgreSQL

## 快速啟動 (Quick Start)

### 1. 使用 Docker (推薦)
在專案根目錄執行：
```bash
docker-compose up backend-go
```

### 2. 本地開發 (Local Development)
確保已啟動 PostgreSQL 資料庫。
```bash
# 下載依賴
go mod tidy

# 執行程式
go run main.go
```

## 開發常用指令 (Developer Commands)

### 相依性管理
- **下載套件**: `go get [package_name]`
- **整理依賴**: `go mod tidy`

### 品質檢查與測試
- **靜態檢查**: `go vet ./...`
- **執行測試**: `go test ./...`
- **格式化程式碼**: `go fmt ./...`

## API 端點 (Endpoints)
- `GET /hello`: 服務連線測試
- `GET /industries`: 取得產業列表
- `POST /industries`: 新增產業
- `GET /stocks`: 取得個股清單
- `GET /stocks/:symbol`: 取得特定個股資料
- `POST /stocks`: 新增個股
