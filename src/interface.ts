export interface CoinId {
  coinId: string;
}

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
export interface ICoinList {
  totalData?: ICoin[];
  coin: ICoin[];
  token: ICoin[];
}

export interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  // tags: ITag[];
  // team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface IPriceData {
  id: string; // 아이디
  name: string; // 종목
  symbol: string; // 기호
  rank: number; // 순위
  circulating_supply: number; // 현재까지 유통량
  total_supply: number; // 총 유통량
  max_supply: number; // 최대 발행량
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    // 달러기준
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: any; // 시총
      market_cap_change_24h: number; // 시총 가격 변동률
      percent_change_1h: any; // 변동
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: any;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: any;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number; // 현재 시세
      volume_24h: any; // 지난 24시간 거래량
      volume_24h_change_24h: number; // 지난 24시간 거래 변동률
    };
  };
}
