import { ChartDataPoint } from '@/types';

// --- 模擬資料產生器 (徹底修復 Hydration 錯誤版本) ---
export const generateMockData = (days: number = 60, seedStr: string = "default"): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  
  // Determine base price based on asset name
  let currentPrice = 100;
  if (seedStr.includes('BTC')) currentPrice = 65000;
  else if (seedStr.includes('NVDA')) currentPrice = 145;
  else if (seedStr.includes('2330')) currentPrice = 1050;
  else if (seedStr.includes('台積電')) currentPrice = 1050;

  // 1. 使用 UTC 毫秒時間戳作為基準，徹底避免 Server (UTC) 與 Client (在地時區) 之間的時差問題
  // 5 代表 6月 (0-indexed)
  const nowTimestamp = Date.UTC(2026, 5, 9);

  // 2. 實作純整數運算的 LCG (線性同餘) 偽亂數產生器
  // 完全取代 Math.sin()，確保在任何 CPU 架構或作業系統上，浮點數軌跡 100% 相同
  let seed = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 123456789);
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let i = days; i >= 0; i--) {
    // 透過毫秒相減來推算過去日期，不受本地時區轉換干擾
    const date = new Date(nowTimestamp - i * 24 * 60 * 60 * 1000);

    const volatility = currentPrice * 0.03;
    const open = currentPrice + (random() - 0.5) * volatility;
    const high = open + random() * volatility;
    const low = open - random() * volatility;
    const close = low + random() * (high - low);

    currentPrice = close; // 下一天的基準

    // 3. 使用 getUTCMonth / getUTCDate 取代原來的 getDate()
    const monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getUTCMonth()];

    data.push({
      date: `${monthStr} ${date.getUTCDate()}`,
      open, high, low, close,
      ma20: 0 // 稍後計算
    });
  }

  // 計算 MA20
  for(let i = 0; i < data.length; i++) {
    if(i >= 19) {
      let sum = 0;
      for(let j = 0; j < 20; j++) sum += data[i-j].close;
      data[i].ma20 = sum / 20;
    }
  }

  return data;
};
