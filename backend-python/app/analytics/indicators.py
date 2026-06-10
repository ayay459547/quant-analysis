import pandas as pd

def calculate_ma(df: pd.DataFrame, window: int):
    """
    計算移動平均線 (MA)
    """
    return df['Close'].rolling(window=window).mean()

def calculate_rsi(df: pd.DataFrame, window: int = 14):
    """
    計算相對強弱指標 (RSI)
    """
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def generate_signals(df: pd.DataFrame):
    """
    根據指標生成買賣訊號 (簡單範例)
    """
    # 範例：MA5 > MA20 且 RSI < 70 視為 buy
    df['signal'] = 'hold'
    df.loc[(df['ma5'] > df['ma20']) & (df['rsi'] < 70), 'signal'] = 'buy'
    df.loc[(df['ma5'] < df['ma20']) | (df['rsi'] > 80), 'signal'] = 'sell'
    return df
