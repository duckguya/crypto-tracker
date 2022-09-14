import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  Routes,
  Route,
  Outlet,
  useMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { IInfoData, IPriceData } from "../interface";
import DarkToggle from "./DarkToggle";

// useMatch : 현재 위치를 기준으로 지정된 경로에 대한 일치 데이터를 반환 (특정 url에 있는지의 여부)
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
  /* -webkit-text-stroke-width: 1.5px; */
  /* -webkit-text-stroke-color: ${(props) => props.theme.accentColor}; ; */
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,700;1,700&family=Source+Sans+Pro:wght@300;400&family=Ubuntu:wght@700&display=swap");
  font-family: "Ubuntu", sans-serif;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tap = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  /* background-color: rgba(0, 0, 0, 0.5); */
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: rgba(0, 0, 0, 0.5); */
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  padding: 10px 20px;
`;
const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
  line-height: 130%;
`;

const Arrow = styled.div`
  /* text-align: center; */
  /* margin-top: 80px; */
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  &:active {
    color: ${(props) => props.theme.cardBgColor};
  }
`;

// interface
interface ILocation {
  state: {
    name: string;
  };
}
interface ICoinProps {}

// interface ITag {
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }

// interface IInfoData {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   is_new: boolean;
//   is_active: boolean;
//   type: string;
//   // tags: ITag[];
//   // team: object;
//   description: string;
//   message: string;
//   open_source: boolean;
//   started_at: string;
//   development_status: string;
//   hardware_wallet: boolean;
//   proof_type: string;
//   org_structure: string;
//   hash_algorithm: string;
//   first_data_at: string;
//   last_data_at: string;
// }

// interface IPriceData {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   beta_value: number;
//   first_data_at: string;
//   last_updated: string;
//   quotes: {
//     USD: {
//       ath_date: string;
//       ath_price: number;
//       market_cap: number;
//       market_cap_change_24h: number;
//       percent_change_1h: number;
//       percent_change_1y: number;
//       percent_change_6h: number;
//       percent_change_7d: number;
//       percent_change_12h: number;
//       percent_change_15m: number;
//       percent_change_24h: number;
//       percent_change_30d: number;
//       percent_change_30m: number;
//       percent_from_price_ath: number;
//       price: number;
//       volume_24h: number;
//       volume_24h_change_24h: number;
//     };
//   };
// }

function Coin({}: ICoinProps) {
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = useLocation() as ILocation;
  const priceMatch = useMatch("/react-masterclass/:coinId/price");
  const chartMatch = useMatch("/react-masterclass/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    { refetchInterval: 5000 }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  // // useMatch : 해당 url에 있다면 object를 반환한다. 해당 url이 아니라면 null이 반환된다.

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  // console.log(priceData);
  // interface 정의 빨리하기
  // 각 data를 console.log 로 찍고 콘솔창에서 해당 데이터에 마우스를 올리고 오른쪽 마우스를 클릭한다. store object as blabla 를 눌러 temp를 만든다
  // 그 다음 콘솔창에다 Object.keys(temp1).join() 이라고 쳐서 키값들을 가져온다 ( join() 함수는 배열의 값을 문자열로 가져오게한다.)
  //  value
  // Object.values(temp1).map(v=> typeof v).join()
  // })();
  // }, []);
  const loading = infoLoading || tickersLoading;
  return (
    <>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Link to={"/react-masterclass"}>
            <Arrow>&larr;</Arrow>
          </Link>
          <Title>
            {/* Coins.tsx에서 Link에 state로 담아서 보낸 내용이 있으면 state.name을 보여주고
          아니라면 로딩을 보여준다 근데 로딩이 false라면 info.name을 보여준다 (api호출해서 온 데이터) */}
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
          <DarkToggle />
        </Header>

        {loading ? (
          <Loader> Loading...</Loader>
        ) : (
          <>
            <OverView>
              <OverViewItem>
                <span>rank:</span>
                <span>{infoData?.rank}</span>
              </OverViewItem>
              <OverViewItem>
                <span>symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverViewItem>
              <OverViewItem>
                <span>price:</span>
                <span>{tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
              </OverViewItem>
            </OverView>
            <Description>{infoData?.description}</Description>
            <OverView>
              <OverViewItem>
                <span>total supply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverViewItem>
              <OverViewItem>
                <span>max supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverViewItem>
            </OverView>

            {/* nested routes */}
            <Taps>
              <Tap isActive={chartMatch !== null}>
                <Link to={`/react-masterclass/${coinId}/chart`}>chart</Link>
              </Tap>
              <Tap isActive={priceMatch !== null}>
                <Link to={`/react-masterclass/${coinId}/price`}>price</Link>
              </Tap>
            </Taps>
            <Outlet context={{ coinId: coinId }} />
          </>
        )}
      </Container>
    </>
  );
}
export default Coin;
