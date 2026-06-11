import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 定義回傳資料的通用介面
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

class AxiosClient {
  public instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config) => config,
      (error: AxiosError) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        let message = '網路錯誤';
        if (error.response) {
          const status = error.response.status;
          message = `錯誤代碼: ${status}`;
        }
        return Promise.reject(new Error(message));
      }
    );
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }
}

/**
 * 同時定義三個後端 API 實例
 * Python: 8000 - 負責資料分析、爬蟲與主要數據
 * Golang: 8080 - 負責高頻交易、即時串流與效能核心
 * Node.js: 3000 - 負責 BFF、使用者設定、權限管理
 */

export const pythonApi = new AxiosClient({
  baseURL: process.env.NEXT_PUBLIC_API_PYTHON_URL || 'http://localhost:8000/api-python',
  timeout: 10000,
});

export const golangApi = new AxiosClient({
  baseURL: process.env.NEXT_PUBLIC_API_GOLANG_URL || 'http://localhost:8080/api-golang',
  timeout: 10000,
});

export const nodejsApi = new AxiosClient({
  baseURL: process.env.NEXT_PUBLIC_API_NODEJS_URL || 'http://localhost:3000/api-nodejs',
  timeout: 10000,
});
