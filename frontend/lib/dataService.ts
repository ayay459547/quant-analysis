import { pythonApi, golangApi, nodejsApi } from './axios';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

/**
 * 建立數據服務工廠
 */
const createService = (apiClient: any) => ({
  // 獲取產業列表
  async getIndustries() {
    if (useMock) {
      const response = await fetch('/mock/industries.json');
      return response.json();
    }
    return apiClient.get('/industries');
  },

  // 獲取特定產業的股票清單
  async getStocksByIndustry(industryId: string) {
    if (useMock) {
      const response = await fetch('/mock/stocks.json');
      const data = await response.json();
      return data[industryId] || [];
    }
    return apiClient.get(`/industries/${industryId}/stocks`);
  },

  // 獲取圖表資料
  async getChartData(symbol: string) {
    if (useMock) {
      const response = await fetch('/mock/chart_2330.json');
      return response.json();
    }
    return apiClient.get(`/stocks/${symbol}/chart`);
  },

  // 獲取股票基本資訊
  async getStockInfo(symbol: string) {
    if (useMock) {
      const response = await fetch('/mock/stocks.json');
      const allStocksByIndustry = await response.json();
      // 在假資料中搜尋該編號
      for (const industry in allStocksByIndustry) {
        const stock = allStocksByIndustry[industry].find((s: any) => s.id === symbol);
        if (stock) return stock;
      }
      return { id: symbol, name: '未知標的' };
    }
    return apiClient.get(`/stocks/${symbol}/info`);
  },

  // 交易執行
  async executeTrade(orderData: any) {
    return apiClient.post('/trade/execute', orderData);
  },

  // 使用者設定
  async getUserSettings() {
    return apiClient.get('/user/settings');
  },

  // 獲取通知訊息
  async getNotifications() {
    if (useMock) {
      const response = await fetch('/mock/notifications.json');
      return response.json();
    }
    return apiClient.get('/notifications');
  },

  // 搜尋股票
  async searchStocks(query: string) {
    if (useMock) {
      const [stocksResp, industriesResp] = await Promise.all([
        fetch('/mock/stocks.json'),
        fetch('/mock/industries.json')
      ]);
      const allStocksByIndustry = await stocksResp.json();
      const industries = await industriesResp.json();
      
      const results: any[] = [];
      for (const industryId in allStocksByIndustry) {
        const industryName = industries.find((i: any) => i.id === industryId)?.name || '未知產業';
        allStocksByIndustry[industryId].forEach((s: any) => {
          if (s.id.includes(query) || s.name.includes(query)) {
            results.push({ ...s, industry: industryName });
          }
        });
      }
      return results.slice(0, 10);
    }
    return apiClient.get(`/stocks/search?q=${query}`);
  }
});

// 分別導出不同後端的服務
export const pythonService = createService(pythonApi);
export const golangService = createService(golangApi);
export const nodejsService = createService(nodejsApi);

// 預設導出 Python 服務 (目前開發重心)
export const dataService = pythonService;
