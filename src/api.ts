import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await axios.get(`${BASE_URL}/coins`);
  return response.data;
}

export async function fetchCoinInfo(coinId: string | undefined) {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
  return response.data;
}

export async function fetchCoinTickers(coinId: string | undefined) {
  const response = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  return response.data;
}

export async function fetchCoinHistroy(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // 현재
  const startDate = endDate - 60 * 60 * 24 * 7; // 일주일 전
  const response = await axios.get(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  // `https://ohlcv-api.nomadcoders.workers.dev/coinId=${coinId}?start=${startDate}&end=${endDate}`
  return response.data.filter((data: any) => Array.isArray(data));
}
