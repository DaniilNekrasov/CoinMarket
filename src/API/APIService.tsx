import axios, { AxiosResponse, AxiosError } from "axios";
import { text } from "stream/consumers";
import { CryptoData, CryptoInterval } from "../types";

// Создаем интерфейс для данных, которые мы ожидаем получить от API

const instance = axios.create({
  baseURL: 'https://api.coincap.io/v2/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'b2a2ba2d-f0ca-47f6-b196-a3b484c998ef',
  }
});

export const APIService = {
  async fetchData(page: number) {
    try {
      const offset : number = (page-1)*100;
      const response: AxiosResponse<{ data: CryptoData[] }> = await instance.get(
        `assets?offset=${offset}`
      );
      return response.data.data;
    } catch (error: any) {
      throw this.handleAPIError(error)
    }
  },

  async fetchInterval(name: string,interval: string) {
    try {
      const response: AxiosResponse<{ data: CryptoInterval[] }> = await instance.get(
        `assets/${name}/history?interval=${interval}`
      );
      return response.data.data;
    } catch (error: any) {
      throw this.handleAPIError(error)
    }
  },

  async fetchCoin(id: string) {
      const response: AxiosResponse<{ data: CryptoData }> = await instance.get(
        `assets/${id}`
      );
      return response.data.data;
  },

  // Метод для обработки ошибок при запросе к API
  handleAPIError(error: AxiosError): Error {
    if (error.response) {
      return new Error(`API Error: ${error.response.status}`);
    } else if (error.request) {
      return new Error("No response from the server.");
    } else {
      return new Error(`Request Error: ${error.message}`);
    }
  }
}

export default APIService;
