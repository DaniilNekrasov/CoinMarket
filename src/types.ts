import { TimeScale, TimeUnit } from "chart.js";

export interface CryptoData {
  id: string,
  name: string,
  symbol: string,
  priceUsd: number,
  marketCapUsd: number,
  changePercent24Hr: number,
  volumeUsd24Hr: number,
  rank: number,
  supply: number,
  maxSupply: number,
  number: number,
}

export interface CryptoInterval {
  priceUsd: number,
  time: string,
}