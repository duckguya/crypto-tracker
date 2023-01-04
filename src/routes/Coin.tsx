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
import { fetchCoinInfo, FetchCoins, fetchCoinTickers } from "../api";
import { ICoinList, IInfoData, IPriceData } from "../interface";
import DarkToggle from "../Components/DarkToggle";
import Coins from "../Components/Coins";

// interface
interface ILocation {
  state: {
    name: string;
  };
}
interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    { refetchInterval: 5000 }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const { isLoading, data, isError, refetch } = useQuery<ICoinList[]>(
    ["allCoins"],
    () => FetchCoins("rank")
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <DetailWrapper>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Link to={"/crypto-tracker"}>
            <Arrow>&larr;</Arrow>
          </Link>
          <Title>
            {/* Coins.tsx에서 Link에 state로 담아서 보낸 내용이 있으면 state.name을 보여주고
          아니라면 로딩을 보여준다 근데 로딩이 false라면 info.name을 보여준다 (api호출해서 온 데이터) */}
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
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
            <TapWrapper>
              <Tap isActive={chartMatch !== null}>
                <Link to={`/crypto-tracker/${coinId}/chart?type=${type}`}>
                  chart
                </Link>
              </Tap>
              <Tap isActive={priceMatch !== null}>
                <Link to={`/crypto-tracker/${coinId}/price?type=${type}`}>
                  price
                </Link>
              </Tap>
            </TapWrapper>
            <Outlet context={{ coinId: coinId }} />
          </>
        )}
      </DetailWrapper>
      <CoinListWrapper>
        {data && type === "coin" && <Coins data={data[0].coin} type={type} />}
        {data && type === "token" && <Coins data={data[0].token} type={type} />}
      </CoinListWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width: 100vw;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailWrapper = styled.div`
  margin: 60px 0 60px 0;
  padding: 30px 40px 0 40px;
  width: 50%;
  max-height: 1000px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: ${(props) => props.theme.shadowColor};
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const TapWrapper = styled.div`
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

const CoinListWrapper = styled.div`
  margin-top: 60px;
`;
export default Coin;
