from app.repositories.stock_repository import IndustryRepository, StockRepository
from app.schemas.stock_schema import IndustryCreate, StockCreate
from typing import List

class IndustryService:
    def __init__(self, repo: IndustryRepository):
        self.repo = repo

    def fetch_all(self):
        return self.repo.fetch()

    def create_industry(self, industry_in: IndustryCreate):
        return self.repo.store(industry_in)

class StockService:
    def __init__(self, repo: StockRepository):
        self.repo = repo

    def fetch_all(self):
        return self.repo.fetch()

    def get_by_symbol(self, symbol: str):
        return self.repo.get_by_symbol(symbol)

    def create_stock(self, stock_in: StockCreate):
        return self.repo.store(stock_in)
