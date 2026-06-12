from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class IndustryBase(BaseModel):
    name: str
    category: Optional[str] = None
    description: Optional[str] = None

class IndustryCreate(IndustryBase):
    pass

class Industry(IndustryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class StockBase(BaseModel):
    symbol: str
    name: str
    industry_id: Optional[int] = None
    market_type: Optional[str] = None
    listing_date: Optional[datetime] = None
    is_active: bool = True

class StockCreate(StockBase):
    pass

class Stock(StockBase):
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
