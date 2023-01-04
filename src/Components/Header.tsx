import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FetchCoins, fetchCoinTickers } from "../api";
import { ICoinList, IPriceData } from "../interface";
import useInterval from "../utils/useInterval";

function Header() {
  const { isLoading, data, isError } = useQuery<ICoinList[]>(["allCoins"], () =>
    FetchCoins("rank")
  );
  const [index, setIndex] = useState(0);
  const [coinId, setCoinId] = useState(
    (data && data[0].totalData && data[0].totalData[0].id) || "btc-bitcoin"
  );

  const {
    isLoading: tickersLoading,
    data: tickersData,
    refetch,
  } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  useInterval(() => {
    if (index >= 4) {
      setIndex(0);
    } else {
      setIndex((count) => count + 1);
    }
  }, 5000);

  useEffect(() => {
    setCoinId((data && data[0].totalData && data[0].totalData[index].id) || "");
    refetch();
  }, [refetch, index]);

  return (
    <Nav>
      <div>{tickersData?.symbol}</div>
      <div>{tickersData?.quotes?.USD?.price?.toFixed(3)}</div>
      <div>{tickersData?.total_supply}</div>
      <div>{tickersData?.max_supply}</div>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  padding: 20px;
  background-color: #333740;
  color: white;
  justify-content: space-around;
  position: fixed;
  width: 100vw;
  height: 60px;
`;

export default Header;
