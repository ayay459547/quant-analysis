# 量化分析系統測試與啟動說明

本專案是一個包含三種後端（Go, Python, Node.js）的企業級架構。我們提供了多個專屬腳本，讓您可以單獨啟動特定開發環境。

## 1. 啟動方式 (Windows Batch 腳本)

在專案根目錄下，您可以使用以下腳本啟動各個服務（每個腳本都會自動檢查並啟動資料庫等基礎設施）：

- **`start_infra.bat`**: 僅啟動基礎設施（PostgreSQL, Redis, RabbitMQ）。
- **`start_golang.bat`**: 啟動基礎設施 + Go 後端。
- **`start_python.bat`**: 啟動基礎設施 + Python 後端。
- **`start_nodejs.bat`**: 啟動基礎設施 + Node.js 後端。
- **`start_frontend.bat`**: 啟動前端 Next.js 應用程式。
- **`start_all.bat`**: 一鍵啟動完整系統（所有後端 + 前端）。

---

## 2. 服務存取資訊

啟動後，各服務的存取地址為：

### 應用程式
- **前端 (Next.js)**: `http://localhost:3000`
- **Go 後端**: `http://localhost:8080`
- **Python 後端**: `http://localhost:8000`
- **Node.js 後端**: `http://localhost:3001`

### 基礎設施管理
- **RabbitMQ 管理介面**: `http://localhost:15672` (帳密: `user` / `password`)
- **PostgreSQL**: `localhost:5432`

---

## 3. 測試 API 說明

您可以使用瀏覽器或 `Postman` / `cURL` 測試以下端點：

### A. 基礎連線測試 (GET)
- **Go**: `http://localhost:8080/hello`
- **Python**: `http://localhost:8000/hello`
- **Node.js**: `http://localhost:3001/hello`

### B. 核心業務邏輯 (已在三後端同步實作)
- **取得產業列表**: `GET /industries`
- **新增產業**: `POST /industries`
- **取得所有股票**: `GET /stocks`
- **取得特定股票**: `GET /stocks/{symbol}`
- **新增股票**: `POST /stocks`

---

## 4. 故障排除

- **Log 檢視**: 每個啟動腳本都會開啟獨立視窗，您可以在該視窗查看即時錯誤訊息。
- **Port 衝突**: 請檢查 `5432`, `6379`, `5672`, `8080`, `8000`, `3001`, `3000` 是否被佔用。
- **重新建置**: 如果程式碼有更動，可以使用 `docker-compose build [服務名稱]` 重新編譯。
