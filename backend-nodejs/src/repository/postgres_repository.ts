import { Pool } from 'pg';
import { Industry, Stock } from '../domain/models.js';

export class PostgresRepository {
  constructor(private pool: Pool) {}

  // Industry Methods
  async fetchIndustries(): Promise<Industry[]> {
    const res = await this.pool.query('SELECT * FROM industries');
    return res.rows;
  }

  async storeIndustry(industry: Industry): Promise<Industry> {
    const { name, category, description } = industry;
    const res = await this.pool.query(
      'INSERT INTO industries (name, category, description) VALUES ($1, $2, $3) RETURNING *',
      [name, category, description]
    );
    return res.rows[0];
  }

  // Stock Methods
  async fetchStocks(): Promise<Stock[]> {
    const res = await this.pool.query('SELECT * FROM stocks');
    return res.rows;
  }

  async getStockBySymbol(symbol: string): Promise<Stock | null> {
    const res = await this.pool.query('SELECT * FROM stocks WHERE symbol = $1', [symbol]);
    return res.rows[0] || null;
  }

  async storeStock(stock: Stock): Promise<Stock> {
    const { symbol, name, industry_id, market_type, listing_date } = stock;
    const res = await this.pool.query(
      'INSERT INTO stocks (symbol, name, industry_id, market_type, listing_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [symbol, name, industry_id, market_type, listing_date]
    );
    return res.rows[0];
  }
}
