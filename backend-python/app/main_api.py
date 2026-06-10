from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services import data_service

app = FastAPI(title="Quant Analysis API")

@app.get("/")
def read_root():
    return {"message": "Welcome to Quant Analysis API"}

@app.get("/stocks")
def list_stocks(db: Session = Depends(get_db)):
    """
    列出所有追蹤的股票
    """
    return data_service.get_stock_list(db)

@app.get("/stocks/{symbol}/prices")
def get_prices(symbol: str, limit: int = 100, db: Session = Depends(get_db)):
    """
    取得股票價格
    """
    prices = data_service.get_stock_prices(db, symbol, limit)
    if not prices:
        raise HTTPException(status_code=404, detail="Stock not found or no data")
    return prices

@app.get("/stocks/{symbol}/analysis")
def get_analysis(symbol: str, db: Session = Depends(get_db)):
    """
    取得分析結果
    """
    analysis = data_service.get_analysis_results(db, symbol)
    if not analysis:
        raise HTTPException(status_code=404, detail="Stock not found or no analysis data")
    return analysis
