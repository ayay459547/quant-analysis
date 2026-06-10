import pandas as pd
from app.database.connection import SessionLocal, engine, Base
from app.database.models import StockInfo, StockPrice, AssetAnalysis
from app.crawlers.stock_crawler import fetch_stock_data, save_stock_prices, update_stock_info
from app.analytics.indicators import calculate_ma, calculate_rsi, generate_signals

# 確保資料表已建立 (簡單處理)
Base.metadata.create_all(bind=engine)

def run():
    db = SessionLocal()
    try:
        # 設定要抓取的股票代號 (範例)
        symbols = ["AAPL", "GOOGL", "TSLA", "2330.TW"]
        
        for symbol in symbols:
            print(f"正在抓取 {symbol}...")
            
            # 1. 更新股票基本資訊
            stock = update_stock_info(db, symbol)
            
            # 2. 抓取股價資料
            df = fetch_stock_data(symbol, period="1y") # 抓一年份
            
            # 3. 儲存股價資料
            save_stock_prices(db, stock.id, df)
            
            # 4. 計算指標
            df['ma5'] = calculate_ma(df, 5)
            df['ma20'] = calculate_ma(df, 20)
            df['rsi'] = calculate_rsi(df, 14)
            df = generate_signals(df)
            
            # 5. 儲存分析結果 (只存最近的或更新)
            # 為了簡化，這裡遍歷最後 30 筆
            recent_df = df.tail(30)
            for index, row in recent_df.iterrows():
                if pd.isna(row['ma5']) or pd.isna(row['ma20']) or pd.isna(row['rsi']):
                    continue
                    
                date_val = index.date()
                existing_analysis = db.query(AssetAnalysis).filter(
                    AssetAnalysis.stock_id == stock.id,
                    AssetAnalysis.date == date_val
                ).first()
                
                if not existing_analysis:
                    new_analysis = AssetAnalysis(
                        stock_id=stock.id,
                        date=date_val,
                        ma5=row['ma5'],
                        ma20=row['ma20'],
                        rsi=row['rsi'],
                        signal=row['signal']
                    )
                    db.add(new_analysis)
                else:
                    existing_analysis.ma5 = row['ma5']
                    existing_analysis.ma20 = row['ma20']
                    existing_analysis.rsi = row['rsi']
                    existing_analysis.signal = row['signal']
            
            db.commit()
            print(f"{symbol} 抓取並分析完成")
            
    finally:
        db.close()

if __name__ == "__main__":
    run()
