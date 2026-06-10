import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database.models import StockInfo, StockPrice

def fetch_stock_data(symbol: str, period: str = "1mo", interval: str = "1d"):
    """
    使用 yfinance 抓取股票資料
    """
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period, interval=interval)
    return df

def save_stock_prices(db: Session, stock_id: int, df: pd.DataFrame):
    """
    將 DataFrame 資料存入資料庫
    """
    for index, row in df.iterrows():
        # 檢查是否已存在
        date_val = index.date()
        existing_price = db.query(StockPrice).filter(
            StockPrice.stock_id == stock_id,
            StockPrice.date == date_val
        ).first()
        
        if not existing_price:
            new_price = StockPrice(
                stock_id=stock_id,
                date=date_val,
                open=row['Open'],
                high=row['High'],
                low=row['Low'],
                close=row['Close'],
                volume=row['Volume']
            )
            db.add(new_price)
    db.commit()

def update_stock_info(db: Session, symbol: str):
    """
    更新或建立股票基本資訊
    """
    ticker = yf.Ticker(symbol)
    info = ticker.info
    
    stock = db.query(StockInfo).filter(StockInfo.symbol == symbol).first()
    if not stock:
        stock = StockInfo(
            symbol=symbol,
            name=info.get('longName'),
            industry=info.get('industry'),
            market=info.get('market')
        )
        db.add(stock)
        db.commit()
        db.refresh(stock)
    return stock
