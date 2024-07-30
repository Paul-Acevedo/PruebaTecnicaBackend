import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string,Username?: string, Password?: string) {
    const authHeader = Username && Password ? `Basic ${Buffer.from(`${Username}:${Password}`).toString('base64')}` : undefined;
   // const authHeader = Username && Password ? { Authorization: `Basic ${Buffer.from(`${Username}:${Password}`).toString('base64')}` } : {};
    this.client = axios.create({
      baseURL,
      headers: authHeader ? { 'Authorization': authHeader } : {}
    });
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

}

export default ApiClient;