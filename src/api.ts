import axios from "axios";
import { CategoryState } from "./atoms";
import { ICoin } from "./interface";

// const BASE_URL = `https://api.coinpaprika.com/v1`;
// const BASE_URL = ``;
const BASE_URL = `/api`;

export async function FetchCoins(category: string) {
  const response = await axios.get(`${BASE_URL}/coins`);
  if (category === "rank") {
    return [
      {
        totalData: response.data.slice(0, 5),
        token: response.data
          .slice(0, 100)
          .filter((data: any) => data.type === "token")
          .sort(),
        coin: response.data
          .slice(0, 100)
          .filter((data: any) => data.type === "coin")
          .sort(),
      },
    ];
  } else if (category === "asc") {
    return [
      {
        totalData: response.data.slice(0, 5),
        token: response.data
          .slice(0, 100)
          .filter((data: any) => data.type === "token")
          .sort((a: ICoin, b: ICoin) => a.name.localeCompare(b.name)),
        coin: response.data
          .slice(0, 100)
          .filter((data: any) => data.type === "coin")
          .sort((a: ICoin, b: ICoin) => a.name.localeCompare(b.name)),
      },
    ];
  } else {
    return [
      {
        totalData: response.data.slice(0, 5),
        token: response.data
          .slice(0, 100)
          .filter((data: any) => data.type === "token")
          .sort((a: ICoin, b: ICoin) => -a.name.localeCompare(b.name)),
        coin: response.data
          .slice(0, 100)
          .filter((data: any) => data.type === "coin")
          .sort((a: ICoin, b: ICoin) => -a.name.localeCompare(b.name)),
      },
    ];
  }
}

export async function fetchCoinInfo(coinId: string | undefined) {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
  return response.data;
}

export async function fetchCoinTickers(coinId: string | undefined) {
  const response = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  return response.data;
}

export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // 현재
  const startDate = endDate - 60 * 60 * 24 * 7; // 일주일 전
  const response = await axios.get(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  // `https://ohlcv-api.nomadcoders.workers.dev/coinId=${coinId}?start=${startDate}&end=${endDate}`
  return response.data;
}
