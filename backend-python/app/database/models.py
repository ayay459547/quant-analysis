from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base

class StockInfo(Base):
    __tablename__ = "stock_info"
    
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    market = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 建立關聯
    prices = relationship("StockPrice", back_populates="stock")
    analysis = relationship("AssetAnalysis", back_populates="stock")

class StockPrice(Base):
    __tablename__ = "stock_prices"
    
    id = Column(Integer, primary_key=True, index=True)
    stock_id = Column(Integer, ForeignKey("stock_info.id"), nullable=False)
    date = Column(Date, index=True, nullable=False)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Integer)
    
    # 建立關聯
    stock = relationship("StockInfo", back_populates="prices")

class AssetAnalysis(Base):
    __tablename__ = "asset_analysis"
    
    id = Column(Integer, primary_key=True, index=True)
    stock_id = Column(Integer, ForeignKey("stock_info.id"), nullable=False)
    date = Column(Date, index=True, nullable=False)
    ma5 = Column(Float, nullable=True)
    ma20 = Column(Float, nullable=True)
    rsi = Column(Float, nullable=True)
    signal = Column(String, nullable=True) # 如: 'buy', 'sell', 'hold'
    
    # 建立關聯
    stock = relationship("StockInfo", back_populates="analysis")
