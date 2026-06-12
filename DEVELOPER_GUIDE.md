# 後端開發指令指南 (Developer Guide)

本文件整理了三個後端（Go, Python, Node.js）在開發過程中常用的指令，包含本地啟動、套件管理、型別檢查與測試。

---

## 1. Go 後端 (Backend Golang)
- **目錄**: `backend-golang`
- **框架**: Gin, GORM

### 啟動與執行
- **本地啟動**: `go run main.go`
- **編譯專案**: `go build -o main.exe main.go`

### 相依性管理
- **下載套件**: `go get [package_name]` (例如: `go get github.com/gin-gonic/gin`)
- **整理依賴**: `go mod tidy` (移除未使用的套件並補齊缺失的)

### 品質與測試
- **靜態檢查**: `go vet ./...`
- **執行測試**: `go test ./...`
- **格式化程式碼**: `go fmt ./...`

---

## 2. Python 後端 (Backend Python)
- **目錄**: `backend-python`
- **框架**: FastAPI, SQLAlchemy

### 啟動與執行
- **本地啟動 (Uvicorn)**: `uvicorn app.main_api:app --reload --port 8000`
- **檢查語法錯誤**: `python -m py_compile app/main_api.py`

### 相依性管理
- **安裝套件**: `pip install [package_name]`
- **更新 requirements**: `pip freeze > requirements.txt`
- **安裝所有依賴**: `pip install -r requirements.txt`

### 品質與測試
- **執行測試**: `pytest`
- **程式碼風格檢查**: `flake8` 或 `black .`
- **型別檢查**: `mypy .`

---

## 3. Node.js 後端 (Backend Node.js)
- **目錄**: `backend-nodejs`
- **框架**: Express, TypeScript

### 啟動與執行
- **開發模式 (自動重啟)**: `npm run dev`
- **正式啟動**: `npm start`
- **手動執行 TS**: `node --loader ts-node/esm index.ts`

### 相依性管理
- **安裝正式套件**: `npm install [package_name]`
- **安裝開發套件**: `npm install [package_name] --save-dev`
- **安裝型別定義**: `npm install @types/[package_name] --save-dev`

### 品質與測試
- **型別檢查 (TSC)**: `npx tsc --noEmit`
- **執行測試**: `npm test`
- **格式化程式碼**: `npx prettier --write .`

---

## 4. Docker 常用維護指令

如果您使用 Docker 進行開發，以下指令非常實用：

- **重新建置特定服務**:
  ```bash
  docker-compose build [backend-go|backend-python|backend-nodejs]
  ```
- **重啟服務並清除舊資料**:
  ```bash
  docker-compose up -d --build --force-recreate
  ```
- **檢視即時日誌**:
  ```bash
  docker-compose logs -f [服務名稱]
  ```
- **進入容器內部終端機**:
  ```bash
  docker exec -it [container_name] sh
  ```

---

## 5. 快速啟動建議流程
當您要開發 **特定後端** (例如 Go) 時：
1. 執行 `start_infra.bat` (啟動資料庫)。
2. 在 `backend-golang` 目錄下開啟終端機執行 `go run main.go`。
3. 這樣您就可以在本地即時看到程式碼變更的效果，而不需要每次都重新建置 Docker 鏡像。
