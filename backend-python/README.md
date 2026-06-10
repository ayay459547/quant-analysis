# quant-python
Python

```bash
# 建立虛擬環境 - window
python -m venv venv
# 建立虛擬環境 - Mac/Linux
python3 -m venv venv

# 啟動 venv - window
venv\Scripts\activate
# 啟動 venv - Mac/Linux
source venv/bin/activate
```

```bash
# 生成套件清單
pip freeze > requirements.txt
# 安裝套件
pip install -r requirements.txt
```

```bash
# 啟動 API 服務
uvicorn app.main_api:app --reload --port 8001
```

```bash
# 執行數據抓取與分析 (爬蟲)
python -m app.run_crawler
```