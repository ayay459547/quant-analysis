from sqlalchemy.orm import Session
from app.database.models import StockInfo, StockPrice, AssetAnalysis

def get_stock_list(db: Session):
    """
    取得所有股票清單
    """
    return db.query(StockInfo).all()

def get_stock_prices(db: Session, symbol: str, limit: int = 100):
    """
    取得特定股票的歷史價格
    """
    stock = db.query(StockInfo).filter(StockInfo.symbol == symbol).first()
    if not stock:
        return []
    
    return db.query(StockPrice).filter(StockPrice.stock_id == stock.id).order_by(StockPrice.date.desc()).limit(limit).all()

def get_analysis_results(db: Session, symbol: str):
    """
    取得特定股票的分析結果
    """
    stock = db.query(StockInfo).filter(StockInfo.symbol == symbol).first()
    if not stock:
        return []
    
    return db.query(AssetAnalysis).filter(AssetAnalysis.stock_id == stock.id).order_by(AssetAnalysis.date.desc()).limit(30).all()
