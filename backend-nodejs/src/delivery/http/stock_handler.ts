import { Request, Response } from 'express';
import { StockUsecase } from '../../usecase/stock_usecase.js';

export class StockHandler {
  constructor(private usecase: StockUsecase) {}

  async fetchIndustries(req: Request, res: Response) {
    try {
      const data = await this.usecase.fetchIndustries();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async storeIndustry(req: Request, res: Response) {
    try {
      const data = await this.usecase.storeIndustry(req.body);
      res.status(201).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async fetchStocks(req: Request, res: Response) {
    try {
      const data = await this.usecase.fetchStocks();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getStockBySymbol(req: Request, res: Response) {
    try {
      const symbol = req.params.symbol as string;
      const data = await this.usecase.getStockBySymbol(symbol);
      if (!data) return res.status(404).json({ error: 'Stock not found' });
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async storeStock(req: Request, res: Response) {
    try {
      const data = await this.usecase.storeStock(req.body);
      res.status(201).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
