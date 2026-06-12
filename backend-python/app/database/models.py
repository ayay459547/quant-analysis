from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base

class Industry(Base):
    __tablename__ = "industries"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    category = Column(String(50), nullable=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    stocks = relationship("Stock", back_populates="industry")

class Stock(Base):
    __tablename__ = "stocks"
    
    symbol = Column(String(20), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    industry_id = Column(Integer, ForeignKey("industries.id"), nullable=True)
    market_type = Column(String(20), nullable=True)
    listing_date = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    industry = relationship("Industry", back_populates="stocks")
    prices = relationship("DailyQuote", back_populates="stock")
    snapshot = relationship("StockSnapshot", back_populates="stock", uselist=False)

class DailyQuote(Base):
    __tablename__ = "daily_quotes"
    
    symbol = Column(String(20), ForeignKey("stocks.symbol"), primary_key=True)
    trade_date = Column(Date, primary_key=True, index=True)
    open_price = Column(Float)
    high_price = Column(Float)
    low_price = Column(Float)
    close_price = Column(Float)
    volume = Column(Integer)
    amount = Column(Float)
    adj_close_price = Column(Float)
    
    stock = relationship("Stock", back_populates="prices")

class StockSnapshot(Base):
    __tablename__ = "stock_snapshots"
    
    symbol = Column(String(20), ForeignKey("stocks.symbol"), primary_key=True)
    last_price = Column(Float)
    change_value = Column(Float)
    change_percent = Column(Float)
    open_price = Column(Float)
    high_price = Column(Float)
    low_price = Column(Float)
    volume = Column(Integer)
    trade_time = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    stock = relationship("Stock", back_populates="snapshot")
