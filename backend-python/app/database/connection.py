from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import config

# 建立資料庫引擎
engine = create_engine(config.DATABASE_URL, echo=False)

# 建立 Session 工廠
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 建立 ORM 基礎類別
Base = declarative_base()

# FastAPI 取得 DB Session 的依賴函數
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()