import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './src/repository/db.js';
import { PostgresRepository } from './src/repository/postgres_repository.js';
import { StockUsecase } from './src/usecase/stock_usecase.js';
import { StockHandler } from './src/delivery/http/stock_handler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Layers
const repo = new PostgresRepository(pool);
const usecase = new StockUsecase(repo);
const handler = new StockHandler(usecase);

// Routes
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js' });
});

app.get('/industries', (req, res) => handler.fetchIndustries(req, res));
app.post('/industries', (req, res) => handler.storeIndustry(req, res));
app.get('/stocks', (req, res) => handler.fetchStocks(req, res));
app.get('/stocks/:symbol', (req, res) => handler.getStockBySymbol(req, res));
app.post('/stocks', (req, res) => handler.storeStock(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
