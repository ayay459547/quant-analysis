import { PostgresRepository } from '../repository/postgres_repository.js';
import { Industry, Stock } from '../domain/models.js';

export class StockUsecase {
  constructor(private repo: PostgresRepository) {}

  async fetchIndustries(): Promise<Industry[]> {
    return this.repo.fetchIndustries();
  }

  async storeIndustry(industry: Industry): Promise<Industry> {
    return this.repo.storeIndustry(industry);
  }

  async fetchStocks(): Promise<Stock[]> {
    return this.repo.fetchStocks();
  }

  async getStockBySymbol(symbol: string): Promise<Stock | null> {
    return this.repo.getStockBySymbol(symbol);
  }

  async storeStock(stock: Stock): Promise<Stock> {
    return this.repo.storeStock(stock);
  }
}
