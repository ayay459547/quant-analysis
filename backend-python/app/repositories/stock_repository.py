from sqlalchemy.orm import Session
from app.database.models import Industry, Stock
from app.schemas.stock_schema import IndustryCreate, StockCreate
from typing import List, Optional

class IndustryRepository:
    def __init__(self, db: Session):
        self.db = db

    def fetch(self) -> List[Industry]:
        return self.db.query(Industry).all()

    def get_by_id(self, id: int) -> Optional[Industry]:
        return self.db.query(Industry).filter(Industry.id == id).first()

    def store(self, industry_in: IndustryCreate) -> Industry:
        db_obj = Industry(**industry_in.dict())
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

class StockRepository:
    def __init__(self, db: Session):
        self.db = db

    def fetch(self) -> List[Stock]:
        return self.db.query(Stock).all()

    def get_by_symbol(self, symbol: str) -> Optional[Stock]:
        return self.db.query(Stock).filter(Stock.symbol == symbol).first()

    def store(self, stock_in: StockCreate) -> Stock:
        db_obj = Stock(**stock_in.dict())
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj
