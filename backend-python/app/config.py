# 讀取環境變數的設定檔
import os
from dotenv import load_dotenv

# 載入根目錄下的 .env 檔案
load_dotenv()

class Config:
    # 資料庫連線設定
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
    DB_NAME = os.getenv("DB_NAME", "quant_db")
    
    # 組合出 SQLAlchemy 需要的連線字串
    DATABASE_URL = os.getenv("DATABASE_URL", f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")

config = Config()
