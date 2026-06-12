from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.stock_schema import Industry, IndustryCreate, Stock, StockCreate
from app.repositories.stock_repository import IndustryRepository, StockRepository
from app.services.stock_service_v2 import IndustryService, StockService

router = APIRouter()

# Industry Endpoints
@router.get("/industries", response_model=List[Industry])
def list_industries(db: Session = Depends(get_db)):
    repo = IndustryRepository(db)
    service = IndustryService(repo)
    return service.fetch_all()

@router.post("/industries", response_model=Industry)
def create_industry(industry_in: IndustryCreate, db: Session = Depends(get_db)):
    repo = IndustryRepository(db)
    service = IndustryService(repo)
    return service.create_industry(industry_in)

# Stock Endpoints
@router.get("/stocks", response_model=List[Stock])
def list_stocks(db: Session = Depends(get_db)):
    repo = StockRepository(db)
    service = StockService(repo)
    return service.fetch_all()

@router.get("/stocks/{symbol}", response_model=Stock)
def get_stock(symbol: str, db: Session = Depends(get_db)):
    repo = StockRepository(db)
    service = StockService(repo)
    stock = service.get_by_symbol(symbol)
    if not stock:
        raise HTTPException(status_code=404, detail="Stock not found")
    return stock

@router.post("/stocks", response_model=Stock)
def create_stock(stock_in: StockCreate, db: Session = Depends(get_db)):
    repo = StockRepository(db)
    service = StockService(repo)
    return service.create_stock(stock_in)
