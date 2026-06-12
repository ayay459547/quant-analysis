from sqlalchemy.orm import Session
from app.database.models import Stock, DailyQuote, StockSnapshot

def get_stock_list(db: Session):
    """
    取得所有股票清單
    """
    return db.query(Stock).all()

def get_stock_prices(db: Session, symbol: str, limit: int = 100):
    """
    取得特定股票的歷史價格
    """
    return db.query(DailyQuote).filter(DailyQuote.symbol == symbol).order_by(DailyQuote.trade_date.desc()).limit(limit).all()

def get_analysis_results(db: Session, symbol: str):
    """
    取得特定股票的分析結果
    """
    return db.query(StockSnapshot).filter(StockSnapshot.symbol == symbol).first()
