-- 企業級量化系統基礎架構資料庫設計

-- 1. 產業表 (Industries)
CREATE TABLE IF NOT EXISTS industries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50), -- 例如：電子、金融、傳產
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. 個股基本資料表 (Stocks)
CREATE TABLE IF NOT EXISTS stocks (
    symbol VARCHAR(20) PRIMARY KEY, -- 股號，例如: 2330
    name VARCHAR(100) NOT NULL,
    industry_id INTEGER REFERENCES industries(id),
    market_type VARCHAR(20), -- TSE, OTC
    listing_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. 歷史日股價表 (Daily Quotes)
-- 對於大型系統，建議根據 trade_date 進行 Partitioning (分區)
CREATE TABLE IF NOT EXISTS daily_quotes (
    symbol VARCHAR(20) NOT NULL REFERENCES stocks(symbol),
    trade_date DATE NOT NULL,
    open_price DECIMAL(10, 2),
    high_price DECIMAL(10, 2),
    low_price DECIMAL(10, 2),
    close_price DECIMAL(10, 2),
    volume BIGINT,
    amount DECIMAL(18, 2), -- 成交金額
    adj_close_price DECIMAL(10, 2), -- 內容包含除權息調整
    PRIMARY KEY (symbol, trade_date)
);

-- 4. 個股最新快照/即時資料表 (Stock Snapshots)
-- 儲存最新的盤中或盤後統計資訊，避免頻繁查詢歷史表
CREATE TABLE IF NOT EXISTS stock_snapshots (
    symbol VARCHAR(20) PRIMARY KEY REFERENCES stocks(symbol),
    last_price DECIMAL(10, 2),
    change_value DECIMAL(10, 2),
    change_percent DECIMAL(5, 2),
    open_price DECIMAL(10, 2),
    high_price DECIMAL(10, 2),
    low_price DECIMAL(10, 2),
    volume BIGINT,
    trade_time TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. 技術指標分析表 (Analytics Indicators)
CREATE TABLE IF NOT EXISTS technical_indicators (
    symbol VARCHAR(20) NOT NULL REFERENCES stocks(symbol),
    trade_date DATE NOT NULL,
    ma_5 DECIMAL(10, 2),
    ma_20 DECIMAL(10, 2),
    ma_60 DECIMAL(10, 2),
    rsi_14 DECIMAL(5, 2),
    k_value DECIMAL(5, 2),
    d_value DECIMAL(5, 2),
    macd_diff DECIMAL(10, 2),
    macd_signal DECIMAL(10, 2),
    macd_hist DECIMAL(10, 2),
    PRIMARY KEY (symbol, trade_date)
);

-- 索引優化
CREATE INDEX idx_daily_quotes_date ON daily_quotes(trade_date);
CREATE INDEX idx_stocks_industry ON stocks(industry_id);
