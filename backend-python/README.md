# Quant Backend - Python

這是一個基於 FastAPI 與 SQLAlchemy 實作的量化分析後端服務。

## 技術棧 (Tech Stack)
- **語言**: Python 3.12+
- **框架**: FastAPI (Web), SQLAlchemy (ORM), Pydantic (Validation)
- **資料庫**: PostgreSQL

## 快速啟動 (Quick Start)

### 1. 使用 Docker (推薦)
在專案根目錄執行：
```bash
docker-compose up backend-python
```

### 2. 本地開發 (Local Development)
確保已啟動 PostgreSQL 資料庫。建議使用虛擬環境 (venv)。
```bash
# 安裝依賴
pip install -r requirements.txt

# 啟動 API
uvicorn app.main_api:app --reload --port 8000
```

## 開發常用指令 (Developer Commands)

### 相依性管理
- **安裝套件**: `pip install [package_name]`
- **更新 requirements**: `pip freeze > requirements.txt`

### 品質檢查與測試
- **靜態檢查**: `mypy .`
- **執行測試**: `pytest`
- **格式化程式碼**: `black .`

## API 端點 (Endpoints)
- `GET /hello`: 服務連線測試
- `GET /industries`: 取得產業列表
- `POST /industries`: 新增產業
- `GET /stocks`: 取得個股清單
- `GET /stocks/{symbol}`: 取得特定個股資料
- `POST /stocks`: 新增個股
